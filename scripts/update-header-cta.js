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

const pattern = /<div class="nav-actions">\s*<a class="btn btn-secondary" data-site-cta="showContactCTA" href="([^"]+)">联系<\/a>\s*<a class="btn btn-primary" data-site-cta="showMinvistaCTA" href="([^"]+)">关注 Minvista<\/a>\s*<a class="btn btn-secondary" data-site-config="showTools" hidden href="([^"]+)">获取配套资源<\/a>\s*<\/div>/g;

let count = 0;
for (const file of walk(root)) {
  if (file === path.join(root, 'index.html')) continue;
  let content = fs.readFileSync(file, 'utf8');
  const updated = content.replace(pattern, function (_m, _contact, minvista, resources) {
    return (
      '<div class="nav-actions">\n' +
      '      <a class="nav-cta-subtle" data-site-cta="showMinvistaCTA" href="' + minvista + '">关注 Minvista</a>\n' +
      '      <a class="btn btn-primary" data-site-config="showTools" hidden href="' + resources + '">获取配套资源</a>\n' +
      '    </div>'
    );
  });
  if (updated !== content) {
    fs.writeFileSync(file, updated);
    count += 1;
    console.log('updated:', path.relative(root, file));
  }
}
console.log('total updated:', count);
