---
name: "gil-branch-cleanup"
description: "Project Gil: delete unneeded local and remote branches (merged, stale), update local develop, and return to the working branch; run before any new branch and right after every PR merge"
---

# Branch cleanup (Project Gil)

Mandatory before creating any new branch (see gil-github-newbranch), and right after every PR merge (see gil-github-pr), not only when asked. Also follow gil-github-pr. Local branches live on the user's PC: use Remote Control in the PC work folder named in project memory, unless told otherwise.

## 1. Survey
- `git fetch --all --prune`, then list local and remote branches (origin = fork, upstream = org repo).
- For each branch, find its PR state via API (MCP list_pull_requests by head). Merged = PR merged, or `git branch --merged upstream/develop`.
- Note the current branch and `git stash list` before touching anything.

## 2. Decide
- Delete: branches whose PR is merged or whose commits are all in develop.
- Keep without asking: unpushed commits, no PR yet, `backup/*`, the current task branch, open-PR branches. Never drop stashes.
- Unclear which branches go, or which branch to return to: list candidates with one-line evidence and ask once in one message.

## 3. Delete
- Local: `git branch -d` (never `-D` on unmerged work).
- Remote: delete without asking once the branch is merged or the user said so. Ask at most once per task.
- Route when blocked: GitHub API (DELETE git/refs/heads/<branch>) → Chrome merged PR page "Delete branch" (or repo branches page) → Remote Control `git push <remote> --delete <branch>`.
- RC permission blocks `git push --delete`: try the other routes; never hand the user commands to run. Never report "can't delete".
- Cloud proxy 403s git/refs DELETE and push --delete; expect it.

## 4. Return
- First, always: `git switch develop`, `git pull upstream develop` (no rebase), push develop to origin.
- Run as the pre-step for a new branch: stay on updated develop and create the new branch from it.
- Otherwise: switch back to the branch the user was on before (or the one they name). If it was deleted, stay on updated develop and say so.

## 5. Report
- One short message: deleted (local/remote), kept with reason, current branch, stash untouched.