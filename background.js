let deactivationCode = `document.querySelector("#papyracy").innerHTML = ""`;

chrome.browserAction.onClicked.addListener(function(tab) {
	let injectedCode = `
		console.log(localStorage);
		localStorage.clear();
		console.log(localStorage);
		sessionStorage.clear();
		console.log("storage cleared?");`;
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









