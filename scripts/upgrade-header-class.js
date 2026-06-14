const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function walk(dir, files = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory() && f !== 'node_modules' && f !== 'scripts') {
      walk(p, files);
    } else if (f.endsWith('.html')) {
      files.push(p);
    }
  }
  return files;
}

let count = 0;
for (const file of walk(root)) {
  let content = fs.readFileSync(file, 'utf8');
  const updated = content.replace(
    /<header class="site-header">/g,
    '<header class="site-header site-header-pro">'
  );
  if (updated !== content) {
    fs.writeFileSync(file, updated);
    count += 1;
  }
}
console.log('headers upgraded:', count);
