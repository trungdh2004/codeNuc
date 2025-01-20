const ChatDetailSkeleton = () => {
	return (
		<div className="w-full min-h-screen h-full flex-col">
			<div className="h-16 w-full   backdrop-blur-xl backdrop-saturate-150 bg-gray-500/20 animate-pulse"></div>

			<div className="px-6 w-full mx-auto flex-1 h-full py-4">
				<div className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-6">
					<div className="col-span-1 md:col-span-5 text-white flex flex-col h-[85vh] relative bg-gray-500/20 animate-pulse justify-between p-4 gap-4">
						<div className="grid grid-rows-8 gap-2 flex-1">
							<div className="w-full h-full bg-gray-500/30 rounded-md row-span-1 text-white"></div>
							<div className="w-full h-full bg-gray-500/30 rounded-md row-span-1 text-white"></div>
							<div className="w-full h-full bg-gray-500/30 rounded-md row-span-1 text-white"></div>
							<div className="w-full h-full bg-gray-500/30 rounded-md row-span-1 text-white"></div>
							<div className="w-full h-full bg-gray-500/30 rounded-md row-span-1 text-white"></div>
							<div className="w-full h-full bg-gray-500/30 rounded-md row-span-1 text-white"></div>
							<div className="w-full h-full bg-gray-500/30 rounded-md row-span-1 text-white"></div>
							<div className="w-full h-full bg-gray-500/30 rounded-md row-span-1 text-white"></div>
							<div className="w-full h-full bg-gray-500/30 rounded-md row-span-1 text-white"></div>
						</div>
						<div className="w-full h-40 rounded-md bg-gray-500/30"></div>
					</div>
					<div className="col-span-1 md:col-span-7 flex flex-col min-h-[85vh] md:max-h-[85vh] border border-gray-500/20 rounded-md relative bg-gray-500/20 animate-pulse p-6">
						<div className="h-3/5 mb-2 w-full bg-gray-500/30 rounded-md"></div>
						<div className="h-2/5 w-full bg-gray-500/30 rounded-md"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatDetailSkeleton;
