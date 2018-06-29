console.log("contentScript.js loaded.");
console.log(localStorage);
window.localStorage.clear();
console.log(sessionStorage);
window.sessionStorage.clear();
console.log("document.cookie", document.cookie);
reg = /=\\S*;\\s/;
keys = document.cookie.split(reg);
console.log("keys = ", keys);
keys.map((key) => {
	console.log("KEY: ", key);
	expiry = new Date(1528693200000);
	newValue = key + "=;max-age=0;expires=" + expiry.toUTCString() + ";path=/;domain=nytimes.com;";
	console.log("newValue =", newValue);
	document.cookie = newValue;
});
console.log(document.cookie);
