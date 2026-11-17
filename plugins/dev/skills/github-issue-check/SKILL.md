---
name: "github-issue-check"
description: "Checklist when creating or editing a GitHub issue (incl. recording decisions on it): duplicates, milestone, assignee, label, board, relations"
---

GitHub API first (MCP, else REST/GraphQL, gh). Chrome only when the API cannot do it at all.
Issue text and comments: no claude.ai link. A "Generated with Claude Code" footer is fine.

When creating or editing a GitHub issue:
1. Search open+closed issues for duplicates; if found, update that one instead.
2. Milestone: pick from the project's milestones (project info) by due date; ask if unsure.
3. Assignees: everyone who actually does it.
4. Label: type (dev/planning/art etc.).
5. Board: ensure it's on the project board with correct status. New issues land in Backlog; move current-milestone issues to Ready, and issues with work started to In progress (issue sidebar Projects > Status, via Chrome).
6. Relations: set Blocked by for prerequisites AND blocking for dependents. Sub-issues only for splitting one task.
7. When closing, comment the reason and the follow-up issue.
8. Report number + values set in one line.

Recording decisions or changes on an issue: add a comment, never edit the issue body. Do not tick checkboxes on your own.
