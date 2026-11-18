---
name: "unity-editor-noise"
description: "Before a checkout, new branch, worktree choice, or commit in a Unity repo with uncommitted changes: tell Unity editor noise from real work, stash the noise, and move real unrelated work out of the way with a worktree"
---

# Unity editor noise

Run whenever a Unity repo has changes this task did not make, before switching branches, branching, choosing main folder vs worktree, or committing. Also after this task's own Play check or build. Decide by reading the diff; never ask the user which kind it is.

## 1. Sort each changed file
`git status --short`, then `git diff` per file. Noise signatures:
- TMP font asset (`*SDF.asset`): only glyph, character, or atlas tables changed. Dynamic atlas filled during Play.
- URP asset: only `m_Prefilter*` values; URP global settings: only serialized lists or `rid` entries. Recomputed on a player build.
- `ProjectSettings/ProjectSettings.asset` player fields (splash, fullscreen, window, runInBackground, preloaded assets, managedCodeVariant) and new `Assets/Settings/Build Profiles/`. Made by a build from the Build window.
- Reserialization only: field order, version numbers, default values written out, no content change.
- Scene or prefab no task touched, with only transform/selection/expanded-state or reserialization changes: saved by the open editor.

Anything else (code, new assets, scenes or prefabs with content changes) is real work. A diff that fits no signature and isn't clearly content: treat as real.

## 2. Act
- Noise: never commit it, never carry it into a feature branch, never discard it. `git stash push -u -m "unity editor noise <cause>" -- <noise paths>` (pathspec, so other changes stay). Then work in the main folder as usual.
- Real work this task did not make, or another task running in that folder: leave it where it is and do the task in a worktree (general Worktree rule). Never mix it into the task's commits.
- This task's own files: keep. Before each commit, `git diff --cached --name-only` must hold no noise path; unstage any.

## 3. Report
One line: files stashed as noise with cause and stash name; real changes left in place and the worktree used.
