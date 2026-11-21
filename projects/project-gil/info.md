# Project Gil: project info

## GitHub
- Team repo: ProjectGil-RPG/ProjectGilRpgClient (Unity). Default branch develop, git flow per its CONTRIBUTING.md. Issue link: `https://github.com/ProjectGil-RPG/ProjectGilRpgClient/issues/<n>`.
- PC clone remotes: origin = fork kjinwoo12/ProjectGilRpgClient, upstream = the org repo.
- Branch name: `feature/<issue-number>-<english-lowercase-kebab>`; other kinds (release, hotfix) per CONTRIBUTING git flow.
- Board: the ProjectGil-RPG org project. Statuses: Backlog, Ready, In progress, In review, 총괄 확인 (sign-off), Done.
- Milestones: M0 to M5.
- Repo lint: `node .github/scripts/repo-lint.js` (also covers code comments: only CONTRIBUTING.md 「코드 주석」 exceptions); PR check 「저장소 규칙 검사」.
- PR template: AI review section 「AI 리뷰」; open design values 「기획 확인 필요」; work left 「남은 일」.
- 총괄 확인 (sign-off): only an issue whose body or a teammate's comment asks for the 총괄's check, or a 게이트 issue; then `Refs #N`. Open design values go in the PR's 「기획 확인 필요」 and the PR still uses `Closes #N`; never send an issue there on your own judgment (e.g. 「보이는 모양 확인」).
- Self-merge: doc-only PRs, except `.github/workflows/` and `.github/CODEOWNERS`.
- 2026-11-16 to 2026-11-22 (reviewer away, user 「이번주 셀프머지」): self-merge every PR once its checks pass, no review wait or ask. From 2026-11-23, the line above again.
- LFS: png and jpg.
- Unity code-rule tests: EditMode CodeRules (no hardcoding, no runtime bootstrap). Play check: docs/PLAY_CHECK.md. PR review steps: docs/REVIEW.md.

## PC
- Work folder: F:\git\ProjectGilOrganization (also for non-Unity work). Unity repo: F:\git\ProjectGilOrganization\ProjectGilRpgClient.
- Worktree pool (user 11/21, slow per-issue worktrees): `F:\git\ProjectGilOrganization\ProjectGilRpgClient-wt1`, `-wt2`, `-wt3`; with the main folder, up to 4 jobs at once.
- Not this project, never touch unless the user names it: F:\git\GilSample (personal portfolio). Scene names in asks (e.g. 쇼케이스) mean the team repo's scenes.
- Permissions: that file and `ProjectGilRpgClient\.claude\settings.local.json` allow `Bash(git *)`, `PowerShell(git *)`, `Bash(gh *)`, `PowerShell(gh *)` (user 11/20: all git allowed, no deny); allow rules resolve before the auto-mode classifier.
- Hooks (rule-check table: rules repo README): `F:\git\ProjectGilOrganization\.claude\settings.local.json` runs the rules clone's `hooks/` scripts (SessionStart pull; PreToolUse on Bash and PowerShell: `block-signoff-status.js` denies moving a board card to 총괄 확인, `block-visible-windows.js` denies launching a visible Unity, Blender, Chrome, or Start-Process window, `block-worktree-churn.js` denies removing a worktree or adding one outside the pool).
- Shutdown: run `F:\git\ProjectGilOrganization\shutdown.bat`, never raw `shutdown`; only when the user orders it for that ask, never carried over.

## Sources
- Meeting minutes: the latest file in the project files meeting/ folder; the user-edited Discord version wins.
- Game spec (기획서): see the team repo's CLAUDE.md. Planning and design content (specs, plans, art or task lists) goes to Google Docs in that Drive folder, never into the repo (no repo doc, issue, or PR for it).
- Art work needed: update the Google Doc 「프로젝트길_필요한_아트_목록」 in that Drive folder; extend it, never a new doc.
