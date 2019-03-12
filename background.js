const activationCode = `
	console.log("is this even working?");
	chrome.storage.local.clear(function cb() {
		console.log("local storage cleared.")
	});
	const cookiesArray = document.cookie.split(";");
	const keys = cookiesArray.map(cookieString => {
		const trimmedCookie = cookieString.trim();
		const endOfKey = trimmedCookie.indexOf("=");
		const key = trimmedCookie.slice(0, endOfKey);
		console.log("key is", key);
		return key;	
	});
	keys.map(key => {
		const domain = "*://*.nytimes.com/";
		const revisedCookie = key + "=; domain=" + domain;
		console.log("revision -", revisedCookie);
		document.cookie = revisedCookie;
		
	});
	console.log("cookies =", chrome.cookies.getAllCookieStores(stores => console.log("stores =", stores)));
`;

chrome.browserAction.onClicked.addListener(function (tab) {
	console.log("chrome.tabs", chrome.tabs);
	chrome.browserAction.setIcon({
		path: "./icon_48_inverse.png",
		tabId: tab.id
	});
	injectedCode = activationCode;
	chrome.browserAction.setIcon({
		path: "./icon_48.png",
		tabId: tab.id
	});
	return chrome.tabs.executeScript({
		code: injectedCode
	});
});

// clear localStorage, sessionStorage and cookies
// const clearSiteData = () => {
// 	// script to be inject into active tab as a string
// 	let injectedCode = `
// 		window.localStorage.clear();
// 		window.sessionStorage.clear();
// 		// regex used to parse cookie string and extract keys
// 		reg = /=\\S*;\\s/;
// 		keys = document.cookie.split(reg);
// 		// each cookie redefined as blank and set to expired
// 		keys.map((key) => {
// 			expiry = new Date(1528693200000);
// 			newValue = key + "=;max-age=0;expires=" + expiry.toUTCString() + ";path=/;domain=nytimes.com;";
// 			document.cookie = newValue;
// 		});
// 		console.log("*cookies cleared*");
// 		`;
// 	// inject script into active tab
// 	return chrome.tabs.executeScript({
// 		code: injectedCode
//   	});	
//   	// return location.reload();
// }

// chrome.runtime.onInstalled.addListener(() => {
// 	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
// 		chrome.declarativeContent.onPageChanged.addRules([{
// 			conditions: [
// 				new chrome.declarativeContent.PageStateMatcher({
// 					pageUrl: {
// 						urlContains: 'nytimes'
// 					}
// 			})],
// 			actions: [
// 				new chrome.declarativeContent.ShowPageAction()
// 			]
// 		}]);
// 	});
// });

