---
name: "pr-review"
description: "Before opening a PR: run local /code-review, put the result in the PR template's AI review section, fix any bug found, then open"
---

# Pre-PR review

- Actually run local /code-review on the branch.
- Put its result in the PR template's AI review section (project info).
- A bug found: fix it without asking (general Fix found bugs), re-run /code-review, note each fix in the AI review section, then open the PR.
- Scope: only this branch's diff against the default branch. Apply the project review doc's checks (e.g. hard flags, one abstraction level per function and class) to the changed code only; never report or fix code the branch didn't touch.
