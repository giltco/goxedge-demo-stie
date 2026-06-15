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

  var STAGE_ICON_ID = {
    explore: 'explore',
    position: 'position',
    execute: 'execute',
    empower: 'empower',
    optimize: 'optimize',
    sustain: 'sustain'
  };

  var CAP_ICON_ID = {
    expertise: 'expertise',
    diversification: 'diversification',
    growth: 'growth',
    empowerment: 'empowerment'
  };

  /* Inline SVG icon library — V8.0 LOCKED layer semantics */
  var MODEL_SVG = {
    layer: {
      mechanism: '<svg class="v4-model-svg v4-model-svg--label" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7.5A8.2 8.2 0 0 0 6.3 5.4"/><path d="M6.3 5.4H10"/><path d="M6.3 5.4V9.1"/><path d="M4 16.5a8.2 8.2 0 0 0 13.7 2.1"/><path d="M17.7 18.6H14"/><path d="M17.7 18.6v-3.7"/></svg>',
      path: '<svg class="v4-model-svg v4-model-svg--label" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 5.2c-2 0-3.6 1.6-3.6 3.6 0 2.7 3.6 6.1 3.6 6.1s3.6-3.4 3.6-6.1C10.6 6.8 9 5.2 7 5.2z"/><circle cx="7" cy="8.7" r="1.1" fill="#fff" stroke="none"/><path d="M17 9.1c-2 0-3.6 1.6-3.6 3.6 0 2.7 3.6 6.1 3.6 6.1s3.6-3.4 3.6-6.1c0-2-1.6-3.6-3.6-3.6z"/><circle cx="17" cy="12.6" r="1.1" fill="#fff" stroke="none"/><path d="M9.8 14.7c2.1 1.1 4.3.5 5.6-1.2"/></svg>',
      capability: '<svg class="v4-model-svg v4-model-svg--label" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.8 4.8 6.5v5.8c0 4.7 3.1 7.9 7.2 9.2 4.1-1.3 7.2-4.5 7.2-9.2V6.5L12 2.8z"/><path d="m8.8 12.1 2.1 2.1 4.6-5"/></svg>',
      judgment: '<svg class="v4-model-svg v4-model-svg--label" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 20.5h17"/><path d="M5 17.5h14"/><path d="M6.2 17.5V10.5"/><path d="M10 17.5V10.5"/><path d="M14 17.5V10.5"/><path d="M17.8 17.5V10.5"/><path d="M4.8 10.5h14.4"/><path d="M5.5 8.5 12 4.5l6.5 4"/></svg>'
    },
    stage: {
      explore: '<svg class="v4-model-svg v4-model-svg--stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="5.5"/><path d="M15 15l4.5 4.5"/></svg>',
      position: '<svg class="v4-model-svg v4-model-svg--stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.3" aria-hidden="true"><circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="1.2" fill="#fff" stroke="none"/></svg>',
      execute: '<svg class="v4-model-svg v4-model-svg--stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.1 5.1l1.8 1.8M17.1 17.1l1.8 1.8M5.1 18.9l1.8-1.8M17.1 6.9l1.8-1.8"/></svg>',
      empower: '<svg class="v4-model-svg v4-model-svg--stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" aria-hidden="true"><circle cx="8.5" cy="8" r="2.8"/><circle cx="15.5" cy="8" r="2.8"/><path d="M4.5 18.5c0-2.8 2.2-5 4-5s4 2.2 4 5"/><path d="M13 18.5c0-2 1.5-3.6 3-3.8"/></svg>',
      optimize: '<svg class="v4-model-svg v4-model-svg--stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" aria-hidden="true"><path d="M4 17.5V11M9 17.5V7.5M14 17.5v-4M19 17.5V4.5"/></svg>',
      sustain: '<svg class="v4-model-svg v4-model-svg--stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 4v16"/><path d="M4 12h16"/><path d="M12 7l1.8 3.6L12 12l-1.8-1.4L12 7z" fill="#fff" stroke="none"/></svg>'
    },
    mech: {
      cognition: '<svg class="v4-model-svg v4-model-svg--mech" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 12s3.8-6.5 9.5-6.5S21.5 12 21.5 12s-3.8 6.5-9.5 6.5S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3.2"/></svg>',
      action: '<svg class="v4-model-svg v4-model-svg--mech" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h11"/><path d="M13 7.5l4.5 4.5-4.5 4.5"/></svg>',
      feedback: '<svg class="v4-model-svg v4-model-svg--mech" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11.5l2.5 2.5L21.5 4"/><path d="M20.5 12.5v6.5a2 2 0 0 1-2 2H5.5l-3 3V5.5a2 2 0 0 1 2-2h10.5"/></svg>'
    },
    cap: {
      expertise: '<svg class="v4-model-svg v4-model-svg--cap" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3L4.5 7v5.5c0 4.2 3 7.4 7.5 8.8 4.5-1.4 7.5-4.6 7.5-8.8V7L12 3z"/></svg>',
      diversification: '<svg class="v4-model-svg v4-model-svg--cap" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="5.5" cy="12" r="2.5"/><circle cx="18.5" cy="6" r="2.5"/><circle cx="18.5" cy="18" r="2.5"/><path d="M7.8 11l8.2-4M7.8 13l8.2 4"/></svg>',
      growth: '<svg class="v4-model-svg v4-model-svg--cap" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 16.5V9M9 16.5V5.5M14 16.5v-4M19 16.5V3.5"/><path d="M3 16.5h18"/></svg>',
      empowerment: '<svg class="v4-model-svg v4-model-svg--cap" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M9 18h6"/><path d="M10 21.5h4"/><path d="M12 2.5a4.8 4.8 0 0 0-2.8 8.7V14h5.6v-2.8A4.8 4.8 0 0 0 12 2.5z"/></svg>'
    },
    noteTarget: '<svg class="v4-model-svg v4-model-svg--note" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" aria-hidden="true"><circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/></svg>'
  };

  function stripNotePrefix(note) {
    return String(note).replace(/^模型说明[：:]\s*/, '');
  }

  function layerGlyph(layerKey) {
    return '<span class="v4-model-label-glyph">' + (MODEL_SVG.layer[layerKey] || '') + '</span>';
  }

  function stageGlyph(stageId) {
    var key = STAGE_ICON_ID[stageId] || 'explore';
    return MODEL_SVG.stage[key] || MODEL_SVG.stage.explore;
  }

  function mechGlyph(stepId) {
    var key = MECH_ICON[stepId] || 'cognition';
    return MODEL_SVG.mech[key] || MODEL_SVG.mech.cognition;
  }

  function capGlyph(capId) {
    var key = CAP_ICON_ID[capId] || 'expertise';
    return MODEL_SVG.cap[key] || MODEL_SVG.cap.expertise;
  }

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
      return (
        prefix +
        '<button type="button" class="v4-model-mechanism-node" data-v4-mech="' + escapeHtml(step.id) + '">' +
          '<span class="v4-model-mechanism-circle" aria-hidden="true">' + mechGlyph(step.id) + '</span>' +
          '<span class="v4-model-mechanism-title">' + escapeHtml(step.title) + '</span>' +
          '<span class="v4-model-mechanism-sub">' + escapeHtml(step.subtitle) + '</span>' +
        '</button>'
      );
    }).join('');

    return (
      '<div class="v4-model-row v4-model-row--mechanism">' +
        '<div class="v4-model-row-label v4-model-row-label--mechanism">' +
          layerGlyph('mechanism') +
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

  function renderIterationLine() {
    return (
      '<svg class="v4-model-iteration-line-svg" viewBox="0 0 800 24" preserveAspectRatio="none" aria-hidden="true">' +
        '<defs>' +
          '<marker id="v4-iter-arrow-v74" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">' +
            '<path d="M0,0 L8,4 L0,8 Z" fill="#4a6f94" opacity="0.9"/>' +
          '</marker>' +
        '</defs>' +
        '<path d="M4,12 H792" fill="none" stroke="#4a6f94" stroke-width="1.5" stroke-dasharray="8 6" stroke-opacity="0.65" marker-end="url(#v4-iter-arrow-v74)"/>' +
      '</svg>'
    );
  }

  function renderPathRow(model) {
    var p = model.path;
    var cards = p.stages.map(function (stage, i) {
      var prefix = i > 0 ? '<span class="v4-model-stage-arrow" aria-hidden="true"><span class="v4-model-stage-arrow-glyph"></span></span>' : '';
      return (
        prefix +
        '<button type="button" class="v4-model-stage-card" data-v4-stage="' + escapeHtml(stage.id) + '" style="--stage-color:' + escapeHtml(stage.color) + '">' +
          '<div class="v4-model-stage-head">' +
            '<span class="v4-model-stage-icon" aria-hidden="true">' + stageGlyph(stage.id) + '</span>' +
            '<span class="v4-model-stage-title-block">' +
              '<span class="v4-model-stage-title">' + escapeHtml(String(stage.num) + '. ' + stage.title) + '</span>' +
              '<span class="v4-model-stage-en">' + escapeHtml(stage.en) + '</span>' +
            '</span>' +
          '</div>' +
          '<span class="v4-model-stage-divider"></span>' +
          renderStageList(stage.items) +
        '</button>'
      );
    }).join('');

    return (
      '<div class="v4-model-row v4-model-row--path">' +
        '<div class="v4-model-row-label v4-model-row-label--path">' +
          layerGlyph('path') +
          '<span>战略<br>路径层</span>' +
        '</div>' +
        '<div class="v4-model-row-content">' +
          '<div class="v4-model-path-inner">' +
            '<div class="v4-model-path-track">' + cards + '</div>' +
            '<div class="v4-model-iteration-strip">' +
              '<span class="v4-model-iteration-label">' + escapeHtml(p.iterationLabel) + '</span>' +
              '<div class="v4-model-iteration-line">' + renderIterationLine() + '</div>' +
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
          '<span class="v4-model-cap-icon" aria-hidden="true">' + capGlyph(cell.id) + '</span>' +
          '<strong>' + escapeHtml(cell.title) + '</strong>' +
          '<em>' + escapeHtml(cell.en) + '</em>' +
          '<p>' + escapeHtml(cell.description) + '</p>' +
        '</button>'
      );
    }).join('');

    return (
      '<div class="v4-model-row v4-model-row--capability">' +
        '<div class="v4-model-row-label v4-model-row-label--capability">' +
          layerGlyph('capability') +
          '<span>战略能力<br>支撑层</span>' +
        '</div>' +
        '<div class="v4-model-row-content">' +
          '<div class="v4-model-capability-band">' +
            '<div class="v4-model-capability-head">' +
              '<strong>' + escapeHtml(c.title) + '</strong><span class="v4-model-capability-head-gap" aria-hidden="true">　</span><span>' + escapeHtml(c.subtitle) + '</span>' +
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
          layerGlyph('judgment') +
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
      '<div class="v4-model-note-bar">' +
        '<p class="v4-model-note-text">' +
          '<span class="v4-model-note-icon" aria-hidden="true">' + MODEL_SVG.noteTarget + '</span>' +
          '<span class="v4-model-note-body"><span class="v4-model-note-kicker">模型说明：</span>' + escapeHtml(stripNotePrefix(model.note)) + '</span>' +
        '</p>' +
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
      '<div class="note-panel__default">' +
        '<p class="note-panel__kicker">模型说明</p>' +
        '<h3 class="note-panel__title">点击模型元素查看说明</h3>' +
        '<p class="note-panel__copy">选择阶段、能力、推进机制或判断项后，这里将显示对应说明，帮助你理解该元素在 GoxEDGE 全球拓展战略模型中的位置和作用。</p>' +
      '</div>'
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
          '<div class="note-panel__selected">' +
          '<p class="note-panel__badge" style="color:' + escapeHtml(stage.color) + '">' + escapeHtml(typeLabel) + '</p>' +
          '<h3 class="note-panel__detail-title">' + escapeHtml(stage.title) + ' · ' + escapeHtml(stage.en) + '</h3>' +
          (chapter ? '<p class="note-panel__chapter">对应章节：' + escapeHtml(chapter) + '</p>' : '') +
          '<p class="note-panel__detail-copy">' + escapeHtml(stage.summary) + '</p>' +
          '</div>'
        );
      }
    }
    if (type === 'cap') {
      var cap = model.capabilities.cells.find(function (c) { return c.id === id; });
      if (cap) {
        return (
          '<div class="note-panel__selected">' +
          '<p class="note-panel__badge" style="color:' + escapeHtml(accentColor) + '">' + escapeHtml(typeLabel) + '</p>' +
          '<h3 class="note-panel__detail-title">' + escapeHtml(cap.title) + ' · ' + escapeHtml(cap.en) + '</h3>' +
          '<p class="note-panel__detail-copy">' + escapeHtml(cap.description) + '</p>' +
          '</div>'
        );
      }
    }
    if (type === 'mech') {
      var step = model.mechanism.steps.find(function (s) { return s.id === id; });
      if (step) {
        return (
          '<div class="note-panel__selected">' +
          '<p class="note-panel__badge" style="color:' + escapeHtml(accentColor) + '">' + escapeHtml(typeLabel) + '</p>' +
          '<h3 class="note-panel__detail-title">' + escapeHtml(step.title) + '</h3>' +
          '<p class="note-panel__detail-copy">' + escapeHtml(step.subtitle) + '。' + escapeHtml(step.summary) + '</p>' +
          '</div>'
        );
      }
    }
    if (type === 'judge') {
      var item = model.judgment.items.find(function (j) { return j.id === id; });
      if (item) {
        return (
          '<div class="note-panel__selected">' +
          '<p class="note-panel__badge" style="color:' + escapeHtml(accentColor) + '">' + escapeHtml(typeLabel) + '</p>' +
          '<h3 class="note-panel__detail-title">' + escapeHtml(item.title) + '</h3>' +
          '<p class="note-panel__detail-copy">' + escapeHtml(item.summary) + '</p>' +
          '</div>'
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
    panel.classList.add('note-panel--selected');
    panel.classList.remove('note-panel--default');
    panel.style.setProperty('--detail-accent', accent);
    panel.innerHTML = detailFor(window.GOXEDGE_MODEL, type, id, accent);
  }

  function resetPanel(panel) {
    panel.classList.remove('note-panel--selected');
    panel.classList.add('note-panel--default');
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
