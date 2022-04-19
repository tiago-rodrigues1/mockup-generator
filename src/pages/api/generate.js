import nc from "next-connect";

import { GenerateMockupService } from "../../services/GenerateMockupService";

const handler = nc({
	onError: (err, req, res, next) => {
		console.error(err.stack);
		res.status(500).end("Something broke!");
	},
	onNoMatch: (req, res) => {
		res.status(404).end("Page is not found");
	},
}).post(async (req, res) => {
	const { imageUrl } = req.body;

	if (!imageUrl) {
		return res
			.status(400)
			.json({ ok: false, message: "imageUrl is missing" });
	}

	const mockupResponse = await GenerateMockupService(imageUrl);

	if (mockupResponse instanceof Error) {
		return res
			.status(400)
			.json({ ok: false, message: mockupResponse.message });
	} else {
		res.status(200).json({ ok: true, mockupUrl: mockupResponse });
	}
});

export default handler;
