import { Image } from "image-js";

export async function ResizeImage({
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
		return new Error("Não foi possível gerar o mockup");
	}
}
