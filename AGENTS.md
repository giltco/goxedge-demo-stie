# AGENTS.md — GoxEDGE.com Companion Resource Site

Working rules for anyone (human or agent) editing the goxedge.com codebase.

---

## Project context

**goxedge.com** is the companion resource website for the book **《出海战略：从走出去到走下去》** (author: 何敏, publisher: 机械工业出版社).

**GoxEDGE** is the strategic model / method brand **inside the book** — the **GoxEDGE 全球拓展战略模型**. It is **not** the book title.

Authoritative sources for public copy:

1. `出海战略全解_GoxEDGE_V10.3.0.pdf` (manuscript)
2. `出海战略全解_GoxEDGE_书籍配套信息.docx` (book companion information)

**Existing website copy is not source of truth.** Align all public content with the manuscript and companion doc.

Current target phase: **`release-ready`** — polished and publication-ready; final assets (ISBN, cover, purchase links, QR, downloads) may still be placeholders.

---

## Correct naming

| Use | Do not use |
|-----|------------|
| 《出海战略》 | 《GoxEDGE》 |
| 《出海战略：从走出去到走下去》 | GoxEDGE book / GoxEDGE 图书 |
| GoxEDGE 全球拓展战略模型 | GoxEDGE as book title |
| 《出海战略》读者配套资源站 | |

**GoxEDGE** in nav/brand mark = model site identity at goxedge.com, not book title.

---

## Public positioning

The site supports book launch and reader follow-up:

- Book introduction
- GoxEDGE model explanation
- Companion resources (charts, appendices, tools)
- Chapter reading guidance
- Minvista reader updates
- Low-key reader / media / enterprise discussion contact

It must **not** feel like a SaaS product, AI tool, consulting sales funnel, or GILTCO ecosystem site.

---

## Primary navigation (release-ready)

首页 · 图书 · 模型 · 资源 · 章节 · Minvista · 联系

**Do not show:** GILTOS Demo, GILTCO ecosystem, GoxGlobe as main CTA, case library, certification, academy, SaaS platform links.

---

## Config files

| File | Purpose |
|------|---------|
| `assets/js/book-config.js` | `BOOK_CONFIG` — titles, author, publisher, purchase links, Minvista, cover |
| `assets/js/site-config.js` | `SITE_CONFIG` — `launchPhase` and `show*` flags |
| `assets/js/resources-config.js` | Resource catalog (8 approved categories) |
| `assets/js/chapters-config.js` | Reading paths + TOC (V10.3.0) |

`assets/js/site-phase.js` applies flags on load — no build step.

### Release-ready flags (default)

```
launchPhase: 'release-ready'
showBookDetails, showFullFramework, showResourcePreview, showTools: true
showChapterGuide, showChartIndex: true
showCaseLibrary, showGiltosDemo: false
showPurchaseLinks: true, showDownloads: false
showMinvistaCTA, showContactCTA, showEnterpriseInquiry: true
```

---

## Do not invent

- ISBN, publication date, cover image path
- Purchase links (JD, Dangdang, ebook, WeChat Reading)
- Minvista QR code image
- Download file URLs
- Testimonials, recommendation names
- Fake case study pages or company logos

Empty fields show graceful placeholders: 即将更新, 随书更新, 购买链接将在正式上架后更新, 二维码即将更新.

---

## Product boundaries

1. **GoxEDGE** — Model / method brand; companion resources for 《出海战略》.
2. **GILTOS** — Hidden (`showGiltosDemo: false`). No demo CTAs in HTML or nav.
3. **GILTCO / GoxGlobe** — Not main narrative. No ecosystem framing.
4. **Minvista** — Official reader update and contact channel.
5. **Cases** — Book uses composite anonymized cases (Avora Motors, etc.); no public case detail pages.

---

## Copy and tone

Professional, restrained, publication-ready, method-oriented, reader-service-oriented.

Avoid: AI hype, SaaS language, consulting buzzwords, urgency tricks, overpromising downloads.

---

## Launch-day checklist

Edit `book-config.js` when confirmed:

- [ ] `publicationDate`, `isbn`, `coverImage`
- [ ] `jdLink`, `dangdangLink`, `ebookLink`, `wechatReadingLink`
- [ ] `minvistaQRCode`, `contactEmail`
- [ ] `SITE_CONFIG.showDownloads` → true when files ready
- [ ] `SITE_CONFIG.launchPhase` → `launch`
- [ ] `sitemap.xml` verified

---

## Technical notes

- Static HTML + `assets/css/styles.css` + JS configs. GitHub Pages; `CNAME` → goxedge.com.
- Batch-update nav/footer across ~17 HTML files when changing chrome.
- Preserve prelaunch blocks (`data-site-prelaunch-only`) for phase reversibility.

---

## When in doubt

Default to **less exposure**. Do not use GoxEDGE as the book title. Do not expose GILTOS or invent publication assets.
