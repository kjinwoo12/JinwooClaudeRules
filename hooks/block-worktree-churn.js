// PreToolUse hook (Bash, PowerShell): keep the fixed worktree pool. Deny removing a worktree and adding one outside the pool (`-wt<n>`).
const REMOVE = /\bgit\b[^\n;|&]*\bworktree\s+remove\b/i;
const ADD = /\bgit\b[^\n;|&]*\bworktree\s+add\b([^\n;|&]*)/i;
const POOL_PATH = /-wt\d+["']?(\s|$)/i;

function deny(reason) {
  console.log(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason },
  }));
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const command = JSON.parse(input).tool_input?.command ?? '';
  if (REMOVE.test(command)) {
    deny('워크트리는 지우지 않고 재사용한다(pc-worktree). 머지 뒤에는 워크트리를 기본 브랜치 detached로 돌리고 브랜치만 지운다.');
    return;
  }
  const add = command.match(ADD);
  if (add && !POOL_PATH.test(add[1] + ' ')) {
    deny('이슈마다 새 워크트리를 만들지 않는다. 고정 풀(project info, `-wt<n>`)에서 빈 워크트리를 쓰고, 다 쓰고 있으면 메인 폴더 새 브랜치로 계속한다(pc-worktree).');
  }
});
