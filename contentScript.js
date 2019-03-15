chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    if (request.message === "clear storage") {
        localStorage.clear();
        sessionStorage.clear();
        chrome.runtime.sendMessage({message: "storage cleared."});
    }
    return true;
    
});