---
name: "pc-worktree"
description: "PC repo work in a git worktree, only when the main folder is busy or the user asked (main folder first, general): take a free worktree from the fixed pool through Remote Control, and hand it back after merge"
---

# PC worktree

The PC keeps a fixed pool of worktrees (paths: project info), reused job after job so each keeps its Unity Library. Never create a per-issue worktree, never remove a pool worktree.

## Where it runs
- A thread running on the PC itself cannot create a worktree (its platform instructions forbid it). A cloud thread can: start Remote Control in the PC work folder (project info) and put the worktree steps in its instructions (remote-control).

## RC instructions
- Main folder is off limits: only `git fetch` there. No checkout, switch, restore, reset, stash, or cherry-pick; never touch its open editor or its Unity MCP.
- Free worktree = detached HEAD and clean (`git -C <wt> symbolic-ref -q HEAD` fails, `git -C <wt> status --porcelain` empty). On a branch = busy; never touch it.
- Take the first free one: `git -C <wt> switch -c <branch> <main repo remote>/<default branch>` after `git fetch`. All busy: general worktree rule's fallback (main folder, new branch).
- A pool path missing (first use): `git worktree add --detach <path> <main repo remote>/<default branch>`, then take it. Never copy the main folder's Library into it; let Unity import fresh. A copied Library made unrelated tests fail.
- Unity: batchmode with `-projectPath <worktree>` for import, compile, and tests. Play check: a second editor on the worktree only, never the user's editor; if Unity MCP can't target it without touching the main editor's, skip the play check and say why.
- Commit and push from the worktree (github-pr). Scratch files outside the repo, deleted at the end.
- Report the worktree path. Keep it on the branch until its PR merges.

## After merge
- A pool worktree, with branch-cleanup: `git -C <wt> switch --detach <main repo remote>/<default branch>`, then delete the branch. The worktree stays, now free.
- Then finish branch-cleanup in the main folder too (default branch updated and pushed to the fork), unless someone is working there (real uncommitted work per unity-editor-noise, or checked out on another task's unmerged branch); then don't switch: message that task's thread to run it when its work ends (its own post-merge branch-cleanup), or, if no thread owns it (the user's own work), schedule a recheck and run it once the folder is clean. Never stop at fetch.
- A worktree outside the pool (made before the pool): `git worktree remove <path>`, then delete the branch.
