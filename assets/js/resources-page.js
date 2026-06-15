(function () {
  'use strict';

  var AVAILABILITY_META = {
    'book-linked': { label: '随书更新', badgeClass: 'v4-status-badge v4-status-badge--book' },
    upcoming: { label: '即将开放', badgeClass: 'v4-status-badge v4-status-badge--soon' },
    workshop: { label: '工作坊配套', badgeClass: 'v4-status-badge v63-status-badge--workshop' },
    paid: { label: '需购买 / 读者专享', badgeClass: 'v4-status-badge v63-status-badge--paid' }
  };

  var ACCESS_META = {
    public: { label: '公开查看', badgeClass: 'v63-access-badge v63-access-badge--public' },
    minvista: { label: '通过 Minvista 获取', badgeClass: 'v63-access-badge v63-access-badge--minvista' },
    'reader-exclusive': { label: '读者专享', badgeClass: 'v63-access-badge v63-access-badge--reader' },
    'purchase-required': { label: '需购买后获取', badgeClass: 'v63-access-badge v63-access-badge--purchase' },
    workshop: { label: '工作坊配套', badgeClass: 'v63-access-badge v63-access-badge--workshop' },
    unavailable: { label: '暂未开放', badgeClass: 'v63-access-badge v63-access-badge--unavailable' }
  };

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
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

  function resolveLink(item, isHome) {
    if (item.link) return item.link;
    if (item.accessType === 'minvista') {
      return isHome ? 'updates/index.html' : '../updates/index.html';
    }
    return '';
  }

  function renderAction(item, isHome) {
    var label = item.actionLabel || '';
    if (!label) return '';

    var href = resolveLink(item, isHome);
    if (href) {
      return (
        '<a class="v62-resource-action v62-resource-action--link" href="' +
        escapeHtml(href) +
        '">' +
        escapeHtml(label) +
        '</a>'
      );
    }
    return '<span class="v62-resource-action v62-resource-action--disabled">' + escapeHtml(label) + '</span>';
  }

  function renderNote(item) {
    if (!item.note) return '';
    return '<p class="v63-resource-note">' + escapeHtml(item.note) + '</p>';
  }

  function renderHomeItem(item) {
    return (
      '<article class="v4-resource-card">' +
        '<p class="v4-resource-card-cat">' + escapeHtml(item.category) + '</p>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.description) + '</p>' +
        '<div class="v63-resource-badges">' + renderBadgeList(item) + '</div>' +
      '</article>'
    );
  }

  function renderItem(item) {
    return (
      '<article class="v4-resource-card">' +
        '<p class="v4-resource-card-cat">' + escapeHtml(item.category) + '</p>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.description) + '</p>' +
        renderNote(item) +
        '<div class="v62-resource-card-foot">' +
          '<div class="v63-resource-badges">' + renderBadgeList(item) + '</div>' +
          renderAction(item, false) +
        '</div>' +
      '</article>'
    );
  }

  function applyResourcesPage() {
    var config = window.RESOURCES_CONFIG;
    if (!config) return;

    var titleEl = document.querySelector('[data-resources-title]');
    if (titleEl && config.pageTitle) {
      titleEl.textContent = config.pageTitle;
    }

    var container = document.querySelector('[data-resources-catalog]');
    var homeContainer = document.querySelector('[data-home-resources-catalog]');
    if (!config.items || !config.items.length) return;

    var homeItems = config.items;
    if (config.homeItemIds && config.homeItemIds.length) {
      homeItems = config.homeItemIds
        .map(function (id) {
          return config.items.find(function (item) {
            return item.id === id;
          });
        })
        .filter(Boolean);
    }

    if (container) container.innerHTML = config.items.map(renderItem).join('');
    if (homeContainer) homeContainer.innerHTML = homeItems.map(renderHomeItem).join('');
  }

  window.applyResourcesPage = applyResourcesPage;

  function init() {
    applyResourcesPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
