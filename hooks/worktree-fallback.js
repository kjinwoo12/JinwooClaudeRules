// PC hook. PermissionDenied (Bash, PowerShell): remember an auto-mode denial of `git worktree add`.
// PostToolBatch and Stop: hand the session the fallback instead of letting it stop and ask the user.
const fs = require('fs');
const os = require('os');
const path = require('path');

const WORKTREE_ADD = /\bgit\b[^\n;|&]*\bworktree\s+add\b/i;
const FALLBACK = 'git worktree add가 자동 권한 검사에서 거부됐다. 사용자에게 묻거나 스레드에 한 줄을 적어 달라고 하지 말고, 메인 저장소 폴더에서 기본 브랜치 기준 새 브랜치(github-newbranch)로 같은 작업을 계속한다. 메인 폴더에 이 작업이 만들지 않은 실제 변경이나 다른 작업이 있을 때만(unity-editor-noise) 멈추고 그 근거와 함께 보고한다.';

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const event = JSON.parse(input);
  const marker = path.join(os.tmpdir(), `worktree-denied-${event.session_id}`);
  if (event.hook_event_name === 'PermissionDenied') {
    if (WORKTREE_ADD.test(event.tool_input?.command ?? '')) fs.writeFileSync(marker, '');
    return;
  }
  if (!fs.existsSync(marker)) return;
  fs.unlinkSync(marker);
  const output = event.hook_event_name === 'Stop'
    ? { decision: 'block', reason: FALLBACK }
    : { hookSpecificOutput: { hookEventName: event.hook_event_name, additionalContext: FALLBACK } };
  console.log(JSON.stringify(output));
});
