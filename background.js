let thisBrowser, browserName;

if (typeof browser === "undefined") {
    thisBrowser = chrome;
    browserName = "chrome";
} else {
    thisBrowser = browser;
    browserName = "browser";
}
console.log("thisBrowser:", thisBrowser);
const removeCookies = tab => {
    return new Promise((resolve, reject) => {
        thisBrowser.cookies.getAll({
            url: tab.url
        }, cookies => {
            let numCookiesRemoved = 0;
            cookies.map(cookie => {
                numCookiesRemoved++;
                thisBrowser.cookies.remove({
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
	return thisBrowser.tabs.executeScript(
		{
			code: `
			localStorage.clear();
			sessionStorage.clear();
			${browserName}.runtime.sendMessage({message: "storage cleared."});
			`
		}
	);
}

const reloadPage = (message_listener = messageListener, click_listener = clickListener) => {
	thisBrowser.browserAction.onClicked.removeListener(click_listener);
	console.log(thisBrowser.browserAction.onClicked.hasListener(click_listener) ? `removal of listener: ${click_listener.name} failed.`: `listener: ${click_listener.name} removed successfully.`);

	thisBrowser.runtime.onMessage.removeListener(message_listener);
	console.log(thisBrowser.runtime.onMessage.hasListener(message_listener) ? `removal of listener: ${message_listener.name} failed.`: `listener: ${message_listener.name} removed successfully.`);

	console.log("reloading...");
	thisBrowser.tabs.reload({bypassCache: true});
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
	thisBrowser.browserAction.onClicked.addListener(click_listener);
	thisBrowser.runtime.onMessage.addListener(message_listener);

	const listenersAdded = 
	thisBrowser.runtime.onMessage.hasListener(message_listener) && thisBrowser.browserAction.onClicked.hasListener(click_listener);

	console.log(listenersAdded ? "listeners added successfully" : "failed to add listeners");
	return listenersAdded;
}

addListeners();
