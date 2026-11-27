// PC Stop hook: once per session, if this session left items at the work folder (argv[2]) top level, have it run pc-scratch-cleanup before stopping.
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = process.argv[2];

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  const { session_id: session, transcript_path: transcript, stop_hook_active: active } = JSON.parse(input);
  const marker = path.join(os.tmpdir(), `scratch-checked-${session}`);
  if (active || fs.existsSync(marker) || !fs.existsSync(transcript ?? '')) return;
  const start = fs.statSync(transcript).birthtimeMs;
  const left = fs.readdirSync(ROOT, { withFileTypes: true })
    .filter(entry => !entry.name.startsWith('.') && !/\.(md|docx|xlsx|pptx|pdf)$/i.test(entry.name))
    .filter(entry => !(entry.isDirectory() && fs.existsSync(path.join(ROOT, entry.name, '.git'))))
    .filter(entry => fs.statSync(path.join(ROOT, entry.name)).mtimeMs > start)
    .map(entry => entry.name);
  if (!left.length) return;
  fs.writeFileSync(marker, '');
  console.log(JSON.stringify({ decision: 'block', reason: `작업 폴더 최상위에 이 세션이 만든 것: ${left.join(', ')}. pc-scratch-cleanup대로 정리하고 끝낸다.` }));
});
