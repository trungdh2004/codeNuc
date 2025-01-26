import { MessageSquare } from "lucide-react";
import CommentForm from "./CommentForm";
import { useAuthContext } from "@/context/AuthProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pagingCommentApi } from "@/services/comment.service";
import { CommentResponse } from "@/types/comment.type";
import { ResponseBase } from "@/types";
import CommentItem from "./CommentItem";
import Paginations from "../common/Pagination";
import { useTranslation } from "react-i18next";

const Comments = () => {
	const { id } = useParams();
	const { t } = useTranslation();
	const { authUser } = useAuthContext();
	const [pageIndex, setPageIndex] = useState(1);
	const { isLoading, data, refetch } = useQuery<ResponseBase<CommentResponse>>({
		queryKey: ["commentPaging", id, pageIndex],
		queryFn: async () => {
			const { data } = await pagingCommentApi({
				pageIndex,
				pageSize: 5,
				parent: id as string,
			});
			return data;
		},
	});

	const handlePageIndex = () => {
		setPageIndex(1);
		refetch();
	};

	useEffect(() => {
		setPageIndex(1);
	}, [id]);

	return (
		<div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-hidden">
			<div className="px-6 sm:px-8 py-6 border-b border-[#ffffff0a]">
				<h2 className="text-lg font-semibold text-white flex items-center gap-2">
					<MessageSquare className="w-5 h-5" />
					{t("comment")} ({data?.totalAllOptions || 0})
				</h2>
			</div>

			<div className="p-6 sm:p-8">
				{authUser ? (
					<CommentForm
						parent={id as string}
						handlePageIndex={handlePageIndex}
					/>
				) : (
					<div className="bg-[#0a0a0f] rounded-xl p-6 text-center mb-8 border border-[#ffffff0a]">
						<p className="text-[#808086]">{t("notLogin.notComment")}</p>
						{/* <SignInButton mode="modal">
							<button className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors">
								Sign In
							</button>
						</SignInButton> */}
					</div>
				)}

				<div className="space-y-4">
					{isLoading &&
						[1, 2, 3, 4, 5].map((i) => (
							<div key={i} className="flex gap-4">
								<div className="h-10 w-10 rounded-full bg-[#ffffff08] animate-pulse" />
								<div className="flex-1">
									<div className="h-4 w-32 bg-[#ffffff08] rounded animate-pulse mb-2" />
									<div className="h-16 bg-[#ffffff08] rounded animate-pulse" />
								</div>
							</div>
						))}

					{!isLoading &&
						data?.content?.map((comment) => (
							<CommentItem
								key={comment._id}
								data={comment}
								userId={authUser?._id}
							/>
						))}
				</div>

				{!!data?.totalPages && data?.totalPages > 1 && (
					<div className="flex items-center justify-center mt-4">
						<Paginations
							pageCount={data?.totalPages || 0}
							forcePage={pageIndex - 1}
							handlePageClick={(value) => {
								setPageIndex(value.selected + 1);
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Comments;
