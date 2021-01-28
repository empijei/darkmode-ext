chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(tab.id,
        {
            code: `
        if (document.body.classList.contains('invert')) {
            document.body.classList.remove('invert');
        } else {
            document.body.classList.add('invert');
        }
    `});
});