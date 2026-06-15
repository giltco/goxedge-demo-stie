(function () {
  'use strict';

  var PLACEHOLDER = '即将更新';
  var PURCHASE_PLACEHOLDER = '购买链接将在正式上架后更新。';

  var PURCHASE_LINKS = [
    { field: 'jdLink', label: '京东购买' },
    { field: 'dangdangLink', label: '当当购买' },
    { field: 'ebookLink', label: '电子书' },
    { field: 'wechatReadingLink', label: '微信读书' }
  ];

  var PAGE_TITLES = {
    companionHome: function (book) {
      return bookValue(book, 'bookChineseTitle') + '读者配套资源站';
    },
    bookPage: function (book) {
      return '图书介绍｜' + displayFullTitle(book);
    },
    chapterGuide: function (book) {
      return bookValue(book, 'bookChineseTitle') + '阅读指南';
    },
    minvistaPage: function (book) {
      return (book.minvistaName || 'Minvista') + ' 读者更新｜' + bookValue(book, 'bookChineseTitle');
    },
    modelPage: function (book) {
      return 'GoxEDGE 全球拓展战略模型｜' + bookValue(book, 'bookChineseTitle');
    }
  };

  function book() {
    return window.BOOK_CONFIG || {};
  }

  function hasValue(value) {
    if (typeof value === 'boolean') return true;
    return value !== null && value !== undefined && String(value).trim() !== '';
  }

  function bookValue(config, key) {
    var value = config[key];
    if (!hasValue(value)) return PLACEHOLDER;
    return String(value);
  }

  function displayFullTitle(config) {
    if (hasValue(config.officialFullTitle)) return config.officialFullTitle;
    var title = hasValue(config.bookChineseTitle) ? config.bookChineseTitle : config.bookTitle;
    if (hasValue(config.bookSubtitle)) {
      return hasValue(config.bookChineseTitle)
        ? title + '：' + config.bookSubtitle
        : title + '：' + config.bookSubtitle;
    }
    return title;
  }

  function setText(el, text, isPlaceholder) {
    el.textContent = text;
    if (isPlaceholder) {
      el.classList.add('book-placeholder-text');
    } else {
      el.classList.remove('book-placeholder-text');
    }
  }

  function applyBookFields() {
    var config = book();
    document.querySelectorAll('[data-book-field]').forEach(function (el) {
      var key = el.getAttribute('data-book-field');
      var raw = config[key];
      var empty = !hasValue(raw);
      setText(el, empty ? PLACEHOLDER : String(raw), empty);
    });
    document.querySelectorAll('[data-book-display-title]').forEach(function (el) {
      setText(el, displayFullTitle(config), false);
    });
  }

  function applyBookCover() {
    var config = book();
    document.querySelectorAll('[data-book-cover]').forEach(function (container) {
      var img = container.querySelector('img[data-book-cover-img]');
      var placeholder = container.querySelector('[data-book-cover-placeholder]');
      var path = config.coverImage;

      if (hasValue(path)) {
        if (!img) {
          img = document.createElement('img');
          img.setAttribute('data-book-cover-img', '');
          img.alt = displayFullTitle(config) + ' 封面';
          container.insertBefore(img, container.firstChild);
        }
        img.src = path;
        img.hidden = false;
        if (placeholder) placeholder.hidden = true;
      } else {
        if (img) img.hidden = true;
        if (placeholder) {
          placeholder.hidden = false;
          var titleEl = placeholder.querySelector('[data-book-field="bookTitle"]');
          var subtitleEl = placeholder.querySelector('[data-book-field="bookSubtitle"]');
          var modelEl = placeholder.querySelector('[data-book-field="modelName"]');
          var authorEl = placeholder.querySelector('[data-book-field="author"]');
          var publisherEl = placeholder.querySelector('[data-book-field="publisher"]');
          if (titleEl) setText(titleEl, config.bookTitle || PLACEHOLDER, !hasValue(config.bookTitle));
          if (subtitleEl) {
            var subEmpty = !hasValue(config.bookSubtitle);
            setText(subtitleEl, subEmpty ? PLACEHOLDER : config.bookSubtitle, subEmpty);
          }
          if (modelEl) setText(modelEl, config.modelName || PLACEHOLDER, !hasValue(config.modelName));
          if (authorEl) setText(authorEl, config.author || PLACEHOLDER, !hasValue(config.author));
          if (publisherEl) setText(publisherEl, config.publisher || PLACEHOLDER, !hasValue(config.publisher));
        }
      }
    });
  }

  function isValidPurchaseUrl(url) {
    if (!hasValue(url)) return false;
    return /^https?:\/\/.+/i.test(String(url).trim());
  }

  function renderPurchaseLinks(container, config) {
    var configured = PURCHASE_LINKS.filter(function (item) {
      return isValidPurchaseUrl(config[item.field]);
    });

    container.innerHTML = '';
    container.classList.remove('purchase-links-empty');

    if (!configured.length) {
      container.classList.add('purchase-links-empty');
      container.innerHTML =
        '<p class="purchase-links-placeholder">' + PURCHASE_PLACEHOLDER + '</p>';
      return;
    }

    var wrap = document.createElement('div');
    wrap.className = 'purchase-links-inner';

    var label = document.createElement('span');
    label.className = 'purchase-links-label';
    label.textContent = '购书';
    wrap.appendChild(label);

    var actions = document.createElement('div');
    actions.className = 'purchase-links-actions';

    configured.forEach(function (item) {
      var anchor = document.createElement('a');
      anchor.className = 'btn btn-secondary';
      anchor.href = String(config[item.field]).trim();
      anchor.textContent = item.label;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      actions.appendChild(anchor);
    });

    wrap.appendChild(actions);
    container.appendChild(wrap);
  }

  function applyPurchaseLinks() {
    var siteConfig = window.SITE_CONFIG || {};
    if (!siteConfig.showPurchaseLinks) return;

    var config = book();
    document.querySelectorAll('[data-book-purchase-links], [data-site-purchase-links]').forEach(function (container) {
      renderPurchaseLinks(container, config);
    });
  }

  function minvistaKeywordPhrase(config) {
    if (hasValue(config.minvistaKeywordPhrase)) return config.minvistaKeywordPhrase;
    var primary = config.minvistaKeyword;
    var secondary = config.secondaryKeyword;
    if (hasValue(primary) && hasValue(secondary)) {
      return '回复「' + primary + '」或「' + secondary + '」获取后续配套资源更新。';
    }
    if (hasValue(primary)) {
      return '回复「' + primary + '」获取后续配套资源更新。';
    }
    return '回复关键词获取后续配套资源更新。（关键词即将更新）';
  }

  function resolveAssetPath(path) {
    if (!hasValue(path)) return '';

    var value = String(path).trim();

    if (/^(https?:)?\/\//.test(value) || value.startsWith('data:')) {
      return value;
    }

    value = value.replace(/^\/+/, '');

    var script = document.querySelector('script[src*="book-config.js"]');
    if (script) {
      var src = script.getAttribute('src') || '';
      var match = src.match(/^(.*)js\/book-config\.js/);
      if (match) {
        var assetsBase = match[1];
        if (value.indexOf('assets/') === 0) {
          return assetsBase + value.slice('assets/'.length);
        }
        return assetsBase + value;
      }
    }

    var depth = 0;
    var pathname = window.location.pathname || '';

    if (pathname.endsWith('/')) {
      var clean = pathname.replace(/\/+$/, '');
      var parts = clean.split('/').filter(Boolean);
      if (parts.length > 0 && parts[parts.length - 1] !== '') {
        depth = Math.max(parts.length - 1, 0);
      }
    } else {
      var pageParts = pathname.split('/').filter(Boolean);
      depth = Math.max(pageParts.length - 1, 0);
    }

    var prefix = depth > 0 ? '../'.repeat(depth) : '';

    return prefix + value;
  }

  function applyMinvistaBlocks() {
    var config = book();
    document.querySelectorAll('[data-book-minvista-name]').forEach(function (el) {
      setText(el, config.minvistaName || PLACEHOLDER, !hasValue(config.minvistaName));
    });
    document.querySelectorAll('[data-book-minvista-title]').forEach(function (el) {
      setText(el, config.minvistaTitle || '通过 Minvista 获取更新', false);
    });
    document.querySelectorAll('[data-book-minvista-copy]').forEach(function (el) {
      setText(el, config.minvistaCopy || PLACEHOLDER, !hasValue(config.minvistaCopy));
    });
    document.querySelectorAll('[data-book-minvista-keyword]').forEach(function (el) {
      var empty = !hasValue(config.minvistaKeyword);
      setText(el, empty ? PLACEHOLDER : config.minvistaKeyword, empty);
    });
    document.querySelectorAll('[data-book-minvista-keyword-phrase]').forEach(function (el) {
      setText(el, minvistaKeywordPhrase(config), false);
    });
    document.querySelectorAll('[data-book-minvista-qr]').forEach(function (container) {
      var path = config.minvistaQRCode;
      container.innerHTML = '';
      if (hasValue(path)) {
        var img = document.createElement('img');
        img.src = resolveAssetPath(path);
        img.alt = (config.minvistaName || 'Minvista') + ' 公众号二维码';
        img.onerror = function () {
          console.error('Minvista QR failed to load:', img.src);
          container.innerHTML = '';
          var note = document.createElement('p');
          note.className = 'minvista-qr-placeholder';
          note.textContent = '二维码即将更新';
          container.appendChild(note);
        };
        container.appendChild(img);
      } else {
        var note = document.createElement('p');
        note.className = 'minvista-qr-placeholder';
        note.textContent = '二维码即将更新';
        container.appendChild(note);
      }
    });
  }

  function applySiteLogo() {
    var config = book();
    var pngFallback = 'assets/img/brand/goxedge-logo.png';

    document.querySelectorAll('.site-brand-logo').forEach(function (img) {
      var brand = img.closest('.site-brand');
      if (!brand) return;

      if (hasValue(config.siteLogoAlt)) {
        img.alt = config.siteLogoAlt;
      }

      if (!hasValue(config.siteLogo)) {
        brand.classList.remove('has-logo');
        img.style.display = 'none';
        return;
      }

      function showTextFallback() {
        brand.classList.remove('has-logo');
        img.style.display = 'none';
      }

      img.addEventListener('error', function () {
        if (img.dataset.fallbackTried === '1') {
          showTextFallback();
          return;
        }
        img.dataset.fallbackTried = '1';
        img.src = resolveAssetPath(pngFallback);
      });

      if (img.complete && img.naturalWidth === 0) {
        img.dispatchEvent(new Event('error'));
      }
    });
  }

  function applyContactEmail() {
    var config = book();
    document.querySelectorAll('[data-book-contact-email]').forEach(function (el) {
      if (hasValue(config.contactEmail)) {
        if (el.tagName === 'A') {
          el.href = 'mailto:' + config.contactEmail;
          el.textContent = config.contactEmail;
        } else {
          setText(el, config.contactEmail, false);
        }
        el.classList.remove('book-placeholder-text');
      } else {
        if (el.tagName === 'A') {
          el.removeAttribute('href');
        }
        setText(el, PLACEHOLDER, true);
      }
    });
  }

  function applyPageTitles() {
    var config = book();
    var pageKey = document.body.getAttribute('data-book-page');
    if (!pageKey || !PAGE_TITLES[pageKey]) return;
    document.title = PAGE_TITLES[pageKey](config);
  }

  function applyBookInfo() {
    if (!window.BOOK_CONFIG) return;
    applyBookFields();
    applyBookCover();
    applyPurchaseLinks();
    applyMinvistaBlocks();
    applySiteLogo();
    applyContactEmail();
    applyPageTitles();
  }

  window.applyBookInfo = applyBookInfo;
})();
