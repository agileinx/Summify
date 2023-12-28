chrome.runtime.onMessage.addListener(function(request, sender, sendResponce) {
    
    //update <p> tag
    document.getElementById('text').textContent = request.textContent;
    
})