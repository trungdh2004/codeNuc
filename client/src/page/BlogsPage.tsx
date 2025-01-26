import BlogCard from "@/components/blogs/BlogCard";
import BlogSkeleton from "@/components/blogs/BlogSkeleton";
import Logo from "@/components/Logo";
import LanguageSelected from "@/components/snippet/LanguageSelected";
import { IValueLanguage } from "@/constants/language";
import {
	createBookMarkApi,
	getAllIdBookMarkApi,
} from "@/services/blogMark.service";
import { BlogsType } from "@/types/blogs.type";
import { queryBlog } from "@/utils/fetchBlog";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";

const BlogsPage = () => {
	const [page, setPage] = useState(1);
	const [dataId, setDataId] = useState<string[]>([]);
	useQuery({
		queryKey: ["bookMark", "getAllId"],
		queryFn: async () => {
			const { data } = await getAllIdBookMarkApi();
			setDataId(data);
			return data;
		},
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
	const [language, setLanguage] = useState<string[]>(() => {
		const value = localStorage.getItem("blog_language") || "[]";
		const data = JSON.parse(value);
		return data.map((item: IValueLanguage) => item.id);
	});
	const [listData, setListData] = useState<BlogsType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState<IValueLanguage[]>(
		() => {
			const value = localStorage.getItem("blog_language") || "[]";
			return JSON.parse(value);
		},
	);
	const refBottom = useRef<HTMLDivElement>(null);
	const handleSelectedLanguage = async (language: IValueLanguage[]) => {
		setSelectedLanguage(language);
		localStorage.setItem("blog_language", JSON.stringify(language));
		const listId = language.map((item) => item.id);
		setLanguage(listId);
		setIsLoading(true);
		setListData([]);
		setPage(1);
		await handleRequest(1, listId);
	};

	const handleRequest = async (page: number, initLanguage?: string[]) => {
		try {
			const { data } = await queryBlog(page, initLanguage || language, 20);
			setListData((prev) => [...prev, ...data.result]);
			return data.result;
		} catch (error: unknown) {
			console.log("error", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			await handleRequest(page);
		})();
	}, []);

	const scrollBottom = async () => {
		refBottom.current?.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	const handleBookMark = async (value: BlogsType) => {
		try {
			const { data } = await createBookMarkApi({
				title: value.title,
				path: value.path,
				id: value.id + "",
				userName: value.user.username,
				tagList: value.tag_list,
			});
			setDataId((prev) => [...prev, data.id]);
			toast.success("Đã lưu bài viết");
		} catch (error: unknown) {
			console.log("error", error);
			toast.error("Lưu bài viết thất bại");
		}
	};

	return (
		<div className="w-full h-full max-w-7xl mx-auto py-12 px-4 lg:px-4 relative">
			<Helmet>
				<title>Các bài viết về lập trình - CodeNuc</title>
				<meta
					name="description"
					content="Khám phá các mã nguồn được người dùng đăng tải tại CodeNuc"
				/>
				<meta
					name="keywords"
					content="CodeNuc,Runtimes,language,javascript,python,go,java,ai,snippets,programming,search"
				/>
				<meta
					property="og:image"
					content="https://res.cloudinary.com/dundmo7q8/image/upload/v1737365825/codeNuc/snippets_uiw7n1.png"
				/>
				<meta property="og:url" content="https://codenuc.vercel.app/snippets" />
				<meta property="og:type" content="website" />
			</Helmet>
			<div className="" ref={refBottom}></div>
			<div
				className="fixed bottom-4 right-4 size-10 bg-white rounded-full hidden md:block"
				onClick={scrollBottom}
			></div>

			<div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 ">
				<LanguageSelected
					handleSelectedLanguage={handleSelectedLanguage}
					listSelected={selectedLanguage}
				/>

				{selectedLanguage.slice(0, 4).map((lang) => (
					<button
						key={lang.id}
						onClick={() => {
							// setSelectedLanguage(lang === selectedLanguage ? null : lang)
						}}
						className={`
                    group relative py-1.5 px-3 sm:px-4 sm:py-2 rounded-lg transition-all duration-200
                    text-gray-400 hover:text-gray-300 bg-[#1e1e2e] hover:bg-[#262637] ring-1 ring-gray-800
                  `}
					>
						<div className="flex items-center gap-2">
							<img
								src={lang.logoPath}
								alt={lang.label}
								className="w-4 h-4 object-contain"
							/>
							<span className="text-xs sm:text-sm">{lang.label}</span>
						</div>
					</button>
				))}

				{selectedLanguage.length > 4 && (
					<button
						className={`
                    group relative px-3 py-1.5 rounded-lg transition-all duration-200
                    text-gray-400 hover:text-gray-300 bg-[#1e1e2e] hover:bg-[#262637] ring-1 ring-gray-800 text-sm
                  `}
					>
						+ {selectedLanguage.length - 4}
					</button>
				)}

				{selectedLanguage.length > 0 && (
					<button
						onClick={() => handleSelectedLanguage([])}
						className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
					>
						<X className="w-3 h-3" />
					</button>
				)}
			</div>

			<div className="w-full h-auto">
				<InfiniteScroll
					dataLength={listData.length}
					next={() => {
						handleRequest(page + 1);
						setPage((prev) => prev + 1);
					}}
					style={{
						scrollbarWidth: "none",
					}}
					hasMore={true}
					loader={
						<p className="text-sm text-center text-gray-400 mt-2">Loading...</p>
					}
					// below props only if you need pull down functionality
				>
					<motion.div
						className={`grid gap-8 grid-cols-1 md:grid-cols-2`}
						layout
					>
						<AnimatePresence mode="popLayout">
							{listData &&
								listData?.length > 0 &&
								listData.map((blog) => {
									const checkBookMark = dataId.includes(blog.id + "");
									return (
										<BlogCard
											blog={blog}
											key={blog.id}
											isBookMark={checkBookMark}
											handleBookMark={handleBookMark}
										/>
									);
								})}

							{!isLoading && listData.length === 0 && (
								<div
									className="col-span-full relative w-full h-full bg-[#1e1e2e]/80 backdrop-blur-sm rounded-lg min-h-60 
          border border-[#313244]/50 hover:border-[#313244] 
          transition-all duration-300 overflow-hidden flex items-center justify-center flex-col gap-2"
								>
									<Logo />
									<span className="text-sm sm:text-base md:text-lg font-semibold">
										Không có kết quả nào
									</span>
								</div>
							)}
							{isLoading &&
								Array.from({ length: 6 }).map((_, index) => (
									<BlogSkeleton key={index} />
								))}
						</AnimatePresence>
					</motion.div>
				</InfiniteScroll>
			</div>
		</div>
	);
};

export default BlogsPage;
