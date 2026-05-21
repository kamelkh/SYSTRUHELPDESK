# debugging-strategies

## Purpose
Use this skill when a change fails, behavior is unclear, or a bug needs fast isolation.

## What to do
- Start with the closest failing file, line, or behavior.
- Form one local hypothesis and one cheap check that can disconfirm it.
- Prefer the smallest reversible fix first.
- Re-run the narrowest useful validation after the change.
- Avoid broad search when a nearby code path already explains the issue.

## Good output
- Root-cause hypothesis
- Discriminating check
- Smallest fix
- Focused validation