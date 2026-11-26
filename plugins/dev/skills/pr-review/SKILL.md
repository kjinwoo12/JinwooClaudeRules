---
name: "pr-review"
description: "Before opening a PR: run local /code-review, put the result in the PR template's AI review section, fix any bug found, then open"
---

# Pre-PR review

- Actually run local /code-review on the branch.
- Put its result in the PR template's AI review section (project info).
- A bug found: fix it without asking (general Fix found bugs), re-run /code-review, note each fix in the AI review section, then open the PR.
- Every finding gets fixed before the PR, nits included (user 11/26 「다음부턴 넘어가지마」, after five nits were left as "small"): "minor", "not visible now", or "out of the issue's scope" is no reason to skip. Leave one unfixed only when its fix changes a design value or what the user sees, or the finding is wrong: ask with a decision card, and write the answer in the template's not-fixed list starting with 「사용자 결정:」, or 「오탐:」 with the evidence. `check-github-text.js` denies a PR body whose not-fixed items start with neither.
- Scope: only this branch's diff against the default branch. Apply the project review doc's checks (e.g. hard flags, one abstraction level per function and class) to the changed code only; never report or fix code the branch didn't touch.
