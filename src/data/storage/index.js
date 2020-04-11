
export const SetToStorage = (data) => {
    chrome.storage.local.set(data);
}

export const GetFromStorage = (name) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(name, (result) => {
            result[name] ? resolve(result) : reject();
        });
    })
}
