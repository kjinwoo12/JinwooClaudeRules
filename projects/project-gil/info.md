# Project Gil: project info

## GitHub
- Team repo: ProjectGil-RPG/ProjectGilRpgClient (Unity). Default branch develop, git flow per its CONTRIBUTING.md. Issue link: `https://github.com/ProjectGil-RPG/ProjectGilRpgClient/issues/<n>`.
- PC clone remotes: origin = fork kjinwoo12/ProjectGilRpgClient, upstream = the org repo.
- Branch name: `feature/<issue-number>-<english-lowercase-kebab>`; other kinds (release, hotfix) per CONTRIBUTING git flow.
- Board: the ProjectGil-RPG org project. Statuses: Backlog, Ready, In progress, In review, 총괄 확인 (sign-off), Done.
- Milestones: M0 to M5.
- Repo lint: `node .github/scripts/repo-lint.js` (also covers code comments: only CONTRIBUTING.md 「코드 주석」 exceptions; code structure: no Find, no visual types or fixed GetComponent inside the logic assembly Assets/Gil/Scripts/Logic); PR check 「저장소 규칙 검사」.
- Actions: the org is on GitHub Free, 2,000 minutes a month, every product budget $0 with usage stopped (no charge). Minutes used up: every workflow fails to start until the 1st of next month (usage: `gh api orgs/ProjectGil-RPG/settings/billing/usage`). What to do by hand meanwhile: docs/REVIEW.md 「Actions가 멈췄을 때」.
- PR template: AI review section 「AI 리뷰」 (not-fixed list 「고치지 않은 것과 이유」). It has no open-design-values or work-left section: add 「기획서」 (spec link, dev:feature-flow), 「기획 확인 필요」 and 「남은 일」 headings to the PR body.
- 총괄 확인 (sign-off): only an issue whose body or a teammate's comment asks for the 총괄's check, or a 게이트 issue; then `Refs #N`. Open design values go in the PR's 「기획 확인 필요」 and the PR still uses `Closes #N`; never send an issue there on your own judgment.
- Merge policy (everyone on the team): no human code review per PR. Every PR self-merges once its AI review (pr-review) and required tests (unity-work) pass. Feature PRs reach develop with a merge commit. main holds only release points: release/* and hotfix/* squash-merge into main (one release = one commit); the main → develop sync PR uses a merge commit. Human review happens only per release, on the build (play and result), never on code; a rejected release does not reach main. Team-side steps: docs/REVIEW.md, docs/RELEASE.md.
- LFS: images, models, audio, video, fonts, archives (the team repo's `.gitattributes` is the list).
- Unity code-rule tests: EditMode CodeRules (no hardcoding, no runtime bootstrap). PlayMode runs that load BossHall: without `-nographics` (BossHall_Level's realtime reflection probe crashes Unity under it). Play check: docs/PLAY_CHECK.md. PR review steps: docs/REVIEW.md.

## PC
- Work folder: F:\git\ProjectGilOrganization (also for non-Unity work). Unity repo: F:\git\ProjectGilOrganization\ProjectGilRpgClient.
- Worktree pool: `F:\git\ProjectGilOrganization\ProjectGilRpgClient-wt1`, `-wt2`, `-wt3`; with the main folder, up to 4 jobs at once.
- AudioGen folder (audio-gen): F:\git\audiocraft.
- Not this project, never touch unless the user names it: F:\git\GilSample (personal portfolio). Scene names in asks (e.g. 쇼케이스) mean the team repo's scenes.
- Permissions: `F:\git\ProjectGilOrganization\.claude\settings.local.json` and `ProjectGilRpgClient\.claude\settings.local.json` allow `Bash(git *)`, `PowerShell(git *)`, `Bash(gh *)`, `PowerShell(gh *)` (all git allowed, no deny). Allow rules do not stop the auto-mode classifier.
- Deletes: deleting files or folders inside the work folder (Unity repo, worktrees) with rm, Remove-Item, del, or git rm is approved by the user; do it without asking. Outside the work folder: defaults. The classifier's own allow list is `autoMode.allow` in the user's `~\.claude\settings.json` only (not project settings); Claude may not edit it.
- Hooks: `F:\git\ProjectGilOrganization\.claude\settings.local.json` wires the rules clone's `hooks/` scripts (what each checks: rules repo README table). SessionStart: pull, then `caveman-lite.js`. PreToolUse (Bash, PowerShell): `block-signoff-status.js`, `block-worktree-churn.js`, `block-visible-windows.js`, `allow-workfolder-deletes.js`, `check-git.js`, `check-github-text.js`. PreToolUse (SendUserFile): `block-attach-audio.js`. PostToolUse: `after-pr.js`. PermissionDenied and PostToolBatch: `worktree-fallback.js`. Stop: `worktree-fallback.js`, `pc-scratch-stop.js`, `check-reply.js`.
- Shutdown: run `F:\git\ProjectGilOrganization\shutdown.bat`, never raw `shutdown`; only when the user orders it for that ask, never carried over.

## Sources
- Meeting minutes: the latest file in the project files meeting/ folder; the user-edited Discord version wins.
- Game spec (기획서): see the team repo's CLAUDE.md. Planning and design content (specs, plans, art or task lists) goes to Google Docs in that Drive folder, never into the repo (no repo doc, issue, or PR for it).
- Art and sound work needed: update the Google Sheet 「프로젝트길_필요한_아트_목록」 in that Drive folder. Tab 「목록」, one row per item: 분류, 대상, 만들 것, 지금, 관련 이슈, 우선순위, 담당, 상태 (없음, 임시, 완료); tab 「안내」 holds the art direction. Extend it, never a new sheet or doc.
