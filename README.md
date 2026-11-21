# JinwooClaudeRules

Claude 지침과 스킬을 git으로 관리하는 저장소입니다. 스킬은 플러그인으로 설치하지 않고, `instructions/general.md`의 트리거 링크로 이 저장소의 파일을 바로 읽습니다.

- 범용(개발 방법): `instructions/general.md` 지침, `plugins/dev/skills/<스킬>/SKILL.md` 스킬.
- 전용(프로젝트 정보): `projects/<프로젝트>/info.md`. 저장소, 조직, 보드, 경로, 링크, 마일스톤 같은 사실만 둡니다.
- 코디네이터 전용: `instructions/coordinator.md`. 스레드는 불러오지 않습니다.
- Claude Code hook: `hooks/`. 규칙을 말 대신 검사로 강제합니다. PC는 설정 파일이(위치는 `projects/<프로젝트>/info.md`), 클라우드는 환경 설정 스크립트가 `~/.claude/settings.json`에 이 스크립트를 연결합니다.
- 루트 `CLAUDE.md`가 지침과 프로젝트 정보를 `@` import로 불러옵니다. 이 저장소를 Claude 프로젝트 레포에 넣으면 모든 스레드가 시작할 때 읽습니다.
- main에 push하면 클라우드 스레드는 다음 시작부터, PC 세션은 시작할 때 로컬 클론을 pull해서 바로 씁니다. claude.ai 동기화는 거치지 않습니다.
- 새 스킬은 `plugins/dev/skills/<스킬>/SKILL.md`에 만들고 `instructions/general.md` 트리거에 링크를 답니다.
- 외부 스킬 사본은 `plugins/<원본 이름>/`에 원본 LICENSE와 함께 두고, 고친 점을 SKILL.md 첫머리에 적습니다(caveman, superpowers).

## 규칙과 막는 검사

같은 규칙이 또 어겨지면 줄을 늘리지 않고 이 표에 검사를 더합니다.

| 규칙 | 검사 | 어디서 |
|---|---|---|
| 보드 카드를 총괄 확인으로 옮기지 않는다 | `hooks/block-signoff-status.js` | PC |
| 사용자 화면에 창을 띄우지 않는다(Unity, Blender, Chrome, Start-Process) | `hooks/block-visible-windows.js` | PC |
| Chrome은 탭 하나만, 새 창 없이 쓴다 | `hooks/block-extra-chrome-tabs.js` | 클라우드 |
| 작업 폴더 안 파일 삭제는 허용 버튼 없이 한다 | `hooks/allow-workfolder-deletes.js` | PC |
| 워크트리가 거부되면 묻지 않고 메인 폴더 새 브랜치로 계속한다 | `hooks/worktree-fallback.js` | PC |
| 워크트리는 고정 풀만 쓰고 지우지 않는다(이슈마다 새로 만들지 않는다) | `hooks/block-worktree-churn.js` | PC |
| 사용자에게 스레드에 한 줄을 적어 달라고 하지 않는다 | `hooks/block-asking.js` | 클라우드 |
| 시킨 일, 머지, 찾은 버그 수정을 되묻지 않는다 | `hooks/block-asking.js` | 클라우드 |
| 했다고 말할 때 근거(링크, 경로, 인용)를 붙인다 | `hooks/block-asking.js` | 클라우드 |
| 작업 중 진행 상황 메시지를 따로 보내지 않는다 | `hooks/block-asking.js` | 클라우드 |
