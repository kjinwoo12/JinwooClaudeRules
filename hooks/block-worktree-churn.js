// PreToolUse hook (Bash, PowerShell): keep the fixed worktree pool (`-wt<n>`). Deny removing a pool worktree, adding one outside the pool, and detaching a worktree outside the pool (it must be removed instead).
const fs = require('fs');
const path = require('path');
const GIT = String.raw`(?:^|[;&|(\n])\s*git\b`;
const REMOVE = new RegExp(GIT + String.raw`[^\n;|&]*\bworktree\s+remove\b([^\n;|&]*)`, 'i');
const ADD = new RegExp(GIT + String.raw`[^\n;|&]*\bworktree\s+add\b([^\n;|&]*)`, 'i');
const DETACH = new RegExp(GIT + String.raw`\s+-C\s+("[^"]*"|'[^']*'|\S+)[^\n;|&]*\b(?:switch|checkout)\b[^\n;|&]*--detach\b`, 'i');
const POOL_PATH = /-wt\d+["']?(\s|$)/i;

// A linked worktree has a .git file; the main folder has a .git directory.
function isLinkedWorktree(dir) {
  try { return fs.statSync(path.join(dir.replace(/^["']|["']$/g, ''), '.git')).isFile(); } catch { return false; }
}

function deny(reason) {
  console.log(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason },
  }));
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const command = JSON.parse(input).tool_input?.command ?? '';
  const remove = command.match(REMOVE);
  if (remove && POOL_PATH.test(remove[1] + ' ')) {
    deny('풀 워크트리는 지우지 않고 재사용한다(pc-worktree). 머지 뒤에는 워크트리를 기본 브랜치 detached로 돌리고 브랜치만 지운다.');
    return;
  }
  const add = command.match(ADD);
  if (add && !POOL_PATH.test(add[1] + ' ')) {
    deny('이슈마다 새 워크트리를 만들지 않는다. 고정 풀(project info, `-wt<n>`)에서 빈 워크트리를 쓰고, 다 쓰고 있으면 메인 폴더 새 브랜치로 계속한다(pc-worktree).');
    return;
  }
  const detach = command.match(DETACH);
  if (detach && !POOL_PATH.test(detach[1] + ' ') && isLinkedWorktree(detach[1])) {
    deny('풀 밖 워크트리는 머지 뒤 detach해서 남기지 않고 지운다: `git worktree remove <path>` 뒤 브랜치 삭제(pc-worktree).');
  }
});
