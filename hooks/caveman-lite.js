// SessionStart hook (cloud and PC): turn on caveman lite at the start of every session.
const path = require('path');

const skill = path.join(__dirname, '..', 'plugins', 'caveman', 'skills', 'caveman', 'SKILL.md');
console.log(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'SessionStart',
    additionalContext: `caveman lite is on for this session: read ${skill} and follow its 「Lite」 section until the user turns it off.`,
  },
}));
