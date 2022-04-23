import nc from "next-connect";

import { getScreenshot } from "../services/getScreenshotService";

async function fetchImage(req, res, next) {
	let { generationMode, imageUrl } = req.body;

	if (generationMode === "file") {
		return next();
	} else if (generationMode === "auto") {
		try {
			const screenshot = await getScreenshot(imageUrl);

			req.body.imageUrl = screenshot;

			return next();
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				ok: false,
				message: "Was not possible get the screenshot: " + err.message,
			});
		}
	} else {
		return res.status(400).json({
			ok: false,
			message: "generationMode is invalid or missing",
		});
	}
}

const middleware = nc();
middleware.use(fetchImage);

export default middleware;
