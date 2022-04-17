import Head from "next/head";
import Image from "next/image";

import { useState } from "react";

import { FiUpload } from "react-icons/fi";
import { BasicLayout } from "../../components/BasicLayout";
import { Button } from "../../components/Button";
import { DownloadMockup } from "../../components/DownloadMockup";
import { LogoTitle } from "../../components/LogoTitle";

import { generate } from "../../utils/GenerateMockup";

export default function File() {
	const [selectedFile, setSelectedFile] = useState();
	const [selectedFileSrc, setSelectedFileSrc] = useState("");
	const [mockupUrl, setMockupUrl] = useState("");
	const [canDownload, setCanDownload] = useState(false);

	function togglePopup() {
		setCanDownload((prevState) => !prevState);
	}

	function handleInputFile(event) {
		const { files } = event.target;

		if (files) {
			setSelectedFile(files[0]);

			const imageUrl = URL.createObjectURL(files[0]);
			setSelectedFileSrc(imageUrl);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			if (selectedFile) {
				const mockup = await generate(selectedFile);

				setMockupUrl(mockup);
				setCanDownload(true);
			} else {
				throw new Error("Não foi possível gerar a imagem");
			}
		} catch (e) {
			alert("Error: " + e);
		}
	}

	return (
		<BasicLayout>
			<Head>
				<title>Generate by File</title>
			</Head>

			<LogoTitle />

			{canDownload ? (
				<DownloadMockup toggle={togglePopup} mockupUrl={mockupUrl} />
			) : null}

			<form
				className="flex-1 flex flex-col items-center gap-8 sm:gap-12"
				onSubmit={handleSubmit}
			>
				<h1 className="title-primary">Modo de geração - Arquivo</h1>

				<div className="w-full flex-1 flex flex-col gap-8 sm:gap-12 items-center justify-center">
					<label className="w-full sm:max-w-sm h-12 px-4 border-2 border-purple-400 text-purple-400 bg-transparent flex gap-4 sm:gap-6 items-center justify-center rounded-lg duration-200 hover:bg-opacity-25 hover:bg-purple-400 cursor-pointer">
						<FiUpload />
						<span>Escolher foto</span>
						<input
							type="file"
							onChange={handleInputFile}
							accept="image/*"
							className="hidden"
						/>
					</label>

					{selectedFile && (
						<Image
							src={selectedFileSrc}
							alt="img"
							width={345}
							height={230}
							className="object-center m-auto"
						/>
					)}
				</div>

				<Button className="btn-cta" type="submit">
					Gerar
				</Button>
			</form>
		</BasicLayout>
	);
}
