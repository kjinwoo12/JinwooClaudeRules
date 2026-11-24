---
name: "github-pr"
description: "Commits, pushes, and PRs on a team repo"
---

# GitHub work rules

## Tools
- GitHub work via API (MCP, else REST/GraphQL, gh). Chrome only when none of them can do it (an on-screen step: general Hands off the user's screen).
- Anything teammates can see: no claude.ai link, except the auto-added commit lines below. A "Generated with Claude Code" footer is fine.

## Branch and git
- New branch: follow github-newbranch (cleanup first, issue, name, base).
- Files tracked by LFS (project info): push them from the PC (Remote Control).
- Leave auto-added Co-Authored-By and Claude-Session lines as they are.

## Commits
- Write the commit message yourself and commit, code and docs alike. Never ask the user to confirm it.
- Commit messages, PR titles and bodies: Korean, ~다 체. Plain words that say what happens.

## Flow
Requirements interview (brainstorming; skip when the ask is already clear) → branch (github-newbranch) → develop, commit, push → the user checks the result → a fix interview and another round, or the PR → pr-review and required tests pass → self-merge (project merge policy) → branch-cleanup (PC main folder updated to the default branch).

## PR
- New feature work (adds functionality; not bug fixes, docs, or rule/config changes): commit and push, then ask once with a decision card whether to open the PR or fix more, and open it only on that word (the user already asked for the PR or merge: just do it). This is a deliberate exception to the self-check. Other work: open the PR without asking.
- Before the PR: check related repo docs are current and fix stale parts in the same PR.
- Before every commit of code and before the PR: deslop.
- Before the PR: pr-review.
- Before the PR: run the repo lint (project info) and fix every violation. Its PR check must pass.
- Issue that still needs sign-off after merge (project info): write `Refs #N` instead of `Closes`.
- After creating the PR, read the body back and fix the footer if it became a claude.ai link.
- Merge: self-merge per the project's merge policy (project info) as soon as its conditions pass, without asking.
- Delete your own merged branch without asking.
- A merge event on a watched PR: at once, without being asked, run branch-cleanup on the PC (merged branch deleted, local default branch updated) and pr-issue-sync.
- PR comments and review replies: team-docs.
