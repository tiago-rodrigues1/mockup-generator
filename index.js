const getSiteImage = require("./scripts/getSiteImage.js");
const generateMockup = require("./scripts/generateMockup.js");

const readlineSync = require("readline-sync");

async function robot() {
	const url = readlineSync.question("\n🔗 URL: ");

	try {
		await getSiteImage(url);
		console.log("- Imagem do site tirada 📸");

		await generateMockup();
		console.log("- Mockup gerado com sucesso ✅");

		console.log("\n- Verifique sua pasta de downloads 📂");
	} catch (err) {
		throw new Error("- Algo deu errado ❌ \n", err);
	}
}

robot();
