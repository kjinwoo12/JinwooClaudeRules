---
name: "gil-team-docs"
description: "Project Gil: rules for writing repo docs or text that goes to teammates (issue and PR bodies, comments, comment drafts, guides, notices)"
---

# Team doc rules (Project Gil)

## Where
- Team docs go in the repo, written locally. Artifacts only for showing the user.
- Doc work needs no asking (edit, commit, self-merge of doc-only PRs).

## What
- Only what readers need and what will not go stale. Link folders instead of lists or current status.
- No separate documents outside the thread goal.

## How
- Team-facing text is Korean.
- Write so it reads one way only. Give locations as tab, table title, row, column name, and value, in sentences.
- Re-check every factual claim against the source before sending. No guesses. Unverified: write 「확인 못 함」 and what you tried.
- No claude.ai links, no teammate emails.
- No middle dot.
- GitHub markdown: two single `~` in one paragraph or table cell render as strikethrough (`0~4, 0~6` strikes 「4, 0」). Write every range tilde as `\~` outside code; never use strikethrough on purpose. After posting, check the rendered page has no unintended strikethrough.

## Comment drafts for teammates
- PR comments and review replies: never post them. Suggest the text in the thread only; the user posts it.
- 합니다체, no decorative symbols, answer only what was asked.
- Never say the user wrote something wrong when Claude wrote it.