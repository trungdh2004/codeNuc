import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Edit, Eye, Loader, Send } from "lucide-react";
import React, { useState } from "react";
import CommentContent from "./CommentContent";
import CommentLanguage from "./CommentLanguage";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createCommentApi } from "@/services/comment.service";
import { CommentDto } from "@/types/comment.type";
import { commentType } from "@/config/comment.config";

const CommentForm = ({
	parent,
	handlePageIndex,
}: {
	parent: string;
	handlePageIndex: () => void;
}) => {
	const [preview, setPreview] = useState<boolean>(false);
	const [comment, setComment] = useState("");
	const { mutate, isPending } = useMutation({
		mutationKey: ["comment"],
		mutationFn: (value: CommentDto) => createCommentApi(value),
		onSuccess(data) {
			console.log("data", data);
			setComment("");
			handlePageIndex();
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Tab") {
			e.preventDefault();
			const start = e.currentTarget.selectionStart;
			const end = e.currentTarget.selectionEnd;
			const newComment =
				comment.substring(0, start) + "  " + comment.substring(end);

			setComment(newComment);
			e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
		}
	};

	const handleLanguage = (language: string) => {
		const value = "\n```" + language + "\n\n```\n";
		setComment((prev) => prev + value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!comment.trim()) {
			return;
		}

		mutate({
			content: comment,
			type: commentType.SNIPPET,
			parent,
		});
	};

	return (
		<div className="w-full h-full bg-[#0a0a0f] rounded-lg text-center mb-8 border border-[#ffffff0a]">
			{/* header */}
			<div className="w-full p-2 flex items-center justify-end gap-2">
				<div className="flex items-center gap-1 p-1 bg-[#1e1e2e] rounded-md ring-1 ring-gray-800">
					<button
						onClick={() => setPreview(false)}
						className={cn(
							`py-1 px-2 rounded-md transition-all flex items-center gap-1 text-xs `,
							!preview
								? "bg-blue-500/20 text-blue-400"
								: "text-gray-400 hover:text-gray-300 hover:bg-[#262637]",
						)}
						type="button"
					>
						<Edit className="size-3" />
						Viết
					</button>
					<button
						onClick={() => setPreview(true)}
						className={cn(
							`py-1 px-2 rounded-md transition-all flex items-center gap-1 text-xs `,
							preview
								? "bg-blue-500/20 text-blue-400"
								: "text-gray-400 hover:text-gray-300 hover:bg-[#262637]",
						)}
						type="button"
					>
						<Eye className="size-3" />
						Xem trước
					</button>
				</div>
			</div>

			<form className="w-full " onSubmit={handleSubmit}>
				<div className="px-2">
					{preview ? (
						<div className="min-h-[120px] p-4 text-[#e1e1e3">
							<CommentContent content={comment} />
						</div>
					) : (
						<textarea
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Add to the discussion..."
							required
							className="w-full bg-transparent border-0 text-[#e1e1e3] placeholder:text-[#808086] outline-none 
            resize-none min-h-[120px] p-1.5 font-mono text-sm focus:ring-1 rounded-sm"
						/>
					)}
				</div>

				<div className="flex items-center justify-between gap-4 px-4 py-2 bg-[#080809] border-t border-[#ffffff0a] rounded-b-lg">
					<CommentLanguage handleLanguage={handleLanguage} />
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type="submit"
						disabled={!comment.trim() || isPending}
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg overflow-hidden bg-gradient-to-r
               from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
					>
						{isPending ? (
							<Loader size={14} className="animate-spin" />
						) : (
							<Send size={14} />
						)}
						<span className="text-sm font-medium text-white ">Bình luận</span>
					</motion.button>
				</div>
			</form>
		</div>
	);
};

export default CommentForm;
