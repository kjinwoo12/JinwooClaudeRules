// PreToolUse hook (cloud, mcp__hearthbot__post_message|request_decision): deny asking about what the rules already decide, and done-claims without evidence.
const ASK = /(할까요|드릴까요|하실래요|원하시면|괜찮을까요|어떨까요|될까요)/;
const DECIDED = /(머지|고칠|수정할|버그)/;
const DONE = /(완료|했습니다|고쳤습니다|끝났습니다|열었습니다|닫았습니다|옮겼습니다|확인했습니다)/;
const DESIGN_CHOICE = /(기획|수치|범위)/;
const EVIDENCE = /(https?:\/\/|#cmsg_|\/mnt\/project-files|`[^`]+`|「[^」]+」)/;

function deny(reason) {
  console.log(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason },
  }));
  process.exit(0);
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const { tool_name: tool, tool_input: args } = JSON.parse(input);
  const raw = tool.endsWith('request_decision')
    ? [args.question, ...(args.options ?? []).flatMap(option => [option.label, option.consequence])].join('\n')
    : args.text ?? '';
  const text = raw.replace(/「[^」]*」/g, '');
  if (DECIDED.test(text) && !DESIGN_CHOICE.test(text) && (tool.endsWith('request_decision') || ASK.test(text))) {
    deny('머지와 찾은 버그 수정은 묻지 않는다: 머지는 project info의 셀프 머지 규칙대로 하고, 버그는 바로 고친 뒤 고친 것을 보고한다. 수정이 기획 수치나 범위를 바꿀 때만 카드에 그 이유를 적어 묻는다.');
  }
  if (tool.endsWith('post_message') && ASK.test(text)) {
    deny('글로 되묻지 않는다: 시킨 일은 바로 하고, 사용자 결정이 필요하면 request_decision 카드로 묻는다.');
  }
  if (tool.endsWith('post_message') && DONE.test(text) && !EVIDENCE.test(raw)) {
    deny('했다고 말하는 답장에는 이번 턴에 확인한 근거(링크, 경로나 명령을 `코드`로, 도구 결과를 「인용」으로)를 붙인다. 확인 못 했으면 「확인 못 함」과 시도한 것을 쓴다.');
  }
});
