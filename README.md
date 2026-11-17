# JinwooClaudeRules

Claude 지침과 스킬을 git으로 관리하는 저장소입니다. 이 저장소 자체가 Claude 플러그인 마켓플레이스입니다.

- `plugins/<플러그인>/skills/<스킬>/SKILL.md`: 스킬. main에 push하면 claude.ai가 가져갑니다 (Customize > Plugins에서 이 마켓플레이스의 「Sync automatically」).
- `projects/<프로젝트>/project-instructions.md`: Claude 프로젝트 지침. 루트 `CLAUDE.md`가 `@` import로 불러오므로, 이 저장소를 프로젝트 레포에 넣으면 모든 스레드가 시작할 때 읽습니다.
- 새 플러그인은 `.claude-plugin/marketplace.json`의 `plugins`에 한 줄 추가합니다. `version`은 쓰지 않습니다 (커밋마다 갱신).
