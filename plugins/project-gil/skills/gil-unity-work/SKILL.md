---
name: "gil-unity-work"
description: "Project Gil: rules for Unity code, scenes, prefabs, SO, tests, and design work (Remote Control, Unity MCP, test timing, no hardcoding)"
---

# Unity work rules (Project Gil)

## Where and how
- Write client code on the PC local repo through Remote Control (RC) from the start.
- Use Unity MCP on the open editor. If MCP fails, or the work is in a git worktree the open editor does not show, batchmode `-batchmode -nographics -quit -logFile <path>` with `-projectPath <that folder>`. No computer use.
- Prefer not to launch the GUI editor (recommendation, not a ban). Launch it only for a step that neither CLI nor MCP on the open editor can do, such as a Play check in a worktree.
- Desktop apps other than Unity: agent-desktop CLI from RC, headless only. If that fails, stop and report alternatives.

## RC instructions
- Pin the scope: only what was instructed, everything else as proposals only, do not take user messages as direct instructions, no commit before the thread says so, proceed without asking permission.
- Check every RC report against the instructed scope. If it went beyond, stop it.

## Checks and tests
- Per edit: compile and console only.
- EditMode and PlayMode tests once at the end of a feature, before commit. Never ask the user to run tests.

## Code
- No hardcoding: tunable values in SerializeField or SO, other fixed values as named constants. No magic numbers.
- No runtime bootstrap.
- The EditMode CodeRules tests enforce both rules above; fix the code, never loosen the test.
- No comments; repo lint blocks all but its allowed exceptions. When code seems to need an explanation, rename, extract, or add a test instead. Never use the `외부(...)` form for our own code's behavior.

## Planning and design
- Design: settle scope, numbers, and boundaries from the issue, the spec, the code, and common sense first; ask only what none of them answer. Do not start with a document.
- Do not decide game rules or design numbers. Do not propose game rules or safety guards inside a framework.
- Missing design number or detail: do not ask. Put a temporary value in an SO, list each one under 「기획 확인 필요」 in the PR body, and keep going.

## Finishing
- When coding is done, commit with your own message (gil-github-pr) and report what was made and what was changed.
- PR that changes a scene or prefab: write the changed scene/prefab paths and the play check result (what you pressed, what you saw) in the body.
- Play check: follow docs/PLAY_CHECK.md (open the scene, Play, do what its feature map says, take a `manage_scene` `screenshot` with `include_image` and look at it). Update the feature map when a test scene's controls change.