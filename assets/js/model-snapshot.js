/**
 * Renders compact GoxEDGE model snapshots into [data-model-snapshot] containers.
 * Non-interactive; links to full interactive model on /model/.
 */

(function () {
  'use strict';

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function modelRoot() {
    var path = window.location.pathname.replace(/\\/g, '/');
    if (/\/(book|model|resources|chapters|updates|contact|about|tools)\//.test(path)) {
      return '../model/index.html';
    }
    return 'model/index.html';
  }

  function renderLayers(model) {
    return model.layers.map(function (layer) {
      return (
        '<div class="snapshot-layer" data-layer="' + escapeHtml(layer.id) + '">' +
          '<span class="snapshot-layer-num">' + escapeHtml(layer.num) + '</span>' +
          '<div class="snapshot-layer-body">' +
            '<strong>' + escapeHtml(layer.title) + '</strong>' +
            '<span>' + escapeHtml(layer.summary) + '</span>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function renderStageRow(model) {
    return (
      '<div class="snapshot-stage-row" aria-label="六阶段路径">' +
      model.stages.map(function (stage, i) {
        var arrow = i < model.stages.length - 1 ? '<span class="snapshot-stage-arrow" aria-hidden="true">→</span>' : '';
        return '<span class="snapshot-stage-pill" style="--stage-color:' + escapeHtml(stage.color) + '">' + escapeHtml(stage.title) + '</span>' + arrow;
      }).join('') +
      '</div>'
    );
  }

  function renderCapabilityStrip(model) {
    return (
      '<div class="snapshot-cap-strip" aria-label="EDGE 四大能力">' +
      model.capabilities.map(function (cap) {
        return (
          '<div class="snapshot-cap-item">' +
            '<span class="snapshot-cap-letter">' + escapeHtml(cap.letter) + '</span>' +
            '<span class="snapshot-cap-title">' + escapeHtml(cap.title) + '</span>' +
          '</div>'
        );
      }).join('') +
      '</div>'
    );
  }

  function renderSnapshot(container) {
    var model = window.GOXEDGE_MODEL;
    if (!model) return;

    var compact = container.getAttribute('data-model-snapshot') === 'compact';
    var showCta = container.getAttribute('data-model-snapshot-cta') !== 'false';
    var modelHref = modelRoot() + '#interactive-model';

    var html =
      '<div class="model-snapshot' + (compact ? ' model-snapshot-compact' : '') + '">' +
        '<div class="model-snapshot-diagram">' +
          '<div class="model-snapshot-stack">' + renderLayers(model) + '</div>' +
          (!compact ? renderCapabilityStrip(model) : '') +
          renderStageRow(model) +
        '</div>';

    if (!compact) {
      html +=
        '<div class="model-snapshot-meta">' +
          '<p class="model-snapshot-desc">' + escapeHtml(model.description) + '</p>';
      if (showCta) {
        html += '<a class="btn btn-secondary" href="' + escapeHtml(modelHref) + '">探索交互式模型</a>';
      }
      html += '</div>';
    } else if (showCta) {
      html += '<a class="btn btn-ghost model-snapshot-cta" href="' + escapeHtml(modelHref) + '">查看完整模型 →</a>';
    }

    html += '</div>';
    container.innerHTML = html;
  }

  function applyModelSnapshots() {
    document.querySelectorAll('[data-model-snapshot]').forEach(renderSnapshot);
  }

  window.applyModelSnapshots = applyModelSnapshots;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyModelSnapshots);
  } else {
    applyModelSnapshots();
  }
})();
