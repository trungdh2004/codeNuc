import Comments from "@/components/comment/Comments";
import CodeSnippetDetail from "@/components/snippet/CodeSnippetDetail";
import SnippetDetailSkeleton from "@/components/SnippetDetailSkeleton";
import { detailSnippetApi } from "@/services/snippet.service";
import { SnippetResponse } from "@/types/snippet.type";
import { useQuery } from "@tanstack/react-query";
import { Clock, MessageSquare, User } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const SnippetDetail = () => {
	const { id } = useParams();
	const { isLoading, data, error } = useQuery<SnippetResponse>({
		queryKey: ["detailSnippet", id],
		queryFn: async () => {
			const { data } = await detailSnippetApi(id as string);
			// await new Promise((resolve) => {
			// 	setTimeout(resolve, 3000);
			// });
			return data;
		},
		refetchInterval:Infinity
	});

	if (isLoading) {
		return <SnippetDetailSkeleton />;
	}

	if (error) {
		toast.error("Có lỗi xảy ra ");
		return <Navigate to="/404" />;
	}

	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-0 sm:py-8 lg:py-12">
			<div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-xl">
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff08] p-2.5">
							<img
								src={`/${data?.language}.png`}
								alt={`${data?.language} logo`}
								className="w-full h-full object-contain"
							/>
						</div>
						<div>
							<h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">
								{data?.title}
							</h1>
							<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
								<div className="flex items-center gap-2 text-[#8b8b8d]">
									<User className="w-4 h-4" />
									<span>{data?.createBy.name}</span>
								</div>
								<div className="flex items-center gap-2 text-[#8b8b8d]">
									<Clock className="w-4 h-4" />
									<span>
										{new Date(data?.createdAt as string).toLocaleDateString()}
									</span>
								</div>
								<div className="flex items-center gap-2 text-[#8b8b8d]">
									<MessageSquare className="w-4 h-4" />
									<span>{data?.countComment} bình luận</span>
								</div>
							</div>
						</div>
					</div>
					<div className="inline-flex items-center px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium">
						{data?.language}
					</div>
				</div>
			</div>

			<CodeSnippetDetail
				language={data?.language as string}
				code={data?.code as string}
			/>

			{data?.description && (
				<div className="bg-[#121218] border border-[#ffffff0a] rounded-md  mb-6 backdrop-blur-xl">
					<div className="px-6 py-2 border-b border-gray-500/50">
						<h5 className="text-lg font-semibold text-white">Mô tả</h5>
					</div>
					<div className="py-2 px-6 ">
						<pre className="font-[sans-serif]">{data.description}</pre>
					</div>
				</div>
			)}
			<Comments />
		</div>
	);
};

export default SnippetDetail;
