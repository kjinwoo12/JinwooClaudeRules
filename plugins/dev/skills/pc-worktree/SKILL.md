---
name: "pc-worktree"
description: "The user approved a git worktree for PC repo work (main folder busy, or they asked for one), or a worktree's branch merged: open it from a cloud thread through Remote Control, remove it after merge"
---

# PC worktree

Only after the user's yes (general worktree rule).

## Where it can be made
- A thread running on the PC itself cannot create a worktree (its platform instructions forbid it). A cloud thread can: start Remote Control in the PC work folder (project info) and put the worktree steps in its instructions (remote-control).

## RC instructions
- Main folder is off limits: only `git fetch` there. No checkout, switch, restore, reset, stash, or cherry-pick; never touch its open editor or its Unity MCP. Branch cleanup that needs switching waits; list merged branches as proposals.
- `git worktree add <repo folder>-<issue> -b <branch> <main repo remote>/<default branch>` (names: project info). Folder or branch already exists: stop and report.
- Never copy the main folder's Library into the worktree; let Unity import fresh. A copied Library made unrelated tests fail.
- Unity: batchmode with `-projectPath <worktree>` for import, compile, and tests. Play check: a second editor on the worktree only, never the user's editor; if Unity MCP can't target it without touching the main editor's, skip the play check and say why.
- Commit and push from the worktree (github-pr). Scratch files outside the repo, deleted at the end.
- Report the worktree path. Keep the folder until its PR merges.

## After merge
- With branch-cleanup: `git worktree remove <path>`, then delete the branch.
