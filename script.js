(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const year = document.querySelector('#year');

  if (year) year.textContent = String(new Date().getFullYear());

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    if (themeButton) {
      themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      themeButton.setAttribute('aria-pressed', String(isDark));
      themeButton.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = isDark ? '#151b16' : '#f5f7f2';
  };

  let savedTheme = 'light';
  try {
    const stored = localStorage.getItem('daniyal-portfolio-theme');
    if (stored === 'light' || stored === 'dark') savedTheme = stored;
  } catch (_) {
    // The site still works when browser storage is unavailable.
  }
  setTheme(savedTheme);

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      try {
        localStorage.setItem('daniyal-portfolio-theme', nextTheme);
      } catch (_) {
        // Theme switching remains available for the current page session.
      }
    });
  }

  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        menuButton.focus();
      }
    });
  }
})();
