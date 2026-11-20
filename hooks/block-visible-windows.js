// PreToolUse hook (Bash, PowerShell): deny PC commands that open a visible window and take the user's focus.
const CHECKS = [
  { launches: /unity(\.exe)?\b/i, allowed: /-batchmode/i, what: 'Unity를 -batchmode 없이' },
  { launches: /blender(\.exe)?\b/i, allowed: /\s(-b|--background)\b/i, what: 'Blender를 -b 없이' },
  { launches: /chrome(\.exe)?\b/i, allowed: /--headless/i, what: 'Chrome 창을' },
  { launches: /start-process/i, allowed: /-WindowStyle\s+Hidden/i, what: 'Start-Process를 -WindowStyle Hidden 없이' },
];
const LAUNCH = /start-process|(^|[;|&(]\s*)(start\s|&\s|"[^"]*\.exe"|[^\s"]*\.exe\b)/im;

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const command = JSON.parse(input).tool_input?.command ?? '';
  if (!LAUNCH.test(command)) return;
  const hit = CHECKS.find(check => check.launches.test(command) && !check.allowed.test(command));
  if (!hit) return;
  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: `${hit.what} 실행하면 사용자 화면에 창이 떠서 hook이 막는다. 창 없는 방법(batchmode, -b, 이미 열린 에디터의 MCP, Claude in Chrome의 기존 탭)을 쓰고, 그래도 안 되면 보고한다.`,
    },
  }));
});
