(function() {
  var qp, debounce, fs, bg, intro, isFullscreen;

  var filename = '';
  window.onhashchange = function() {
    filename = location.pathname;
    if (location.hash.length) filename += location.hash;
    qp.innerHTML = localStorage[filename] || '';
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