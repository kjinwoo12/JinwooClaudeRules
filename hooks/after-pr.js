// PostToolUse hook (mcp__github__create_pull_request|merge_pull_request, Bash, PowerShell for gh pr create/merge): remind the next steps; remember a new PR's base and head for check-git.js.
const fs = require('fs');
const os = require('os');
const path = require('path');

const NEXT = {
  create: 'PR을 만들었다: 담당자, 마일스톤, 라벨을 달고 pr-issue-sync를 한다.',
  merge: 'PR이 머지됐다: branch-cleanup(PC 메인 폴더를 기본 브랜치로 갱신)과 pr-issue-sync를 한다.',
};

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const { tool_name: tool, tool_input: args, tool_response: response } = JSON.parse(input);
  const kind = tool.endsWith('create_pull_request') ? 'create'
    : tool.endsWith('merge_pull_request') ? 'merge'
    : (args.command ?? '').match(/\bgh\s+pr\s+(create|merge)\b/)?.[1];
  if (!kind) return;
  const number = JSON.stringify(response ?? '').match(/\/pull\/(\d+)/)?.[1];
  if (kind === 'create' && args.repo && args.base && number) {
    fs.writeFileSync(path.join(os.tmpdir(), `pr-base-${args.repo.toLowerCase()}-${number}`), `${args.base} ${args.head ?? ''}`);
  }
  console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: NEXT[kind] } }));
});
