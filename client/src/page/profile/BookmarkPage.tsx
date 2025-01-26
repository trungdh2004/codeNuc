import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { appConfig } from "@/config/appConfig";
import {
	getAllBookMarkApi,
	removeBookMarkApi,
} from "@/services/blogMark.service";
import { BookMarkType } from "@/types/blogs.type";
import { PopoverClose } from "@radix-ui/react-popover";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
const BookmarkPage = () => {
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery<BookMarkType[]>({
		queryKey: ["bookMark", "me"],
		queryFn: async () => {
			const { data } = await getAllBookMarkApi();
			return data;
		},
		staleTime: Infinity,
	});

	const handleRemove = async (id: string) => {
		try {
			await removeBookMarkApi(id);
			queryClient.refetchQueries({
				queryKey: ["bookMark", "me"],
			});
		} catch (error: unknown) {
			console.log("error removing", error);
		}
	};

	return (
		<div className="mx-auto max-w-7xl py-10 px-4 ">
			<h1 className="text-xl font-bold text-white">{t("titleBookmark")}</h1>

			<div className={`grid gap-8 grid-cols-1 md:grid-cols-2 mt-4`}>
				{data &&
					data.map((blog) => (
						<motion.div
							whileHover={{ y: -2 }}
							transition={{ duration: 0.2 }}
							layout
							className="relative group"
							key={blog._id}
						>
							<a href={`${appConfig.PATH_BLOG}${blog.path}`} target="_blank">
								<div className="p-4 rounded-lg border bg-[#1e1e2e]/80 border-gray-500/50 flex flex-col gap-2 relative cursor-pointer ">
									<div className="flex flex-col">
										<h3 className="text-lg text-white w-full line-clamp-1 font-semibold  group-hover:text-blue-500">
											{blog.title}
										</h3>
									</div>

									<div className="flex flex-col flex-1">
										<div className="flex items-center gap-1 h-6">
											{blog?.tagList?.slice(0, 4).map((tag: string) => (
												<div
													key={tag}
													className="border border-gray-500/50 rounded-lg px-2 py-1 text-xs text-gray-300 h-6 my-2 "
												>
													#{tag}
												</div>
											))}

											{blog?.tagList?.length > 4 && (
												<div className="border border-gray-500/50 rounded-lg px-2 py-1 text-xs text-gray-300 h-6 my-2 ">
													+{blog.tagList.length - 4}
												</div>
											)}
										</div>
									</div>

									<div className="flex justify-between items-center sm:text-sm text-xs">
										<div className="flex items-center gap-2">
											<span className="sm:text-sm text-xs text-gray-300">
												Đã lưu: {new Date(blog.createdAt).toLocaleDateString()}
											</span>
											<span className="mx-1">-</span>
											<span className="sm:text-sm text-xs text-gray-300">
												{blog.userName}
											</span>
										</div>
										<div
											className="flex items-center gap-2"
											onClick={(e) => e.preventDefault()}
										>
											<Popover>
												<PopoverTrigger>
													<div className="p-1 rounded-sm hover:bg-gray-500/10 cursor-pointer">
														<AiOutlineDelete size={20} />
													</div>
												</PopoverTrigger>
												<PopoverContent
													side="top"
													className="p-2 rounded-sm w-fit bg-[#1e1e2e] shadow shadow-gray-400/20 border border-gray-500/50"
												>
													<p className="text-rose-500 text-sm">
														Bạn có chắc chắn muốn xóa ?
													</p>
													<div className="flex items-center justify-between">
														<PopoverClose asChild>
															<button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors">
																Hủy
															</button>
														</PopoverClose>

														<button
															className="flex items-center gap-1 px-2 py-1 text-xs  bg-rose-500 text-white hover:bg-rose-700 transition-colors rounded-sm"
															onClick={() => handleRemove(blog._id)}
														>
															Xóa
														</button>
													</div>
												</PopoverContent>
											</Popover>
										</div>
									</div>
								</div>
							</a>
						</motion.div>
					))}

				{isLoading &&
					Array.from({ length: 6 }).map((_, index) => (
						<div
							className="animate-pulse w-full p-4 rounded-lg bg-gray-500/20"
							key={index}
						>
							<div className="h-8 w-full rounded-md bg-gray-500/30"></div>

							<div className="w-full flex items-center gap-1 py-2">
								<div className="w-12 h-6 rounded-sm bg-gray-500/30"></div>
								<div className="w-12 h-6 rounded-sm bg-gray-500/30"></div>
								<div className="w-12 h-6 rounded-sm bg-gray-500/30"></div>
								<div className="w-12 h-6 rounded-sm bg-gray-500/30"></div>
							</div>

							<div className="flex items-center justify-between">
								<div className="w-1/2 h-8 bg-gray-500/30 rounded-md"></div>
								<div className="w-8 h-8 bg-gray-500/30"></div>
							</div>
						</div>
					))}

				{!isLoading && data && data.length === 0 && (
					<div className="col-span-full h-40 rounded-lg border border-gray-500/50 flex flex-col items-center justify-center">
						<span className="text-sm text-gray-300">Không có bài viết nào</span>
						<Link to="/blogs" className="mt-2 text-blue-500 underline">
							Xem các bài viết tại đây
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default BookmarkPage;
