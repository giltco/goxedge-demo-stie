const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function depthPrefix(file) {
  const rel = path.relative(root, path.dirname(file)).replace(/\\/g, '/');
  if (!rel || rel === '.') return '';
  const n = rel.split('/').length;
  return new Array(n + 1).join('../');
}

function navHtml(prefix, active) {
  const links = [
    ['home', '首页', prefix + 'index.html', ''],
    ['book', '图书', prefix + 'book/index.html', 'showBookDetails'],
    ['model', '模型', prefix + 'model/index.html', 'showFullFramework'],
    ['resources', '资源', prefix + 'resources/index.html', 'showResourcePreview'],
    ['chapters', '章节', prefix + 'chapters/index.html', 'showChapterGuide'],
    ['updates', 'Minvista', prefix + 'updates/index.html', ''],
    ['contact', '联系', prefix + 'contact/index.html', '']
  ];
  const nav = links.map(([key, label, href, flag]) => {
    const cls = key === active ? 'nav-link active' : 'nav-link';
    if (flag) {
      return `      <a class="${cls}" data-site-config="${flag}" hidden href="${href}">${label}</a>`;
    }
    return `      <a class="${cls}" href="${href}">${label}</a>`;
  }).join('\n');

  return `    <nav class="nav-menu" aria-label="主导航">\n${nav}\n    </nav>
    <div class="nav-actions">
      <a class="btn btn-secondary" data-site-cta="showContactCTA" href="${prefix}contact/index.html">联系</a>
      <a class="btn btn-primary" data-site-cta="showMinvistaCTA" href="${prefix}updates/index.html">关注 Minvista</a>
      <a class="btn btn-secondary" data-site-config="showTools" hidden href="${prefix}resources/index.html">获取配套资源</a>
    </div>`;
}

function footerHtml(prefix) {
  return `<footer class="site-footer">
  <div data-site-config="showBookDetails" hidden>
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="brand" href="${prefix}index.html"><span class="brand-mark">G</span><span class="brand-text">GoxEDGE</span></a>
        <p>《出海战略》读者配套资源站，提供图书介绍、GoxEDGE 全球拓展战略模型、章节导读、配套资源与读者更新。</p>
        <p class="footer-minvista-note">读者更新首选渠道：Minvista 思维实验室</p>
      </div>
      <div class="footer-col"><h4>图书与模型</h4><a href="${prefix}book/index.html">图书介绍</a><a href="${prefix}model/index.html">GoxEDGE 模型</a><a href="${prefix}chapters/index.html">章节导读</a></div>
      <div class="footer-col"><h4>配套资源</h4><a href="${prefix}resources/index.html">资源中心</a><a href="${prefix}tools/readiness-check/index.html">企业拓展自测表</a><a href="${prefix}tools/market-selection/index.html">目标市场判断模板</a><a href="${prefix}tools/action-plan/index.html">行动计划模板</a></div>
      <div class="footer-col"><h4>读者服务</h4><a href="${prefix}updates/index.html">Minvista 更新</a><a href="${prefix}contact/index.html">联系交流</a><a href="${prefix}about/index.html">关于本书</a></div>
      <div class="footer-col"><h4>说明</h4><a href="${prefix}privacy/index.html">隐私说明</a><a href="${prefix}terms/index.html">使用条款</a><a href="${prefix}sitemap/index.html">站点地图</a></div>
    </div>
    <div class="container footer-bottom"><span>© 2026 GoxEDGE. All rights reserved.</span><span>图书配套资源站｜正式内容以图书定稿与出版信息为准</span></div>
  </div>
</footer>
<script src="${prefix}assets/js/book-config.js"></script>
<script src="${prefix}assets/js/site-config.js"></script>
<script src="${prefix}assets/js/book-info.js"></script>
<script src="${prefix}assets/js/site-phase.js"></script>
<script src="${prefix}assets/js/main.js"></script>`;
}

const activeMap = {
  'index.html': 'home',
  'book/index.html': 'book',
  'model/index.html': 'model',
  'resources/index.html': 'resources',
  'chapters/index.html': 'chapters',
  'updates/index.html': 'updates',
  'contact/index.html': 'contact',
  'about/index.html': '',
  'privacy/index.html': '',
  'terms/index.html': '',
  'sitemap/index.html': '',
  'cases/index.html': '',
  'tools/index.html': '',
  'tools/readiness-check/index.html': '',
  'tools/market-selection/index.html': '',
  'tools/action-plan/index.html': '',
  '404.html': ''
};

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === 'scripts') continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, files);
    else if (ent.name.endsWith('.html')) files.push(p);
  }
  return files;
}

const replacements = [
  [/《GoxEDGE》/g, '《出海战略》'],
  [/《GoxEDGE 全球拓展卓越实践》/g, '《出海战略：从走出去到走下去》'],
  [/GoxEDGE 全球拓展卓越实践/g, '《出海战略：从走出去到走下去》'],
  [/GoxEDGE 图书/g, '《出海战略》'],
  [/GoxEDGE book/gi, '《出海战略》'],
  [/showChapterMapping/g, 'showChapterGuide'],
  [/data-site-config="showCases"[^>]*>\s*案例<\/a>\s*/g, ''],
  [/href="[^"]*cases\/[^"]*"[^>]*>案例与场景<\/a>\s*/g, ''],
  [/href="[^"]*cases\/[^"]*"[^>]*>案例<\/a>\s*/g, ''],
  [/<a[^>]*giltos\.com[^>]*>[\s\S]*?<\/a>\s*/gi, ''],
  [/GoxEDGE 框架/g, 'GoxEDGE 模型'],
  [/图书与框架/g, '图书与模型'],
  [/作者与项目/g, '关于本书'],
  [/联系合作/g, '联系交流'],
  [/方法框架/g, 'GoxEDGE 全球拓展战略模型']
];

for (const file of walk(root)) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  let html = fs.readFileSync(file, 'utf8');
  const prefix = depthPrefix(file);

  for (const [re, rep] of replacements) {
    html = html.replace(re, rep);
  }

  const navStart = html.indexOf('<nav class="nav-menu"');
  const headerEnd = html.indexOf('</header>');
  if (navStart !== -1 && headerEnd !== -1) {
    const before = html.slice(0, navStart);
    const after = html.slice(headerEnd);
    const active = activeMap[rel] || '';
    html = before + navHtml(prefix, active) + '\n  ' + after;
  }

  const footStart = html.indexOf('<footer class="site-footer">');
  const bodyEnd = html.indexOf('</body>');
  if (footStart !== -1 && bodyEnd !== -1) {
    html = html.slice(0, footStart) + footerHtml(prefix) + '\n' + html.slice(bodyEnd);
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log('Updated', rel);
}
