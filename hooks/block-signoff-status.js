// PreToolUse hook (Bash, PowerShell): deny any command that moves a board card to the sign-off status (총괄 확인).
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SIGNOFF = '총괄';
const WINGET_GH = path.join(process.env.LOCALAPPDATA ?? '', 'Programs', 'GitHub CLI', 'bin', 'gh.exe');
const GH = fs.existsSync(WINGET_GH) ? WINGET_GH : 'gh';
const BOARD_EDIT = /item-edit|updateProjectV2ItemFieldValue/;

function deny(reason) {
  console.log(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason },
  }));
  process.exit(0);
}

function signoffOptionIds(projectId) {
  const query = 'query($id:ID!){node(id:$id){... on ProjectV2{fields(first:50){nodes{... on ProjectV2SingleSelectField{options{id name}}}}}}}';
  const out = execFileSync(GH, ['api', 'graphql', '-f', `query=${query}`, '-f', `id=${projectId}`], { encoding: 'utf8' });
  return JSON.parse(out).data.node.fields.nodes
    .flatMap(field => field.options ?? [])
    .filter(option => option.name.includes(SIGNOFF))
    .map(option => option.id);
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const command = JSON.parse(input).tool_input?.command ?? '';
  if (!BOARD_EDIT.test(command)) return;
  const reason = '보드 카드를 총괄 확인으로 옮기는 것은 hook이 막는다. 총괄 확인은 총괄이 직접 옮긴다. 다른 상태로 옮기거나 그대로 두고 보고한다.';
  if (command.includes(SIGNOFF)) deny(reason);
  const projectIds = command.match(/PVT_[A-Za-z0-9_-]+/g);
  if (!projectIds) deny('보드 편집 명령은 프로젝트 id(PVT_...)를 명령에 그대로 적어야 hook이 총괄 확인 이동인지 검사할 수 있다.');
  let ids;
  try {
    ids = projectIds.flatMap(signoffOptionIds);
  } catch (error) {
    deny(`총괄 확인 상태 id를 조회하지 못해 보드 편집을 막았다: ${error.message}`);
  }
  if (ids.some(id => command.includes(id))) deny(reason);
});
