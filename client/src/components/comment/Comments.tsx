import { MessageSquare } from "lucide-react";
import CommentForm from "./CommentForm";

const Comments = () => {
	const user = true;

	return (
		<div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-hidden">
			<div className="px-6 sm:px-8 py-6 border-b border-[#ffffff0a]">
				<h2 className="text-lg font-semibold text-white flex items-center gap-2">
					<MessageSquare className="w-5 h-5" />
					Discussion (10)
				</h2>
			</div>

			<div className="p-6 sm:p-8">
				{user ? (
					<CommentForm />
				) : (
					<div className="bg-[#0a0a0f] rounded-xl p-6 text-center mb-8 border border-[#ffffff0a]">
						<p className="text-[#808086] mb-4">
							Sign in to join the discussion
						</p>
						{/* <SignInButton mode="modal">
							<button className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors">
								Sign In
							</button>
						</SignInButton> */}
					</div>
				)}

				<div className="space-y-6">
					{/* {comments.map((comment) => (
						<Comment
							key={comment._id}
							comment={comment}
							onDelete={handleDeleteComment}
							isDeleting={deletinCommentId === comment._id}
							currentUserId={user?.id}
						/>
					))} */}
				</div>
			</div>
		</div>
	);
};

export default Comments;
