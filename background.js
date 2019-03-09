let injectedCode, toggleIcon = false;
// let activationCode = `styleTag = document.querySelector("#papyracy");
// 	if (!styleTag) {
// 		styleTag = document.createElement("style");
// 		styleTag.type = "text/css";
// 		styleTag.setAttribute("id", "papyracy");
// 	}
// 	styleTag.innerHTML = "* { font-family: papyrus !important;}";
// 	document.querySelector("head").appendChild(styleTag);`;

let deactivationCode = `document.querySelector("#papyracy").innerHTML = ""`;
const activationCode = `
	console.log("is this even working?");
	localStorage.clear();
	sessionStorage.clear();
	const cookies = document.cookie.split(";");
	const keys = cookies.map(cookieString => {
		const trimmedCookie = cookieString.trim();
		const endOfKey = trimmedCookie.indexOf("=");
		const key = trimmedCookie.slice(0, endOfKey);
		console.log("key is", key);
		return key;	
	});
	keys.map(key => {
		revisedCookie = key + "=; domain=.nytimes.com";
		console.log("revision -", revisedCookie);
		document.cookie = revisedCookie;
	});
	chrome.Cookie.remove({
				url: ".nytimes.com",
				name: "optimizelyEndUserId"
			}, x => console.log(x));
	console.log("cookies =", (cookies));
`;

chrome.browserAction.onClicked.addListener(function (tab) {
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
const clearSiteData = () => {
	// script to be inject into active tab as a string
	let injectedCode = `
		window.localStorage.clear();
		window.sessionStorage.clear();
		// regex used to parse cookie string and extract keys
		reg = /=\\S*;\\s/;
		keys = document.cookie.split(reg);
		// each cookie redefined as blank and set to expired
		keys.map((key) => {
			expiry = new Date(1528693200000);
			newValue = key + "=;max-age=0;expires=" + expiry.toUTCString() + ";path=/;domain=nytimes.com;";
			document.cookie = newValue;
		});
		console.log("*cookies cleared*");
		`;
	// inject script into active tab
	return chrome.tabs.executeScript({
		code: injectedCode
  	});	
  	// return location.reload();
}

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

// // execute clearSiteData() when page is loaded or reloaded.
// window.addEventListener("load", function(event) {
// 	console.log("updatetoggle=", toggle);
// 	if (toggle) {
// 		console.log(`clearing site data from ${event.target.URL}...`);
// 		return clearSiteData();
// 	}
//     return console.log("Times Bandit not enabled.");
// }); 

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
// 	console.log(`${tab.url} updated. Calling clearSiteDate()...`);
//     clearSiteData();
// }); 

// // change icon appearance, clearSiteData() and reload when icon is clicked
// chrome.browserAction.onClicked.addListener(function(tab) {
// 	toggle = !toggle;
// 	console.log("click, toggle=", toggle);
// 	if (!toggle) {
// 		console.log("Times Bandit disabled.");
// 		 return chrome.browserAction.setIcon(
// 		{
// 			path: "icon_48_inverse.png",
// 			tabId: tab.id
// 		});
// 	} else {
// 		chrome.browserAction.setIcon(
// 		{
// 			path: "icon_48.png",
// 			tabId: tab.id
// 		});
// 		clearSiteData();
// 		window.localStorage.setItem("times-bandit", "true");
// 		console.log("cookies cleared");
// 		return location.reload();
// 	}
// 	// chrome.browserAction.setIcon(
// 	// 		{path: "icon_48_inverse.png", tabId: tab.id}
// 	// 	);
// 	// clearSiteData();
// 	// console.log("reloading...");
// 	// setTimeout(()=>{
// 	// 	chrome.browserAction.setIcon(
// 	// 		{path: "icon_48.png", tabId: tab.id}
// 	// 	);
// 	// 	location.reload();
// 	// }, 500);
// });
