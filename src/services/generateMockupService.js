import { resizeImage } from "../utils/resizeImage";
import { buildMockup } from "../utils/buildMockup";

export async function generateMockupService(imageUrl) {
	const resizeOptions = {
		imageUrl,
		width: 686,
		height: 422,
		preserveAspectRatio: false,
	};

	console.log(imageUrl);
	const resizedImageResponse = await resizeImage(resizeOptions);

	if (resizedImageResponse instanceof Error) {
		return new Error(resizedImageResponse.message);
	}

	const buildMockupResponse = await buildMockup(resizedImageResponse);

	if (buildMockupResponse instanceof Error) {
		return new Error(buildMockupResponse.message);
	} else {
		return buildMockupResponse;
	}
}
