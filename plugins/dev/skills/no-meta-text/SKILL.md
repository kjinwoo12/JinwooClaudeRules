---
name: "no-meta-text"
description: "When writing or editing any document (planning or spec doc, pattern or value sheet, Claude Doc, repo doc): only the content itself, no text about the document, the process, or the reader's next step"
---

# No meta text in documents

A document holds the content only: rules, values, options, facts. Text about the document itself goes elsewhere.

## Meta text (never in the document)
- Asks to the reader: 「정해 주세요」, 「골라 주세요」, 「코멘트로 알려 주세요」, 「확인 부탁」.
- How it was made or understood: 「~로 이해했습니다」, 「요청하신 내용」, 「현재 SO 값이다」, 「정리했다」, sources of values.
- Status of a value or section: 「임시」, 「(초안)」, 「바뀔 수 있음」, 「나중에 정함」.
- Process and next steps: 「컨펌하면 작업 시작」, 「이 표를 고치면 반영한다」, usage notes for the doc.
- Asides in headings or parentheses that say any of the above.

## Where it goes instead
- Open choices: write each option as content (A안, B안 with what differs). The question to the user goes in the chat reply or a comment thread.
- Temporary values: write the value plainly. Which values are temporary goes in the chat report (or the PR's open-design-values section).
- Answers to a comment: the reply in that thread, not a sentence in the doc.

## Check
Before handing a document over, and after every edit to it, reread each sentence and heading: if it talks about the doc, the reader, or the work instead of the subject, delete it or move it per above.
