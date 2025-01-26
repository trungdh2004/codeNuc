import CommentLanguage from "@/components/comment/CommentLanguage";
import { LANGUAGE_CONFIG } from "@/constants/language";
import { useAuthContext } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";
import { createRoomApi } from "@/services/gemini.service";
import useModelLogin from "@/store/useModelLogin";
import { NewRoomDto } from "@/types/gemini.type";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader, Send } from "lucide-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const AiPage = () => {
	const { isLoggedIn } = useAuthContext();
	const { setOpen } = useModelLogin();
	const router = useNavigate();
	const { mutate, isPending } = useMutation({
		mutationKey: ["newRoom"],
		mutationFn: (value: NewRoomDto) => createRoomApi(value),
		onSuccess({ data }) {
			router(`/ai/${data._id}`);
		},
		onError() {
			toast.error("Lỗi tạo thất bại");
		},
	});
	const { t } = useTranslation();
	const [language, setLanguage] = useState("javascript");
	const [content, setContent] = useState("");
	const handleLanguage = (value: string) => {
		console.log("value", value);
		setLanguage(value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!content) {
			return;
		}
		if (!isLoggedIn) {
			setOpen();
			return;
		}
		mutate({
			message: content,
			language,
		});
	};

	return (
		<div className="w-full">
			<Helmet>
				<title>AI thông minh - CodeNuc</title>
				<meta
					property="description"
					content="Với AI Gemini giúp hỗ trợ tạo các mã nguồn theo yêu cầu người dùng nhiều ngôn ngữ tự chọn"
				/>
				<meta
					property="keywords"
					content="CodeNuc,mã nguồn, chạy trực tuyến, runtimes,javascript,"
				/>
				<meta
					property="og:image"
					content="https://res.cloudinary.com/dundmo7q8/image/upload/v1737365822/codeNuc/code_qfzeet.png"
				/>
				<meta property="og:url" content="https://codenuc.vercel.app/editor" />
				<meta property="og:type" content="website" />
			</Helmet>
			<div className="flex flex-col items-center mt-28 justify-center gap-2 p-4 md:p-10">
				<h2
					className="font-bold text-2xl md:text-4xl bg-gradient-to-r
                 from-blue-400 via-blue-300 text-center to-purple-400 text-transparent bg-clip-text"
				>
					{t("ai.title")}
				</h2>
				<p className="text-gray-400 text-sm md:text-base font-medium text-center">{t("ai.description")}</p>

				<div className="p-4 border border-gray-500/50 rounded-xl max-w-xl w-full mt-3 bg-[#1e1e2e]">
					<form action="" onSubmit={handleSubmit}>
						<div>
							<textarea
								className="w-full min-h-28 bg-transparent  outline-none resize-none scroll-style"
								placeholder={t("ai.placeholder")}
								value={content}
								onChange={(e) => setContent(e.target.value)}
								autoFocus
								disabled={isPending}
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
										!content && "hidden",
									)}
									disabled={isPending}
								>
									{isPending ? (
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
		</div>
	);
};

export default AiPage;
