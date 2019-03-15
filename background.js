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

const clearStorage = () => {
	return chrome.tabs.executeScript(
		{
			code: `
			localStorage.clear();
			sessionStorage.clear();
			chrome.runtime.sendMessage({message: "storage cleared."});
			`
		}
	);
}

const reloadPage = (message_listener = messageListener, click_listener = clickListener) => {
	chrome.browserAction.onClicked.removeListener(click_listener);
	console.log(chrome.browserAction.onClicked.hasListener(click_listener) ? `removal of listener: ${click_listener.name} failed.`: `listener: ${click_listener.name} removed successfully.`);

	chrome.runtime.onMessage.removeListener(message_listener);
	console.log(chrome.runtime.onMessage.hasListener(message_listener) ? `removal of listener: ${message_listener.name} failed.`: `listener: ${message_listener.name} removed successfully.`);

	console.log("reloading...");
	chrome.tabs.reload({bypassCache: true});
	addListeners(message_listener, click_listener);
}

const messageListener = (request, sender) => {
    if (sender.tab){
		console.log(`message received from content script on ${sender.tab.url}: ${request.message}.`);
		return reloadPage();
    }
    return console.log("Storage not cleared.");
}

const clickListener = tab => {
    return removeCookies(tab).then(x => {
        console.log(x);
        clearStorage();
    });
};

const addListeners = (message_listener = messageListener, click_listener = clickListener) => {
	chrome.browserAction.onClicked.addListener(click_listener);
	chrome.runtime.onMessage.addListener(message_listener);

	const listenersAdded = 
	chrome.runtime.onMessage.hasListener(message_listener) && chrome.browserAction.onClicked.hasListener(click_listener);

	console.log(listenersAdded ? "listeners added successfully" : "failed to add listeners");
	return listenersAdded;
}

addListeners();
