# mongodb-auth-patterns

## Purpose
Use when writing or reviewing API routes, Mongoose models, or NextAuth configuration in the SYSTRUHELPDESK project.

## Confidence: high

## Patterns

### Always use the cached DB connection
```ts
import connectDB from "@/lib/db";
await connectDB();
// Never: new Mongoose() or direct mongoose.connect()
```

### Auth check on every protected route
```ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const session = await getServerSession(authOptions);
if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
```

### Role enforcement pattern
```ts
if (session.user.role !== "ADMIN") {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

### Roles in the system
- `ADMIN` — full access (everything)
- `SALES` — leads, customers, quotes
- `TECH` — tickets, incidents, service catalog

### Always validate request body with zod
```ts
import { z } from "zod";
const schema = z.object({ name: z.string().min(1), email: z.string().email() });
const parsed = schema.safeParse(await req.json());
if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });
```

### Mongoose model import pattern
```ts
import Customer from "@/models/Customer";
// All models: User, Lead, Customer, Quote, Assessment, ServiceCatalog
```

## Applies to
Linus, Saul, Danny, Turk, Livingston
