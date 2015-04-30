(function() {
  var qp, debounce, fs, bg, intro, isFullscreen;

  window.onload = function() {
    isFullscreen = false;
    qp = document.querySelector('quietplace');
    bg = document.querySelector('bg');
    fs = document.querySelector('fullscreen');
    intro = document.querySelector('intro');
    intro.className += 'bold';

    qp.innerHTML = localStorage[location.pathname] || '';
    qp.onkeydown = qp.onkeyup = inputChanged;

    fs.onclick = function() {
      if (!isFullscreen) {
        isFullscreen = true;
        if (bg.requestFullScreen) {
          bg.requestFullScreen();
        }
      } else {
        isFullscreen = false;
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
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
    localStorage[location.pathname] = qp.innerHTML;
  }

})();