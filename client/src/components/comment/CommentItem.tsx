import { Trash2Icon, UserIcon } from "lucide-react";
import CommentContent from "./CommentContent";
import { CommentResponse } from "@/types/comment.type";

interface CommentProps {
	data: CommentResponse;
	userId?: string;
}
function CommentItem({ data, userId }: CommentProps) {
	return (
		<div className="group">
			<div className="bg-[#0a0a0f] rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/50 cursor-pointer transition-all">
				<div className="flex items-start sm:items-center justify-between gap-4 mb-4">
					<div className="flex items-center gap-3">
						<div className="w-9 h-9 rounded-full bg-[#ffffff08] flex items-center justify-center flex-shrink-0">
							<UserIcon className="w-4 h-4 text-[#808086]" />
						</div>
						<div className="min-w-0">
							<span className="block text-[#e1e1e3] font-medium truncate">
								{data.createBy.name}
							</span>
							<span className="block text-sm text-[#808086]">
								{new Date(data.createdAt).toLocaleDateString()}
							</span>
						</div>
					</div>

					{data.createBy._id === userId && (
						<button
							onClick={() => {}}
							// disabled={isDeleting}
							className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-lg transition-all"
							title="Delete comment"
						>
							<Trash2Icon className="w-4 h-4 text-red-400" />
						</button>
					)}
				</div>

				<CommentContent content={data.content} />
			</div>
		</div>
	);
}
export default CommentItem;
