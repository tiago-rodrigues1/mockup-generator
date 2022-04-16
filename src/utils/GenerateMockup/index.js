import { GenerateMockup } from "./GenerateMockup";
import { ResizeImage } from "./ResizeImage";

export async function generate(imageFile) {
	try {
		const resizedImage = await ResizeImage(imageFile, {
			width: 686,
			height: 422,
			preserveAspectRatio: false,
		});

		const mockup = await GenerateMockup(resizedImage);

		if (mockup) {
			return mockup;
		} else {
			throw new Error();
		}
	} catch (err) {
		console.log("Não foi possível realizar a geração do mockup\n" + err);
	}
}
