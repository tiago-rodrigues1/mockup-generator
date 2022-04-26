import nc from "next-connect";

import { generateMockupService } from "../../services/generateMockupService";

import fetchImage from "../../middlewares/fetchImage";

const handler = nc({
	onError: (err, req, res) => {
		console.error(err.stack);
		res.status(500).json({
			ok: false,
			message: "Não foi possível gerar o mockup",
		});
	},
	onNoMatch: (req, res) => {
		res.status(404).json({ ok: false, message: "Página não encontrada" });
	},
});

handler.use(fetchImage);

handler.post(async (req, res) => {
	const { imageUrl } = req.body;

	if (!imageUrl) {
		return res
			.status(400)
			.json({ ok: false, message: "faltando imageUrl" });
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
