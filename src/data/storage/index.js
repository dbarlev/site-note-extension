
export const SetToStorage = (data) => {
    chrome.storage.local.set(data);
}

export const GetFromStorage = (name) => {
    chrome.storage.local.get(name, (result) => {
        console.log('Value currently is ' + result.key);
    });
}
