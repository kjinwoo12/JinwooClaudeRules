// PreToolUse hook (GitHub write tools, Bash, PowerShell for gh pr/issue): no claude.ai link, no middle dot, and no tilde strikethrough in text teammates read.
const fs = require('fs');

const GH_TEXT = /(?:^|[;&|(\n])\s*gh\s+(pr|issue)\s+(create|edit|comment|review)\b/;
const BODY = /\s(?:--body|-b)\s+("(?:[^"\\]|\\.)*"|'[^']*')/;
const BODY_FILE = /\s(?:--body-file|-F)\s+("[^"]*"|'[^']*'|\S+)/;

function deny(reason) {
  console.log(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason },
  }));
  process.exit(0);
}

// Two unescaped ~ in one paragraph or table cell render as strikethrough on GitHub.
function strikes(text) {
  const plain = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  return plain.split(/\n\s*\n/)
    .flatMap(block => (/^\s*\|/m.test(block) ? block.split(/\n|\|/) : [block]))
    .some(block => (block.match(/(?<!\\)~/g) ?? []).length >= 2);
}

// Items under the team PR template's not-fixed line that carry neither a user decision nor a false-positive note.
function skippedFindings(text) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex(line => /^- 고치지 않은 것과 이유/.test(line));
  if (start < 0) return [];
  const end = lines.findIndex((line, i) => i > start && !/^\s+-/.test(line));
  return lines.slice(start + 1, end < 0 ? undefined : end)
    .map(line => line.replace(/^\s+-\s*/, '').trim())
    .filter(item => item && item !== '없음' && !/^(사용자 결정|오탐):/.test(item));
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const { tool_name: tool, tool_input: args } = JSON.parse(input);
  let all = [args.title, args.body].filter(Boolean).join('\n');
  let body = all;
  if (/^(Bash|PowerShell)$/.test(tool)) {
    const command = args.command ?? '';
    if (!GH_TEXT.test(command)) return;
    const file = command.match(BODY_FILE)?.[1]?.replace(/^["']|["']$/g, '');
    body = (file && fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '') + '\n\n' + (command.match(BODY)?.[1] ?? '');
    all = command + '\n' + body;
  }
  if (/claude\.ai\//i.test(all)) deny('팀이 보는 글에는 claude.ai 링크를 넣지 않는다(Requested by, project thread 줄 포함). 빼고 다시 보낸다.');
  // The team PR template's checklist lines carry middle dots; only Claude's own text is checked.
  if (body.replace(/^\s*- \[[ x]\].*$/gm, '').includes('·')) deny('가운뎃점(·)은 쓰지 않는다. 쉼표나 와/과로 쓴다.');
  const skipped = skippedFindings(body);
  if (skipped.length) deny(`리뷰 지적을 고치지 않고 넘기지 않는다(${skipped.length}건). 고친 뒤 「고친 것」에 적는다. 기획 값이나 보이는 모양이 바뀌는 지적만 결정 카드로 묻고 「사용자 결정:」으로, 틀린 지적은 「오탐:」과 근거로 적는다.`);
  if (strikes(body)) deny('한 문단이나 표 칸에 ~가 두 개면 취소선이 된다. 범위 물결은 \\~로 쓴다.');
});
