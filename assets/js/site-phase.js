(function () {
  'use strict';

  var config = window.SITE_CONFIG;
  if (!config) return;

  var LINK_FLAG_RULES = [
    { test: /book\//i, flag: 'showBookDetails' },
    { test: /model\//i, flag: 'showFullFramework' },
    { test: /tools\//i, flag: 'showTools' },
    { test: /chapters\//i, flag: 'showChapterGuide' },
    { test: /cases\//i, flag: 'showCaseLibrary' },
    { test: /giltos\.com/i, flag: 'showGiltosDemo' },
    { test: /resources\//i, flag: 'showResourcePreview' }
  ];

  var PAGE_FLAG_RULES = [
    { test: /\/book\//i, flag: 'showBookDetails' },
    { test: /\/model\//i, flag: 'showFullFramework' },
    { test: /\/tools\//i, flag: 'showTools' },
    { test: /\/chapters\//i, flag: 'showChapterGuide' },
    { test: /\/cases\//i, flag: 'showCaseLibrary' },
    { test: /\/resources\//i, flag: 'showResourcePreview' }
  ];

  var FLAG_ALIASES = {
    showChapterMapping: 'showChapterGuide',
    showCases: 'showCaseLibrary'
  };

  function isEnabled(flag) {
    var alias = FLAG_ALIASES[flag];
    if (alias && config[alias] !== undefined) {
      return Boolean(config[alias]);
    }
    return Boolean(config[flag]);
  }

  function setVisible(el, visible) {
    if (!el) return;
    if (visible) {
      el.removeAttribute('hidden');
    } else {
      el.setAttribute('hidden', '');
    }
  }

  function siteRoot() {
    var path = window.location.pathname.replace(/\\/g, '/');
    var segments = path.split('/').filter(Boolean);
    if (segments.length && /\.html?$/i.test(segments[segments.length - 1])) {
      segments.pop();
    }
    return segments.length ? new Array(segments.length + 1).join('../') : '';
  }

  function flagForLink(link) {
    var href = link.getAttribute('href') || '';
    var text = link.textContent || '';
    if (/获取配套资源/.test(text)) return 'showResourcePreview';
    var i;
    for (i = 0; i < LINK_FLAG_RULES.length; i++) {
      if (LINK_FLAG_RULES[i].test.test(href)) return LINK_FLAG_RULES[i].flag;
    }
    return null;
  }

  function applyConfigSections() {
    document.querySelectorAll('[data-site-config]').forEach(function (el) {
      setVisible(el, isEnabled(el.getAttribute('data-site-config')));
    });
    applyFrameworkExclusion();
  }

  function applyFrameworkExclusion() {
    if (!isEnabled('showFullFramework')) return;
    document.querySelectorAll('[data-site-config="showFrameworkShort"]').forEach(function (el) {
      setVisible(el, false);
    });
  }

  function applyPrelaunchSections() {
    var prelaunch = config.launchPhase === 'prelaunch';
    document.querySelectorAll('[data-site-prelaunch-only]').forEach(function (el) {
      setVisible(el, prelaunch);
    });
  }

  function applyNavAndFooterLinks() {
    document.querySelectorAll('.nav-menu a, .footer-col a, .nav-actions a, .hero-actions a, .button-row a, .cta-inner a, .footer-prelaunch-links a').forEach(function (link) {
      var flag = link.getAttribute('data-site-config') || flagForLink(link);
      if (flag) setVisible(link, isEnabled(flag));
    });

    document.querySelectorAll('[data-site-cta]').forEach(function (el) {
      setVisible(el, isEnabled(el.getAttribute('data-site-cta')));
    });

    document.querySelectorAll('.footer-col').forEach(function (col) {
      var links = col.querySelectorAll('a');
      if (!links.length) return;
      var anyVisible = Array.prototype.some.call(links, function (link) {
        return !link.hasAttribute('hidden');
      });
      setVisible(col, anyVisible);
    });
  }

  function pageGateFlag() {
    var path = window.location.pathname;
    var i;
    for (i = 0; i < PAGE_FLAG_RULES.length; i++) {
      if (PAGE_FLAG_RULES[i].test.test(path)) return PAGE_FLAG_RULES[i].flag;
    }
    return null;
  }

  var GATE_COPY = {
    showTools: {
      title: '配套工具暂未开放',
      body: '相关配套工具将在图书正式发布后陆续开放。'
    },
    showCaseLibrary: {
      title: '案例索引暂不开放',
      body: '案例索引暂不开放，相关说明以图书正文与附录为准。'
    }
  };

  function applyPageGate() {
    var flag = pageGateFlag();
    if (!flag || isEnabled(flag)) return;

    var main = document.querySelector('main');
    if (!main || main.querySelector('.site-phase-notice')) return;

    Array.prototype.forEach.call(main.children, function (child) {
      setVisible(child, false);
      child.setAttribute('data-site-gated', '');
    });

    var root = siteRoot();
    var copy = GATE_COPY[flag] || {
      title: '内容暂不开放',
      body: '该页面当前未对外公开。如需了解《出海战略》配套资源，请返回首页或通过 Minvista 获取更新。'
    };
    var notice = document.createElement('section');
    notice.className = 'site-phase-notice';
    notice.innerHTML =
      '<div class="v4-container">' +
        '<div class="v4-notice">' +
          '<h2 class="v4-gate-title" style="font-family:var(--v4-font-serif);font-size:1.5rem;margin:0 0 12px;color:var(--v4-ink)">' + copy.title + '</h2>' +
          '<p style="margin:0 0 20px">' + copy.body + '</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">' +
            (isEnabled('showResourcePreview') ? '<a class="v4-btn v4-btn-primary" href="' + root + 'resources/index.html">查看配套资源</a>' : '') +
            (isEnabled('showMinvistaCTA') ? '<a class="v4-btn v4-btn-secondary" href="' + root + (config.minvistaCTAUrl || 'updates/index.html') + '">' + (config.minvistaCTALabel || '关注 Minvista') + '</a>' : '') +
            '<a class="v4-text-link" href="' + root + 'index.html">返回首页</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    main.appendChild(notice);
  }

  function applyBodyClass() {
    document.body.classList.add('site-phase-' + config.launchPhase);
  }

  function applyCompanionResourcesPanel() {
    document.querySelectorAll('[data-site-tools-empty]').forEach(function (el) {
      setVisible(el, !isEnabled('showTools'));
    });
  }

  function applyDownloads() {
    document.querySelectorAll('[data-site-download]').forEach(function (el) {
      setVisible(el, isEnabled('showDownloads'));
    });
    document.querySelectorAll('[data-site-download-soon]').forEach(function (el) {
      setVisible(el, !isEnabled('showDownloads'));
    });
  }

  function applyPhase() {
    applyBodyClass();
    applyConfigSections();
    applyPrelaunchSections();
    applyCompanionResourcesPanel();
    applyDownloads();
    applyNavAndFooterLinks();
    applyPageGate();
    if (window.applyBookInfo) window.applyBookInfo();
    if (window.applyResourcesPage) window.applyResourcesPage();
    if (window.applyChaptersPage) window.applyChaptersPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPhase);
  } else {
    applyPhase();
  }
})();
