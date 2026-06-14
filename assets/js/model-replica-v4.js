/**
 * GoxEDGE model replica v4 — structural diagram renderer.
 */

(function () {
  'use strict';

  var SELECTED = 'is-selected';

  var MECH_ICON = {
    cognition: 'cognition',
    action: 'action',
    feedback: 'feedback'
  };

  var STAGE_CHAPTER = {
    explore: '第 6 章',
    position: '第 7 章',
    execute: '第 8 章',
    empower: '第 9 章',
    optimize: '第 10 章',
    sustain: '第 11 章'
  };

  var TYPE_LABELS = {
    stage: '阶段',
    cap: '能力',
    mech: '推进机制',
    judge: '战略判断'
  };

  var TYPE_ACCENTS = {
    stage: null,
    cap: '#062f4f',
    mech: '#f04a23',
    judge: '#2f7d32'
  };

  var STAGE_ICON = {
    explore: 'explore',
    position: 'position',
    execute: 'execute',
    empower: 'empower',
    optimize: 'optimize',
    sustain: 'sustain'
  };

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderStageList(items) {
    return '<ul class="v4-model-stage-list">' +
      items.map(function (item) {
        return '<li>' + escapeHtml(item) + '</li>';
      }).join('') +
    '</ul>';
  }

  function renderMechanismRow(model) {
    var m = model.mechanism;
    var nodes = m.steps.map(function (step, i) {
      var prefix = i > 0 ? '<span class="v4-model-mechanism-arrow" aria-hidden="true">→</span>' : '';
      var iconClass = MECH_ICON[step.id] || 'default';
      return (
        prefix +
        '<button type="button" class="v4-model-mechanism-node" data-v4-mech="' + escapeHtml(step.id) + '">' +
          '<span class="v4-model-mechanism-circle v4-model-mech-glyph v4-model-mech-glyph--' + iconClass + '" aria-hidden="true"></span>' +
          '<span class="v4-model-mechanism-title">' + escapeHtml(step.title) + '</span>' +
          '<span class="v4-model-mechanism-sub">' + escapeHtml(step.subtitle) + '</span>' +
        '</button>'
      );
    }).join('');

    return (
      '<div class="v4-model-row v4-model-row--mechanism">' +
        '<div class="v4-model-row-label v4-model-row-label--mechanism">' +
          '<span class="v4-model-label-glyph v4-model-label-glyph--mechanism" aria-hidden="true"></span>' +
          '<span>战略推进<br>机制层</span>' +
        '</div>' +
        '<div class="v4-model-row-content">' +
          '<div class="v4-model-mechanism-band">' +
            '<div class="v4-model-mechanism-nodes">' + nodes + '</div>' +
            '<p class="v4-model-mechanism-footnote">' + escapeHtml(m.footnote) + '</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderIterationSvg() {
    return (
      '<svg class="v4-model-iteration-svg" viewBox="0 0 1000 44" preserveAspectRatio="none" aria-hidden="true">' +
        '<defs>' +
          '<marker id="v4-iter-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">' +
            '<path d="M0,0 L8,4 L0,8 Z" fill="#075aa8" opacity="0.7"/>' +
          '</marker>' +
        '</defs>' +
        '<line x1="40" y1="6" x2="40" y2="14" stroke="#075aa8" stroke-width="1.2" opacity="0.5"/>' +
        '<line x1="200" y1="6" x2="200" y2="14" stroke="#075aa8" stroke-width="1.2" opacity="0.5"/>' +
        '<line x1="360" y1="6" x2="360" y2="14" stroke="#075aa8" stroke-width="1.2" opacity="0.5"/>' +
        '<line x1="520" y1="6" x2="520" y2="14" stroke="#075aa8" stroke-width="1.2" opacity="0.5"/>' +
        '<line x1="680" y1="6" x2="680" y2="14" stroke="#075aa8" stroke-width="1.2" opacity="0.5"/>' +
        '<line x1="840" y1="6" x2="840" y2="14" stroke="#075aa8" stroke-width="1.2" opacity="0.5"/>' +
        '<path d="M30,28 H970" fill="none" stroke="#075aa8" stroke-width="1.8" stroke-dasharray="10 7" stroke-opacity="0.65" marker-end="url(#v4-iter-arrow)"/>' +
        '<path d="M970,28 L950,22 M970,28 L950,34" fill="none" stroke="#075aa8" stroke-width="1.5" stroke-opacity="0.65"/>' +
      '</svg>'
    );
  }

  function renderPathRow(model) {
    var p = model.path;
    var cards = p.stages.map(function (stage, i) {
      var iconClass = STAGE_ICON[stage.id] || 'default';
      var prefix = i > 0 ? '<span class="v4-model-stage-arrow" aria-hidden="true"><span class="v4-model-stage-arrow-glyph"></span></span>' : '';
      return (
        prefix +
        '<button type="button" class="v4-model-stage-card" data-v4-stage="' + escapeHtml(stage.id) + '" style="--stage-color:' + escapeHtml(stage.color) + '">' +
          '<span class="v4-model-stage-icon v4-model-stage-glyph v4-model-stage-glyph--' + iconClass + '">' + escapeHtml(String(stage.num)) + '</span>' +
          '<span class="v4-model-stage-title">' + escapeHtml(stage.title) + '</span>' +
          '<span class="v4-model-stage-en">' + escapeHtml(stage.en) + '</span>' +
          '<span class="v4-model-stage-divider"></span>' +
          renderStageList(stage.items) +
        '</button>'
      );
    }).join('');

    return (
      '<div class="v4-model-row v4-model-row--path">' +
        '<div class="v4-model-row-label v4-model-row-label--path">' +
          '<span class="v4-model-label-glyph v4-model-label-glyph--path" aria-hidden="true"></span>' +
          '<span>战略<br>路径层</span>' +
        '</div>' +
        '<div class="v4-model-row-content">' +
          '<div class="v4-model-path-inner">' +
            '<div class="v4-model-path-track">' + cards + '</div>' +
            '<div class="v4-model-iteration">' +
              renderIterationSvg() +
              '<span class="v4-model-iteration-label">' + escapeHtml(p.iterationLabel) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderCapabilityRow(model) {
    var c = model.capabilities;
    var cells = c.cells.map(function (cell) {
      return (
        '<button type="button" class="v4-model-capability-cell" data-v4-cap="' + escapeHtml(cell.id) + '">' +
          '<strong>' + escapeHtml(cell.title) + '</strong>' +
          '<em>' + escapeHtml(cell.en) + '</em>' +
          '<p>' + escapeHtml(cell.description) + '</p>' +
        '</button>'
      );
    }).join('');

    return (
      '<div class="v4-model-row v4-model-row--capability">' +
        '<div class="v4-model-row-label v4-model-row-label--capability">' +
          '<span class="v4-model-label-glyph v4-model-label-glyph--capability" aria-hidden="true"></span>' +
          '<span>战略能力<br>支撑层</span>' +
        '</div>' +
        '<div class="v4-model-row-content">' +
          '<div class="v4-model-capability-band">' +
            '<div class="v4-model-capability-head">' +
              '<strong>' + escapeHtml(c.title) + '</strong> / <span>' + escapeHtml(c.subtitle) + '</span>' +
            '</div>' +
            '<div class="v4-model-capability-cells">' + cells + '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderJudgmentRow(model) {
    var j = model.judgment;
    var cells = j.items.map(function (item) {
      return (
        '<button type="button" class="v4-model-judgment-cell" data-v4-judge="' + escapeHtml(item.id) + '">' +
          escapeHtml(item.title) +
        '</button>'
      );
    }).join('');

    return (
      '<div class="v4-model-row v4-model-row--judgment">' +
        '<div class="v4-model-row-label v4-model-row-label--judgment">' +
          '<span class="v4-model-label-glyph v4-model-label-glyph--judgment" aria-hidden="true"></span>' +
          '<span>战略<br>判断层</span>' +
        '</div>' +
        '<div class="v4-model-row-content">' +
          '<div class="v4-model-judgment-band">' +
            '<div class="v4-model-judgment-head">' +
              '<strong>' + escapeHtml(j.title) + '</strong>' +
              '<span>' + escapeHtml(j.subtitle) + '</span>' +
            '</div>' +
            '<div class="v4-model-judgment-cells">' + cells + '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderNoteRow(model) {
    return (
      '<div class="v4-model-row v4-model-row--note v4-model-note-row">' +
        '<div class="v4-model-row-label v4-model-row-label--note" aria-hidden="true">' +
          '<span class="v4-model-label-glyph v4-model-label-glyph--note">◎</span>' +
        '</div>' +
        '<div class="v4-model-row-content">' +
          '<p class="v4-model-note-text">' + escapeHtml(model.note) + '</p>' +
        '</div>' +
      '</div>'
    );
  }

  function renderReplica(model) {
    var refLink = model.showReferenceImage && model.referenceImage
      ? '<a class="v4-model-ctrl-link" data-v4-reference href="' + escapeHtml(model.referenceImage) + '" target="_blank" rel="noopener">查看原图</a>'
      : '';
    return (
      '<div class="v4-model-replica">' +
        '<div class="v4-model-toolbar">' +
          '<button type="button" class="v4-model-ctrl is-active" data-v4-reset>全景</button>' +
          '<button type="button" class="v4-model-ctrl" data-v4-clear>清除选择</button>' +
          refLink +
        '</div>' +
        '<p class="v4-model-scroll-hint">横向滑动查看完整模型</p>' +
        '<div class="v4-model-scroll">' +
          '<div class="v4-model-canvas">' +
            renderMechanismRow(model) +
            renderPathRow(model) +
            renderCapabilityRow(model) +
            renderJudgmentRow(model) +
            renderNoteRow(model) +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function defaultPanelHtml() {
    return (
      '<p class="v62-detail-type">模型说明</p>' +
      '<h3 class="v62-detail-title">点击模型元素查看说明</h3>' +
      '<p class="v62-detail-copy">选择阶段、能力、推进机制或判断项后，这里将显示对应说明。</p>'
    );
  }

  function detailFor(model, type, id, accent) {
    var typeLabel = TYPE_LABELS[type] || '模型说明';
    var accentColor = accent || TYPE_ACCENTS[type] || '#062f4f';

    if (type === 'stage') {
      var stage = model.path.stages.find(function (s) { return s.id === id; });
      if (stage) {
        var chapter = STAGE_CHAPTER[stage.id] || '';
        return (
          '<p class="v62-detail-type" style="color:' + escapeHtml(stage.color) + '">' + escapeHtml(typeLabel) + '</p>' +
          '<h3 class="v62-detail-title">' + escapeHtml(stage.title) + ' · ' + escapeHtml(stage.en) + '</h3>' +
          (chapter ? '<p class="v62-detail-chapter">对应章节：' + escapeHtml(chapter) + '</p>' : '') +
          '<p class="v62-detail-copy">' + escapeHtml(stage.summary) + '</p>'
        );
      }
    }
    if (type === 'cap') {
      var cap = model.capabilities.cells.find(function (c) { return c.id === id; });
      if (cap) {
        return (
          '<p class="v62-detail-type" style="color:' + escapeHtml(accentColor) + '">' + escapeHtml(typeLabel) + '</p>' +
          '<h3 class="v62-detail-title">' + escapeHtml(cap.title) + ' · ' + escapeHtml(cap.en) + '</h3>' +
          '<p class="v62-detail-copy">' + escapeHtml(cap.description) + '</p>'
        );
      }
    }
    if (type === 'mech') {
      var step = model.mechanism.steps.find(function (s) { return s.id === id; });
      if (step) {
        return (
          '<p class="v62-detail-type" style="color:' + escapeHtml(accentColor) + '">' + escapeHtml(typeLabel) + '</p>' +
          '<h3 class="v62-detail-title">' + escapeHtml(step.title) + '</h3>' +
          '<p class="v62-detail-copy">' + escapeHtml(step.subtitle) + '。' + escapeHtml(step.summary) + '</p>'
        );
      }
    }
    if (type === 'judge') {
      var item = model.judgment.items.find(function (j) { return j.id === id; });
      if (item) {
        return (
          '<p class="v62-detail-type" style="color:' + escapeHtml(accentColor) + '">' + escapeHtml(typeLabel) + '</p>' +
          '<h3 class="v62-detail-title">' + escapeHtml(item.title) + '</h3>' +
          '<p class="v62-detail-copy">' + escapeHtml(item.summary) + '</p>'
        );
      }
    }
    return defaultPanelHtml();
  }

  function clearSelection(root) {
    root.querySelectorAll('.' + SELECTED).forEach(function (el) {
      el.classList.remove(SELECTED);
    });
  }

  function selectItem(root, panel, el, type, id) {
    clearSelection(root);
    el.classList.add(SELECTED);
    var accent = el.style.getPropertyValue('--stage-color') || TYPE_ACCENTS[type] || '#062f4f';
    panel.classList.add('v62-detail-panel--active');
    panel.style.setProperty('--detail-accent', accent);
    panel.innerHTML = detailFor(window.GOXEDGE_MODEL, type, id, accent);
  }

  function resetPanel(panel) {
    panel.classList.remove('v62-detail-panel--active');
    panel.style.removeProperty('--detail-accent');
    panel.innerHTML = defaultPanelHtml();
  }

  function bindReplica(root, panel) {
    root.querySelectorAll('[data-v4-stage]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectItem(root, panel, btn, 'stage', btn.getAttribute('data-v4-stage'));
      });
    });
    root.querySelectorAll('[data-v4-cap]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectItem(root, panel, btn, 'cap', btn.getAttribute('data-v4-cap'));
      });
    });
    root.querySelectorAll('[data-v4-mech]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectItem(root, panel, btn, 'mech', btn.getAttribute('data-v4-mech'));
      });
    });
    root.querySelectorAll('[data-v4-judge]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectItem(root, panel, btn, 'judge', btn.getAttribute('data-v4-judge'));
      });
    });

    var resetBtn = root.querySelector('[data-v4-reset]');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        clearSelection(root);
        resetPanel(panel);
      });
    }

    var clearBtn = root.querySelector('[data-v4-clear]');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        clearSelection(root);
        resetPanel(panel);
      });
    }
  }

  function initModelReplicaV4() {
    var mount = document.getElementById('v4-model-mount');
    var panel = document.getElementById('v4-model-detail');
    var model = window.GOXEDGE_MODEL;
    if (!mount || !model) return;

    mount.innerHTML = renderReplica(model);
    if (panel) bindReplica(mount, panel);
  }

  window.initModelReplicaV4 = initModelReplicaV4;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModelReplicaV4);
  } else {
    initModelReplicaV4();
  }
})();
