# JinwooClaudeRules

Claude 지침과 스킬을 git으로 관리하는 저장소입니다. 스킬은 플러그인으로 설치하지 않고, `instructions/general.md`의 트리거 링크로 이 저장소의 파일을 바로 읽습니다.

- 범용(개발 방법): `instructions/general.md` 지침, `plugins/dev/skills/<스킬>/SKILL.md` 스킬.
- 전용(프로젝트 정보): `projects/<프로젝트>/info.md`. 저장소, 조직, 보드, 경로, 링크, 마일스톤 같은 사실만 둡니다.
- 코디네이터 전용: `instructions/coordinator.md`. 스레드는 불러오지 않습니다.
- 루트 `CLAUDE.md`가 지침과 프로젝트 정보를 `@` import로 불러옵니다. 이 저장소를 Claude 프로젝트 레포에 넣으면 모든 스레드가 시작할 때 읽습니다.
- main에 push하면 클라우드 스레드는 다음 시작부터, PC 세션은 시작할 때 로컬 클론을 pull해서 바로 씁니다. claude.ai 동기화는 거치지 않습니다.
- 새 스킬은 `plugins/dev/skills/<스킬>/SKILL.md`에 만들고 `instructions/general.md` 트리거에 링크를 답니다.
