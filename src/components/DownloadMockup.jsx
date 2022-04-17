import Image from "next/image";

import { FiX } from "react-icons/fi";

export function DownloadMockup(props) {
	function handleClick() {
		props.toggle();
	}
	return (
		<div className="z-10 h-screen w-screen inset-0 grid place-items-center bg-neutral-900 bg-opacity-50 fixed">
			<div className="bg-neutral-800 w-[90%] h-[90%] p-6 sm:p-8 flex flex-col gap-6 rounded-md">
				<header className="flex justify-between items-center">
					<h2 className="text-xl sm:text-2xl font-bold">Preview</h2>
					<button
						type="button"
						className="grid place-items-center duration-200 hover:bg-neutral-700 p-1 rounded-lg"
						onClick={handleClick}
					>
						<FiX size={24} />
					</button>
				</header>

				<main className="flex-1 flex flex-col items-center justify-center">
					<Image
						src={props.mockupUrl}
						width={500}
						height={400}
						alt="mockup"
					/>

					<a
						className="btn-cta"
						href={props.mockupUrl}
						download="mockup.png"
					>
						Baixar
					</a>
				</main>
			</div>
		</div>
	);
}
