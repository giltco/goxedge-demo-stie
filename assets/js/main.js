
document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.querySelector('.mobile-menu-toggle');
  var nav = document.querySelector('.nav-shell');
  if(toggle && nav){ toggle.addEventListener('click', function(){ nav.classList.toggle('nav-open'); }); }
  document.querySelectorAll('[data-static-form]').forEach(function(btn){
    btn.addEventListener('click', function(){ alert('GoxEDGE 出版配套资源预览版：正式下载与订阅功能将在图书出版后开放。'); });
  });
});
