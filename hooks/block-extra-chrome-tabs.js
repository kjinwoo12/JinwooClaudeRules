// PreToolUse hook (cloud, mcp__claude-in-chrome__tabs_create_mcp|tabs_context_mcp): one Chrome tab per session, never a new window.
const fs = require('fs');
const os = require('os');
const path = require('path');

function deny(reason) {
  console.log(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason },
  }));
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const { session_id: session, tool_name: tool, tool_input: args } = JSON.parse(input);
  if (tool.endsWith('tabs_context_mcp')) {
    if (args.createIfEmpty) deny('createIfEmpty는 새 창을 만든다. createIfEmpty 없이 tabs_context_mcp로 기존 탭을 찾아 쓴다.');
    return;
  }
  const marker = path.join(os.tmpdir(), `chrome-tab-created-${session}`);
  if (fs.existsSync(marker)) {
    deny('이 세션은 이미 Chrome 탭을 하나 만들었다. 그 탭을 navigate로 계속 쓴다.');
    return;
  }
  fs.writeFileSync(marker, '');
});
