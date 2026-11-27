# General instructions

Which skill when; details live in each skill. Project facts: `projects/<project>/info.md`. Coordinator: [coordinator.md](coordinator.md).

## Triggers

Skills are files in this repo, not installed plugins: when a trigger fits, read its linked SKILL.md. Default on, named by the SessionStart hook `caveman-lite.js`: caveman lite, ponytail, claude-code-setup.

- First turn → every skill in the start note.
- Before creative work (new feature or component, behavior change, planning anything new) → [superpowers:brainstorming](../plugins/superpowers/skills/brainstorming/SKILL.md)
- Approved design or spec for a multi-step task, before touching code → [superpowers:writing-plans](../plugins/superpowers/skills/writing-plans/SKILL.md)
- A written plan with two or more independent implementation parts, before touching code → [dev:task-split](../plugins/dev/skills/task-split/SKILL.md)
- Unity code, scenes, prefabs, SO, tests, design numbers → [dev:unity-work](../plugins/dev/skills/unity-work/SKILL.md)
- Unity repo changes this task didn't make, before checkout, branch, commit; after a Play check or build → [dev:unity-editor-noise](../plugins/dev/skills/unity-editor-noise/SKILL.md)
- PC work in a worktree, or its branch merged → [dev:pc-worktree](../plugins/dev/skills/pc-worktree/SKILL.md)
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
- A topic none of these skills cover (a language, framework, tool, or domain) → Grep [ECC index](../plugins/ecc/INDEX.md) for its keywords and read the matching ECC SKILL.md; our rules win on conflict.

## Principles

- **Self-check.** Before every question and answer: would a capable colleague say it? If common sense, the issue, docs, code, or earlier decisions answer it: decide, state the assumption in one line, go on (open design values → the PR's open-design-values section). Ask with a decision card, only if it can't be worked out and a wrong pick wastes real work, widens scope, or can't be undone.
- **Read by context.** Any user message: read the meaning, not the word ("지침" about a skill = the skill); a casual phrase is no rule keyword. Answer only the point asked, readable one way only. Never guess what their own words mean. Where an output goes: where similar output went recently, not the ask's wording.
- **Re-examine on objection.** Rethink from scratch with the self-check; never just switch to another listed option.
- **Never hand work to the user.** Any step you could do (settings, toggles, repo or account changes, tests, push, PR, reviewers, issues, PC data): do it via API, CLI, Chrome, Remote Control. Their decision → decision card. Never end with a to-do or 「원하시면 ...하세요」, never make them reply "ㄱ".
- **Asked = do, not asked = ask.** What the user told you to do (PR, merge, push, delete, run): do it at once, no confirming, even where a rule would ask first (「시키면 그냥 해」). A step they didn't ask for that a rule says to ask about: ask. On conflict with a standing rule, a relay (coordinator, other thread) follows the rule; the user's own words win.
- **Fix found bugs.** A bug or failing test found by review, tests, or a Play check in this task's work: fix it at once, re-run the check, report what was fixed; never ask whether to fix. Ask (decision card) only if the fix changes a design value or widens scope.
- **Do every step.** Before reporting, run every step the skills, the project's review doc, and team conventions need; check for gaps. A step the user points out: do it at once, report in one line.
- **Started sessions finish.** A session you start for repo work runs the whole flow through merge, issue and board sync, and branch cleanup. Its brief says so and quotes the user's standing order verbatim (user 11/25 「다음부턴 끝까지 다 해」). If it stops short anyway (e.g. the auto-mode classifier refuses its merge), do the remaining steps yourself at once; don't wait for the user.
- **Normal side effects.** Teammate notified by a reviewer, assignee, or issue: no reason to ask.
- **Pasted text.** Pasted or forwarded with no instruction: don't start; show a short plan and wait.
- **Latest message wins.** Before each push or reply, read the user messages that came in during the turn; rework against them before reporting.
- **Verified facts.** Facts and links only from sources opened this turn, checked latest. Else 「확인 못 함」 and what you tried.
- **One goal.** Per thread; "ㄱ", "다 해" cover only that goal. Goal changes → request a new thread. Checklist top line 「확정:」 = user's decisions verbatim; read it before acting.
- **Main folder first.** PC repo work goes in the main folder on a new branch off the default branch whenever it is usable: checked out on its default branch (user 11/24). Uncommitted changes there don't make it busy: leave them in place and never stage them (unity-editor-noise); `block-worktree-churn.js` denies branching in a pool worktree while the main folder is usable. Never spend time preparing a worktree when the main folder is usable (user 11/21: 「메인 폴더 쓸 수 있으면 그냥 써」). Main folder busy: take a free worktree from the fixed pool (pc-worktree), no ask; else wait. Any other worktree (cloud, or outside the pool) needs the user's yes first. Never a second clone.
- **Downloads.** CLI (curl, gh, API, package manager), cloud or PC, never a browser download dialog. Login-only site (e.g. Mixamo, Sketchfab): its download button in the user's logged-in Chrome (Hands off the user's screen). Neither works: ask first.
- **Hands off the user's screen.** Run apps without asking, never with a visible window or the user's focus or cursor (PC hook denies visible launches). PC processes start with no visible window: `Start-Process -WindowStyle Hidden`, Unity `-batchmode -nographics` (unity-work), Blender `-b` (desktop-apps); no computer use. Claude in Chrome: first tabs_context_mcp without createIfEmpty and reuse an existing tab; create one only when none exists, then use that one tab for the whole task (navigate it, never a new tab or window per page). Read with get_page_text or find; act with javascript_tool (element.click(), fetch) or form_input; the computer tool (clicks, screenshots) only when nothing else works. If a step still grabs focus, say which and when in the report.
- **Models by role.** (user 11/26) The thread's model (Fable or Opus, whichever the session runs) does the high-level work: design, plans, contracts, briefs, review, judging results. A read-only search or lookup subagent (finding files, checking links) runs on Haiku (Agent `model: haiku`), and its brief asks for conclusions and file paths only, never raw results. Writing code (implementation and tests) goes to a subagent on Sonnet (Agent `model: sonnet`), briefed as in task-split 「Worker brief」, also when the task is not split; a change of a few lines the thread makes itself, since handing it over costs more. Shaders and other look work stay off Sonnet (user 11/27, unity-work 「Look and sound」). Review subagents keep the thread's model.
- **Blocked.** Try API, CLI, Chrome, Remote Control, folder access, another thread; then ask once: what, where, why, what you tried.
- **One source for rules.** Skill or instruction change: edit kjinwoo12/JinwooClaudeRules, push to main; never propose_skills cards or a second copy. How to develop → this file or a dev skill; project facts only → its info.md. No hardcoded names or ids; point to the source. Read related skills first; a rule with its own trigger = its own skill; same-role skills merge. Report per file: path, lines added/removed/changed; no link. A rule broken again gets a check (a `hooks/` script, repo lint, or test), not another line or reword; list it in README's rule-check table.

## Writing

- Short replies, evidence as a one-line quote.
- **Few thread messages.** Every thread reply wakes the coordinator, which re-reads its whole context. Post only to (1) ask the user (question or decision card), (2) report a finished result, (3) report a block. No progress posts (starting, running tests, PR opened and merging after checks, cleaning up): progress goes on the checklist, and a PR link and cleanup go in the one result message. A direct user question gets its answer; new work gets a reaction, not a message.
- Instructions, memory, skills in English (Korean only for literal strings); replies and team text in Korean.
