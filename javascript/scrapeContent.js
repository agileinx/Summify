function scrapeContent(){
    (async () => {
        const src = chrome.runtime.getURL('../config.json');

        fetch(src)
            .then(responce => {
                return responce.json();
            })
            .then(text => {
                
                const apiKey = text.apiKey;

                const endpoint = "https://api.openai.com/v1/chat/completions";
    
       

                async function extractAndSendText() {
                    const allText = document.body.innerText;

                    
            
                    //api request to summarize
            
                    var prompt = "Summarize this webpage in 300-500 words. Ignore headers, footers, ads, and other misc. junk. Just the main content of the page that makes sense when summarized: " + allText;

                    if (prompt.length > 15000){
                        prompt = prompt.substring(0, 14999);
                    }

                    const data = {
                        model: 'gpt-3.5-turbo',
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
        
       

        
    
    })();

}

scrapeContent();



