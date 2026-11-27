---
name: "unity-editor-noise"
description: "Before checkout, new branch, or commit in a Unity repo with uncommitted changes: discard editor noise, leave unrelated real work alone"
---

# Unity editor noise

Run whenever a Unity repo has changes this task did not make, before switching branches, branching, or committing. Also after this task's own Play check or build. Decide by reading the diff; never ask the user which kind it is.

## 1. Sort each changed file
`git status --short`, then `git diff` per file. Noise signatures:
- TMP font asset (`*SDF.asset`): only glyph, character, or atlas tables changed. Dynamic atlas filled during Play.
- URP asset: only `m_Prefilter*` values; URP global settings: only serialized lists or `rid` entries. Recomputed on a player build.
- `ProjectSettings/ProjectSettings.asset` player fields (splash, fullscreen, window, runInBackground, preloaded assets, managedCodeVariant) and new `Assets/Settings/Build Profiles/`. Made by a build from the Build window.
- Reserialization only: field order, version numbers, default values written out, no content change.
- Scene or prefab no task touched, with only transform/selection/expanded-state or reserialization changes: saved by the open editor.

Anything else (code, new assets, scenes or prefabs with content changes) is real work. A diff that fits no signature and isn't clearly content: treat as real.

## 2. Act
- Noise: never carry it into a feature branch. The editor makes it again, so discard it: `git restore -- <tracked noise paths>`, and delete untracked noise files the same signatures cover. Then work in the main folder as usual.
- Real work this task did not make: leave it where it is and never stage it; it does not make the folder busy (general Main folder first). Never mix it into the task's commits. Also when the user says to discard all changes (「변경사항 다 없애」): discard noise only; name the real files and ask with a decision card before discarding them (user 11/26 「저절로 만든 변경이 아니면 없애면 안되지」).
- This task's own files: keep.

## 3. Report
One line: files discarded as noise with cause; real changes left in place.
