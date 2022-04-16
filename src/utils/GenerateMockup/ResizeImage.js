import { Image } from "image-js";

export async function ResizeImage(
	imageFile,
	{ width, height, preserveAspectRatio }
) {
	try {
		const buffer = await imageFile.arrayBuffer();

		const image = await Image.load(buffer);
		const resizedImage = image.resize({
			width: width,
			height: height,
			preserveAspectRatio: preserveAspectRatio,
		});

		return resizedImage.toBuffer();
	} catch (err) {
		console.log("Não foi possível redimensionar a imagem\n" + err);
	}
}
