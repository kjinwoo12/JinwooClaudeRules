// PreToolUse hook (PC, SendUserFile): sound files go to the user playable, never as download-only cards (display 'attach').
const AUDIO = /\.(wav|mp3|ogg|flac|m4a|aiff?)$/i;

function check(args) {
  if (args?.display === 'attach' && (args.files ?? []).some(file => AUDIO.test(file))) {
    return '소리 파일은 사용자가 바로 들을 수 있게 보낸다(user 11/27 「아까는 사운드 재생할 수 있게 줬잖아」). display를 빼고 다시 보낸다.';
  }
  return null;
}

if (process.argv[2] === '--test') {
  const assert = require('assert');
  assert.ok(check({ files: ['F:/a/parry_mix_1.wav'], display: 'attach' }));
  assert.equal(check({ files: ['F:/a/parry_mix_1.wav'] }), null);
  assert.equal(check({ files: ['F:/a/report.xlsx'], display: 'attach' }), null);
  console.log('ok');
  process.exit(0);
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const reason = check(JSON.parse(input).tool_input);
  if (reason) {
    console.log(JSON.stringify({
      hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason },
    }));
  }
});
