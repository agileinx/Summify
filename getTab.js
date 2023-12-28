document.getElementById("summarizeBtn").addEventListener("click", getText);


function getText() {


    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //gets the current tabs id
        const currentTabId = tabs[0].id;
    
        //inject the script into the tab
        chrome.scripting.executeScript({
            target: { tabId: currentTabId },
            files: ['scrapeContent.js']
        });
    
    
    
    });

}

//getting the WEB_URL
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //gets the current tabs id
    const currentTabId = tabs[0].id;

    //inject the script into the tab
    chrome.scripting.executeScript({
        target: { tabId: currentTabId },
        files: ['grabWebURL.js']
    });

})