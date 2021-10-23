const puppeteer = require("puppeteer");

async function generateMockup() {
	console.log("\n- Indo gerar mockup 💻");

	try {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.goto("https://studio.mockmagic.com/");

		const [fileChooser] = await Promise.all([
			page.waitForFileChooser(),
			page.click("#design-upload-button"),
		]);

		await fileChooser.accept(["siteImg.png"]);

		await page.click(`button.sc-bqyKva.jkLHhc`);

		const deviceOptions = await page.$$("button.sc-dIUggk.fFamRD");

		const buttonLaptop = deviceOptions[13];
		await buttonLaptop.click();

		const response = await page.waitForResponse(
			"https://studio.mockmagic.com/assets/mockstages/MacbookPro/13inch/Apple%20Macbook%20Pro%2013%20Silver.png"
		);

		response.ok() && (await page.waitForTimeout(5000));

		await page.click("#mockup-download");
	} catch (err) {
		throw new Error("- Não foi possível gerar o mockup 😕 \n", err);
	}
}

module.exports = generateMockup;
