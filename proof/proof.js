(function () {
  const tabs = Array.from(document.querySelectorAll('[role="tab"][data-view]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"][data-panel]'));
  if (!tabs.length || !panels.length) return;

  const validViews = new Set(tabs.map((tab) => tab.dataset.view));

  function viewFromLocation() {
    const requested = new URLSearchParams(window.location.search).get('view');
    if (validViews.has(requested)) return requested;

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      const parentPanel = target && target.closest('[data-panel]');
      if (parentPanel) return parentPanel.dataset.panel;
    }

    return 'gtm-motion';
  }

  function selectView(view, options = {}) {
    if (!validViews.has(view)) view = 'gtm-motion';

    tabs.forEach((tab) => {
      const selected = tab.dataset.view === view;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== view;
    });

    const url = new URL(window.location.href);
    if (view === 'gtm-motion') url.searchParams.delete('view');
    else url.searchParams.set('view', view);
    history.replaceState({ view }, '', url);

    const activeTab = tabs.find((tab) => tab.dataset.view === view);
    if (options.focus && activeTab) activeTab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectView(tab.dataset.view));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      selectView(tabs[nextIndex].dataset.view, { focus: true });
    });
  });

  selectView(viewFromLocation());
})();
