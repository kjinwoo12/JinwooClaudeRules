# Project Gil: project info

## GitHub
- Team repo: ProjectGil-RPG/ProjectGilRpgClient (Unity). Default branch develop, git flow per its CONTRIBUTING.md. Issue link: `https://github.com/ProjectGil-RPG/ProjectGilRpgClient/issues/<n>`.
- PC clone remotes: origin = fork kjinwoo12/ProjectGilRpgClient, upstream = the org repo.
- Branch name: `feature/<issue-number>-<english-lowercase-kebab>`; other kinds (release, hotfix) per CONTRIBUTING git flow.
- Board: the ProjectGil-RPG org project. Statuses: Backlog, Ready, In progress, In review, 총괄 확인 (sign-off), Done.
- Milestones: M0 to M5.
- Repo lint: `node .github/scripts/repo-lint.js` (also covers code comments: only CONTRIBUTING.md 「코드 주석」 exceptions; from #310 code structure: no Find, no visual types or fixed GetComponent inside the logic assembly Assets/Gil/Scripts/Logic); PR check 「저장소 규칙 검사」.
- PR template: AI review section 「AI 리뷰」; open design values 「기획 확인 필요」; work left 「남은 일」.
- 총괄 확인 (sign-off): only an issue whose body or a teammate's comment asks for the 총괄's check, or a 게이트 issue; then `Refs #N`. Open design values go in the PR's 「기획 확인 필요」 and the PR still uses `Closes #N`; never send an issue there on your own judgment (e.g. 「보이는 모양 확인」).
- Merge policy (user 11/23, everyone on the team): no human code review per PR. Every PR self-merges once its AI review (pr-review) and required tests (unity-work) pass. Feature PRs squash-merge into develop (one PR = one revertable commit). main holds only release points: release/* and hotfix/* reach main with a merge commit, and so does the main → develop sync PR. Human review happens only per release, on the build (play and result), never on code; a rejected release does not reach main. Team-side steps: docs/REVIEW.md, docs/RELEASE.md.
- LFS: png and jpg.
- Unity code-rule tests: EditMode CodeRules (no hardcoding, no runtime bootstrap). PlayMode runs that load BossHall: without `-nographics` (BossHall_Level's realtime reflection probe crashes Unity under it, 11/21). Play check: docs/PLAY_CHECK.md. PR review steps: docs/REVIEW.md.

## PC
- Work folder: F:\git\ProjectGilOrganization (also for non-Unity work). Unity repo: F:\git\ProjectGilOrganization\ProjectGilRpgClient.
- Worktree pool (user 11/21, slow per-issue worktrees): `F:\git\ProjectGilOrganization\ProjectGilRpgClient-wt1`, `-wt2`, `-wt3`; with the main folder, up to 4 jobs at once.
- Not this project, never touch unless the user names it: F:\git\GilSample (personal portfolio). Scene names in asks (e.g. 쇼케이스) mean the team repo's scenes.
- Permissions: that file and `ProjectGilRpgClient\.claude\settings.local.json` allow `Bash(git *)`, `PowerShell(git *)`, `Bash(gh *)`, `PowerShell(gh *)` (user 11/20: all git allowed, no deny). Allow rules do not stop the auto-mode classifier: 11/22 `git rm` of old repo assets was refused as destructive.
- Deletes (user 11/22 「삭제 권한 검사 ... 허용해놔」): deleting files or folders inside the work folder (Unity repo, worktrees) with rm, Remove-Item, del, or git rm is approved by the user; do it without asking. Outside the work folder: defaults. The classifier's own allow list is `autoMode.allow` in the user's `~\.claude\settings.json` only (not project settings); Claude may not edit it (refused as 「Undermining Oversight」).
- Hooks (rule-check table: rules repo README): `F:\git\ProjectGilOrganization\.claude\settings.local.json` runs the rules clone's `hooks/` scripts (SessionStart: pull, then `caveman-lite.js`; PreToolUse on Bash and PowerShell: `block-signoff-status.js` denies moving a board card to 총괄 확인, `block-visible-windows.js` denies launching a visible Unity, Blender, Chrome, or Start-Process window, `block-worktree-churn.js` denies removing a worktree or adding one outside the pool, `check-git.js`, `check-github-text.js`; PostToolUse: `after-pr.js`; Stop: `pc-scratch-stop.js`).
- Subagents: `F:\git\ProjectGilOrganization\.claude\agents` is a junction to the rules clone's `.claude/agents`, so sessions in the work folder load them.
- Shutdown: run `F:\git\ProjectGilOrganization\shutdown.bat`, never raw `shutdown`; only when the user orders it for that ask, never carried over.

## Sources
- Meeting minutes: the latest file in the project files meeting/ folder; the user-edited Discord version wins.
- Game spec (기획서): see the team repo's CLAUDE.md. Planning and design content (specs, plans, art or task lists) goes to Google Docs in that Drive folder, never into the repo (no repo doc, issue, or PR for it).
- Art work needed: update the Google Doc 「프로젝트길_필요한_아트_목록」 in that Drive folder; extend it, never a new doc.
