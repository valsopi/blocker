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
	const day = now.getDay();

	const isWeekend = day === 0 || day === 6;

	if (isWeekend && !BLOCK_WEEKENDS) {
		return false;
	}

	const time = parseTime(BLOCK_UNTIL);

	if (!time) {
		return false;
	}

	const unblockTime = new Date();

	unblockTime.setHours(time.hours);
	unblockTime.setMinutes(time.minutes);
	unblockTime.setSeconds(0);
	unblockTime.setMilliseconds(0);

	return now < unblockTime;
}

function parseTime(value) {
	const cleanValue = value.trim();

	let match = cleanValue.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);

	if (match) {
		let hours = parseInt(match[1], 10);
		const minutes = match[2] ? parseInt(match[2], 10) : 0;
		const period = match[3].toUpperCase();

		if (period === "PM" && hours !== 12) {
			hours += 12;
		}

		if (period === "AM" && hours === 12) {
			hours = 0;
		}

		return {
			hours,
			minutes,
		};
	}

	match = cleanValue.match(/^(\d{1,2}):(\d{2})$/);

	if (match) {
		return {
			hours: parseInt(match[1], 10),
			minutes: parseInt(match[2], 10),
		};
	}

	return null;
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