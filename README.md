# JinwooClaudeRules

Claude 지침과 스킬을 git으로 관리하는 저장소입니다. 스킬은 플러그인으로 설치하지 않고, `instructions/general.md`의 트리거 링크로 이 저장소의 파일을 바로 읽습니다.

- 범용(개발 방법): `instructions/general.md` 지침, `plugins/dev/skills/<스킬>/SKILL.md` 스킬.
- 전용(프로젝트 정보): `projects/<프로젝트>/info.md`. 저장소, 조직, 보드, 경로, 링크, 마일스톤 같은 사실만 둡니다.
- 코디네이터 전용: `instructions/coordinator.md`. 스레드는 불러오지 않습니다.
- Claude Code hook: `hooks/`. 규칙을 말 대신 검사로 강제합니다. PC는 설정 파일이(위치는 `projects/<프로젝트>/info.md`), 클라우드는 환경 설정 스크립트가 `~/.claude/settings.json`에 이 스크립트를 연결합니다.
- 루트 `CLAUDE.md`가 지침과 프로젝트 정보를 `@` import로 불러옵니다. 이 저장소를 Claude 프로젝트 레포에 넣으면 모든 스레드가 시작할 때 읽습니다.
- main에 push하면 클라우드 스레드는 다음 시작부터, PC 세션은 시작할 때 로컬 클론을 pull해서 바로 씁니다. claude.ai 동기화는 거치지 않습니다.
- 새 스킬은 `plugins/dev/skills/<스킬>/SKILL.md`에 만들고 `instructions/general.md` 트리거에 링크를 답니다.
- 외부 스킬 사본은 `plugins/<원본 이름>/`에 원본 LICENSE와 함께 두고, 고친 점을 SKILL.md 첫머리에 적습니다(caveman, superpowers, ponytail, claude-code-setup, ecc).
- 기본으로 켜는 스킬은 caveman lite, ponytail, claude-code-setup입니다(`hooks/caveman-lite.js`가 세션 시작 때 알림). ecc 스킬 328개는 기본으로 꺼 두고, 다른 스킬이 다루지 않는 주제가 나오면 `plugins/ecc/INDEX.md`를 검색해 맞는 스킬 하나만 읽습니다.

## 규칙과 막는 검사

사용자가 잘못을 지적하거나 같은 규칙이 또 어겨지면 줄을 늘리지 않고 이 표에 검사를 더합니다.

| 규칙 | 검사 | 어디서 |
|---|---|---|
| 보드 카드를 총괄 확인으로 옮기지 않는다 | `hooks/block-signoff-status.js` | PC |
| 사용자 화면에 창을 띄우지 않는다(Unity, Blender, Chrome, Start-Process) | `hooks/block-visible-windows.js` | PC |
| Chrome은 탭 하나만, 새 창 없이 쓴다 | `hooks/block-extra-chrome-tabs.js` | 클라우드 |
| 작업 폴더 안 파일 삭제는 허용 버튼 없이 한다 | `hooks/allow-workfolder-deletes.js` | PC |
| 워크트리가 거부되면 묻지 않고 메인 폴더 새 브랜치로 계속한다 | `hooks/worktree-fallback.js` | PC |
| 워크트리는 고정 풀만 쓰고 지우지 않는다(이슈마다 새로 만들지 않는다) | `hooks/block-worktree-churn.js` | PC |
| 메인 폴더가 기본 브랜치에 있으면 풀 워크트리에서 브랜치를 만들지 않고 메인 폴더를 쓴다 | `hooks/block-worktree-churn.js` | PC |
| 사용자에게 스레드에 한 줄을 적어 달라고 하지 않는다 | `hooks/block-asking.js` | 클라우드 |
| 시킨 일, 머지, 찾은 버그 수정을 되묻지 않는다 | `hooks/block-asking.js` | 클라우드 |
| 했다고 말할 때 근거(링크, 경로, 인용)를 붙인다 | `hooks/block-asking.js` | 클라우드 |
| 작업 중 진행 상황 메시지를 따로 보내지 않는다 | `hooks/block-asking.js` | 클라우드 |
| Unity 코드에 숨은 참조, 로직 속 비주얼 타입을 넣지 않는다 | 팀 저장소 repo-lint.js 「저장소 규칙 검사」 (#310) | 팀 저장소 PR |
| 새 소리 파일은 출처를 적고, 코드로 소리를 합성하지 않는다 | 팀 저장소 repo-lint.js 「저장소 규칙 검사」 (#416) | 팀 저장소 PR |
| 한 클래스가 필드 값으로 다른 동작을 갈라 쓰지 않는다(하드 플래그) | 팀 저장소 docs/REVIEW.md AI 리뷰 항목 (#310) | 팀 저장소 PR |
| 세션을 시작할 때마다 caveman lite, ponytail, claude-code-setup을 켠다 | `hooks/caveman-lite.js` (SessionStart) | 클라우드, PC |
| rebase, `git clean`, `git stash`를 쓰지 않는다 | `hooks/check-git.js` | 클라우드, PC |
| 팀 저장소 브랜치 이름은 `feature/<번호>-<kebab>`, release, hotfix만 쓴다 | `hooks/check-git.js` | 클라우드, PC |
| develop PR과 main → develop 동기화는 merge commit, main PR은 squash로 머지한다 | `hooks/check-git.js` | 클라우드, PC |
| 에디터 노이즈와 오디오 끄기(`m_DisableAudio: 1`)를 커밋하지 않는다 | `hooks/check-git.js` | PC |
| 팀이 보는 GitHub 글에 claude.ai 링크, 물결 취소선을 넣지 않는다 | `hooks/check-github-text.js` | 클라우드, PC |
| AI 리뷰 지적을 고치지 않고 PR을 열지 않는다(사용자 결정, 오탐만 예외) | `hooks/check-github-text.js` | 클라우드, PC |
| 기능 PR은 승인받은 기획서 링크(작은 수정이면 그 사유) 없이 열지 않는다(9단계 순서) | `hooks/check-github-text.js` | 클라우드, PC |
| 가운뎃점을 쓰지 않는다(답장, 커밋, GitHub 글) | `hooks/block-asking.js`, `hooks/check-git.js`, `hooks/check-github-text.js` | 클라우드, PC |
| 답장에 커밋 해시, 링크 없는 이슈 번호, 4줄 넘는 목록을 쓰지 않는다 | `hooks/block-asking.js` | 클라우드 |
| PR을 만들면 담당자, 마일스톤, 라벨, pr-issue-sync, 머지하면 branch-cleanup, pr-issue-sync를 한다 | `hooks/after-pr.js` (PostToolUse) | 클라우드, PC |
| PC 작업을 끝내기 전에 작업 폴더 최상위 임시 파일을 정리한다(요청받은 문서는 남긴다) | `hooks/pc-scratch-stop.js` (Stop) | PC |
| 사용자에게 쓰는 글은 한국어로 쓴다 | `hooks/check-reply.js` (Stop) | PC |
| 지적받으면 사과로 끝내지 않고 고친 뒤 검사를 더한다 | `hooks/check-reply.js` (Stop) | PC |
| 소리 파일은 다운로드 카드가 아니라 바로 들을 수 있게 보낸다 | `hooks/block-attach-audio.js` (SendUserFile) | PC |
