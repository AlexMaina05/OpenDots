(function () {
  try {
    var saved = localStorage.getItem('mainadots-theme');
    var dark =
      saved === 'dark' ||
      (!saved &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
