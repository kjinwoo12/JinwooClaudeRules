---
name: "unity-work"
description: "Unity code, scenes, prefabs, SO, tests, design work (Unity MCP, batchmode, test timing, no hardcoding)"
---

# Unity work rules

## Where and how
- Write client code on the PC local repo through Remote Control (RC) from the start (remote-control).
- Use Unity MCP on the open editor. If MCP fails, batchmode `-batchmode -nographics -quit -logFile <path>` with `-projectPath <that folder>`. No computer use.
- Prefer not to launch the GUI editor (recommendation, not a ban). Launch it only for a step that neither CLI nor MCP on the open editor can do, such as a Play check MCP can't run.

## Checks and tests
- Per edit: compile and console only.
- EditMode and PlayMode tests once at the end of a feature, before commit. Never ask the user to run tests.

## Code
- No hardcoding: tunable values in SerializeField or SO, other fixed values as named constants. No magic numbers.
- No runtime bootstrap.
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