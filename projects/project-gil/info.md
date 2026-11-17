# Project Gil: project info

Only this project's facts. How to work: instructions/general.md and the dev plugin skills.

## GitHub
- Team repo: ProjectGil-RPG/ProjectGilRpgClient (Unity). Default branch develop, git flow per its CONTRIBUTING.md. Issue link: `https://github.com/ProjectGil-RPG/ProjectGilRpgClient/issues/<n>`.
- PC clone remotes: origin = fork kjinwoo12/ProjectGilRpgClient, upstream = the org repo.
- Branch name: `feature/<issue-number>-<english-lowercase-kebab>`; other kinds (release, hotfix) per CONTRIBUTING git flow.
- Board: the ProjectGil-RPG org project. Statuses: Backlog, Ready, In progress, In review, 총괄 확인 (sign-off), Done.
- Milestones: M0 to M5.
- Repo lint: `node .github/scripts/repo-lint.js` (also covers code comments: only CONTRIBUTING.md 「코드 주석」 exceptions); PR check 「저장소 규칙 검사」.
- PR template: AI review section 「AI 리뷰」; open design values 「기획 확인 필요」; work left 「남은 일」.
- Issue needing 총괄 확인 after merge: `Refs #N`.
- Self-merge: doc-only PRs, except `.github/workflows/` and `.github/CODEOWNERS`.
- LFS: png and jpg.
- Unity code-rule tests: EditMode CodeRules (no hardcoding, no runtime bootstrap). Play check: docs/PLAY_CHECK.md. PR review steps: docs/REVIEW.md.

## PC
- Work folder: F:\git\ProjectGilOrganization (also for non-Unity work). Unity repo: F:\git\ProjectGilOrganization\ProjectGilRpgClient.
- Not this project, never touch: F:\git\GilSample.

## Sources
- Meeting minutes: the latest file in the project files meeting/ folder; the user-edited Discord version wins.
- Game spec (기획서): see the team repo's CLAUDE.md.
