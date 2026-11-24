---
name: "github-newbranch"
description: "Creating any new branch on a team repo: cleanup first, issue, name, base"
---

# New branch

Also follow github-pr. Run every step, in order, each time a new branch is made.
Keep working on an existing branch only while its PR is not merged; after a merge, always a new branch.

1. Cleanup: run branch-cleanup, every step. Never skip it, even with few branches.
2. Issue: the branch needs an issue. None yet: create it first (github-issue-check).
3. Name: the project's branch naming rule (project info).
4. Base: branch from the updated default branch of the main repo, in the PC repo branch-cleanup uses (Remote Control).
   - Work needs code that is only in an unmerged PR: before branching, tell the user and let them choose: add the commits to that PR (recommended) or stack a new branch on it. Never stack first and report after.
5. Report: one line, the branch name and its base.
