import nc from "next-connect";

import { generateMockupService } from "../../services/generateMockupService";

import fetchImage from "../../middlewares/fetchImage";

const handler = nc({
	onError: (err, req, res) => {
		console.error(err.stack);
		res.status(500).end("Something broke!");
	},
	onNoMatch: (req, res) => {
		res.status(404).end("Page is not found");
	},
});

handler.use(fetchImage);

handler.post(async (req, res) => {
	const { imageUrl } = req.body;

	if (!imageUrl) {
		return res
			.status(400)
			.json({ ok: false, message: "imageUrl is missing" });
	}

	const mockupResponse = await generateMockupService(imageUrl);

	if (mockupResponse instanceof Error) {
		return res
			.status(400)
			.json({ ok: false, message: mockupResponse.message });
	} else {
		res.status(200).json({ ok: true, mockupUrl: mockupResponse });
	}
});

export default handler;
