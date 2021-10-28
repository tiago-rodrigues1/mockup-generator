const puppeteer = require("puppeteer");

async function getSiteImage(url) {
	console.log("\n- Indo buscar imagem do site 📷");

	try {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();

		await page.setViewport({
			width: 1200,
			height: 800,
			deviceScaleFactor: 1,
		});

		await page.goto(url);

		await page.screenshot({ path: "siteImg.png" });

		await browser.close();
	} catch (err) {
		throw new Error("- Não foi possível pegar a imagem do site 😕 \n", err);
	}
}

module.exports = getSiteImage;
