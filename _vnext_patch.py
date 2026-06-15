import re
from pathlib import Path

root = Path(__file__).resolve().parent

TOP_BAR = """  <div class="top-contact-bar">
    <div class="top-contact-inner">
      <div class="top-contact-left">欢迎进入 GoxEDGE 出海战略书籍配套站</div>
      <div class="top-contact-right" aria-label="联系方式">
        <span class="top-contact-item">合作咨询：<a href="tel:400-600-2950">400-600-2950</a></span>
        <span class="top-contact-item">联系邮箱：<a href="mailto:info@goxedge.com">info@goxedge.com</a></span>
      </div>
    </div>
  </div>
"""

ROOT_NAV = """      <a class="nav-link" href="index.html">首页</a>
      <a class="nav-link" data-site-config="showBookDetails" href="book/index.html">图书</a>
      <a class="nav-link" data-site-config="showFullFramework" href="model/index.html">模型</a>
      <a class="nav-link" data-site-config="showChapterGuide" href="chapters/index.html">章节</a>
      <a class="nav-link" data-site-config="showResourcePreview" href="resources/index.html">资源</a>
      <a class="nav-link" href="contact/index.html">企业共读</a>
      <a class="nav-link" href="about/index.html">关于</a>"""

ONE_NAV = """      <a class="nav-link" href="../index.html">首页</a>
      <a class="nav-link" data-site-config="showBookDetails" href="../book/index.html">图书</a>
      <a class="nav-link" data-site-config="showFullFramework" href="../model/index.html">模型</a>
      <a class="nav-link" data-site-config="showChapterGuide" href="../chapters/index.html">章节</a>
      <a class="nav-link" data-site-config="showResourcePreview" href="../resources/index.html">资源</a>
      <a class="nav-link" href="../contact/index.html">企业共读</a>
      <a class="nav-link" href="../about/index.html">关于</a>"""

ROOT_CTA = """      <a class="v4-btn v4-btn-primary" data-site-config="showResourcePreview" href="resources/index.html">获取配套资源</a>"""
ONE_CTA = """      <a class="v4-btn v4-btn-primary" data-site-config="showResourcePreview" href="../resources/index.html">获取配套资源</a>"""

ROOT_FOOTER_COLS = """      <div class="v4-footer-col footer-col"><h4>GoxEDGE</h4><a href="book/index.html">图书</a><a href="model/index.html">模型</a><a href="chapters/index.html">章节</a><a href="resources/index.html">资源</a></div>
      <div class="v4-footer-col footer-col"><h4>连接</h4><a href="contact/index.html">企业共读</a><a href="contact/index.html">联系与合作</a><a href="https://goxglobe.com" target="_blank" rel="noopener noreferrer">GoxGlobe 企业服务站</a></div>
      <div class="v4-footer-col footer-col"><h4>后续观察</h4><a href="updates/index.html">Minvista 更新</a></div>
      <div class="v4-footer-col footer-col"><h4>说明</h4><a href="privacy/index.html">隐私说明</a><a href="terms/index.html">使用条款</a><a href="sitemap/index.html">站点地图</a></div>"""

ONE_FOOTER_COLS = """      <div class="v4-footer-col footer-col"><h4>GoxEDGE</h4><a href="../book/index.html">图书</a><a href="../model/index.html">模型</a><a href="../chapters/index.html">章节</a><a href="../resources/index.html">资源</a></div>
      <div class="v4-footer-col footer-col"><h4>连接</h4><a href="../contact/index.html">企业共读</a><a href="../contact/index.html">联系与合作</a><a href="https://goxglobe.com" target="_blank" rel="noopener noreferrer">GoxGlobe 企业服务站</a></div>
      <div class="v4-footer-col footer-col"><h4>后续观察</h4><a href="../updates/index.html">Minvista 更新</a></div>
      <div class="v4-footer-col footer-col"><h4>说明</h4><a href="../privacy/index.html">隐私说明</a><a href="../terms/index.html">使用条款</a><a href="../sitemap/index.html">站点地图</a></div>"""

PUBLIC_FILES = [
    "index.html", "404.html", "book/index.html", "model/index.html", "chapters/index.html",
    "resources/index.html", "purchase/index.html", "updates/index.html", "about/index.html",
    "contact/index.html", "privacy/index.html", "terms/index.html", "cases/index.html",
    "tools/index.html", "sitemap/index.html",
]

ACTIVE_MAP = {
    "index.html": "index.html",
    "404.html": None,
    "book/index.html": "../book/index.html",
    "model/index.html": "../model/index.html",
    "chapters/index.html": "../chapters/index.html",
    "resources/index.html": "../resources/index.html",
    "purchase/index.html": None,
    "updates/index.html": None,
    "about/index.html": "../about/index.html",
    "contact/index.html": "../contact/index.html",
    "privacy/index.html": None,
    "terms/index.html": None,
    "cases/index.html": None,
    "tools/index.html": None,
    "sitemap/index.html": None,
}


def nav_block(rel, active_href):
    base = ROOT_NAV if rel in ("index.html", "404.html") else ONE_NAV
    lines = base.split("\n")
    out = []
    for line in lines:
        m = re.search(r'href="([^"]+)"', line)
        if m and active_href and m.group(1) == active_href:
            line = line.replace('class="nav-link"', 'class="nav-link active"')
        elif 'class="nav-link active"' in line and (not active_href or (m and m.group(1) != active_href)):
            line = line.replace('class="nav-link active"', 'class="nav-link"')
        out.append(line)
    return "\n".join(out)


def patch_file(rel):
    path = root / rel
    if not path.exists():
        return
    text = path.read_text(encoding="utf-8")
    is_root = rel in ("index.html", "404.html")

    # Move top bar inside header
    text = re.sub(
        r'<div class="top-contact-bar">.*?</div>\s*</div>\s*<header class="(v4-header|gx-header)">',
        r'<header class="\1">\n' + TOP_BAR,
        text,
        count=1,
        flags=re.DOTALL,
    )
    if '<div class="top-contact-bar">' in text and '<header' in text:
        text = re.sub(
            r'<div class="top-contact-bar">.*?</div>\s*</div>\s*',
            '',
            text,
            count=1,
            flags=re.DOTALL,
        )
        text = text.replace('<header class="v4-header">', '<header class="v4-header">\n' + TOP_BAR, 1)
        text = text.replace('<header class="gx-header">', '<header class="gx-header">\n' + TOP_BAR, 1)

    # Replace nav block
    text = re.sub(
        r'<nav class="(?:v4-nav|gx-nav) nav-menu"[^>]*>.*?</nav>',
        '<nav class="v4-nav nav-menu" aria-label="主导航">\n' + nav_block(rel, ACTIVE_MAP.get(rel)) + '\n    </nav>',
        text,
        count=1,
        flags=re.DOTALL,
    )

    # CTA
    text = re.sub(
        r'<a class="(?:v4-btn v4-btn-primary|gx-btn gx-btn-primary btn btn-primary)"[^>]*data-site-config="showResourcePreview"[^>]*>[^<]+</a>',
        ROOT_CTA if is_root else ONE_CTA,
        text,
        count=1,
    )

    # Footer cols - v4 footer pattern
    text = re.sub(
        r'<div class="v4-footer-col footer-col"><h4>图书与模型</h4>.*?</div>\s*<div class="v4-footer-col footer-col"><h4>配套资源</h4>.*?</div>\s*<div class="v4-footer-col footer-col"><h4>读者服务</h4>.*?</div>\s*<div class="v4-footer-col footer-col"><h4>说明</h4>.*?</div>',
        ONE_FOOTER_COLS if not is_root else ROOT_FOOTER_COLS,
        text,
        count=1,
        flags=re.DOTALL,
    )
    # compact footer without footer-col class
    text = re.sub(
        r'<div class="v4-footer-col"><h4>图书与模型</h4>.*?</div>\s*<div class="v4-footer-col"><h4>配套资源</h4>.*?</div>\s*<div class="v4-footer-col"><h4>读者服务</h4>.*?</div>\s*<div class="v4-footer-col"><h4>说明</h4>.*?</div>',
        ONE_FOOTER_COLS.replace(' footer-col', '') if not is_root else ROOT_FOOTER_COLS.replace(' footer-col', ''),
        text,
        count=1,
        flags=re.DOTALL,
    )

    # Remove footer hidden for public pages except obsolete
    if rel not in ("cases/index.html", "tools/index.html") and 'data-obsolete-page' not in text:
        text = text.replace('<div data-site-config="showBookDetails" hidden>', '<div data-site-config="showBookDetails">')

    path.write_text(text, encoding="utf-8")
    print("patched", rel)


for f in PUBLIC_FILES:
    patch_file(f)
