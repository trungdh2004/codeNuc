import { LANGUAGE_CONFIG } from "@/constants/language";
import { useAuthContext } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";
import { createMessageApi, pagingGeminiApi } from "@/services/gemini.service";
import { ResponseBase } from "@/types";
import { MessageResponse } from "@/types/gemini.type";
import { motion } from "framer-motion";
import { Bot, Loader, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidV4 } from "uuid";
import CommentLanguage from "../comment/CommentLanguage";
import MessageItem from "./MessageItem";
import { useTranslation } from "react-i18next";
interface IProps {
	handleSetCode: (code: string, language: string) => void;
	id: string;
	handleLoading: (isLoading: boolean) => void;
	isLoadingAi: boolean;
}

const Conversation = ({
	id,
	handleSetCode,
	handleLoading,
	isLoadingAi,
}: IProps) => {
	const { t } = useTranslation();
	const { authUser } = useAuthContext();
	const [language, setLanguage] = useState("javascript");
	const [pageIndex, setPageIndex] = useState(1);
	const [response, setResponse] = useState<ResponseBase<MessageResponse>>({
		content: [],
		totalAllOptions: 0,
		totalOptionPage: 0,
		totalPages: 0,
		pageIndex: 1,
		pageSize: 10,
	});
	const [before, setBefore] = useState<undefined | string>(undefined);
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(true);
	const [openScroll, setOpenScroll] = useState(false);
	const refBottom = useRef<HTMLDivElement>(null);
	const refBoxChat = useRef<HTMLDivElement>(null);
	const handleLanguage = (value: string) => {
		setLanguage(value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!content) {
			return;
		}
		handleLoading(true);
		const message = {
			_id: uuidV4(),
			isAi: false,
			message: content,
			language: language,
			code: undefined,
			roomId: id,
		};
		setResponse((prev) => {
			return {
				...prev,
				content: [message, ...prev.content],
			};
		});
		setContent("");
		try {
			const { data } = await createMessageApi(
				{
					message: content,
					language,
				},
				id,
			);
			setResponse((prev) => {
				return {
					...prev,
					content: [data, ...prev.content],
				};
			});
			if (data.code) {
				handleSetCode(data.code, data.language);
			}
		} catch (error: unknown) {
			console.log("err", error);
		} finally {
			handleLoading(false);
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			if (refBoxChat.current) {
				const top = refBoxChat?.current?.scrollTop;
				const height = refBoxChat?.current?.clientHeight;
				const scroll = refBoxChat?.current?.scrollHeight;

				console.log({
					height: height,
					scroll,
					top: top,
				});

				if (-top > 100) {
					setOpenScroll(true);
				} else {
					setOpenScroll(false);
				}
			} else {
				setOpenScroll(false);
			}
		};

		refBoxChat.current?.addEventListener("scroll", handleScroll);

		return () => {
			refBoxChat.current?.removeEventListener("scroll", handleScroll);
		};
	}, [refBoxChat]);
	const scrollBottom = async () => {
		refBottom.current?.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	const handlePaging = async () => {
		try {
			const page = pageIndex + 1;

			const { data } = await pagingGeminiApi(
				{
					roomId: id as string,
					pageIndex: page,
					pageSize: 10,
					keyword: "",
				},
				before,
			);
			setResponse((prev) => {
				return {
					...prev,
					content: [...prev.content, ...data.content],
				};
			});
			setPageIndex(page);
		} catch (error: unknown) {
			console.log("err", error);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = await pagingGeminiApi({
					roomId: id as string,
					pageIndex: 1,
					pageSize: 10,
					keyword: "",
				});
				setBefore(data.before);
				setResponse(data);
			} catch (error: unknown) {
				console.log("err", error);
			} finally {
				setLoading(false);
			}
		})();
	}, [id]);
	return (
		<div className="col-span-1 md:col-span-5 text-white flex flex-col h-[85vh] relative">
			<div
				className="flex-1 flex overflow-y-auto scroll-style pr-2 flex-col-reverse"
				ref={refBoxChat}
				id="scrollableChatDiv"
			>
				<InfiniteScroll
					dataLength={response?.content.length}
					next={() => {
						console.log("next");
						handlePaging();
					}}
					style={{
						display: "flex",
						flexDirection: "column-reverse",
						position: "relative",
					}} //To put endMessage and loader to the top.
					inverse={true} //
					hasMore={response?.content.length !== response.totalAllOptions}
					loader={
						<p className="text-sm text-center text-gray-400">Loading...</p>
					}
					scrollableTarget="scrollableChatDiv"
					// below props only if you need pull down functionality
					refreshFunction={() => {}}
					pullDownToRefresh
					pullDownToRefreshThreshold={50}
					pullDownToRefreshContent={
						false
						// <h3 style={{ textAlign: "center" }}>&#8595;</h3>
					}
					releaseToRefreshContent={false}
				>
					<div className="" ref={refBottom}></div>
					<div
						className={cn(
							"rounded-md text-center w-full h-10  text-gray-400 px4 py-2 animate-pulse bg-[#272727]/50 hidden items-center justify-center",
							isLoadingAi && "flex",
						)}
					>
						<Bot />
					</div>
					{response.content?.length > 0 &&
						response.content?.map((item) => (
							<div key={item._id}>
								<MessageItem
									key={item._id}
									message={item.message}
									language={item.language}
									code={item.code}
									isAi={item.isAi}
									avatar={authUser?.avatar}
									handleCode={handleSetCode}
								/>
							</div>
						))}

					{loading &&
						Array.from({ length: 5 }).map((_, index) => (
							<div
								className="rounded-md text-center w-full h-14  text-gray-400 px4 py-2 animate-pulse bg-[#272727]/50 flex mb-2 items-center justify-center"
								key={index}
							></div>
						))}
				</InfiniteScroll>
			</div>

			<div className="p-2 border border-gray-500/50 rounded-xl w-full mt-3 bg-[#1e1e2e] relative">
				<div
					className={cn(
						"absolute z-10  size-7 bg-gray-500 rounded-full -top-10 left-1/2 -translate-x-1/2 text-gray-400 flex items-center justify-center hover:bg-gray-500/80 cursor-pointer",
						!openScroll && "hidden",
					)}
					onClick={scrollBottom}
				>
					<FaArrowDown />
				</div>
				<form action="" onSubmit={handleSubmit}>
					<div>
						<textarea
							className="w-full min-h-16 bg-transparent  outline-none resize-none scroll-style"
							placeholder={t("ai.placeholder")}
							autoFocus
							value={content}
							onChange={(e) => setContent(e.target.value)}
						></textarea>
					</div>
					<div className="flex items-center justify-between gap-4 pt-2">
						<div className="flex items-center gap-2">
							<CommentLanguage
								handleLanguage={handleLanguage}
								value={language}
								className="p-1.5"
							/>
							{language && LANGUAGE_CONFIG[language] && (
								<div className=" rounded-lg py-1 px-2 border border-gray-500/50 flex items-center">
									<img
										src={LANGUAGE_CONFIG[language].logoPath}
										alt=""
										className=" size-4 rounded-sm"
									/>
									<span className="text-sm text-gray-400 ml-2">
										{LANGUAGE_CONFIG[language].label}
									</span>
								</div>
							)}
						</div>
						<div>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								type="submit"
								className={cn(
									"inline-flex items-center gap-2 p-2 rounded-md overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity disabled:cursor-not-allowed",
									// !content && "hidden",
								)}
								disabled={isLoadingAi}
							>
								{isLoadingAi ? (
									<Loader size={14} className="animate-spin" />
								) : (
									<Send size={14} />
								)}
							</motion.button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Conversation;
