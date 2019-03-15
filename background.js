const removeCookies = tab => {
    return new Promise((resolve, reject) => {
        chrome.cookies.getAll({
            url: tab.url
        }, cookies => {
            let numCookiesRemoved = 0;
            cookies.map(cookie => {
                numCookiesRemoved++;
                chrome.cookies.remove({
                    url: tab.url,
                    name: cookie.name
                }, x => {
                    console.log("cookie removed", x);
                });
            });
            resolve(`${numCookiesRemoved} cookies removed.`);
        });
        
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log("sender.tab", sender.tab);
    if (sender.tab){
        console.log(`message received from content script on ${sender.tab.url}: ${request.message}`);
        return chrome.tabs.reload({bypassCache: true});
    }
    return console.log("Storage not cleared.");
});

chrome.browserAction.onClicked.addListener(tab => {
    removeCookies(tab).then(x => {
        console.log(x);
        chrome.tabs.sendMessage(tab.id, {message: "clear storage"});
    });
});

