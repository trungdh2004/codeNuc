import CommentLanguage from "@/components/comment/CommentLanguage";
import { LANGUAGE_CONFIG } from "@/constants/language";
import { cn } from "@/lib/utils";
import { createRoomApi } from "@/services/gemini.service";
import { NewRoomDto } from "@/types/gemini.type";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader, Send } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const AiPage = () => {
	const router = useNavigate()
	const {mutate,isPending} = useMutation({
		mutationKey:["newRoom"],
		mutationFn:(value:NewRoomDto) => createRoomApi(value),
		onSuccess({data}) {
			console.log("data",data);
			router(`/ai/${data._id}`)
		},
		onError() {
			toast.error("Lỗi tạo thất bại")
		},
	})
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
		mutate({
			message:content,
			language
		})
		
	};

	return (
		<div className="w-full">
			<div className="flex flex-col items-center mt-28 justify-center gap-2 p-10">
				<h2
					className="font-bold text-4xl bg-gradient-to-r
                 from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text"
				>
					Bạn muốn xây dựng gì ?
				</h2>
				<p className="text-gray-400 font-medium">
					Khởi tạo, hỗ trợ, fix bug đa dạng các ngôn ngữ
				</p>

				<div className="p-4 border border-gray-500/50 rounded-xl max-w-xl w-full mt-3 bg-[#1e1e2e]">
					<form action="" onSubmit={handleSubmit}>
						<div>
							<textarea
								className="w-full min-h-28 bg-transparent  outline-none resize-none scroll-style"
								placeholder="Bạn muốn hỗ trợ gì...."
								value={content}
								onChange={(e) => setContent(e.target.value)}
								autoFocus
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
