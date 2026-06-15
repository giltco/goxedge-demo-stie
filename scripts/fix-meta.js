const fs = require('fs');
const path = require('path');

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === 'scripts') continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, files);
    else if (ent.name.endsWith('.html')) files.push(p);
  }
  return files;
}

const root = path.join(__dirname, '..');
const reps = [
  [/GoxEDGE 出版配套资源/g, '《出海战略》读者配套资源'],
  [/出版配套资源站预览版/g, '读者配套资源站'],
  [/出版配套资源站的/g, '《出海战略》读者配套资源站的'],
  [/出版配套资源站/g, '《出海战略》读者配套资源站'],
  [/了解《出海战略》图书的/g, '了解《出海战略：从走出去到走下去》的'],
  [/配套工具｜GoxEDGE 出版配套资源/g, '配套工具说明｜《出海战略》'],
  [/｜GoxEDGE 配套工具/g, '｜《出海战略》配套工具'],
  [/GoxEDGE 配套工具总览/g, '《出海战略》配套工具说明'],
  [/返回 GoxEDGE 读者配套资源站/g, '返回《出海战略》读者配套资源站']
];

for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;
  for (const [re, rep] of reps) html = html.replace(re, rep);
  html = html.replace(
    /<p class="footer-minvista-note">读者更新首选渠道：作者公众号 <a[^>]*><span data-book-minvista-name><\/span><\/a><\/p>/g,
    '<p class="footer-minvista-note">读者更新首选渠道：Minvista 思维实验室</p>'
  );
  if (html !== orig) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(path.relative(root, file));
  }
}
