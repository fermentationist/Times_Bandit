// const activationCode = `
// 	console.log("is this even working?");
// 	chrome.storage.local.clear(function cb() {
// 		console.log("local storage cleared.")
// 	});
// 	const cookiesArray = document.cookie.split(";");
// 	const keys = cookiesArray.map(cookieString => {
// 		const trimmedCookie = cookieString.trim();
// 		const endOfKey = trimmedCookie.indexOf("=");
// 		const key = trimmedCookie.slice(0, endOfKey);
// 		console.log("key is", key);
// 		return key;	
// 	});
// 	keys.map(key => {
// 		const domain = "*://*.nytimes.com/";
// 		const revisedCookie = key + "=; domain=" + domain;
// 		console.log("revision -", revisedCookie);
// 		document.cookie = revisedCookie;
		
// 	});
// 	console.log("cookies =", chrome.cookies.getAllCookieStores(stores => console.log("stores =", stores)));
// `;

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.sendMessage(tab.id, {message: "clear storage"});
	console.log("tab", tab);
	chrome.browserAction.setIcon({
		path: "./icon_48_inverse.png",
		tabId: tab.id
	});
	// injectedCode = activationCode;
	chrome.browserAction.setIcon({
		path: "./icon_48.png",
		tabId: tab.id
	});
	// return chrome.tabs.executeScript({
	// 	code: injectedCode
	// });
});
