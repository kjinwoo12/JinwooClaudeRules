---
name: "feature-flow"
description: "Any request to make or change something in the product (new feature, change to an existing one, or an asset put into the game such as sound or VFX): run the 9 steps in order, interview through result check, before any task skill"
---

# Feature flow

(user 11/27 「이 순서를 기능 수정에 적용하면 되지」, 「재발 방지해놔」)

Run these steps in order and say the step number in each report. A task skill (audio-gen, asset-sourcing, unity-work, ...) works inside steps 5 to 9 and never replaces 1 to 4: a request that names a task skill still starts at step 1.

1. Interview: [brainstorming](../../../superpowers/skills/brainstorming/SKILL.md) conversation, after reading the project's existing planning docs on the topic.
2. Spec in prose: brainstorming's written design. Game design content (combat, bosses, levels, growth, story, economy: what the game spec decides) goes in the project's planning-doc place. A system feature (menu, settings, options, tooling) keeps steps 2 to 5 in the thread: spec, mockup, checklist, and plan as messages, approval on a decision card, no Drive doc (user 11/27 「이건 굳이 구글 시트로 설계 안해도 되는디」; `hooks/check-spec-doc.js` asks before any new Google file).
3. Visual or detailed explanation: slides, mockups, or reference clips per screen, beat, or sound.
4. Detailed requirements: the spec's done criteria as a checklist; the user approves the spec here.
5. Structure design: [writing-plans](../../../superpowers/skills/writing-plans/SKILL.md).
6. Test code first, 7. build from the tests: [test-driven-development](../../../superpowers/skills/test-driven-development/SKILL.md).
8. Run tests: unity-work related tests.
9. Check the result: play-check, [verification-before-completion](../../../superpowers/skills/verification-before-completion/SKILL.md), against every item from step 4.

A small change (typo, one value, a rename) keeps brainstorming's short design and says so. A feature PR body carries a 「기획서」 section with the spec link, 「작은 수정: <reason>」, or for a thread spec 「스레드 기획: <one-line summary>」; `hooks/check-github-text.js` denies a PR without it.
