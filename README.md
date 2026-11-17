# JinwooClaudeRules

Claude 지침과 스킬을 git으로 관리하는 저장소입니다. 이 저장소 자체가 Claude 플러그인 마켓플레이스입니다.

- 범용(개발 방법): `instructions/general.md` 지침, `plugins/dev/skills/<스킬>/SKILL.md` 스킬.
- 전용(프로젝트 정보): `projects/<프로젝트>/info.md`. 저장소, 조직, 보드, 경로, 링크, 마일스톤 같은 사실만 둡니다.
- 루트 `CLAUDE.md`가 지침과 프로젝트 정보를 `@` import로 불러옵니다. 이 저장소를 Claude 프로젝트 레포에 넣으면 모든 스레드가 시작할 때 읽습니다.
- main에 push하면 claude.ai가 플러그인을 가져갑니다 (Customize > Plugins의 마켓플레이스 자동 동기화).
- 새 플러그인은 `.claude-plugin/marketplace.json`의 `plugins`에 추가합니다. `version`은 쓰지 않습니다 (커밋마다 갱신).
