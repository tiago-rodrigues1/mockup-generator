import Head from "next/head";
import Image from "next/image";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Toaster } from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { BasicLayout } from "../../components/BasicLayout";
import { Button } from "../../components/Button";
import { DownloadMockup } from "../../components/DownloadMockup";
import { LogoTitle } from "../../components/LogoTitle";
import { Loading } from "../../components/Loading";

import { fileToBase64 } from "../../utils/fileToBase64";

export default function File() {
	const [selectedFileUrl, setselectedFileUrl] = useState("");
	const [mockupUrl, setMockupUrl] = useState("");
	const [canDownload, setCanDownload] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function togglePopup() {
		setCanDownload((prevState) => !prevState);
	}

	async function handleInputFile(event) {
		const { files } = event.target;

		if (files) {
			const imageUrl = await fileToBase64(files[0]);
			setselectedFileUrl(imageUrl);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();

		let responseMessage;

		try {
			setIsLoading(true);
			const response = await axios.post("/api/generate", {
				imageUrl: selectedFileUrl,
				generationMode: "file",
			});

			responseMessage = response.data.message;

			if (response.status === 200) {
				toast.success("Mockup gerado com sucesso!");

				setMockupUrl(response.data.mockupUrl);
				setCanDownload(true);
			}
		} catch (err) {
			console.log(err);
			toast.error(
				responseMessage ||
					"Infelizmente não conseguimos gerar o seu mockup"
			);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<BasicLayout>
			<Head>
				<title>Generate by File</title>
			</Head>

			<Toaster />

			<LogoTitle />

			{isLoading && <Loading message={"Gerando seu mockup..."} />}

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

					{selectedFileUrl && (
						<Image
							src={selectedFileUrl}
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
