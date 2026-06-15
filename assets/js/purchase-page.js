(function () {
  'use strict';

  var AVAILABILITY_META = {
    available: { label: '已开放', badgeClass: 'v65-offer-badge v65-offer-badge--available' },
    upcoming: { label: '即将开放', badgeClass: 'v65-offer-badge v65-offer-badge--upcoming' },
    'book-launch-pending': { label: '上架后更新', badgeClass: 'v65-offer-badge v65-offer-badge--pending' },
    'reader-exclusive': { label: '读者专享', badgeClass: 'v65-offer-badge v65-offer-badge--reader' },
    workshop: { label: '工作坊配套', badgeClass: 'v65-offer-badge v65-offer-badge--workshop' },
    planned: { label: '规划中', badgeClass: 'v65-offer-badge v65-offer-badge--planned' }
  };

  var ACCESS_META = {
    'purchase-channel': { label: '购买渠道', badgeClass: 'v65-access-badge v65-access-badge--channel' },
    'ebook-channel': { label: '电子书渠道', badgeClass: 'v65-access-badge v65-access-badge--ebook' },
    minvista: { label: '通过 Minvista 获取', badgeClass: 'v65-access-badge v65-access-badge--minvista' },
    'purchase-required': { label: '需购买后获取', badgeClass: 'v65-access-badge v65-access-badge--purchase' },
    'reader-exclusive': { label: '读者专享', badgeClass: 'v65-access-badge v65-access-badge--reader' },
    workshop: { label: '工作坊配套', badgeClass: 'v65-access-badge v65-access-badge--workshop' },
    merchandise: { label: '周边产品', badgeClass: 'v65-access-badge v65-access-badge--merch' },
    unavailable: { label: '暂未开放', badgeClass: 'v65-access-badge v65-access-badge--unavailable' }
  };

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function isEnabled(entity) {
    return entity.enabled !== false;
  }

  function getBadges(item) {
    var badges = [];
    var avail = AVAILABILITY_META[item.availabilityStatus];
    var access = ACCESS_META[item.accessType];

    if (avail) badges.push(avail);
    if (access && (!avail || access.label !== avail.label)) badges.push(access);

    return badges;
  }

  function renderBadgeList(item) {
    return getBadges(item)
      .map(function (badge) {
        return '<span class="' + badge.badgeClass + '">' + escapeHtml(badge.label) + '</span>';
      })
      .join('');
  }

  function renderAction(item) {
    var label = item.actionLabel || '';
    if (!label) return '';

    if (item.link) {
      return (
        '<a class="v65-offer-action v65-offer-action--link" href="' +
        escapeHtml(item.link) +
        '">' +
        escapeHtml(label) +
        '</a>'
      );
    }
    return '<span class="v65-offer-action v65-offer-action--disabled">' + escapeHtml(label) + '</span>';
  }

  function renderOfferCard(item) {
    var description = item.description
      ? '<p class="v65-offer-desc">' + escapeHtml(item.description) + '</p>'
      : '';
    var price = item.priceLabel
      ? '<p class="v65-offer-price">' + escapeHtml(item.priceLabel) + '</p>'
      : '';
    var note = item.note
      ? '<p class="v65-offer-note">' + escapeHtml(item.note) + '</p>'
      : '';

    return (
      '<article class="v65-offer-card">' +
        '<p class="v65-offer-cat">' + escapeHtml(item.category) + '</p>' +
        '<h3 class="v65-offer-title">' + escapeHtml(item.title) + '</h3>' +
        description +
        '<div class="v65-offer-badges">' + renderBadgeList(item) + '</div>' +
        price +
        note +
        '<div class="v65-offer-foot">' + renderAction(item) + '</div>' +
      '</article>'
    );
  }

  function renderGroup(group) {
    var items = (group.items || []).filter(isEnabled);
    if (!items.length) return '';

    var openAttr = group.id === 'book-purchase' ? ' open' : '';

    return (
      '<details class="purchase-accordion" id="' + escapeHtml(group.id) + '"' + openAttr + '>' +
        '<summary>' +
          '<span>' + escapeHtml(group.title) + '</span>' +
          '<small>' + escapeHtml(group.description) + '</small>' +
        '</summary>' +
        '<div class="v65-offer-grid">' + items.map(renderOfferCard).join('') + '</div>' +
      '</details>'
    );
  }

  function renderSummaryCards(cards) {
    return cards
      .map(function (card) {
        return (
          '<article class="v65-summary-card">' +
            '<h3>' + escapeHtml(card.title) + '</h3>' +
            '<p>' + escapeHtml(card.description) + '</p>' +
          '</article>'
        );
      })
      .join('');
  }

  function applyPurchasePage() {
    var config = window.OFFERS_CONFIG;
    if (!config) return;

    var titleEl = document.querySelector('[data-purchase-title]');
    if (titleEl && config.pageTitle) {
      titleEl.textContent = config.pageTitle;
    }

    var summaryEl = document.querySelector('[data-purchase-summary]');
    if (summaryEl && config.summaryCards) {
      summaryEl.innerHTML = renderSummaryCards(config.summaryCards);
    }

    var groupsEl = document.querySelector('[data-purchase-groups]');
    if (groupsEl && config.groups) {
      groupsEl.innerHTML = config.groups
        .filter(isEnabled)
        .map(renderGroup)
        .join('');
    }
  }

  window.applyPurchasePage = applyPurchasePage;

  function init() {
    applyPurchasePage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
