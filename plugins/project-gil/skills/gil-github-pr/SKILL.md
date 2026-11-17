---
name: "gil-github-pr"
description: "Project Gil team repo: rules for commits, pushes, and PRs (new branch: gil-github-newbranch; issues: github-issue-check; issue cards: gil-issue-board-sync)"
---

# GitHub work rules (Project Gil)

## Tools
- GitHub work via API (MCP, else REST/GraphQL, gh). Chrome only when the API cannot do it at all.
- Anything teammates can see: no claude.ai link, except the auto-added commit lines below. A "Generated with Claude Code" footer is fine.

## Branch and git
- New branch: follow gil-github-newbranch (cleanup first, issue, name, base).
- Remote ahead: pull, never rebase.
- png and jpg are LFS: push them from the PC (Remote Control).
- Leave auto-added Co-Authored-By and Claude-Session lines as they are.

## Commits
- Write the commit message yourself and commit, code and docs alike. Never ask the user to confirm it.
- Commit messages, PR titles and bodies: Korean, ~다 체. Plain words that say what happens.
- Do not report commit hashes.

## PR
- Before the PR: check related repo docs are current and fix stale parts in the same PR.
- Before the PR: clean AI slop from the diff against develop: abnormal defensive checks or try/catch on trusted paths, casts only to get past a type error, deep nesting that early returns would flatten, patterns inconsistent with the file. Keep behavior, minimal edits. Comments are left to repo lint.
- Before the PR: actually run local /code-review and fill 「AI 리뷰」 with its result.
- Before the PR: run `node .github/scripts/repo-lint.js` and fix every violation. The PR's 「저장소 규칙 검사」 checks must pass.
- Review finds a bug: do not open the PR. Report each bug to the user (what, where, one-line evidence) and wait for their decision (fix first, or open as is).
- Set milestone, assignee, and label on the PR too.
- Issue that needs 총괄 확인: write `Refs #N` instead of `Closes`.
- No claude.ai link in the body (including the first-line Requested by / project thread lines). After creating the PR, read the body back and fix the footer if it became a claude.ai link.
- Right after creating the PR: run gil-issue-board-sync 「PR flow」 for its linked issues, without being asked.
- Doc-only PR: self-merge (except `.github/workflows/`, `.github/CODEOWNERS`).
- Delete your own merged branch without asking.
- Each time a PR merges (self-merge, or a merge event on a watched PR): at once, without being asked, run gil-branch-cleanup on the PC (merged branch deleted, local develop updated) and gil-issue-board-sync 「PR flow」 for its linked issues.
- PR comments and review replies: gil-team-docs.