function setUpTabNavigation(sectionId) {
  const rootEl = document.querySelector(sectionId);
  const tabList = rootEl.querySelector('[role="tablist"]');
  const tabs = tabList.querySelectorAll(':scope > [role="tab"]');

  let tabFocus = 0;
  tabList.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      tabs[tabFocus].setAttribute('tabindex', -1);

      if (e.key === 'ArrowRight') {
        tabFocus = tabFocus + 1 >= tabs.length ? 0 : tabFocus + 1;
      } else if (e.key === 'ArrowLeft') {
        tabFocus = tabFocus - 1 < 0 ? tabs.length - 1 : tabFocus - 1;
      }

      tabs[tabFocus].setAttribute('tabindex', 0);
      tabs[tabFocus].focus();
    }
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.getAttribute('aria-selected') === 'true') {
        return;
      }

      tabList
        .querySelectorAll(':scope > [aria-selected="true"]')
        .forEach((selectedTab) => {
          selectedTab.setAttribute('aria-selected', 'false');
          rootEl
            .querySelector(`#${selectedTab.getAttribute('aria-controls')}`)
            .setAttribute('hidden', true);
        });

      tab.setAttribute('aria-selected', 'true');
      rootEl
        .querySelector(`#${tab.getAttribute('aria-controls')}`)
        .removeAttribute('hidden');
    });
  });
}
