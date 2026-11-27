// PreToolUse hook (PC, browser tools): creating a new Google Doc, Sheet, or Slides file asks the user first.
// System features (menus, settings, tools) keep their spec in the thread (dev:feature-flow step 2).
const CREATE = /docs\.google\.com\/(document|spreadsheets|presentation)\/create/;

function check(args) {
  if (!CREATE.test(JSON.stringify(args ?? {}))) return null;
  return '새 Google 문서를 만든다. 메뉴, 설정, 도구 같은 시스템 기능의 기획은 Drive 문서 없이 스레드에서 한다(user 11/27 「이건 굳이 구글 시트로 설계 안해도 되는디」, dev:feature-flow 2단계). 게임 기획 내용일 때만 허용한다.';
}

if (process.argv[2] === '--test') {
  const assert = require('assert');
  assert.ok(check({ url: 'https://docs.google.com/document/create?folder=abc' }));
  assert.ok(check({ actions: [{ name: 'navigate', input: { url: 'docs.google.com/spreadsheets/create' } }] }));
  assert.equal(check({ url: 'https://docs.google.com/document/d/abc/edit' }), null);
  assert.equal(check({ url: 'https://drive.google.com/drive/folders/abc' }), null);
  console.log('ok');
  process.exit(0);
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const reason = check(JSON.parse(input).tool_input);
  if (reason) {
    console.log(JSON.stringify({
      hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'ask', permissionDecisionReason: reason },
    }));
  }
});
