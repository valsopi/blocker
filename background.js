importScripts("config.js");

chrome.webNavigation.onBeforeNavigate.addListener(details => {
	if (details.frameId !== 0) {
		return;
	}

	if (!details.url.startsWith("http://") && !details.url.startsWith("https://")) {
		return;
	}

	if (!isBlockedTime()) {
		return;
	}

	if (!shouldBlock(details.url)) {
		return;
	}

	chrome.tabs.update(details.tabId, {
		url: chrome.runtime.getURL("blocked.html")
	});
});

function isBlockedTime() {
	const now = new Date();

	const match = BLOCK_UNTIL.match(/(\d+):(\d+)\s*(AM|PM)/i);

	if (!match) {
		return false;
	}

	let hours = parseInt(match[1]);
	const minutes = parseInt(match[2]);
	const period = match[3].toUpperCase();

	if (period === "PM" && hours !== 12) {
		hours += 12;
	}

	if (period === "AM" && hours === 12) {
		hours = 0;
	}

	const unblockTime = new Date();

	unblockTime.setHours(hours);
	unblockTime.setMinutes(minutes);
	unblockTime.setSeconds(0);
	unblockTime.setMilliseconds(0);

	return now < unblockTime;
}

function normalizeHost(hostname) {
	return hostname.replace(/^www\./, "");
}

function shouldBlock(url) {
	try {
		const parsedUrl = new URL(url);

		if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
			return false;
		}

		const host = normalizeHost(parsedUrl.hostname);

		return BLOCKED_SITES.some(site => {
			const cleanSite = normalizeHost(site);

			return host === cleanSite || host.endsWith("." + cleanSite);
		});
	} catch (error) {
		return false;
	}
}

chrome.webNavigation.onBeforeNavigate.addListener(details => {
	if (details.frameId !== 0) {
		return;
	}

	if (!isBlockedTime()) {
		return;
	}

	if (!shouldBlock(details.url)) {
		return;
	}

	const blockedUrl = chrome.runtime.getURL("blocked.html");

	chrome.tabs.update(details.tabId, {
		url: blockedUrl
	});
});