import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "react-feather";

interface GeneraMethodCardProps {
	redirectTo: string;
	imageSrc: string;
	methodName: string;
}

export const GeneraMethodCard = (props: GeneraMethodCardProps) => {
	return (
		<>
			<Link href={props.redirectTo}>
				<a className="w-full sm:w-1/3 h-auto flex flex-col bg-[#202020] rounded-lg duration-200 hover:scale-105">
					<div className="flex-1 p-6 grid place-items-center">
						<Image
							src={props.imageSrc}
							alt={`Modo de geração por ${props.methodName}`}
							width={320}
							height={320}
							className="object-center object-fill my-0 mx-auto"
						/>
					</div>
					<div className="bg-[#101010] w-full h-2/5 p-4 flex items-center justify-between rounded-b-lg">
						<span>{props.methodName}</span>
						<ArrowRight />
					</div>
				</a>
			</Link>
		</>
	);
};
