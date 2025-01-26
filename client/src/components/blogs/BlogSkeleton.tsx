const BlogSkeleton = () => {
	return (
		<div className="w-full rounded-lg animate-pulse bg-gray-500/20 p-4 flex flex-col gap-2">
			<div className="flex items-center justify-start gap-2">
				<div className="size-8 rounded-full bg-gray-500/30"></div>
				<div className="flex-1 ">
					<div className="w-full max-w-28 rounded-sm h-4 mb-2 bg-gray-500/30"></div>
					<div className="w-full max-w-14 rounded-sm h-4 bg-gray-500/30"></div>
				</div>
			</div>

			<div className="space-y-2">
				<div className="w-full h-8 bg-gray-500/30 rounded-sm"></div>
			</div>

			<div className="flex flex-wrap gap-1">
				<div className="h-6 rounded-md w-14 bg-gray-500/30"></div>
				<div className="h-6 rounded-md w-14 bg-gray-500/30"></div>
				<div className="h-6 rounded-md w-14 bg-gray-500/30"></div>
				<div className="h-6 rounded-md w-14 bg-gray-500/30"></div>
			</div>

			<div className="h-8 flex justify-between items-center">
				<div className="w-full max-w-20 h-full rounded-md bg-gray-500/30"></div>
				<div className="w-full max-w-20 h-full rounded-md bg-gray-500/30"></div>
			</div>
		</div>
	);
};

export default BlogSkeleton;
