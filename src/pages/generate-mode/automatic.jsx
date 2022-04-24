import Head from "next/head";

import { useState } from "react";
import axios from "axios";

import { FiLink } from "react-icons/fi";
import { BasicLayout } from "../../components/BasicLayout";
import { LogoTitle } from "../../components/LogoTitle";
import { Button } from "../../components/Button";
import { DownloadMockup } from "../../components/DownloadMockup";
import { Loading } from "../../components/Loading";

export default function Automatic() {
	const [pageUrl, setPageUrl] = useState("");
	const [mockupUrl, setMockupUrl] = useState("");
	const [canDownload, setCanDownload] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function togglePopup() {
		setCanDownload((prevState) => !prevState);
	}

	function handleInputChange(event) {
		setPageUrl(event.target.value);
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			setIsLoading(true);
			const response = await axios.post("/api/generate", {
				imageUrl: pageUrl,
				generationMode: "auto",
			});

			if (response.status === 200) {
				setMockupUrl(response.data.mockupUrl);
				setCanDownload(true);
			}
		} catch (err) {
			console.log(err);
			alert("Não foi possível gerar seu mockup");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<BasicLayout>
			<Head>
				<title>Auto Generation</title>
			</Head>

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
					<div className="h-auto w-full flex flex-col justify-center items-center gap-6">
						<label
							htmlFor="pageUrl"
							title="Insira o link da página que deseja gerar o mockup"
							className="text-xl flex gap-4"
						>
							<FiLink />
							<span>Link da página</span>
						</label>
						<input
							id="pageUrl"
							type="url"
							onChange={handleInputChange}
							value={pageUrl}
							required
							placeholder="https://exemplo.com"
							className="h-14 w-full md:w-2/3 pl-4 bg-neutral-800 rounded-md border-2 border-neutral-700 placeholder-neutral-400 focus-visible:outline-none focus:border-2 focus:border-purple-500"
						/>
					</div>
				</div>

				<Button className="btn-cta" type="submit">
					Gerar
				</Button>
			</form>
		</BasicLayout>
	);
}
