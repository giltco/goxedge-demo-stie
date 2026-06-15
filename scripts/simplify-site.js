const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function walk(dir, files = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory() && f !== 'node_modules' && f !== 'scripts') walk(p, files);
    else if (f.endsWith('.html')) files.push(p);
  }
  return files;
}

let count = 0;
for (const file of walk(root)) {
  let s = fs.readFileSync(file, 'utf8');
  let orig = s;

  s = s.replace(/data-site-config="showTools" hidden href="([^"]*resources[^"]*)">获取配套资源/g,
    'data-site-config="showResourcePreview" hidden href="$1">获取配套资源');

  s = s.replace(/<a href="[^"]*tools\/readiness-check[^"]*">企业拓展自测表<\/a>/g, '');
  s = s.replace(/<a href="[^"]*tools\/market-selection[^"]*">目标市场判断模板<\/a>/g, '');
  s = s.replace(/<a href="[^"]*tools\/action-plan[^"]*">行动计划模板<\/a>/g, '');
  s = s.replace(/<a href="[^"]*tools\/readiness-check[^"]*">企业拓展自测表<\/a>/g, '');
  s = s.replace(/<div class="card"><h3>企业拓展自测表<\/h3>[\s\S]*?<\/div>\s*/g, '');
  s = s.replace(/<div class="card"><h3>目标市场判断模板<\/h3>[\s\S]*?<\/div>\s*/g, '');
  s = s.replace(/<div class="card"><h3>行动计划模板<\/h3>[\s\S]*?<\/div>\s*/g, '');

  s = s.replace(/\s*bg-resources-index/g, '');
  s = s.replace(/\s*bg-chapters-path/g, '');
  s = s.replace(/\s*bg-minvista-lab/g, '');
  s = s.replace(/\s*bg-contact-network/g, '');
  s = s.replace(/\s*bg-model-structure/g, '');
  s = s.replace(/\s*bg-hero-strategy/g, '');
  s = s.replace(/\s*bg-footer-structure/g, '');
  s = s.replace(/class="site-header site-header"/g, 'class="site-header"');
  s = s.replace(/<section class="">/g, '<section>');

  if (s !== orig) {
    fs.writeFileSync(file, s);
    count++;
    console.log(path.relative(root, file));
  }
}
console.log('updated', count);
