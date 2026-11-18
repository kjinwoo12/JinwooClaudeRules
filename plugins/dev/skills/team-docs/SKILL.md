---
name: "team-docs"
description: "Rules for writing repo docs or text that goes to teammates (issue and PR bodies, comments, comment drafts, guides, notices)"
---

# Team doc rules

## Where
- Team docs go in the repo, written locally. Artifacts only for showing the user.
- Doc work needs no asking (edit, commit, self-merge of doc-only PRs).

## What
- No separate documents outside the thread goal.

## How
- No claude.ai links, no teammate emails.
- GitHub markdown: two single `~` in one paragraph or table cell render as strikethrough (`0~4, 0~6` strikes 「4, 0」). Write every range tilde as `\~` outside code; never use strikethrough on purpose. After posting, check the rendered page has no unintended strikethrough.

## Comment drafts for teammates
- A post that must have no Claude footer: give the user a draft instead.
- PR comments and review replies: never post them. Suggest the text in the thread only; the user posts it.
- 합니다체, no decorative symbols, answer only what was asked.
- Never say the user wrote something wrong when Claude wrote it.