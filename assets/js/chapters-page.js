(function () {

  'use strict';



  function escapeHtml(text) {

    return String(text)

      .replace(/&/g, '&amp;')

      .replace(/</g, '&lt;')

      .replace(/>/g, '&gt;')

      .replace(/"/g, '&quot;');

  }



  function renderFocusList(items) {

    if (!items || !items.length) return '';

    return (

      '<ul class="list path-focus-list">' +

      items.map(function (item) {

        return '<li>' + escapeHtml(item) + '</li>';

      }).join('') +

      '</ul>'

    );

  }



  function renderToolLinks(tools) {

    if (!tools || !tools.length) return '';

    return (

      '<div class="path-tool-links">' +

      tools.map(function (tool) {

        if (tool.link) {

          return '<a class="btn btn-ghost" href="' + escapeHtml(tool.link) + '">' + escapeHtml(tool.label) + '</a>';

        }

        return '<span class="btn btn-secondary is-disabled" aria-disabled="true">' + escapeHtml(tool.label) + '</span>';

      }).join('') +

      '</div>'

    );

  }



  function renderPath(path) {
    var chapters = path.chapters
      ? '<span class="v5-chapter-pill">' + escapeHtml(path.chapters) + '</span>'
      : '';

    return (
      '<article class="v6-role-card">' +
        '<div class="v6-role-card-body">' +
          '<h3>' + escapeHtml(path.title) + '</h3>' +
          '<p>' + escapeHtml(path.description) + '</p>' +
        '</div>' +
        chapters +
      '</article>'
    );
  }



  function renderTocPart(part) {

    var items = part.chapters.map(function (chapter) {

      return '<li>' + escapeHtml(chapter) + '</li>';

    }).join('');



    return (
      '<div class="v4-toc-part">' +
        '<h3>' + escapeHtml(part.part) + '</h3>' +
        '<ul class="v4-toc-list">' + items + '</ul>' +
      '</div>'
    );

  }



  function renderResourceCell(item) {

    if (item.resourceLink) {

      return '<a href="' + escapeHtml(item.resourceLink) + '">' + escapeHtml(item.resource) + '</a>';

    }

    return escapeHtml(item.resource);

  }



  function renderMappingRow(item) {

    return (

      '<tr>' +

        '<td>' + escapeHtml(item.topic) + '</td>' +

        '<td>' + escapeHtml(item.stage) + '</td>' +

        '<td>' + renderResourceCell(item) + '</td>' +

        '<td>' + escapeHtml(item.action) + '</td>' +

      '</tr>'

    );

  }



  function applyChaptersPage() {

    var config = window.CHAPTERS_CONFIG;

    if (!config) return;



    var pageTitle = document.querySelector('[data-chapters-title]');

    if (pageTitle && config.pageTitle) {

      pageTitle.textContent = config.pageTitle;

    }



    var pathsContainer = document.querySelector('[data-chapters-paths]');

    var rolePaths = config.rolePaths || config.readingPaths;

    if (pathsContainer && rolePaths) {

      pathsContainer.innerHTML = rolePaths.map(renderPath).join('');

    }



    var homePaths = document.querySelector('[data-home-chapter-paths]');

    if (homePaths && config.readingPaths) {

      homePaths.innerHTML = config.readingPaths.map(renderPath).join('');

    }



    var tocContainer = document.querySelector('[data-chapters-toc]');

    if (tocContainer && config.tableOfContents) {

      tocContainer.innerHTML = config.tableOfContents.map(renderTocPart).join('');

    }



    var homeToc = document.querySelector('[data-home-toc]');

    if (homeToc && config.tableOfContents) {

      homeToc.innerHTML = config.tableOfContents.map(renderTocPart).join('');

    }



    var mappingBody = document.querySelector('[data-chapters-mapping]');

    if (mappingBody && config.mapping) {

      mappingBody.innerHTML = config.mapping.map(renderMappingRow).join('');

    }



    var mappingNote = document.querySelector('[data-chapters-mapping-note]');

    if (mappingNote && config.mappingNote) {

      mappingNote.textContent = config.mappingNote;

    }



    var caseNote = document.querySelector('[data-chapters-case-note]');

    if (caseNote && config.caseNote) {

      caseNote.textContent = config.caseNote;

    }

  }



  window.applyChaptersPage = applyChaptersPage;



  function init() {

    applyChaptersPage();

  }



  if (document.readyState === 'loading') {

    document.addEventListener('DOMContentLoaded', init);

  } else {

    init();

  }

})();


