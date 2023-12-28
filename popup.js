chrome.runtime.onMessage.addListener(function(request, sender, sendResponce) {
    
    //update <p> tag
    var parsedContent = JSON.parse(request.textContent);

    console.log("Text Content: " + request.textContent);

    if (parsedContent.id === "page-link"){
        document.getElementById('page-link').textContent = parsedContent.web_url;
    
    } else if (parsedContent.id === "text"){
        document.getElementById('text').textContent = parsedContent.responce;

    }

    
})