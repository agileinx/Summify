document.getElementById("summarizeBtn").addEventListener("click", getText);

function getText() {

    var selectElement = document.getElementById('summary-length-select');

    var optionSelected = selectElement.options[selectElement.selectedIndex].text;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //gets the current tabs id
        const currentTabId = tabs[0].id;
    
        
        //inject the script into the tab
        chrome.scripting.executeScript({
            target: { tabId: currentTabId },
            func: (optionSelected) => {

                async function scrapeContent() {
    
                    const src = chrome.runtime.getURL('../config.json');
                            
                    await fetch(src)
                        .then(responce => {
                            return responce.json();
                        })
                        .then(text => {
                            
                            const apiKey = text.apiKey;
                
                            const endpoint = "https://api.openai.com/v1/chat/completions";
                
                    
                
                            async function extractAndSendText() {
                                const allText = document.body.innerText;
                
                                console.log(allText);

                                var prompt = "";
                        
                                //api request to summarize
                                if (optionSelected === "Snapshot (100-250 wds)"){
                                    prompt = "summarize this article BRIEFLY in 100 - 200 words: " + allText;
                                } else {
                                    prompt = "Summarize this webpage with GREAT DETAIL in EXACTLY 500 to 600 words. NO LESS THAN 500 WORDS. Ignore headers, footers, ads, and other misc. junk. Just the main content of the page that makes sense when summarized: " + allText;
                                }
                                
                                if (prompt.length > 15000){
                                    prompt = prompt.substring(0, 14999);
                                }
                
                                const data = {
                                    model: 'gpt-4',
                                    messages: [
                                        {
                                            role: 'user',
                                            content: prompt
                                        }
                                    ]
                                };
                        
                                const options = {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        "Authorization": `Bearer ${apiKey}`
                                    },
                                    body: JSON.stringify(data)
                                };
                        
                                //make fetch request to the API
                                fetch(endpoint, options)
                                    .then(responce => {
                                        if (!responce.ok) {
                                            chrome.runtime.sendMessage({ action: 'updatePopup', textContent: "Sorry, there was an error summarizing this page!"});
                                        }
                                        return responce.json();
                                    })
                                    .then(data => {
                
                                        const id = "text";
                                        const responce = data.choices[0].message.content;
                
                                        var requestData = {
                                            responce,
                                            id
                
                                        }
                
                                        chrome.runtime.sendMessage({ action: 'updatePopup', textContent: JSON.stringify(requestData)});
                                        
                                    })
                                    
                        
                            }
                    
                            extractAndSendText();
                        
                        
                        });
                }

                scrapeContent();
            },
            args: [optionSelected]
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
        files: ['javascript/grabWebURL.js']
    });

})
