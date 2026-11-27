// PreToolUse hook (PC, Bash/PowerShell): player builds and release zips go in the work folder's Builds folder, never F:\Builds.
const OLD = /(^|[^A-Za-z0-9_\\/.-])F:[\\/]+Builds\b/i;

function check(command) {
  if (!OLD.test(command ?? '')) return null;
  return '빌드와 배포 zip은 F:\\git\\ProjectGilOrganization\\Builds에 둔다(user 11/28 「다음부턴 거기 말고 F:\\git\\ProjectGilOrganization\\Builds 에 올리도록 해」). F:\\Builds는 쓰지 않는다.';
}

if (process.argv[2] === '--test') {
  const assert = require('assert');
  assert.ok(check('manage_build {"output_path":"F:/Builds/Gil-v0.1.0/ProjectGilRpgClient.exe"}'));
  assert.ok(check("Compress-Archive -DestinationPath 'F:\\Builds\\Gil-v0.1.0-win64.zip'"));
  assert.equal(check('manage_build {"output_path":"F:/git/ProjectGilOrganization/Builds/Gil-v0.1.1/x.exe"}'), null);
  assert.equal(check('dir F:\\git\\ProjectGilOrganization\\Builds'), null);
  console.log('ok');
  process.exit(0);
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const reason = check(JSON.parse(input).tool_input?.command);
  if (reason) {
    console.log(JSON.stringify({
      hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason },
    }));
  }
});
