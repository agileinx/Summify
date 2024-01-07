chrome.runtime.onMessage.addListener(function(request, sender, sendResponce) {
    
    //update <p> tag
    var parsedContent = JSON.parse(request.textContent);

    console.log("Text Content: " + request.textContent);

    if (parsedContent.id === "page-link"){
        
        document.getElementById('page-link').textContent = parsedContent.web_url;
        
        //getting hostname for favicon purposes
        var parsedURL = new URL(parsedContent.web_url);
        const hostname = parsedURL.hostname;

        var favicon = document.getElementById("favicon-image");
        favicon.src = "https://www.google.com/s2/u/0/favicons?domain=" + hostname;
    
        var webpage = document.getElementsByClassName('webpage');
        webpage[0].style.display = 'flex';

    } else if (parsedContent.id === "text"){
       
        document.getElementById('text').textContent = parsedContent.responce;

         //uninitiate loading animation (GIF)
        document.getElementById("loading-gif").style.display = 'none';

        var summarizeBtnTxt = document.getElementById("button-text");
        summarizeBtnTxt.style.display = "block";

        //updating word count of text box
        var text = document.getElementById('text').textContent;

        var wordCount = 0;

        for (i = 0; i < text.length; i++){
            
            if (text[i] == " "){
                wordCount++;
            }
        }

        wordCount++;

        document.getElementById("word-count-label").innerHTML = wordCount + " Words";

    }

    
})

