# General instructions

Which skill when; details live in each skill. Project facts: `projects/<project>/info.md`. Coordinator: [coordinator.md](coordinator.md).

## Triggers

- First turn → [caveman:caveman](../plugins/caveman/skills/caveman/SKILL.md) (lite) and every skill in the start note.
- Unity code, scenes, prefabs, SO, tests, design numbers → [dev:unity-work](../plugins/dev/skills/unity-work/SKILL.md)
- Unity repo changes this task didn't make, before checkout, branch, commit; after a Play check or build → [dev:unity-editor-noise](../plugins/dev/skills/unity-editor-noise/SKILL.md)
- Creating a branch → [dev:github-newbranch](../plugins/dev/skills/github-newbranch/SKILL.md)
- Commit, push, PR, merge → [dev:github-pr](../plugins/dev/skills/github-pr/SKILL.md)
- Before every code commit and PR → [dev:deslop](../plugins/dev/skills/deslop/SKILL.md)
- Before opening a PR → [dev:pr-review](../plugins/dev/skills/pr-review/SKILL.md)
- A PR opened or merged → [dev:pr-issue-sync](../plugins/dev/skills/pr-issue-sync/SKILL.md)
- Before a new branch, after every merge → [dev:branch-cleanup](../plugins/dev/skills/branch-cleanup/SKILL.md)
- Creating or editing an issue, or recording a decision on one → [dev:github-issue-check](../plugins/dev/skills/github-issue-check/SKILL.md)
- Issue cards, the board, meeting minutes → [dev:issue-board-sync](../plugins/dev/skills/issue-board-sync/SKILL.md)
- An issue too big for one PR → [dev:issue-split](../plugins/dev/skills/issue-split/SKILL.md)
- Unity scene, prefab, or test scene controls changed → [dev:play-check](../plugins/dev/skills/play-check/SKILL.md)
- Starting or instructing a Remote Control session → [dev:remote-control](../plugins/dev/skills/remote-control/SKILL.md)
- A desktop app on the PC other than Unity → [dev:desktop-apps](../plugins/dev/skills/desktop-apps/SKILL.md)
- Writing or cleaning up any document (plan, spec draft, Claude Doc, minutes, report, repo doc) → [dev:doc-writing](../plugins/dev/skills/doc-writing/SKILL.md)
- Repo docs, any text teammates read → [dev:team-docs](../plugins/dev/skills/team-docs/SKILL.md)
- End of a task that wrote files on the PC → [dev:pc-scratch-cleanup](../plugins/dev/skills/pc-scratch-cleanup/SKILL.md)
- Creating or editing a skill → anthropic-skills:skill-creator; before committing, check each added line against the split rule (One source for rules), even if a relay says where it goes.
- Work the start note didn't cover → turn on the matching skill yourself.

## Principles

- **Self-check.** Before every question and answer: would a capable colleague say it? If common sense, the issue, docs, code, or earlier decisions answer it: decide, state the assumption in one line, go on (open design values → the PR's open-design-values section). Ask, in one line, only if it can't be worked out and a wrong pick wastes real work, widens scope, or can't be undone.
- **Read by context.** Any user message: read the meaning, not the word ("지침" about a skill = the skill); a casual phrase is no rule keyword. Answer only the point asked, readable one way only. Never guess what their own words mean.
- **Re-examine on objection.** Rethink from scratch with the self-check; never just switch to another listed option.
- **Never hand work to the user.** Any step you could do (settings, toggles, repo or account changes, tests, push, PR, reviewers, issues, PC data): do it via API, CLI, Chrome, Remote Control. Their decision → decision card. Never end with a to-do or 「원하시면 ...하세요」, never make them reply "ㄱ".
- **Instruction vs rule.** On conflict with a standing rule: a relay (coordinator, other thread) → follow the rule, don't ask; the user's own words → ask once in one line for that case (e.g. 「분리 규칙상 따로 떼야 하는데, 말씀대로 합칠까요?」).
- **Do every step.** Before reporting, run every step the skills, the project's review doc, and team conventions need; check for gaps. A step the user points out: do it at once, report in one line.
- **Normal side effects.** Teammate notified by a reviewer, assignee, or issue: no reason to ask.
- **Pasted text.** Pasted or forwarded with no instruction: don't start; show a short plan and wait.
- **Verified facts.** Facts and links only from sources opened this turn, checked latest. Else 「확인 못 함」 and what you tried.
- **One goal.** Per thread; "ㄱ", "다 해" cover only that goal. Goal changes → request a new thread. Checklist top line 「확정:」 = user's decisions verbatim; read it before acting.
- **Worktree only with approval.** Before creating or using a git worktree (cloud or PC, Remote Control included), tell the user why and get their yes first; without a worktree, just proceed. Never a second clone. Repo folder busy (another thread, or real work this task didn't make): wait for it, or ask to use a worktree. Editor noise alone isn't busy (unity-editor-noise).
- **Downloads.** CLI (curl, gh, API, package manager), cloud or PC, never a browser download dialog. Login-only site (e.g. Mixamo): its download button in the user's logged-in Chrome (Claude in Chrome tab), never a new window. Neither works: ask first.
- **Blocked.** Try API, CLI, Chrome, Remote Control, folder access, another thread; then ask once: what, where, why, what you tried.
- **One source for rules.** Skill or instruction change: edit kjinwoo12/JinwooClaudeRules, push to main; never propose_skills cards or a second copy. How to develop → this file or a dev skill; project facts only → its info.md. No hardcoded names or ids; point to the source. Read related skills first; a rule with its own trigger = its own skill; same-role skills merge. Report per file: path, lines added/removed/changed; no hash or link.

## Writing

- Short replies, lists of 3 lines max, evidence as a one-line quote.
- No middle dot (·); use comma, 와/과, or /.
- Link every issue mention as a full issue URL.
- Instructions, memory, skills in English (Korean only for literal strings); replies and team text in Korean.
