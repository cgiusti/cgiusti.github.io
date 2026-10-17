/* assets/js/nav.js: mobile menu toggle. Implements PLAN.md section 6.
 * The only script on a v0 page. Opening clears the menu's hidden attribute,
 * adds nav-open to body (which only locks page scroll), marks the rest of the
 * page inert so Tab cannot leave the menu, and moves focus to the first link.
 * Closing reverses all of that and returns focus to the opener. Without
 * JavaScript the desktop nav is always available above 992px; below it the
 * menu stays hidden, which P3 accepts because the buttons are real <button>
 * elements and the skip link and page content remain reachable. */
(function () {
  'use strict';

  var body = document.body;
  var openButton = document.querySelector('.site-header .hamburger');
  var menu = document.getElementById('mobile-nav');
  if (!openButton || !menu) { return; }
  var closeButton = menu.querySelector('.hamburger--close');
  // Everything outside the menu, including the skip link, so Tab stays inside it (v0 hotfix, S0.10).
  var covered = document.querySelectorAll('.skip-link, .site-header, .banner, main, .site-footer');

  function setOpen(open) {
    body.classList.toggle('nav-open', open);
    menu.hidden = !open;
    openButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    for (var i = 0; i < covered.length; i += 1) {
      covered[i].inert = open;
    }
    if (open) {
      var first = menu.querySelector('a');
      if (first) { first.focus(); }
    } else {
      openButton.focus();
    }
  }

  openButton.addEventListener('click', function () { setOpen(true); });
  if (closeButton) {
    closeButton.addEventListener('click', function () { setOpen(false); });
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && body.classList.contains('nav-open')) {
      setOpen(false);
    }
  });
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) { setOpen(false); }
  });
})();
