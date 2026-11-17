---
name: "issue-board-sync"
description: "Update GitHub issue cards and the project board to match meeting minutes or current work (comments, new issues, statuses, relations)"
---

Use when asked to tidy or update issue cards or the kanban board (e.g. from meeting minutes, or to reflect current work). Per-issue fields follow github-issue-check; team-facing text follows team-docs.

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
