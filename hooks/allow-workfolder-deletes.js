// PC PreToolUse hook (Bash, PowerShell): allow without a prompt a single delete command whose every path is inside the work folder (first argument).
const path = require('path');

const ROOT = path.win32.resolve(process.argv[2]).toLowerCase();
const DELETE = /^(rm|rmdir|del|erase|rd|remove-item|ri)$/i;
const CHAINING = /[;&|`<>\n]|\$\(/;

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const { tool_input: args, cwd } = JSON.parse(input);
  const command = (args?.command ?? '').trim();
  if (CHAINING.test(command)) return;
  const [verb, ...rest] = command.match(/"[^"]*"|'[^']*'|\S+/g) ?? [];
  if (!verb || !DELETE.test(verb)) return;
  const targets = rest.filter(arg => !/^-/.test(arg)).map(arg => arg.replace(/^["']|["']$/g, ''));
  if (targets.length === 0) return;
  const inside = targets.every(target => {
    if (/[*?$%~]/.test(target)) return false;
    const resolved = path.win32.resolve(cwd ?? ROOT, target.replace(/^\/([a-z])\//i, '$1:/')).toLowerCase();
    return resolved.startsWith(ROOT + path.win32.sep);
  });
  if (!inside) return;
  console.log(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'allow', permissionDecisionReason: '작업 폴더 안 삭제' },
  }));
});
