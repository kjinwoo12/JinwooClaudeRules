---
name: "task-split"
description: "A written plan has two or more independent implementation parts, before touching code: the thread writes the contract, up to 4 implementation subagents and 1 test subagent work in parallel on the same checkout, the thread gathers, tests once, opens one PR"
---

# Split one task across subagents

The thread splits one task, workers build the parts in parallel, the thread puts them together. One task still ends in one PR; work for several PRs goes to issue-split. Unity rules: unity-work.

## When
Check once, right after the plan is written (writing-plans) and before any code. Split only when two or more implementation parts each pass all four:
- Independent: no part needs another part's result to start.
- Own files: no file is edited by two parts. Give each part a folder or module where the folders divide cleanly, else a file list.
- Contract settled: everything where parts meet (interfaces, names, signatures, SO fields, cue definitions) can be written down before work starts.
- Real work: a part of a few lines costs more to hand over than to do.

Fewer than two pass: no split. A part that fails stays with the thread.

Where to cut:
- By feature first (three boss patterns: three parts).
- Never one feature by layer (model, view, controller): the parts guess each other's interfaces.
- One exception: logic and visual of one feature (unity-work Structure) may be two parts when the cue definitions are the whole contract. The visual needs anything else from the logic (an injected reference, a prefab link), or the logic waits for a visual to finish: don't split.

More than 4 implementation parts: too big for one PR. Don't split here; issue-split.

Never split:
- Work tuned by repeated Play checks (workers can't run Unity).
- Work whose open design values block the contract.
- Read-only investigation: one read-only subagent, no split.

## The thread keeps
No worker edits these; the thread does them itself:
- The contract files.
- Shared wiring: DI scope registration, registries, factories, asmdef, project settings, tag settings. Parts built in parallel all end in one of these, so a worker edit collides or nobody registers.
- Anything the editor creates or owns: scenes, prefabs, SO assets, `.meta`.
- PlayMode tests: they depend on scene wiring and frame timing a worker can't see.

## Steps
1. Explore. Broad exploration belongs to planning. Here only what the plan left out (references, file boundaries), by a read-only subagent so the thread's context stays small. Workers read their own files themselves; never pass them an exploration summary.
2. Contract. Write it into the repo before launch:
   - Interfaces and shared types.
   - A stub of every class a test will construct: file path, constructor, public signatures, bodies throwing `NotImplementedException`. Without it the test worker's code can't compile against the implementation.
   - SO fields (missing design values: unity-work).
   - Cue definitions, each with: tag name, registered; one-shot or a Start/End pair; meaning, type, unit, and coordinate space of each value; how instances are told apart when several of one tag are live.
3. Baseline. Save `git status --porcelain` before launch: the folder may already hold changes that are not a worker's (unity-editor-noise).
4. Launch every worker in one message so they run in parallel: one implementation worker per part (2 to 4) and one test worker. Fresh subagents, never forks: a fork carries the whole plan, which the test worker must not see.
5. Gather.
   - `git status --porcelain` against the baseline. Every changed path must sit in exactly one worker's scope and in that worker's report; revert anything else (tracked: `git checkout -- <path>`; new: delete).
   - Read each worker's diff against the contract. Make the out-of-scope changes workers reported, if they are right.
   - Do the thread's own files: wiring, assets, scenes, PlayMode tests.
   - Unity repo: refresh the project once, check every new file and folder has a `.meta`, compile.
   - Run the tests once per platform (unity-work Checks and tests). On a failure decide against the contract which side is wrong, implementation or test, and fix that side; re-run.
   - A small error (compile, signature): fix it yourself. A part broken in structure: revert that part's files and relaunch that one worker.
6. Normal flow from here: deslop, commit, pr-review, one PR (github-pr). The plan's per-task commits become this one point; workers' temporary design values go in the PR's open-design-values section.

## Worker brief
A worker knows nothing of the conversation; the brief is all it has. Every brief holds:
- Goal of the part and its done criteria: the plan's tasks for this part, copied in.
- Scope: the folders or files it may create or edit, nothing else.
- The contract files to read.
- Rule files to read first, by path: ponytail, and unity-work in a Unity repo.
- Limits:
  - No moving, renaming, or deleting an existing file: a moved script loses its `.meta` GUID and breaks scene and prefab references.
  - No change to a contract signature.
  - No git commit, checkout, switch, or branch.
  - No Unity launch or MCP call: one editor instance per project, and the thread runs it.
- A change needed outside the scope or to the contract: don't make it, report it.
- Return: files created and edited, how each done criterion is met (file and line), design values left temporary, out-of-scope changes needed.

Test worker, on top of that:
- Gets only the contract and the done criteria, never the implementation briefs or the plan: its tests check the requirement, not mirror the implementation.
- Writes EditMode tests only, in the test folder: rule checks and raised cues.
