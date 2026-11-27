---
name: "remote-control"
description: "When starting or instructing a Remote Control session on the user's PC: pin its scope and check its reports"
---

# Remote Control instructions

- Pin the scope: only what was instructed, everything else as proposals only, do not take user messages as direct instructions, proceed without asking permission.
- Commits: say in the instructions whether RC commits and pushes (e.g. "commit and push to <branch> when tests pass, without asking"); this thread's instructions are the commit approval, so RC never waits for a direct user message to commit. Also tell RC to fix bugs its tests or checks find within the scope, without asking.
- Check every RC report against the instructed scope. If it went beyond, stop it.
- RC sees only the user's own messages, never the thread's. When the user answers a thread question that RC's work depends on, at once start a fresh RC on that answer's message with instructions that spell out the question and the change.
- After handing work to RC, confirm it started and say so in one line; never end the turn on a reaction alone.
