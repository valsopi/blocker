# Local Time Site Blocker

A tiny Chrome extension that blocks distracting websites until a specific time of day.

No accounts. No subscriptions. No analytics. No tracking. No cloud services.

Just edit a file, reload the extension, and get back to work.

---

# TL;DR

### 1. Edit `config.js`

```js
const BLOCK_UNTIL = "5:00 PM";

const BLOCKED_SITES = [
	"facebook.com",
	"x.com",
	"youtube.com",
	"instagram.com"
];
```

### 2. ALWAYS Reload the extension (after any changes)

Open:

```text
chrome://extensions
```

Click:

```text
Reload
```

on the extension card.

### 3. Done

Before 5:00 PM:

```text
youtube.com     ❌ Blocked
facebook.com    ❌ Blocked
```

After 5:00 PM:

```text
youtube.com     ✅ Available
facebook.com    ✅ Available
```

> Important, again: Any time you change `config.js`, you must reload the extension from `chrome://extensions`.

---

# Why this extension?

I wanted something simpler than most website blockers.

Most blockers require:

* accounts
* subscriptions
* cloud sync
* complicated schedules
* analytics
* permissions for everything

I just wanted:

> Block a few websites until a certain time.

Nothing more.

So I built a tiny extension that keeps everything in a single configuration file.

---

# Features

* Local only
* No tracking
* No analytics
* No accounts
* No subscriptions
* No popup
* No settings page
* No database
* Single config file
* Custom blocked page
* Supports multiple websites
* Supports subdomains automatically

---

# Installation

1. Download or clone this repository.

2. Open:

```text
chrome://extensions
```

3. Enable:

```text
Developer Mode
```

4. Click:

```text
Load unpacked
```

5. Select the extension folder.

Done.

---

# Configuration

Everything lives in:

```text
config.js
```

Example:

```js
const BLOCK_UNTIL = "5:00 PM";

const BLOCKED_SITES = [
	"facebook.com",
	"x.com",
	"youtube.com",
	"instagram.com"
];
```

---

# Changing The Time

Edit:

```js
const BLOCK_UNTIL = "5:00 PM";
```

Examples:

```js
const BLOCK_UNTIL = "4:00 PM";
const BLOCK_UNTIL = "6:30 PM";
const BLOCK_UNTIL = "9:00 PM";
```

After saving:

1. Open `chrome://extensions`
2. Click **Reload**

---

# Changing The Websites

Edit:

```js
const BLOCKED_SITES = [
	"facebook.com",
	"x.com",
	"youtube.com",
	"instagram.com"
];
```

Example:

```js
const BLOCKED_SITES = [
	"reddit.com",
	"x.com",
	"youtube.com",
	"news.ycombinator.com",
	"instagram.com"
];
```

After saving:

1. Open `chrome://extensions`
2. Click **Reload**

---

# Block Page

When a website is blocked, you see a simple local page displaying:

```text
Blocked until 5:00 PM
```

The time is automatically pulled from `config.js`, so you only need to update it in one place.

---

# Privacy

This extension:

* stores nothing
* tracks nothing
* sends nothing
* uses no external services
* performs no network requests

Everything runs locally inside Chrome.

---

# License

MIT

Use it, modify it, improve it, or fork it into something better.
