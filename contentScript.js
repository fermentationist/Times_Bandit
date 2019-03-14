
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    console.log("contentScript called");
    console.log("message = ", request.message);
    console.log("sender.tab =", sender.tab);
    if (request.message === "clear storage") {
        console.log(`request === "clear storage"`);
        clearStorage();
        sendResponse({message: "clearing storage"});
        console.log(`response sent: "clearing storage"`);
    }
    return true
});

const clearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    chrome.cookies.clear();
}