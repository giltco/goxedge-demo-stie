/**
 * GoxEDGE model replica — structural reconstruction of official diagram.
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

  function renderItems(items) {
    return '<ul class="stage-card-replica-list">' +
      items.map(function (item) {
        return '<li>' + escapeHtml(item) + '</li>';
      }).join('') +
    '</ul>';
  }

  function renderMechanismRow(model) {
    var m = model.mechanism;
    var nodes = m.steps.map(function (step, i) {
      var prefix = i > 0 ? '<span class="mechanism-arrow" aria-hidden="true">→</span>' : '';
      return (
        prefix +
        '<button type="button" class="mechanism-node" data-select-mech="' + escapeHtml(step.id) + '">' +
          '<span class="mechanism-node-circle">' + escapeHtml(step.title) + '</span>' +
          '<span class="mechanism-node-sub">' + escapeHtml(step.subtitle) + '</span>' +
        '</button>'
      );
    }).join('');

    return (
      '<div class="model-row mechanism-row">' +
        '<div class="model-row-label model-row-label--mechanism">战略推进<br>机制层</div>' +
        '<div class="model-row-content">' +
          '<div class="model-mechanism-band">' +
            '<svg class="mechanism-loop-svg" viewBox="0 0 800 100" preserveAspectRatio="none" aria-hidden="true">' +
              '<path d="M40,80 C40,20 760,20 760,80" fill="none" stroke="#f04a23" stroke-width="1.5" stroke-dasharray="6 5" stroke-opacity="0.45"/>' +
            '</svg>' +
            '<div class="mechanism-nodes">' + nodes + '</div>' +
            '<p class="mechanism-band-footnote">' + escapeHtml(m.footnote) + '</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderPathRow(model) {
    var p = model.path;
    var cards = p.stages.map(function (stage, i) {
      var prefix = i > 0 ? '<span class="stage-arrow" aria-hidden="true">▶</span>' : '';
      return (
        prefix +
        '<button type="button" class="stage-card-replica" data-select-stage="' + escapeHtml(stage.id) + '" style="--stage-color:' + escapeHtml(stage.color) + '">' +
          '<span class="stage-card-replica-icon">' + escapeHtml(String(stage.num)) + '</span>' +
          '<span class="stage-card-replica-title">' + escapeHtml(stage.title) + '</span>' +
          '<span class="stage-card-replica-en">' + escapeHtml(stage.en) + '</span>' +
          '<span class="stage-card-replica-divider"></span>' +
          renderItems(stage.items) +
        '</button>'
      );
    }).join('');

    return (
      '<div class="model-row path-row">' +
        '<div class="model-row-label model-row-label--path">战略<br>路径层</div>' +
        '<div class="model-row-content">' +
          '<div class="path-row-inner">' +
            '<div class="path-stage-track">' + cards + '</div>' +
            '<div class="stage-iteration-line">' +
              '<svg class="stage-iteration-svg" viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true">' +
                '<path d="M20,12 C200,12 400,12 600,12 C800,12 980,12 980,12" fill="none" stroke="#075aa8" stroke-width="1.5" stroke-dasharray="8 6" stroke-opacity="0.5"/>' +
              '</svg>' +
              '<span class="stage-iteration-label">' + escapeHtml(p.iterationLabel) + '</span>' +
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
        '<button type="button" class="capability-cell" data-select-cap="' + escapeHtml(cell.id) + '">' +
          '<span class="capability-cell-icon" aria-hidden="true">◆</span>' +
          '<strong>' + escapeHtml(cell.title) + ' ' + escapeHtml(cell.en) + '</strong>' +
          '<p>' + escapeHtml(cell.description) + '</p>' +
        '</button>'
      );
    }).join('');

    return (
      '<div class="model-row capability-row">' +
        '<div class="model-row-label model-row-label--capability">战略能力<br>支撑层</div>' +
        '<div class="model-row-content">' +
          '<div class="capability-support-band">' +
            '<div class="capability-support-head">' +
              '<strong>' + escapeHtml(c.title) + '</strong>' +
              '<span>/ ' + escapeHtml(c.subtitle) + '</span>' +
            '</div>' +
            '<div class="capability-support-cells">' + cells + '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderJudgmentRow(model) {
    var j = model.judgment;
    var cells = j.items.map(function (item) {
      return (
        '<button type="button" class="judgment-cell" data-select-judge="' + escapeHtml(item.id) + '">' +
          '<span class="judgment-cell-marker" aria-hidden="true">●</span>' +
          escapeHtml(item.title) +
        '</button>'
      );
    }).join('');

    return (
      '<div class="model-row judgment-row">' +
        '<div class="model-row-label model-row-label--judgment">战略<br>判断层</div>' +
        '<div class="model-row-content">' +
          '<div class="judgment-foundation">' +
            '<div class="judgment-foundation-head">' +
              '<strong>' + escapeHtml(j.title) + '</strong>' +
              '<span>' + escapeHtml(j.subtitle) + '</span>' +
            '</div>' +
            '<div class="judgment-foundation-cells">' + cells + '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderNoteRow(model) {
    return (
      '<div class="model-row model-note-row">' +
        '<div class="model-row-label model-row-label--note" aria-hidden="true">◎</div>' +
        '<div class="model-row-content">' +
          '<p class="model-note-text">' + escapeHtml(model.note) + '</p>' +
        '</div>' +
      '</div>'
    );
  }

  function renderReplica(model) {
    return (
      '<div class="goxedge-model-replica">' +
        '<div class="model-replica-toolbar">' +
          '<button type="button" class="model-ctrl-btn is-active" data-gox-reset>全景</button>' +
          '<button type="button" class="model-ctrl-btn" data-gox-clear>清除选择</button>' +
          '<a class="model-ctrl-link" data-gox-reference href="' + escapeHtml(model.referenceImage) + '" target="_blank" rel="noopener">查看原图</a>' +
        '</div>' +
        '<p class="model-scroll-hint">横向滑动查看完整模型</p>' +
        '<div class="model-replica-scroll">' +
          '<div class="model-replica-canvas">' +
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
    return '<p class="model-detail-placeholder">点击模型元素查看说明。</p>';
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
    panel.classList.add('has-selection');
  }

  function bindReplica(root, panel) {
    root.querySelectorAll('[data-select-stage]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectItem(root, panel, btn, 'stage', btn.getAttribute('data-select-stage'));
      });
    });
    root.querySelectorAll('[data-select-cap]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectItem(root, panel, btn, 'cap', btn.getAttribute('data-select-cap'));
      });
    });
    root.querySelectorAll('[data-select-mech]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectItem(root, panel, btn, 'mech', btn.getAttribute('data-select-mech'));
      });
    });
    root.querySelectorAll('[data-select-judge]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectItem(root, panel, btn, 'judge', btn.getAttribute('data-select-judge'));
      });
    });

    var resetBtn = root.querySelector('[data-gox-reset]');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        clearSelection(root);
        panel.innerHTML = '<p class="model-detail-placeholder">点击模型元素查看说明。</p>';
        panel.classList.remove('has-selection');
      });
    }

    var clearBtn = root.querySelector('[data-gox-clear]');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        clearSelection(root);
        panel.innerHTML = '<p class="model-detail-placeholder">点击模型元素查看说明。</p>';
        panel.classList.remove('has-selection');
      });
    }

    var refLink = root.querySelector('[data-gox-reference]');
    if (refLink) {
      refLink.addEventListener('click', function (e) {
        var img = new Image();
        img.onerror = function () {
          e.preventDefault();
          alert('原图文件尚未上传至 assets/img/figures/fig-3-5-goxedge-model-overview.png');
        };
        img.src = refLink.getAttribute('href');
      });
    }
  }

  function initInteractiveModel() {
    var mount = document.getElementById('interactive-model');
    var panel = document.getElementById('model-detail-panel');
    var model = window.GOXEDGE_MODEL;
    if (!mount || !model) return;

    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'model-detail-panel';
      panel.className = 'model-detail-panel';
      panel.innerHTML = '<p class="model-detail-placeholder">点击模型元素查看说明。</p>';
      mount.parentNode.insertBefore(panel, mount.nextSibling);
    }

    mount.innerHTML = renderReplica(model);
    mount.classList.add('model-replica-mount');
    bindReplica(mount, panel);
  }

  window.initInteractiveModel = initInteractiveModel;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveModel);
  } else {
    initInteractiveModel();
  }
})();
