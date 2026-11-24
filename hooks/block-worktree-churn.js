// PreToolUse hook (Bash, PowerShell): keep the fixed worktree pool (`-wt<n>`). Deny removing a pool worktree, adding one outside the pool, detaching a worktree outside the pool (it must be removed instead), and branching in a pool worktree while the main folder is free (on its default branch).
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const GIT = String.raw`(?:^|[;&|(\n])\s*git\b`;
const REMOVE = new RegExp(GIT + String.raw`[^\n;|&]*\bworktree\s+remove\b([^\n;|&]*)`, 'i');
const ADD = new RegExp(GIT + String.raw`[^\n;|&]*\bworktree\s+add\b([^\n;|&]*)`, 'i');
const DETACH = new RegExp(GIT + String.raw`\s+-C\s+("[^"]*"|'[^']*'|\S+)[^\n;|&]*\b(?:switch|checkout)\b[^\n;|&]*--detach\b`, 'i');
const POOL_PATH = /-wt\d+["']?(\s|$)/i;
const BRANCH_IN = new RegExp(GIT + String.raw`\s+-C\s+("[^"]*"|'[^']*'|\S+)\s+(?:switch\s+-[cC]|checkout\s+-[bB])\s`, 'i');
const POOL_SUFFIX = /-wt\d+$/i;

// A linked worktree has a .git file; the main folder has a .git directory.
function isLinkedWorktree(dir) {
  try { return fs.statSync(path.join(dir.replace(/^["']|["']$/g, ''), '.git')).isFile(); } catch { return false; }
}

const git = (dir, args) => { try { return execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };

// Free main folder: checked out on its default branch (origin/HEAD). Changes nobody committed don't make it busy.
function mainFolderFree(worktree) {
  const pool = worktree.replace(/^["']|["']$/g, '').replace(/[\\/]+$/, '');
  const main = pool.replace(POOL_SUFFIX, '');
  if (main === pool || !fs.existsSync(path.join(main, '.git'))) return null;
  const head = git(main, ['symbolic-ref', '-q', '--short', 'HEAD']);
  const defaultBranch = git(main, ['symbolic-ref', '-q', '--short', 'refs/remotes/origin/HEAD']).replace(/^[^/]+\//, '');
  return head && head === defaultBranch ? main : null;
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
  const branchIn = command.match(BRANCH_IN);
  const freeMain = branchIn && POOL_PATH.test(branchIn[1] + ' ') && mainFolderFree(branchIn[1]);
  if (freeMain) {
    deny(`메인 폴더가 기본 브랜치에 있어 비어 있다: ${freeMain}. 풀 워크트리 말고 메인 폴더에서 새 브랜치로 작업한다. 남은 변경은 스테이징하지 않고 그대로 둔다(general Main folder first).`);
    return;
  }
  const detach = command.match(DETACH);
  if (detach && !POOL_PATH.test(detach[1] + ' ') && isLinkedWorktree(detach[1])) {
    deny('풀 밖 워크트리는 머지 뒤 detach해서 남기지 않고 지운다: `git worktree remove <path>` 뒤 브랜치 삭제(pc-worktree).');
  }
});
