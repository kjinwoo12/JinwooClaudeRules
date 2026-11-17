---
name: "issue-split"
description: "Split an issue too big for one PR into GitHub sub-issues so each PR closes one; when creating such an issue, or when a Refs merge leaves work"
---

# Split a big issue into sub-issues

Per-issue fields follow github-issue-check; text follows team-docs.

## When
- Creating an issue whose done criteria need more than one PR, or mix kinds or owners (dev, art, sound, planning check).
- A PR with `Refs #N` merges and #N still has work left (pr-issue-sync).

## Steps
1. List the remaining items from the issue body, its comments, and the merged PRs' remaining-work and open-design-value sections.
2. Dup check (github-issue-check step 1): an item an existing issue already covers goes there as a comment, not a new sub-issue.
3. Each other item: one sub-issue, made with the parent set at creation (`issue_write` create with `parent_issue_number`). Same milestone as the parent, label by kind, assignees who do it. Body: 목표 (which part of the parent), 완료 조건, open design values if any, 관련 links.
4. Parent: add one comment listing the sub-issues and that the parent closes when they all close. Never edit the parent body, never tick its boxes.
5. Board: sub-issues in the current milestone → Ready; parent stays In progress.
6. Later PRs write `Closes #<sub-issue>`, not `Refs #<parent>`. Close the parent when its last sub-issue closes.
7. Report: one line per new sub-issue and comment, as links.