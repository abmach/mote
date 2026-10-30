// Header scroll hints: data-nav drives the directional fades
  const pills = document.querySelector('header nav ul');
  const syncNav = () => pills.parentElement.dataset.nav =
    (pills.scrollLeft > 1 ? 'start ' : '') +
    (pills.scrollLeft + pills.clientWidth < pills.scrollWidth - 1 ? 'end' : '');
  pills.addEventListener('scroll', syncNav, { passive: true });
  addEventListener('resize', syncNav);
  syncNav();
  document.fonts?.ready.then(syncNav);

  // Theme toggle: auto -> light -> dark -> auto
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const states = ['', 'light', 'dark'];
  let i = 0;
  btn.addEventListener('click', () => {
    root.classList.add('mote-theme-switch');
    i = (i + 1) % states.length;
    root.dataset.theme = states[i];
    btn.textContent = 'Theme: ' + (states[i] || 'auto');
    requestAnimationFrame(() => root.classList.remove('mote-theme-switch'));
  });

  // Modal demo
  const openDialog = document.getElementById('open-dialog');
  const docsDialog = document.getElementById('docs-dialog');
  if (openDialog && docsDialog) {
    openDialog.addEventListener('click', () => docsDialog.showModal());
  }

  // Toast demo
  const fireToast = (btnId, toastId) => {
    const button = document.getElementById(btnId);
    const toast = document.getElementById(toastId);
    if (!button || !toast) return;
    button.addEventListener('click', () => {
      toast.showPopover();
      clearTimeout(toast._t);
      toast._t = setTimeout(() => toast.matches(':popover-open') && toast.hidePopover(), 3000);
    });
  };
  fireToast('toast-btn', 'docs-toast');
  fireToast('toast-btn-success', 'docs-toast-success');
  fireToast('toast-btn-warning', 'docs-toast-warning');
  fireToast('toast-btn-error', 'docs-toast-error');
  fireToast('toast-btn-info', 'docs-toast-info');
  fireToast('toast-btn-muted', 'docs-toast-muted');

  // Contents rail: mark the section in view and keep it in sight
  const tocNav = document.querySelector('body > aside nav[aria-label="toc"]');
  const tocDetails = tocNav?.querySelector('details');
  const tocLinks = tocNav ? [...tocNav.querySelectorAll('a[href^="#"]')] : [];
  const tocTargets = tocLinks
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);
  const rail = document.querySelector('body > aside');
  let tocOffsets = [];
  let activeId = null;

  const measureToc = () => {
    tocOffsets = tocTargets.map(h => ({ id: h.id, top: h.getBoundingClientRect().top + scrollY }));
  };

  const markCurrent = id => {
    if (id === activeId) return;
    activeId = id;
    for (const a of tocLinks) {
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    }
    const link = tocLinks.find(a => a.getAttribute('href') === '#' + id);
    if (link && rail && rail.scrollHeight > rail.clientHeight) {
      const lr = link.getBoundingClientRect();
      const rr = rail.getBoundingClientRect();
      if (lr.top < rr.top) rail.scrollTop -= rr.top - lr.top + 8;
      else if (lr.bottom > rr.bottom) rail.scrollTop += lr.bottom - rr.bottom + 8;
    }
  };

  let tocPending = false;
  const syncToc = () => {
    tocPending = false;
    const y = scrollY + 120;
    let current = null;
    for (const o of tocOffsets) {
      if (o.top <= y) current = o.id;
      else break;
    }
    markCurrent(current);
  };
  addEventListener('scroll', () => {
    if (tocPending) return;
    tocPending = true;
    requestAnimationFrame(syncToc);
  }, { passive: true });
  const remeasure = () => { measureToc(); syncToc(); };
  addEventListener('resize', remeasure);
  document.fonts?.ready.then(remeasure);
  new ResizeObserver(remeasure).observe(document.querySelector('main'));
  measureToc();
  syncToc();

  // Narrow screens: the outline folds into a one-line summary.
  const narrow = matchMedia('(width < 50rem)');
  const syncTocDetails = () => { if (tocDetails) tocDetails.open = !narrow.matches; };
  narrow.addEventListener('change', syncTocDetails);
  syncTocDetails();