---
name: "asset-sourcing"
description: "Before making or adding any sound, texture, VFX, model, animation, or shader look: find an existing licensed asset first and report candidates with links"
---

# Asset sourcing

(user 11/27 「너가 직접 만드는 것보다 쓸만한거 가져다 쓰는 것부터 고려해」, 「에셋 후보 찾을 때 링크 꼭 넣게」)

## Find first
- Any sound, texture, VFX, model, animation, or shader look: search existing assets before making one (Asset Store, Fab, Kenney, OpenGameArt, freesound, other sites). Make your own only when nothing fits, at shipping quality, never a test pattern.
- License: only what may sit in the team repo and ship (CC0, or a license that allows team use). No paid or redistribution-restricted originals, no video-site rips, no AI generators.
- Several sounds or effects needed: list them first (one row each in the art sheet, project info), then find candidates per row.

## Report candidates
- Per candidate: what it is for, name, source, license, and a link checked to open this turn (the asset page; a file inside a bundle: the bundle page and its file list, with the file name). A candidate without a link is not reported.
- Say which rows have no fitting candidate and what was searched.

## Bring it in
- Download per general Downloads (CLI; login-only sites: the download button in the user's Chrome).
- Add each asset to the team repo's `THIRD_PARTY_NOTICES.md`; repo lint fails new sound files missing there.
- Final report and PR: per asset brought in, what it is for, name, license, its source link checked to open this turn, and its repo path. An asset without its link is not reported as done.
- Never synthesize sound in code or a script: you cannot hear it (repo lint blocks `AudioClip.Create` outside tests). For a sourced sound check only length, peak, and loudness (ffmpeg `loudnorm` measure) for clipping and level; tone stays unchecked: the art sheet row gets 「임시」, the PR's open-design-values section says it needs a listen.
- Visual assets: unity-work 「Look and sound」 for references and the visual check.
