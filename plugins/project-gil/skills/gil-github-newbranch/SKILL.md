---
name: "gil-github-newbranch"
description: "Project Gil: steps for creating any new branch on the team repo (branch cleanup first, issue, name, base)"
---

# New branch (Project Gil)

Also follow gil-github-pr. Run every step, in order, each time a new branch is made.

1. Cleanup: run gil-branch-cleanup, every step. Never skip it, even with few branches.
2. Issue: the branch needs an issue. None yet: create it first (github-issue-check).
3. Name: `feature/<issue-number>-<english-lowercase-kebab>`. Never auto `claude/` names on the team repo. Other kinds (release, hotfix): CONTRIBUTING git flow.
4. Base: branch from the updated develop of the org repo, in the PC repo gil-branch-cleanup uses (Remote Control).
   - Work needs code that is only in an unmerged PR: before branching, tell the user and let them choose: add the commits to that PR (recommended) or stack a new branch on it. Never stack first and report after.
5. Report: one line, the branch name and its base.