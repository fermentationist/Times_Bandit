chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    console.log("contentScript called");
    if (request === "clear storage" && sender === "background") {
        console.log(`request === "clear storage" && sender === "background"`);
        clearStorage();
        sendResponse({message: "clearing storage"});
    }
    return true
});

const clearStorage = () => {
    chrome.storage.local.clear(() => {
		console.log("local storage cleared.")
	});
}