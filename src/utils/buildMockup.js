import { Image } from "image-js";

export async function buildMockup(resizedImageUri) {
	try {
		const resizedImage = await Image.load(resizedImageUri);

		const templatePath = "./public/images/mock-template.png";
		const template = await Image.load(templatePath);
		const { height, width, data } = template;

		const greenArea = [];
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				let i = (y * width + x) * 4;

				const [red, green, blue] = [data[i], data[i + 1], data[i + 2]];
				const isGreenPixel = red === 0 && green === 255 && blue === 0;

				if (isGreenPixel) {
					greenArea.push({ x, y });
				}
			}
		}

		const mockup = await template.insert(resizedImage, {
			x: greenArea[0].x - 3,
			y: greenArea[0].y,
		});

		return await mockup.toDataURL();
	} catch (err) {
		console.log("Não foi possível construir o mockup\n" + err);
		return new Error("Perdão, mas não foi possível gerar o mockup");
	}
}
