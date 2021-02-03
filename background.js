chrome.storage.sync.get('state', (state) => {
    if (!(state instanceof Map)) state = new Map();

    chrome.browserAction.onClicked.addListener(function (tab) {
        const domain = (new URL(tab.url)).hostname;
        const active = !state.get(domain);
        state.set(domain, active);
        chrome.storage.sync.set({ 'state': state });
        chrome.tabs.executeScript(tab.id,
            {
                code: `document.body.classList.${active ? "add" : "remove"}('invert')`
            }
        );
    });

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status != 'complete') {
            return;
        }
        const domain = (new URL(tab.url)).hostname;
        const active = state.get(domain);
        if (!active) {
            return;
        }
        chrome.tabs.executeScript(tab.id, { code: `document.body.classList.add('invert')` });
    })
});
