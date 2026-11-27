// PC Stop hook: block a turn whose text to the user is mostly English, or that answers a correction with an apology and no file change.
const fs = require('fs');

const APOLOGY = /(죄송|사과드립니다|미안합니다)/;
const CHANGES = new Set(['Edit', 'Write', 'NotebookEdit']);

// Letters outside code, links and paths: English when Latin letters outnumber Hangul.
function isEnglish(text) {
  const prose = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+|[A-Za-z]:[\\/]\S+|\S+\.(md|js|json|cs|docx?|txt)\b/g, '');
  const hangul = (prose.match(/[가-힣]/g) ?? []).length;
  const latin = (prose.match(/[A-Za-z]/g) ?? []).length;
  return latin > 40 && latin > hangul;
}

function turnEntries(lines) {
  const entries = lines.filter(Boolean).map(line => { try { return JSON.parse(line); } catch { return null; } })
    .filter(entry => entry?.type === 'user' || entry?.type === 'assistant');
  const start = entries.findLastIndex(entry => entry.type === 'user' && !entry.isMeta
    && (typeof entry.message?.content === 'string' || entry.message?.content?.some?.(part => part.type === 'text')));
  return entries.slice(start + 1).filter(entry => entry.type === 'assistant').flatMap(entry => entry.message?.content ?? []);
}

function check(parts) {
  const texts = parts.filter(part => part.type === 'text').map(part => part.text);
  if (texts.some(isEnglish)) return '사용자에게 쓴 글이 영어다(~/.claude/CLAUDE.md 「Always respond in Korean」). 이번 턴의 답을 한국어로 다시 쓴다. 코드, 명령, 경로, 오류 문구만 그대로 둔다.';
  const changed = parts.some(part => part.type === 'tool_use' && CHANGES.has(part.name));
  if (texts.some(text => APOLOGY.test(text)) && !changed) return '사과로 끝내지 않는다(general.md 「Corrections」): 지적받은 것을 고치고, 다시 안 생기게 막는 검사(hooks/ 스크립트, 린트, 테스트)를 이번 턴에 만든 뒤 둘 다 한 줄로 보고한다.';
  return null;
}

if (process.argv[2] === '--test') {
  const assert = require('assert');
  assert.ok(isEnglish('I read the whole contract and rewrote section 7 of the agenda from it, with five points.'));
  assert.ok(!isEnglish('계약서 47개 조항을 다 읽고 [아젠다](F:/git/a.md)의 7번을 `gh issue list`로 확인해 다시 썼습니다.'));
  assert.ok(check([{ type: 'text', text: '죄송합니다. 앞으로 한국어로 쓰겠습니다.' }]));
  assert.equal(check([{ type: 'tool_use', name: 'Write' }, { type: 'text', text: '죄송합니다. 검사를 만들었습니다.' }]), null);
  console.log('ok');
  process.exit(0);
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const { transcript_path: transcript, stop_hook_active: active } = JSON.parse(input);
  if (active || !fs.existsSync(transcript ?? '')) return;
  const reason = check(turnEntries(fs.readFileSync(transcript, 'utf8').split('\n')));
  if (reason) console.log(JSON.stringify({ decision: 'block', reason }));
});
