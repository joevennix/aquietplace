(function() {
  var qp, debounce, fs, bg, intro, isFullscreen;

  var filename = '';
  window.onhashchange = function() {
    filename = location.pathname;
    if (location.hash.length) filename += location.hash;
    if (localStorage[filename] && localStorage[filename] !== '')
      qp.innerHTML = localStorage[filename];
  };

  window.onkeydown = function(e) {
    var key = e.keyCode || e.charCode || 0;
    if (key === 83 && e.metaKey) {
      e.preventDefault();
      // download the content
      var a = document.createElement('a');
      // from prototype.js #stripTags
      var txt = qp.innerHTML.replace(/<\s*br\s*>/gi,"\r\n");
      txt = txt.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
      a.setAttribute('download', ((location.hash || 'aqiuetplace')+'.txt').replace(/^#/,''));
      a.setAttribute('href', 'data:text,'+encodeURI(txt));
      a.style = 'display: none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  window.onload = function() {
    isFullscreen = false;
    qp = document.querySelector('quietplace');
    bg = document.querySelector('bg');
    fs = document.querySelector('fullscreen');
    intro = document.querySelector('intro');
    intro.className += 'bold';

    window.onhashchange();
    qp.onkeydown = qp.onkeyup = inputChanged;

    fs.onclick = function() {
      if (!isFullscreen) {
        isFullscreen = true;
        if (bg.requestFullScreen) {
          bg.requestFullScreen();
          qp.focus();
        }
      } else {
        isFullscreen = false;
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
          qp.focus();
        }
      }
    };

    setTimeout(function() {
      intro.style.display = 'none';
      bg.style.display = 'block';
      setTimeout(function() {
        qp.focus();
      });
    }, 1000);
  };

  window.onbeforeunload = function() {
    saveInput();
  };

  function inputChanged() {
    if (debounce) return;
    debounce = setTimeout(function(){
      debounce = null;
      saveInput();
    }, 2000);
  }

  function saveInput() {
    localStorage[filename] = qp.innerHTML;
  }

})();