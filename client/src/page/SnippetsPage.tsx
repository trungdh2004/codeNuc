import Paginations from "@/components/common/Pagination";
import Logo from "@/components/Logo";
import LanguageSelected from "@/components/snippet/LanguageSelected";
import SnippetLoading from "@/components/snippet/SnippetLoading";
import SnippetCard from "@/components/SnippetCard";
import { IValueLanguage } from "@/constants/language";
import useDebounceV2 from "@/hook/debounce";
import { cn } from "@/lib/utils";
import { pagingSnippetApi } from "@/services/snippet.service";
import { ResponseBase } from "@/types";
import { SnippetPagingDto, SnippetResponse } from "@/types/snippet.type";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const SnippetsPage = () => {
	const { t } = useTranslation();
	const [searchObject, setSearchObject] = useState<SnippetPagingDto>({
		pageIndex: 1,
		pageSize: 12,
		keyword: "",
		language: [],
	});
	const { data, isLoading } = useQuery<ResponseBase<SnippetResponse>>({
		queryKey: ["paging", searchObject],
		queryFn: async () => {
			const { data } = await pagingSnippetApi(searchObject);
			return data;
		},
	});
	const [searchQuery, setSearchQuery] = useState("");
	const keyDebounce = useDebounceV2(searchQuery);
	const [selectedLanguage, setSelectedLanguage] = useState<IValueLanguage[]>(
		[],
	);

	useEffect(() => {
		setSearchObject((prev) => ({
			...prev,
			keyword: keyDebounce,
		}));
	}, [keyDebounce]);

	const handleSelectedLanguage = (language: IValueLanguage[]) => {
		setSelectedLanguage(language);
		const listId = language.map((item) => item.id);
		setSearchObject((prev) => ({
			...prev,
			language: listId,
		}));
	};

	return (
		<div className="w-full h-full max-w-7xl mx-auto py-12 px-4 ">
			<Helmet>
				<title>CodeNuc khám phá mã nguồn</title>
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
			<div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r
             from-blue-500/10 to-purple-500/10 text-sm text-gray-400 mb-6"
				>
					<BookOpen className="w-4 h-4" />
					{t("snippet.sub")}
				</motion.div>
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-6"
				>
					{t("snippet.title")}
				</motion.h1>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="text-base md:text-lg text-gray-400 mb-4 md:mb-8"
				>
					{t("snippet.description")}
				</motion.p>
			</div>
			<div className="relative max-w-5xl mx-auto mb-6 space-y-6">
				{/* Search */}
				<div className="relative group">
					<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
					<div className="relative flex items-center">
						<Search className="absolute left-2 md:left-4 size-3 md:size-5 text-gray-400" />
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder={t("snippet.placeholder")}
							className="w-full pl-6 md:pl-12 pr-2 md:pr-4 py-2 md:py-4 bg-[#1e1e2e]/80 hover:bg-[#1e1e2e] text-white
                  rounded-xl border border-[#313244] hover:border-[#414155] transition-all duration-200
                  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
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

			<motion.div
				className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}
				layout
			>
				<AnimatePresence mode="popLayout">
					{data &&
						data?.content?.length > 0 &&
						data?.content.map((snippet) => (
							<SnippetCard key={snippet._id} snippet={snippet} />
						))}

					{!data ||
						(data.content.length === 0 && (
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
						))}
					{isLoading &&
						Array.from({ length: 4 }).map((_, index) => (
							<SnippetLoading key={index} />
						))}
				</AnimatePresence>
			</motion.div>
			<div
				className={cn(
					"mt-4 justify-center hidden",
					data?.totalPages && data?.totalPages > 1 && "flex",
				)}
			>
				<Paginations
					pageCount={data?.totalPages || 0}
					forcePage={searchObject.pageIndex - 1}
					handlePageClick={(value) => {
						setSearchObject((prev) => ({
							...prev,
							pageIndex: value.selected + 1,
						}));
					}}
				/>
			</div>
		</div>
	);
};

export default SnippetsPage;
