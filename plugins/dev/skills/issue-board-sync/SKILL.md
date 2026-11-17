---
name: "issue-board-sync"
description: "Update GitHub issue cards and the project board to match meeting minutes or current work (comments, new issues, statuses, relations); also right after every PR is opened or merged"
---

Use when asked to tidy or update issue cards or the kanban board (e.g. from meeting minutes, or to reflect current work), and without being asked right after every PR is opened or merged (see github-pr; steps in 「PR flow」 below). Per-issue fields follow github-issue-check; team-facing text follows team-docs.

1. Sources: open them this turn. Meeting minutes: the latest file where the project info says minutes live; where a user-edited version differs, it wins. Current work: other threads, branches, PRs, issue comments.
2. Read all issues (open and closed) and the board's per-milestone view.
3. Map each decision and to-do:
   - Existing issue: add a comment ("YYMMDD 정기회의에서 ..."), never edit its body.
   - New game work (dev, planning, art): create an issue via github-issue-check.
   - Skip non-game admin (contracts, accounts, payments) and items whose milestone has no basis; list them in the report.
   - Owner and wording come from the source; if the user says an item is theirs, fix assignee and text.
4. Status for every open card in the current milestone (github-issue-check step 5): Backlog -> Ready; work started (branch, commits, screenshots, PR) -> In progress. Never tick checkboxes.
5. Relations: Blocked by and blocking (github-issue-check step 6).
6. Verify on the board view that no open current-milestone card is left in Backlog.
7. One reply: new issues, commented issues, status moves, relations, skipped items, all as issue links.

Board status via Chrome (the API cannot reach the project board): issue page sidebar Projects > Status, then click the option. Typing a name and pressing Enter toggles the highlighted option off and leaves No status.

## PR flow (the PR's linked issues only)
Part of the PR or merge the user asked for: no separate ask or approval. Issues = those named in the PR body's Closes/Refs.
- PR opened: comment on each issue (「M/D 진행 내용입니다 (#PR).」, what the PR changes in plain words, what is left). Status In review (the board's PR-linked workflow usually sets it; check, fix if not).
- PR merged: Closes issue → check it is closed and Done. Refs issue → comment 「M/D #PR이 <기본 브랜치>에 머지됐습니다. 남은 일은 ...」; status: work left → In progress, only sign-off left → the sign-off status (project info). Work left that needs more PRs or other owners: split it with issue-split.
- Relations: update Blocked by and blocking if the PR changed them (github-issue-check step 6).
- Report inside the PR or merge reply: one line per issue, as links. No separate reply.