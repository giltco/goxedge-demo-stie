/**
 * GoxEDGE model replica v3 — coded structural diagram renderer.
 */

(function () {
  'use strict';

  var SELECTED = 'is-selected';

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderStageList(items) {
    return '<ul class="gx-model-stage-list">' +
      items.map(function (item) {
        return '<li>' + escapeHtml(item) + '</li>';
      }).join('') +
    '</ul>';
  }

  function renderMechanismRow(model) {
    var m = model.mechanism;
    var nodes = m.steps.map(function (step, i) {
      var prefix = i > 0 ? '<span class="gx-model-mechanism-arrow" aria-hidden="true">→</span>' : '';
      return (
        prefix +
        '<button type="button" class="gx-model-mechanism-node" data-gx-mech="' + escapeHtml(step.id) + '">' +
          '<span class="gx-model-mechanism-circle">' + escapeHtml(step.title) + '</span>' +
          '<span class="gx-model-mechanism-sub">' + escapeHtml(step.subtitle) + '</span>' +
        '</button>'
      );
    }).join('');

    return (
      '<div class="gx-model-row gx-model-row--mechanism">' +
        '<div class="gx-model-row-label gx-model-row-label--mechanism">战略推进<br>机制层</div>' +
        '<div class="gx-model-row-content">' +
          '<div class="gx-model-mechanism-band">' +
            '<svg class="gx-model-mechanism-loop" viewBox="0 0 800 80" preserveAspectRatio="none" aria-hidden="true">' +
              '<path d="M30,65 C30,15 770,15 770,65" fill="none" stroke="#f04a23" stroke-width="1.5" stroke-dasharray="6 5" stroke-opacity="0.4"/>' +
            '</svg>' +
            '<div class="gx-model-mechanism-nodes">' + nodes + '</div>' +
            '<p class="gx-model-mechanism-footnote">' + escapeHtml(m.footnote) + '</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderPathRow(model) {
    var p = model.path;
    var cards = p.stages.map(function (stage, i) {
      var prefix = i > 0 ? '<span class="gx-model-stage-arrow" aria-hidden="true">▶</span>' : '';
      return (
        prefix +
        '<button type="button" class="gx-model-stage-card" data-gx-stage="' + escapeHtml(stage.id) + '" style="--stage-color:' + escapeHtml(stage.color) + '">' +
          '<span class="gx-model-stage-icon">' + escapeHtml(String(stage.num)) + '</span>' +
          '<span class="gx-model-stage-title">' + escapeHtml(stage.num) + ' ' + escapeHtml(stage.title) + '</span>' +
          '<span class="gx-model-stage-en">' + escapeHtml(stage.en) + '</span>' +
          '<span class="gx-model-stage-divider"></span>' +
          renderStageList(stage.items) +
        '</button>'
      );
    }).join('');

    return (
      '<div class="gx-model-row gx-model-row--path">' +
        '<div class="gx-model-row-label gx-model-row-label--path">战略<br>路径层</div>' +
        '<div class="gx-model-row-content">' +
          '<div class="gx-model-path-inner">' +
            '<div class="gx-model-path-track">' + cards + '</div>' +
            '<div class="gx-model-iteration">' +
              '<svg class="gx-model-iteration-svg" viewBox="0 0 1000 16" preserveAspectRatio="none" aria-hidden="true">' +
                '<path d="M10,8 H990" fill="none" stroke="#075aa8" stroke-width="1.5" stroke-dasharray="8 6" stroke-opacity="0.45"/>' +
              '</svg>' +
              '<span class="gx-model-iteration-label">' + escapeHtml(p.iterationLabel) + '</span>' +
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
        '<button type="button" class="gx-model-capability-cell" data-gx-cap="' + escapeHtml(cell.id) + '">' +
          '<span class="gx-model-capability-glyph" aria-hidden="true">◆</span>' +
          '<strong>' + escapeHtml(cell.title) + ' ' + escapeHtml(cell.en) + '</strong>' +
          '<p>' + escapeHtml(cell.description) + '</p>' +
        '</button>'
      );
    }).join('');

    return (
      '<div class="gx-model-row gx-model-row--capability">' +
        '<div class="gx-model-row-label gx-model-row-label--capability">战略能力<br>支撑层</div>' +
        '<div class="gx-model-row-content">' +
          '<div class="gx-model-capability-band">' +
            '<div class="gx-model-capability-head">' +
              '<strong>' + escapeHtml(c.title) + '</strong> / <span>' + escapeHtml(c.subtitle) + '</span>' +
            '</div>' +
            '<div class="gx-model-capability-cells">' + cells + '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderJudgmentRow(model) {
    var j = model.judgment;
    var cells = j.items.map(function (item) {
      return (
        '<button type="button" class="gx-model-judgment-cell" data-gx-judge="' + escapeHtml(item.id) + '">' +
          escapeHtml(item.title) +
        '</button>'
      );
    }).join('');

    return (
      '<div class="gx-model-row gx-model-row--judgment">' +
        '<div class="gx-model-row-label gx-model-row-label--judgment">战略<br>判断层</div>' +
        '<div class="gx-model-row-content">' +
          '<div class="gx-model-judgment-band">' +
            '<div class="gx-model-judgment-head">' +
              '<strong>' + escapeHtml(j.title) + '</strong>' +
              '<span>' + escapeHtml(j.subtitle) + '</span>' +
            '</div>' +
            '<div class="gx-model-judgment-cells">' + cells + '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderNoteRow(model) {
    return (
      '<div class="gx-model-row gx-model-row--note gx-model-note-row">' +
        '<div class="gx-model-row-label gx-model-row-label--note" aria-hidden="true">◎</div>' +
        '<div class="gx-model-row-content">' +
          '<p class="gx-model-note-text">' + escapeHtml(model.note) + '</p>' +
        '</div>' +
      '</div>'
    );
  }

  function renderReplica(model) {
    var refLink = model.showReferenceImage && model.referenceImage
      ? '<a class="gx-model-ctrl-link" data-gx-reference href="' + escapeHtml(model.referenceImage) + '" target="_blank" rel="noopener">查看原图</a>'
      : '';
    return (
      '<div class="gx-model-replica">' +
        '<div class="gx-model-toolbar">' +
          '<button type="button" class="gx-model-ctrl is-active" data-gx-reset>全景</button>' +
          '<button type="button" class="gx-model-ctrl" data-gx-clear>清除选择</button>' +
          refLink +
        '</div>' +
        '<p class="gx-model-scroll-hint">横向滑动查看完整模型</p>' +
        '<div class="gx-model-scroll">' +
          '<div class="gx-model-canvas">' +
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

  function detailFor(model, type, id) {
    if (type === 'stage') {
      var stage = model.path.stages.find(function (s) { return s.id === id; });
      if (stage) {
        return '<h3>' + escapeHtml(stage.title) + ' · ' + escapeHtml(stage.en) + '</h3><p>' + escapeHtml(stage.summary) + '</p>';
      }
    }
    if (type === 'cap') {
      var cap = model.capabilities.cells.find(function (c) { return c.id === id; });
      if (cap) {
        return '<h3>' + escapeHtml(cap.title) + ' · ' + escapeHtml(cap.en) + '</h3><p>' + escapeHtml(cap.description) + '</p>';
      }
    }
    if (type === 'mech') {
      var step = model.mechanism.steps.find(function (s) { return s.id === id; });
      if (step) {
        return '<h3>' + escapeHtml(step.title) + '</h3><p>' + escapeHtml(step.subtitle) + '。' + escapeHtml(step.summary) + '</p>';
      }
    }
    if (type === 'judge') {
      var item = model.judgment.items.find(function (j) { return j.id === id; });
      if (item) {
        return '<h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.summary) + '</p>';
      }
    }
    return '<p class="gx-detail-placeholder">点击模型元素查看说明。</p>';
  }

  function clearSelection(root) {
    root.querySelectorAll('.' + SELECTED).forEach(function (el) {
      el.classList.remove(SELECTED);
    });
  }

  function selectItem(root, panel, el, type, id) {
    clearSelection(root);
    el.classList.add(SELECTED);
    panel.innerHTML = detailFor(window.GOXEDGE_MODEL, type, id);
  }

  function resetPanel(panel) {
    panel.innerHTML = '<p class="gx-detail-placeholder">点击模型元素查看说明。</p>';
  }

  function bindReplica(root, panel) {
    root.querySelectorAll('[data-gx-stage]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectItem(root, panel, btn, 'stage', btn.getAttribute('data-gx-stage'));
      });
    });
    root.querySelectorAll('[data-gx-cap]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectItem(root, panel, btn, 'cap', btn.getAttribute('data-gx-cap'));
      });
    });
    root.querySelectorAll('[data-gx-mech]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectItem(root, panel, btn, 'mech', btn.getAttribute('data-gx-mech'));
      });
    });
    root.querySelectorAll('[data-gx-judge]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectItem(root, panel, btn, 'judge', btn.getAttribute('data-gx-judge'));
      });
    });

    var resetBtn = root.querySelector('[data-gx-reset]');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        clearSelection(root);
        resetPanel(panel);
      });
    }

    var clearBtn = root.querySelector('[data-gx-clear]');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        clearSelection(root);
        resetPanel(panel);
      });
    }
  }

  function initModelReplicaV3() {
    var mount = document.getElementById('gx-model-mount');
    var panel = document.getElementById('gx-model-detail');
    var model = window.GOXEDGE_MODEL;
    if (!mount || !model) return;

    mount.innerHTML = renderReplica(model);
    if (panel) bindReplica(mount, panel);
  }

  window.initModelReplicaV3 = initModelReplicaV3;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModelReplicaV3);
  } else {
    initModelReplicaV3();
  }
})();
