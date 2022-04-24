export function Loading({ message }) {
	const spanBaseStyle = "w-10 h-10 rounded-full bg-purple-400 animate-bounce";
	return (
		<>
			<div className="z-10 h-screen w-screen inset-0 grid place-items-center bg-neutral-900 bg-opacity-90 fixed">
				<div className="flex-1 flex flex-col items-center justify-center gap-16">
					<div className="w-full h-auto flex items-center justify-center gap-6 sm:gap-12">
						<span className={spanBaseStyle}></span>
						<span
							className={spanBaseStyle}
							style={{ animationDelay: "300ms" }}
						></span>
						<span
							className={spanBaseStyle}
							style={{ animationDelay: "600ms" }}
						></span>
					</div>

					<p className="text-lg sm:text-xl font-bold">{message}</p>
				</div>
			</div>
		</>
	);
}
