// PC Stop hook: block a turn whose text to the user is mostly English, that answers a correction with an apology and no file change, or that leaves a numbered list of orders with no file change.
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
  const content = entries[start]?.message?.content;
  const asked = typeof content === 'string' ? content : (content ?? []).filter(part => part.type === 'text').map(part => part.text).join('\n');
  return { asked, parts: entries.slice(start + 1).filter(entry => entry.type === 'assistant').flatMap(entry => entry.message?.content ?? []) };
}

// The transcript is written asynchronously and can miss the closing text; Stop input carries it as last_assistant_message.
function withLastMessage(parts, last) {
  const text = typeof last === 'string' ? last : (last?.content ?? []).filter?.(part => part.type === 'text').map(part => part.text).join('\n') ?? '';
  return text && !parts.some(part => part.type === 'text' && part.text === text) ? [...parts, { type: 'text', text }] : parts;
}

// Three or more numbered lines in the user's message = a list of orders.
function isOrderList(text) {
  return (text.match(/^\s*\d+[.)]\s+\S/gm) ?? []).length >= 3;
}

function check(parts, asked = '') {
  const texts = parts.filter(part => part.type === 'text').map(part => part.text);
  if (texts.some(isEnglish)) return '사용자에게 쓴 글이 영어다(~/.claude/CLAUDE.md 「Always respond in Korean」). 이번 턴의 답을 한국어로 다시 쓴다. 코드, 명령, 경로, 오류 문구만 그대로 둔다.';
  const changed = parts.some(part => part.type === 'tool_use' && CHANGES.has(part.name));
  if (texts.some(text => APOLOGY.test(text)) && !changed) return '사과로 끝내지 않는다(general.md 「Corrections」): 지적받은 것을 고치고, 다시 안 생기게 막는 검사(hooks/ 스크립트, 린트, 테스트)를 이번 턴에 만든 뒤 둘 다 한 줄로 보고한다.';
  if (isOrderList(asked) && !changed) return '사용자가 번호 목록으로 시킨 일을 하나도 바꾸지 않고 끝내려 한다(general.md 「Asked = do」, user 11/27 「내 말 무시하는거야?」). 조사와 질문으로 끝내지 말고 시킨 것을 지금 반영한다. 목록이 질문뿐이면 답만 하고 끝낸다.';
  return null;
}

if (process.argv[2] === '--test') {
  const assert = require('assert');
  assert.ok(isEnglish('I read the whole contract and rewrote section 7 of the agenda from it, with five points.'));
  assert.ok(!isEnglish('계약서 47개 조항을 다 읽고 [아젠다](F:/git/a.md)의 7번을 `gh issue list`로 확인해 다시 썼습니다.'));
  assert.ok(check([{ type: 'text', text: '죄송합니다. 앞으로 한국어로 쓰겠습니다.' }]));
  assert.equal(check([{ type: 'tool_use', name: 'Write' }, { type: 'text', text: '죄송합니다. 검사를 만들었습니다.' }]), null);
  const orders = '1. 소리 없는거 다 추가\n2. 배경 음악 필요\n3. 환경음도 필요';
  assert.ok(check([{ type: 'text', text: '어떤 방식으로 할까요?' }], orders));
  assert.equal(check([{ type: 'tool_use', name: 'Edit' }, { type: 'text', text: '넣었습니다.' }], orders), null);
  assert.equal(check([{ type: 'text', text: '넣었습니다.' }], '1. 하나만\n그리고 질문'), null);
  const closing = 'The sounds are swapped in. The Unity editor has closed, so the new sounds load the next time you open it.';
  assert.ok(check(withLastMessage([{ type: 'text', text: '넣었습니다.' }], closing)), 'closing text missing from the transcript is still checked');
  assert.equal(withLastMessage([{ type: 'text', text: closing }], closing).length, 1);
  console.log('ok');
  process.exit(0);
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const { transcript_path: transcript, stop_hook_active: active, last_assistant_message: last } = JSON.parse(input);
  if (active || !fs.existsSync(transcript ?? '')) return;
  const { asked, parts } = turnEntries(fs.readFileSync(transcript, 'utf8').split('\n'));
  const reason = check(withLastMessage(parts, last), asked);
  if (reason) console.log(JSON.stringify({ decision: 'block', reason }));
});
