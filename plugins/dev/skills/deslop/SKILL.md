---
name: "deslop"
description: "Before every code commit or PR: strip AI slop from the diff (needless defensive checks, casts, nesting, patterns foreign to the file) without changing behavior"
---

# Deslop

Run on the diff against the default branch, before committing code and again before opening the PR.

- Remove abnormal defensive checks or try/catch on trusted paths.
- Remove casts that exist only to get past a type error.
- Flatten deep nesting that early returns would flatten.
- Rewrite patterns inconsistent with the rest of the file.
- Keep behavior; make minimal edits. Comments are left to the repo lint.
