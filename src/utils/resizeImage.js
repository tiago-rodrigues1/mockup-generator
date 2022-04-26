import { Image } from "image-js";

export async function resizeImage({
	imageUrl,
	width,
	height,
	preserveAspectRatio,
}) {
	try {
		const image = await Image.load(imageUrl);
		const resizedImage = image.resize({
			width: width,
			height: height,
			preserveAspectRatio: preserveAspectRatio,
		});

		return resizedImage.toBuffer();
	} catch (err) {
		console.log(
			"Não foi foi possível realizar o redimensionamento:\n" + err
		);
		return new Error("Perdão, mas não foi possível gerar o mockup");
	}
}
