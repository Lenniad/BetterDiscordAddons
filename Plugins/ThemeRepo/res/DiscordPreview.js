window.onload = function () {
	window.parent.postMessage({origin:"DiscordPreview",reason:"OnLoad"},"*");
};
window.onkeyup = function (e) {
	window.parent.postMessage({origin:"DiscordPreview",reason:"KeyUp",key:e.which},"*");
};
window.onmessage = function (e) {
	if (typeof e.data === "object" && e.data.origin == "ThemeRepo") {
		switch (e.data.reason) {
			case "OnLoad":
				var body = document.querySelector("body");
				body.innerHTML = body.innerHTML.replace(new RegExp("REPLACE_USERNAME", "g"), e.data.username);
				body.innerHTML = body.innerHTML.replace(new RegExp("REPLACE_AVATAR", "g"), e.data.avatar.innerHTML.replace(new RegExp("\"", "g"), ""));
				body.innerHTML = body.innerHTML.replace(new RegExp("REPLACE_DISCRIMINATOR", "g"), e.data.discriminator);
				break;
			case "NewTheme":
				document.querySelectorAll("style.previewTheme").forEach(theme => theme.remove());
				
				var theme = document.createElement("style");
				theme.classList.add("previewTheme");
				theme.innerText = e.data.css;
					
				document.querySelector("head").appendChild(theme);
				break;
			case "DarkLight":
				var body = document.querySelector("body");
				if (e.data.light)
					body.innerHTML = body.innerHTML.replace(new RegExp("theme-dark", "g"), "theme-light");
				else 
					body.innerHTML = body.innerHTML.replace(new RegExp("theme-light", "g"), "theme-dark");
				break;
		}
	}
};