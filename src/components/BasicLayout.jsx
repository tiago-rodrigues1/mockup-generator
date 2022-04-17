export const BasicLayout = ({ children }) => {
	return (
		<>
			<div className="min-h-screen h-full min-w-screen p-4 sm:p-8 flex flex-col gap-10 sm:gap-20 bg-neutral-900 text-neutral-50 relative">
				{children}
			</div>
		</>
	);
};
