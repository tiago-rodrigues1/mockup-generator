import { ResizeImage } from "../utils/ResizeImage";
import { BuildMockup } from "../utils/BuildMockup";

export async function GenerateMockupService(imageUrl) {
	const resizeOptions = {
		imageUrl,
		width: 686,
		height: 422,
		preserveAspectRatio: false,
	};

	const resizedImageResponse = await ResizeImage(resizeOptions);

	if (resizedImageResponse instanceof Error) {
		return new Error(resizedImageResponse.message);
	}

	const buildMockupResponse = await BuildMockup(resizedImageResponse);

	if (buildMockupResponse instanceof Error) {
		return new Error(buildMockupResponse.message);
	} else {
		return buildMockupResponse;
	}
}
