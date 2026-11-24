// PreToolUse hook (Bash, PowerShell, mcp__github__create_branch|merge_pull_request): no rebase, git clean, or stash; team branch names; merge method by base; no editor noise or middle dot in commits. argv[2]: team repo name.
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const TEAM = (process.argv[2] ?? '').toLowerCase();
const BRANCH_OK = /^(feature\/\d+-[a-z0-9]+(-[a-z0-9]+)*|release\/\S+|hotfix\/\S+)$/;
const GIT = /(?:^|[;&|(\n])\s*git(?:\s+-C\s+("[^"]*"|'[^']*'|\S+))?\s+(\S+)([^\n;|&]*)/g;
const GH_MERGE = /(?:^|[;&|(\n])\s*gh\s+pr\s+merge\b([^\n;|&]*)/;
const WINGET_GH = path.join(process.env.LOCALAPPDATA ?? '', 'Programs', 'GitHub CLI', 'bin', 'gh.exe');
const GH = fs.existsSync(WINGET_GH) ? WINGET_GH : 'gh';
const REFS = ['--json', 'baseRefName,headRefName', '-q', '.baseRefName + " " + .headRefName'];
const NOISE = [
  { file: / SDF\.asset$/, status: 'M' },
  { file: /Build Profiles\// },
  { file: /ProjectSettings\/AudioManager\.asset$/, added: /m_DisableAudio: 1/ },
  { file: /UniversalRP[^/]*\.asset$/, every: /m_Prefilter/ },
  { file: /UniversalRenderPipelineGlobalSettings\.asset$/, every: /\brid: -?\d+|type: \{class:|^\s*data:\s*$/ },
  { file: /ProjectSettings\/ProjectSettings\.asset$/, every: /[Ss]plash|[Ff]ullscreen|[Ww]indow|runInBackground|preloadedAssets|managedCodeVariant|^\s*- \{fileID/ },
];

function deny(reason) {
  console.log(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason },
  }));
  process.exit(0);
}

const unquote = text => text.replace(/^["']|["']$/g, '');
const run = (cmd, args, cwd) => { try { return execFileSync(cmd, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };

// `commit -a` commits tracked changes, so compare against HEAD instead of the index.
function noisePaths(dir, all) {
  const diff = all ? ['diff', 'HEAD'] : ['diff', '--cached'];
  const staged = run('git', [...diff, '--name-status'], dir).split('\n').filter(Boolean).map(line => line.split('\t'));
  return staged.filter(([status, file]) => NOISE.some(rule => {
    if (!rule.file.test(file) || (rule.status && status[0] !== rule.status)) return false;
    const lines = run('git', [...diff, '-U0', '--', file], dir).split('\n').filter(line => /^[+-](?![+-]{2})/.test(line));
    if (rule.added) return lines.some(line => line[0] === '+' && rule.added.test(line));
    return !rule.every || (lines.length > 0 && lines.every(line => rule.every.test(line.slice(1))));
  })).map(([, file]) => file);
}

// Feature PRs squash into develop; PRs into main and the main -> develop sync use a merge commit.
function checkMerge(refs, method) {
  const [base, head] = refs.split(/\s+/).map(ref => ref.split(':').pop());
  const expected = base === 'main' || head === 'main' ? 'merge' : base === 'develop' ? 'squash' : null;
  if (method === 'rebase' || (expected && method !== expected)) deny(`이 PR은 ${expected ?? 'squash나 merge'}로 머지한다(develop은 squash, main과 main→develop 동기화는 merge commit).`);
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const { tool_name: tool, tool_input: args, cwd } = JSON.parse(input);
  if (tool.endsWith('create_branch')) {
    if (args.repo?.toLowerCase() === TEAM && !BRANCH_OK.test(args.branch)) deny(`팀 저장소 브랜치 이름은 feature/<이슈번호>-<영어-소문자>, release/*, hotfix/*다: ${args.branch}`);
    return;
  }
  if (tool.endsWith('merge_pull_request')) {
    if (args.repo?.toLowerCase() !== TEAM) return;
    const marker = path.join(os.tmpdir(), `pr-base-${TEAM}-${args.pullNumber}`);
    const refs = fs.existsSync(marker) ? fs.readFileSync(marker, 'utf8')
      : run(GH, ['pr', 'view', String(args.pullNumber), '-R', `${args.owner}/${args.repo}`, ...REFS]);
    if (!refs.trim()) deny('머지 방식을 고르려면 PR의 base를 알아야 한다. pull_request_read(method get)로 이 PR을 먼저 읽고 다시 머지한다.');
    checkMerge(refs, args.merge_method ?? 'merge');
    return;
  }
  const command = args?.command ?? '';
  for (const [, dirArg, sub, rest] of command.matchAll(GIT)) {
    const dir = dirArg ? path.resolve(cwd ?? '.', unquote(dirArg)) : cwd;
    if (sub === 'rebase' || (sub === 'pull' && /--rebase\b|\s-r\b/.test(rest))) deny('rebase하지 않는다. 원격이 앞서면 pull(merge)한다.');
    if (sub === 'clean' && !/\s(-n|--dry-run)\b/.test(rest)) deny('git clean은 쓰지 않는다. 추적 안 되는 파일은 목록으로 보고하고, 노이즈는 그 경로만 지운다.');
    if (sub === 'stash' && !/^\s+(list|show)\b/.test(rest)) deny('stash하지 않는다. 노이즈는 git restore로 버리고, 남의 작업은 그대로 둔다(unity-editor-noise).');
    const created = rest.match(sub === 'switch' ? /\s-[cC]\s+(\S+)/ : sub === 'checkout' ? /\s-[bB]\s+(\S+)/ : sub === 'branch' ? /^\s+([^-\s]\S*)/ : null);
    if (created && run('git', ['remote', '-v'], dir).toLowerCase().includes(TEAM) && !BRANCH_OK.test(unquote(created[1]))) {
      deny(`팀 저장소 브랜치 이름은 feature/<이슈번호>-<영어-소문자>, release/*, hotfix/*다: ${created[1]}`);
    }
    if (sub === 'commit' && rest.includes('·')) deny('가운뎃점(·)은 쓰지 않는다. 쉼표나 와/과로 쓴다.');
    if (sub === 'commit' && /\bgit\b[^\n;|&]*\s(add|stage)\b/.test(command.slice(0, command.indexOf(rest)))) {
      deny('git add와 git commit을 한 명령으로 묶지 않는다. 노이즈 검사가 add한 뒤의 상태를 봐야 하니 따로 실행한다.');
    }
    if (sub === 'commit') {
      const noise = noisePaths(dir, /\s(-a\b|-[a-zA-Z]*a[a-zA-Z]*\b|--all\b)/.test(rest));
      if (noise.length) deny(`스테이징에 에디터 노이즈가 있다. 빼고 커밋한다(unity-editor-noise): ${noise.join(', ')}`);
    }
  }
  const merge = command.match(GH_MERGE);
  if (merge) {
    const number = merge[1].match(/^\s+(\d+)/)?.[1];
    const refs = run(GH, ['pr', 'view', ...(number ? [number] : []), ...REFS], cwd);
    const method = /\s(--squash|-s)\b/.test(merge[1]) ? 'squash' : /\s(--rebase|-r)\b/.test(merge[1]) ? 'rebase' : /\s(--merge|-m)\b/.test(merge[1]) ? 'merge' : '';
    checkMerge(refs, method);
  }
});
