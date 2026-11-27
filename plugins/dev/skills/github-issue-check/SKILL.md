---
name: "github-issue-check"
description: "Creating or editing a GitHub issue or recording a decision on it: duplicates, milestone, assignee, label, board, relations"
---

GitHub API first (MCP, else REST/GraphQL, gh). Chrome only when none of them can do it (an on-screen step: general Hands off the user's screen).
A "Generated with Claude Code" footer is fine in issue text and comments.

When creating or editing a GitHub issue:
1. Search open+closed issues for duplicates; if found, update that one instead.
2. Milestone: pick from the project's milestones (project info) by due date (the current one by default).
3. Assignees: everyone who actually does it.
4. Label: type (dev/planning/art etc.).
5. Board: ensure it's on the project board with correct status. New issues land in Backlog; move current-milestone issues to Ready, and issues with work started to In progress (gh CLI as in issue-board-sync).
6. Relations: set Blocked by for prerequisites AND blocking for dependents. Sub-issues only for splitting one task.
7. Done is judged by what the game does now (behavior, data assets, scenes), not old names or literal checkboxes; covered in substance: close as completed with a one-line evidence comment, no follow-up issue for leftover wording (user 11/25). When closing, comment the reason and the follow-up issue.
8. Report number + values set in one line.

Recording decisions or changes on an issue: add a comment, never edit the issue body. Collect them and post one comment right before the commit that holds the work; no follow-up correction comments (user 11/13). Do not tick checkboxes on your own.
