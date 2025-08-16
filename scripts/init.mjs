// scripts/init.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const appName = (process.argv[2] || '').trim() || path.basename(process.cwd());

function editJSON(file, mutate) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  mutate(json);
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n');
}

function walkFiles(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      const s = fs.statSync(p);
      if (s.isDirectory()) {
        if (['.git', 'node_modules', '.next', '.turbo'].includes(f)) continue;
        stack.push(p);
      } else out.push(p);
    }
  }
  return out;
}

function replaceAllInRepo(pairs) {
  for (const file of walkFiles(process.cwd())) {
    let text = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const [from, to] of pairs) {
      const next = text.split(from).join(to);
      if (next !== text) {
        text = next;
        changed = true;
      }
    }
    if (changed) fs.writeFileSync(file, text);
  }
}

console.log(`⏳ Initializing "${appName}"...`);

// 1) package.json name + cleanup
if (fs.existsSync('package.json')) {
  editJSON('package.json', (pkg) => {
    pkg.name = appName;
    delete pkg.repository;
    delete pkg.homepage;
    delete pkg.bugs;
  });
}

// 2) placeholder swaps
replaceAllInRepo([
  ['__APP_NAME__', appName],
  ['**APP_NAME**', appName],
]);

// 3) reset git history
if (fs.existsSync('.git')) fs.rmSync('.git', { recursive: true, force: true });
execSync('git init', { stdio: 'inherit' });
execSync('git add -A', { stdio: 'inherit' });
execSync('git commit -m "chore: scaffold from template"', { stdio: 'inherit' });

console.log('✅ Done. Set your remote and push when ready.');
