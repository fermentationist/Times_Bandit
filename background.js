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
		console.log("cookies cleared");
		`;
	// inject script into active tab
	return chrome.tabs.executeScript({
		code: injectedCode
  	});	
}

// execute clearSiteData() when page is loaded or reloaded.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    clearSiteData();
}); 

// change icon appearance, clearSiteData() and reload when icon is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.browserAction.setIcon(
			{path: "icon_48_inverse.png", tabId: tab.id}
		);
	clearSiteData();
	console.log("reloading...");
	setTimeout(()=>{
		chrome.browserAction.setIcon(
			{path: "icon_48.png", tabId: tab.id}
		);
		location.reload();
	}, 500);
});
