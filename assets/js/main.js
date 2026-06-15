document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.v4-menu-toggle, .mobile-menu-toggle');
  var navShell = document.querySelector('.nav-shell');
  var v4Nav = document.querySelector('.v4-nav.nav-menu');

  if (toggle && navShell) {
    toggle.addEventListener('click', function () {
      navShell.classList.toggle('nav-open');
      if (v4Nav) v4Nav.classList.toggle('is-open');
      var gxNav = document.querySelector('.gx-nav.nav-menu');
      if (gxNav) gxNav.classList.toggle('is-open');
    });
  }

  document.querySelectorAll('[data-static-form]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      alert('GoxEDGE 出版配套资源预览版：正式下载与订阅功能将在图书出版后开放。');
    });
  });
});
