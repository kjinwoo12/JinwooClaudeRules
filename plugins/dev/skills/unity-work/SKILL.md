---
name: "unity-work"
description: "Unity code, scenes, prefabs, SO, tests, design work (Unity MCP, batchmode, test timing, no hardcoding)"
---

# Unity work rules

## Where and how
- Write client code on the PC local repo through Remote Control (RC) from the start (remote-control).
- No PC access yet (e.g. waiting for the user's line in this thread): read and plan only. Never write client code in the cloud to carry over.
- Use Unity MCP on the open editor. If MCP fails, batchmode `-batchmode -nographics -quit -logFile <path>` with `-projectPath <that folder>`. No computer use.
- Start Unity.exe hidden (`Start-Process -WindowStyle Hidden`, general Hands off the user's screen) with `-batchmode -nographics`; a run that needs rendering (play capture) drops only `-nographics`. Few launches: one run per test platform per feature.
- Never launch the GUI editor (a PC hook denies it). A step neither batchmode nor MCP on the open editor can do: report it.

## Checks and tests
- Per edit: compile and console only.
- While working: run only the tests related to the change (`-testFilter`), before commit.
- PlayMode runs on the PC are silent (user heard test sounds, 11/21): before the run set that folder's `ProjectSettings/AudioManager.asset` `m_DisableAudio: 1` (open editor: `EditorUtility.audioMasterMute = true`), revert after.
- Before commit and merge: the full EditMode suite, plus PlayMode tests related to the change only; every test run must pass (user 11/21: PlayMode is slow).
- Full PlayMode suite: only before a release (a release branch per git flow, project info), never per PR. Never merge past a failure called "known" or "pre-existing": fix it, or stop and report.
- Change touches no code, scene, prefab, SO, or other asset (docs, rules, workflows only): no Unity tests.
- Never ask the user to run tests.

## Code
- No hardcoding: tunable values in SerializeField or SO, other fixed values as named constants. No magic numbers.
- No runtime bootstrap.
- Structure (team repo CONTRIBUTING 「코드 구조」, user 11/24): no hard flags: a field must not switch one class between behaviors (e.g. player vs boss); split by subclass or composition, SOLID. Data traits and option bools are fine. Logic and visual fully apart: new or cleaned logic goes into the logic assembly (state and rules only), which tells visuals what happened by GameplayTag cues; visuals listen and never change logic state. Fixed dependencies via VContainer injection or inspector, never Find or another object's GetComponent; runtime targets (hit, collision) via TryGetComponent. A refactor PR passes the existing PlayMode tests unedited.
- Code-rule tests that enforce these (project info): fix the code, never loosen the test.
- No comments; repo lint blocks all but its allowed exceptions. When code seems to need an explanation, rename, extract, or add a test instead. Never use the `외부(...)` form for our own code's behavior.

## Planning and design
- Design: settle scope, numbers, and boundaries from the issue, the spec, the code, and common sense first; ask only what none of them answer. Do not start with a document.
- Other games as references: check the Korean edition; name the edition when they differ.
- Do not decide game rules or design numbers. Do not propose game rules or safety guards inside a framework.
- Missing design number or detail: do not ask. Put a temporary value in an SO, list each one under the PR body's open-design-values section (project info), and keep going.

## Finishing
- When coding is done, commit with your own message (github-pr) and report what was made and what was changed.
- Scene or prefab changed: play-check.