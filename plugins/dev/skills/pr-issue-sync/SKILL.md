---
name: "pr-issue-sync"
description: "Right after a PR is opened or merged: update its linked issues (comments, board status, relations)"
---

# PR issue sync (the PR's linked issues only)

Per-issue fields follow github-issue-check; board status via gh CLI as in issue-board-sync; text follows team-docs.
Part of the PR or merge the user asked for: no separate ask or approval. Issues = those named in the PR body's Closes/Refs.
- PR opened: comment on each issue (「M/D 진행 내용입니다 (#PR).」, what the PR changes in plain words, what is left). Status In review (the board's PR-linked workflow usually sets it; check, fix if not).
- PR merged: Closes issue → check it is closed and Done. Refs issue → comment 「M/D #PR이 <기본 브랜치>에 머지됐습니다. 남은 일은 ...」; status: work left → In progress; only sign-off left → leave the status as is and say in the reply it waits for 총괄 확인 (only the 총괄 moves a card there; `block-signoff-status.js` denies the move). Work left that needs more PRs or other owners: split it with issue-split.
- Relations: update Blocked by and blocking if the PR changed them (github-issue-check step 6).
- Report inside the PR or merge reply: one line per issue, as links. No separate reply.