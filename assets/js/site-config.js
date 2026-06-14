/**

 * GoxEDGE.com launch phase configuration.

 *

 * Phases: prelaunch | release-ready | launch

 * Edit launchPhase and show* flags here to switch site modes.

 * See presets and launch-day checklist at the bottom of this file.

 *

 * Homepage section flags (index.html):

 *   showBookDetails         — Book details block + /book/ page

 *   showFrameworkShort      — Short framework (prelaunch / early preview)

 *   showFullFramework       — Full GoxEDGE model + /model/ page

 *   showResourcePreview     — Companion resource types (available / coming soon)

 *   showChapterGuide        — Chapter reading paths + /chapters/ page

 *   showChartIndex          — Chart / appendix index resources

 *   showMinvistaSection     — Minvista update channel block

 *   showEnterpriseInquiry   — Low-key enterprise / reader inquiry

 *   showPurchaseLinks       — Purchase link placeholders (no URLs until confirmed)

 *   showDownloads           — Tool file download buttons (false = coming soon)

 *

 * Deep-site flags:

 *   showTools               — Tool preview pages in nav + tool cards / CTA

 *   showCaseLibrary         — Cases nav + pages (keep false in release-ready)

 *   showGiltosDemo          — GILTOS demo links (keep false)

 *

 * Legacy aliases (still honored in site-phase.js):

 *   showChapterMapping → showChapterGuide

 *   showCases → showCaseLibrary

 *

 * Book launch data: assets/js/book-config.js (BOOK_CONFIG)

 */



var SITE_CONFIG = {

  launchPhase: 'release-ready',



  showBookDetails: true,

  showFrameworkShort: false,

  showFullFramework: true,

  showResourcePreview: true,

  showChapterGuide: true,

  showChartIndex: true,

  showMinvistaSection: true,

  showEnterpriseInquiry: true,



  showTools: false,

  showCaseLibrary: false,

  showGiltosDemo: false,

  showPurchaseLinks: true,

  showDownloads: false,



  showMinvistaCTA: true,

  showContactCTA: true,



  minvistaCTAUrl: 'updates/index.html',

  minvistaCTALabel: '关注 Minvista',

  contactCTALabel: '联系作者'

};



/*

 * --- prelaunch preset ---

 *

 * launchPhase: 'prelaunch',

 * showBookDetails: false,

 * showFrameworkShort: false,

 * showFullFramework: false,

 * showResourcePreview: false,

 * showChapterGuide: false,

 * showChartIndex: false,

 * showMinvistaSection: false,

 * showEnterpriseInquiry: false,

 * showTools: false,

 * showCaseLibrary: false,

 * showGiltosDemo: false,

 * showPurchaseLinks: false,

 * showDownloads: false,

 * showMinvistaCTA: true,

 * showContactCTA: true,

 *

 * --- release-ready preset (current default) ---

 *

 * launchPhase: 'release-ready',

 * showBookDetails: true,

 * showFrameworkShort: false,

 * showFullFramework: true,

 * showResourcePreview: true,

 * showChapterGuide: true,

 * showChartIndex: true,

 * showMinvistaSection: true,

 * showEnterpriseInquiry: true,

 * showTools: false,

 * showCaseLibrary: false,

 * showGiltosDemo: false,

 * showPurchaseLinks: true,

 * showDownloads: false,

 * showMinvistaCTA: true,

 * showContactCTA: true,

 *

 * --- launch preset (final publication) ---

 *

 * launchPhase: 'launch',

 * showBookDetails: true,

 * showFrameworkShort: false,

 * showFullFramework: true,

 * showResourcePreview: true,

 * showChapterGuide: true,

 * showChartIndex: true,

 * showMinvistaSection: true,

 * showEnterpriseInquiry: true,

 * showTools: true,

 * showCaseLibrary: true,

 * showGiltosDemo: false,

 * showPurchaseLinks: true,

 * showDownloads: true,

 * showMinvistaCTA: true,

 * showContactCTA: true,

 *

 * --- Launch-day checklist (edit book-config.js + flip flags) ---

 *

 * [ ] BOOK_CONFIG.publicationDate — set when confirmed

 * [ ] BOOK_CONFIG.isbn — set when confirmed

 * [ ] BOOK_CONFIG.coverImage — upload cover, set path

 * [ ] BOOK_CONFIG.jdLink / dangdangLink / ebookLink / wechatReadingLink

 * [ ] BOOK_CONFIG.minvistaQRCode — upload QR, set path

 * [ ] BOOK_CONFIG.contactEmail — if public email confirmed

 * [ ] SITE_CONFIG.showDownloads — true when files ready

 * [ ] SITE_CONFIG.launchPhase — 'launch' when fully live

 * [ ] sitemap.xml — verify all public routes

 * [ ] robots.txt — remove any Disallow rules if added for prelaunch

 */


