import React from "react";

const SnippetLoading = () => {
	return (
		<div className="w-full min-h-60 rounded-lg animate-pulse bg-gray-500/20 p-4 flex flex-col gap-2">
			<div className="flex items-center justify-start gap-2">
				<div className="size-10 rounded-sm bg-gray-500/30"></div>
				<div className="flex-1 ">
					<div className="w-full max-w-28 rounded-sm h-4 mb-2 bg-gray-500/30"></div>
					<div className="w-full max-w-14 rounded-sm h-4 bg-gray-500/30"></div>
				</div>
			</div>

			<div className="space-y-2">
				<div className="max-w-60 w-full h-6 bg-gray-500/30 rounded-sm"></div>
				<div className="max-w-48 w-full h-6 bg-gray-500/30 rounded-sm"></div>
			</div>

			<div className="flex-1 w-full bg-gray-500/30 rounded-md"></div>
		</div>
	);
};

export default SnippetLoading;
