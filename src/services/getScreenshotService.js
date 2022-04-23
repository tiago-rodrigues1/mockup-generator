import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";

export async function getOptions() {
	const isDev = !process.env.AWS_REGION;
	let options;

	const chromeExecPaths = {
		win32: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
		linux: "/usr/bin/google-chrome",
		darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	};

	const exePath = chromeExecPaths[process.platform];

	if (isDev) {
		options = {
			args: [],
			executablePath: exePath,
			headless: true,
		};
	} else {
		options = {
			args: chrome.args,
			executablePath: await chrome.executablePath,
			headless: chrome.headless,
		};
	}

	return options;
}

export async function getScreenshot(url) {
	if (!url) {
		return new Error("url is missing");
	} else {
		try {
			const options = await getOptions();

			const browser = await puppeteer.launch(options);
			const page = await browser.newPage();

			await page.setViewport({
				width: 1280,
				height: 800,
			});

			page.setDefaultNavigationTimeout(0);

			await page.goto(url);

			const file = await page.screenshot({ type: "png" });

			return file;
		} catch (err) {
			return new Error(err);
		}
	}
}
