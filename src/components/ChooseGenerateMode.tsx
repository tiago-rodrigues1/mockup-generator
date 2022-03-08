import { useEffect, useState } from "react";

import { Info, X } from "react-feather";
import { GeneraMethodCard } from "./GenerateMethodCard";

const InfoButton = () => {
	const [showPopup, setShowPopup] = useState(false);

	function handleInfoBtnClick() {
		setShowPopup((prev) => !prev);
	}

	const Popup = () => {
		return (
			<>
				<div className="z-10 h-screen w-screen inset-0 grid place-items-center bg-gray-900 bg-opacity-50 fixed">
					<div className="w-[90%] sm:max-w-md absolute grid place-items-center">
						<article className="flex-1 bg-neutral-800 flex flex-col p-4 sm:p-6 rounded-lg gap-6 sm:gap-8">
							<header className="w-full flex items-center justify-between pb-4">
								<h2 className="text-xl sm:text-lg font-bold">
									Modos de geração
								</h2>
								<button
									type="button"
									className="grid place-items-center duration-200 hover:bg-neutral-700 p-1 rounded-lg"
									onClick={handleInfoBtnClick}
								>
									<X />
								</button>
							</header>

							<div className="flex flex-col gap-2">
								<h3 className="text-lg">Arquivo</h3>
								<p className="text-justify leading-relaxed">
									No modo de geração &quot;Arquivo&quot;, você
									faz o upload de um arquivo do seu computador
									e o mockup é gerado através dele.
								</p>
							</div>

							<div className="flex flex-col gap-2">
								<h3 className="text-lg">Geração automática</h3>
								<p className="text-justify leading-relaxed">
									No modo de geração &quot;Geração
									automática&quot;, você informa o link de uma
									página web, é gerada uma imagem da página e
									o mockup é gerado.
								</p>
							</div>
						</article>
					</div>
				</div>
			</>
		);
	};

	if (!showPopup) {
		return (
			<>
				<button
					type="button"
					className="p-1 grid place-items-center duration-200 hover:text-gray-300"
					title="Clique para saber mais sobre os modos de geração"
					onClick={handleInfoBtnClick}
				>
					<Info size={18} />
				</button>
			</>
		);
	} else {
		return (
			<>
				<Popup />
			</>
		);
	}
};

export const ChooseGenerateMode = () => {
	return (
		<>
			<section className="flex-1 flex flex-col gap-8 sm:gap-16">
				<header className="flex gap-4 items-center">
					<h1 className="title-primary">Modo de geração</h1>
					<InfoButton />
				</header>
				<main className="flex-1 flex flex-col gap-12 sm:flex-row justify-evenly items-center">
					<GeneraMethodCard
						imageSrc="/images/generate-by-file.svg"
						methodName="Arquivo"
						redirectTo="/"
					/>
					<GeneraMethodCard
						imageSrc="/images/auto-generate.svg"
						methodName="Geração automática"
						redirectTo="/"
					/>
				</main>
			</section>
		</>
	);
};
