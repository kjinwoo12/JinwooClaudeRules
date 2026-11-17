---
name: "github-pr"
description: "Rules for commits, pushes, and PRs on a team repo (new branch: github-newbranch; issues: github-issue-check; issue updates: pr-issue-sync)"
---

# GitHub work rules

## Tools
- GitHub work via API (MCP, else REST/GraphQL, gh). Chrome only when the API cannot do it at all.
- Anything teammates can see: no claude.ai link, except the auto-added commit lines below. A "Generated with Claude Code" footer is fine.

## Branch and git
- New branch: follow github-newbranch (cleanup first, issue, name, base).
- Remote ahead: pull, never rebase.
- Files tracked by LFS (project info): push them from the PC (Remote Control).
- Leave auto-added Co-Authored-By and Claude-Session lines as they are.

## Commits
- Write the commit message yourself and commit, code and docs alike. Never ask the user to confirm it.
- Commit messages, PR titles and bodies: Korean, ~다 체. Plain words that say what happens.
- Do not report commit hashes.

## PR
- Before the PR: check related repo docs are current and fix stale parts in the same PR.
- Before every commit of code and before the PR: deslop.
- Before the PR: pr-review.
- Before the PR: run the repo lint (project info) and fix every violation. Its PR check must pass.
- Set milestone, assignee, and label on the PR too.
- Issue that still needs sign-off after merge (project info): write `Refs #N` instead of `Closes`.
- No claude.ai link in the body (including the first-line Requested by / project thread lines). After creating the PR, read the body back and fix the footer if it became a claude.ai link.
- Right after creating the PR: run pr-issue-sync, without being asked.
- Self-merge only what the project's merge policy allows (project info).
- Delete your own merged branch without asking.
- Each time a PR merges (self-merge, or a merge event on a watched PR): at once, without being asked, run branch-cleanup on the PC (merged branch deleted, local default branch updated) and pr-issue-sync.
- PR comments and review replies: team-docs.
