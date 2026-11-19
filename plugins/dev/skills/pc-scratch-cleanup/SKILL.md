---
name: "pc-scratch-cleanup"
description: "End of every task that wrote files on the user's PC: delete its scratch files in the work folder (logs, test results, screenshots, patches, temp dirs)"
---

# PC scratch cleanup

Run at the end of every task that ran on the PC (Remote Control or folder access), after commit/PR and before the final report. Not only when asked. Work folder: the one the task used (default: the PC work folder from the project info, see branch-cleanup).

## 1. Survey
- List the work folder top level, and size/date of each item.
- Note what this task created (test logs/xml, screenshots, build logs, patches, temp dirs).

## 2. Decide
- Keep always: git working copies (team repo and others), .claude, anything the user made.
- Inside a repo: never delete untracked files, never `git clean`. Untracked files there are listed, not removed.
- Delete: scratch this task or earlier tasks left at the folder top level (logs, xml, png/jpg shots, .patch, temp dirs), once anything the user needs is already delivered (thread attachment, project files, PR).
- Unsure who made it or whether it's needed: list it with one-line evidence, don't delete.

## 3. Delete
- Folder access: device_request_delete_permission for the work folder root, then `rm` in device_bash.
- Or tell RC to delete the listed paths ("proceed without asking permission").
- Never touch folders the project info marks as not this project.

## 4. Report
- One line in the final report: deleted items, kept/listed items with reason.