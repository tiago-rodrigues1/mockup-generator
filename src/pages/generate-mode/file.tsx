import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { ChangeEvent, FormEvent, useState } from "react";
import { Upload } from "react-feather";

import { BasicLayout } from "../../components/BasicLayout";
import { Button } from "../../components/Button";
import { LogoTitle } from "../../components/LogoTitle";

const File: NextPage = () => {
	const [selectedFile, setSelectedFile] = useState<File>();
	const [selectedFileSrc, setSelectedFileSrc] = useState("");

	function handleSubmit(event: FormEvent) {
		event.preventDefault();
	}

	function handleInputFile(event: ChangeEvent<HTMLInputElement>) {
		const { files } = event.target;

		if (files) {
			setSelectedFile(files[0]);

			const imageUrl = URL.createObjectURL(files[0]);
			setSelectedFileSrc(imageUrl);
		}
	}

	return (
		<BasicLayout>
			<Head>
				<title>Generate by File</title>
			</Head>

			<LogoTitle />

			<form
				className="flex-1 flex flex-col items-center gap-8 sm:gap-12"
				onSubmit={handleSubmit}
			>
				<h1 className="title-primary">Modo de geração - Arquivo</h1>

				<div className="w-full flex-1 flex flex-col gap-8 sm:gap-12 items-center justify-center">
					<label className="w-full sm:max-w-sm h-12 px-4 border-2 border-purple-400 text-purple-400 bg-transparent flex gap-4 sm:gap-6 items-center justify-center rounded-lg duration-200 hover:bg-opacity-25 hover:bg-purple-400 cursor-pointer">
						<Upload />
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

				<Button className="btn-cta" onClick={() => console.log("oi")}>
					Gerar
				</Button>
			</form>
		</BasicLayout>
	);
};

export default File;
