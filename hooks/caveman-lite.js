// SessionStart hook (cloud and PC): turn on the default-on skills (caveman lite, ponytail, claude-code-setup) at the start of every session.
const path = require('path');

const plugins = path.join(__dirname, '..', 'plugins');
const skill = path.join(plugins, 'caveman', 'skills', 'caveman', 'SKILL.md');
const ponytail = path.join(plugins, 'ponytail', 'skills', 'ponytail', 'SKILL.md');
const setup = path.join(plugins, 'claude-code-setup', 'skills', 'claude-automation-recommender', 'SKILL.md');
console.log(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'SessionStart',
    additionalContext: `caveman lite is on for this session: read ${skill} and follow its 「Lite」 section until the user turns it off.\n`
      + `ponytail is on for this session: read ${ponytail} before writing or changing code in any repo and follow it.\n`
      + `claude-code-setup is on for this session: when the user asks about Claude Code setup or automations (hooks, skills, plugins, MCP servers, subagents), read ${setup} and follow it.`,
  },
}));
