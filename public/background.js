chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { isActive: true });
});

chrome.contextMenus.create({
    "title": "Site Note - Add note",
    "contexts": ["page", "selection", "image", "link"]
});

chrome.contextMenus.onClicked.addListener(() => {
    chrome.tabs.query({ active: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { addNote: true });
    })
});

