chrome.browserAction.onClicked.addListener(function(tab) {
	let injectedCode = `
		console.log(localStorage);
		window.localStorage.clear();
		console.log(sessionStorage);
		window.sessionStorage.clear();
		reg = /(=.*;)+/g;
		keys = document.cookie.split(reg);
		console.log("keys = ", keys);
		keys.map((key) => {
			document.cookie = key + "=null"
		});
		console.log(document.cookie);
		`;
	chrome.browserAction.setIcon(
			{path: "active.png", tabId: tab.id}
		);
	chrome.tabs.executeScript({
		code: injectedCode
  	});	
  	 return chrome.browserAction.setIcon(
			{path: "icon.png", tabId: tab.id}
		);
});

