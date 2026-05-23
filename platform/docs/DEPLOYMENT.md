# SYSTRU Platform — Deployment Guide

מדריך מלא להעברת הפלטפורמה לשרת ולהפעלתה בפרודקשן.

---

## תוכן עניינים

1. [מה לוקחים לשרת](#מה-לוקחים-לשרת)
2. [דרישות מהשרת](#דרישות-מהשרת)
3. [התקנה ראשונית (Ubuntu 22.04 / 24.04)](#התקנה-ראשונית)
4. [העברת הקוד](#העברת-הקוד)
5. [קונפיגורציית `.env.prod`](#קונפיגורציית-envprod)
6. [הרצת ה-Stack ב-Docker](#הרצת-ה-stack-ב-docker)
7. [Nginx + HTTPS (Certbot)](#nginx--https-certbot)
8. [גיבוי MongoDB](#גיבוי-mongodb)
9. [Updates & Re-deploy](#updates--re-deploy)
10. [Troubleshooting](#troubleshooting)

---

## מה לוקחים לשרת

מעתיקים את **כל תיקיית `platform/`** חוץ מ:

| לא להעתיק | סיבה |
|---|---|
| `node_modules/` | מותקן מחדש על השרת |
| `.next/` | נבנה מחדש על השרת |
| `.env.local` | dev secrets בלבד |

מומלץ פשוט להעלות דרך **git**:
```bash
# מקומית
cd platform
git init
git add .
git commit -m "Phase 0 foundation"
git remote add origin git@github.com:YOUR_ORG/systru-platform.git
git push -u origin main
```
ועל השרת:
```bash
git clone git@github.com:YOUR_ORG/systru-platform.git /opt/systru
```

או דרך SCP / rsync:
```powershell
# Windows PowerShell
rsync -avz --exclude node_modules --exclude .next --exclude .env.local `
  ./platform/ user@server:/opt/systru/
```

---

## דרישות מהשרת

| משאב | מינימום | מומלץ |
|---|---|---|
| CPU | 2 vCPU | 2–4 vCPU |
| RAM | 4 GB | 4–8 GB |
| Storage | 40 GB SSD | 80 GB SSD |
| OS | Ubuntu 22.04 LTS | Ubuntu 24.04 LTS |
| Network | IPv4 פומבי + Domain | + IPv6 |

**הצעות hosting** (חודש בערך, נכון ל-2026):
- **Hetzner CX22** — ~€6/mo (2 vCPU / 4 GB / 40 GB) — מומלץ
- **Hetzner CX32** — ~€11/mo (4 vCPU / 8 GB / 80 GB)
- **DigitalOcean Basic** — $12–24/mo
- **Linode 4GB** — $24/mo

---

## התקנה ראשונית

### 1. עדכון מערכת + משתמש
```bash
ssh root@SERVER_IP

# עדכון
apt update && apt upgrade -y

# יצירת משתמש לא-root
adduser systru
usermod -aG sudo systru

# העתקת SSH keys
rsync --archive --chown=systru:systru ~/.ssh /home/systru

# חסימת login של root (אופציונלי אבל מומלץ)
sed -i 's/^PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl restart ssh
```

### 2. Firewall
```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### 3. Docker + Docker Compose
```bash
# כניסה כמשתמש systru
ssh systru@SERVER_IP

# Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
# התנתק והתחבר מחדש
exit
ssh systru@SERVER_IP
docker --version          # ודא שעובד
docker compose version
```

### 4. Nginx + Certbot
```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

---

## העברת הקוד

```bash
# על השרת
sudo mkdir -p /opt/systru
sudo chown systru:systru /opt/systru
cd /opt/systru

# Option A — Git
git clone git@github.com:YOUR_ORG/systru-platform.git .

# Option B — Rsync (מהמקומי)
# מהמחשב המקומי:
# rsync -avz --exclude node_modules --exclude .next ./platform/ systru@SERVER:/opt/systru/
```

---

## קונפיגורציית `.env.prod`

```bash
cd /opt/systru
cp .env.example .env.prod
nano .env.prod
```

**ערכים שחייבים להחליף:**

```env
# Mongo
MONGO_ROOT_USER=systru_admin
MONGO_ROOT_PASSWORD=<openssl rand -base64 24>

# NextAuth — חובה 32+ תווים
AUTH_SECRET=<openssl rand -base64 48>
NEXTAUTH_URL=https://app.systru.co.il
APP_URL=https://app.systru.co.il

# SMTP — קרדנציאלים אמיתיים (Office365/Gmail/Sendgrid)
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=systru@systru.co.il
SMTP_PASS=<app_password>
SMTP_FROM_EMAIL=systru@systru.co.il

# Admin ראשוני
ADMIN_EMAIL=admin@systru.co.il
ADMIN_PASSWORD=<סיסמה חזקה — תשנה אחרי login ראשון>
ADMIN_NAME=System Admin
```

**ייצור סיסמאות חזקות:**
```bash
openssl rand -base64 24    # ל-Mongo password
openssl rand -base64 48    # ל-AUTH_SECRET
```

**הגן על הקובץ:**
```bash
chmod 600 .env.prod
```

---

## הרצת ה-Stack ב-Docker

```bash
cd /opt/systru

# בנייה והרצה ברקע
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

# בדיקת סטטוס
docker compose -f docker-compose.prod.yml ps

# צפייה ב-logs
docker compose -f docker-compose.prod.yml logs -f app
docker compose -f docker-compose.prod.yml logs -f mongo
```

### Seed של ה-admin הראשון
```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod exec app \
  npx tsx scripts/seed-admin.ts
```

**בדיקה מקומית בשרת:**
```bash
curl http://127.0.0.1:3000
# אמור להחזיר HTML של דף הבית
```

---

## Nginx + HTTPS (Certbot)

### 1. הגדרת Nginx site
```bash
sudo nano /etc/nginx/sites-available/systru
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name app.systru.co.il;

    # מקסימום העלאת קובץ (הצעות מחיר/דוחות)
    client_max_body_size 25m;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        "upgrade";
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/systru /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 2. הוצאת תעודת SSL
```bash
sudo certbot --nginx -d app.systru.co.il --non-interactive --agree-tos -m admin@systru.co.il
```
Certbot ידאג לחידוש אוטומטי דרך systemd timer (`certbot.timer`).

### 3. בדיקה
```bash
curl https://app.systru.co.il
```
אמור להחזיר את ה-HTML של דף הבית בעברית.

---

## גיבוי MongoDB

### Backup ידני
```bash
docker compose -f docker-compose.prod.yml exec mongo \
  mongodump --username $MONGO_ROOT_USER --password $MONGO_ROOT_PASSWORD \
  --authenticationDatabase admin --db systru --archive=/tmp/systru.gz --gzip

docker compose -f docker-compose.prod.yml cp mongo:/tmp/systru.gz ./backups/systru-$(date +%F).gz
```

### Backup אוטומטי יומי (cron)
```bash
sudo nano /etc/cron.daily/systru-backup
```
```bash
#!/usr/bin/env bash
set -e
cd /opt/systru
TS=$(date +%F-%H%M)
mkdir -p backups
source .env.prod
docker compose -f docker-compose.prod.yml exec -T mongo \
  mongodump --username "$MONGO_ROOT_USER" --password "$MONGO_ROOT_PASSWORD" \
  --authenticationDatabase admin --db systru --archive --gzip \
  > "backups/systru-$TS.gz"
# שמור 14 ימים אחורה
find backups -name 'systru-*.gz' -mtime +14 -delete
```
```bash
sudo chmod +x /etc/cron.daily/systru-backup
```

### Restore
```bash
docker compose -f docker-compose.prod.yml exec -T mongo \
  mongorestore --username $MONGO_ROOT_USER --password $MONGO_ROOT_PASSWORD \
  --authenticationDatabase admin --gzip --archive < backups/systru-YYYY-MM-DD.gz
```

---

## Updates & Re-deploy

```bash
cd /opt/systru
git pull origin main
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
docker image prune -f
```

הקוד נבנה מחדש אוטומטית (Dockerfile multi-stage build). המסד נשאר ב-volume נפרד.

---

## Troubleshooting

### App לא מצליח להתחבר ל-Mongo
```bash
docker compose -f docker-compose.prod.yml logs app | grep -i mongo
docker compose -f docker-compose.prod.yml exec mongo mongosh -u $MONGO_ROOT_USER -p
```
ודא ש-`MONGODB_URI` בקובץ `.env.prod` תואם ל-`MONGO_ROOT_USER`/`MONGO_ROOT_PASSWORD`.

### "AUTH_SECRET is required"
חובה לפחות 32 תווים. ודא ש-`AUTH_SECRET` קיים ב-`.env.prod` והשירות הופעל מחדש:
```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --force-recreate app
```

### דף הבית מציג English ולא עברית
ה-default locale הוא `he` בלי prefix. אם הדפדפן שולח `Accept-Language: en`, next-intl יציג English. לבדיקה ידנית:
- עברית: `https://app.systru.co.il/`
- אנגלית: `https://app.systru.co.il/en`

### "EBADENGINE eslint-visitor-keys"
Warning בלבד. לא חוסם build. אם ממש מפריע, שדרג ל-Node 24 LTS.

### CORS / Cookie issues אחרי deploy
ודא:
- `NEXTAUTH_URL` = `https://app.systru.co.il` (לא `http://`)
- Nginx מעביר `X-Forwarded-Proto: $scheme`
- `APP_URL` זהה ל-`NEXTAUTH_URL`

---

## Checklist deploy ראשון

- [ ] שרת מוקם, ssh עובד עם משתמש לא-root
- [ ] Firewall (ufw) פעיל — 22, 80, 443 פתוחים
- [ ] Docker + docker compose מותקנים
- [ ] DNS מצביע ל-IP של השרת (`app.systru.co.il` → A record)
- [ ] קוד הועלה ל-`/opt/systru`
- [ ] `.env.prod` מולא בערכים אמיתיים + `chmod 600`
- [ ] `docker compose up -d --build` רץ ללא errors
- [ ] `npm run seed:admin` יצר את ה-admin
- [ ] Nginx site הוגדר
- [ ] Certbot הוציא תעודת SSL
- [ ] בדיקה ב-https שהאתר עולה ושאפשר להתחבר ל-`/admin`
- [ ] Cron backup יומי מוגדר
- [ ] שיניתי את הסיסמה של ה-admin אחרי login ראשון
