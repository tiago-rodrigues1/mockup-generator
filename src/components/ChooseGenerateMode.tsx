import { Info } from "react-feather";
import { GeneraMethodCard } from "./GenerateMethodCard";

export const ChooseGenerateMode = () => {
	return (
		<>
			<section className="flex-1 flex flex-col gap-8 sm:gap-16">
				<header className="flex gap-4 items-center">
					<h1 className="font-bold text-xl sm:text-2xl">
						Modo de geração
					</h1>
					<button
						type="button"
						className="p-1 grid place-items-center duration-200 hover:text-slate-300"
					>
						<Info size={18} />
					</button>
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
