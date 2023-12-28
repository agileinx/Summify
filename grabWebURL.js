const web_url = window.location.href;
const id = "page-link"

var content = {
    web_url,
    id
}

chrome.runtime.sendMessage({ action: 'updatePopup', textContent: JSON.stringify(content) });