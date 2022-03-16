export function submenuHover(menuItems, timer) {
  Array.prototype.forEach.call(menuItems, function (el) {
    // show on hover
    el.addEventListener('mouseover', function () {
      if (document.querySelector('.has-submenu.open')) {
        document.querySelector('.has-submenu.open').className = 'has-submenu';
      }
      this.className = 'has-submenu open';
      clearTimeout(timer);
    });

    // remove on mouse out
    el.addEventListener('mouseout', function () {
      timer = setTimeout(function () {
        if (!el.contains(document.activeElement)) {
          if (document.querySelector('.has-submenu.open'))
            document.querySelector('.has-submenu.open').className =
              'has-submenu';
        }
      }, 500); //delay before menu hides
    });

    // check for ESC key to close submenu
    el.addEventListener('keyup', function handler(event) {
      if (event.key === 'Escape') {
        if (document.querySelector('.has-submenu.open')) {
          document.querySelector('.has-submenu.open').className =
            'has-submenu';
          el.querySelector('button').focus();
        }
      }
    });

    // hide when focus is out of submenu
    el.addEventListener('focusout', function (elm) {
      elm.preventDefault();
      setTimeout(function () {
        //setTimeout to prevent it from trigger while focus is changing
        if (!el.contains(document.activeElement)) {
          if (document.querySelector('.has-submenu.open'))
            document.querySelector('.has-submenu.open').className =
              'has-submenu';
        }
      }, 10);
    });
  });
}

// shows and hides the submenu on button click
export function submenuClick(e) {
  e.preventDefault();
  const el = e.target;

  if (el.parentNode.className == 'has-submenu') {
    el.parentNode.className = 'has-submenu open';
    el.setAttribute('aria-expanded', 'true');
  } else {
    el.parentNode.className = 'has-submenu';
    el.setAttribute('aria-expanded', 'false');
  }
}
