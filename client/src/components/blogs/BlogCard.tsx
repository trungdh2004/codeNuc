import { motion } from "framer-motion";
import { BlogsType } from "@/types/blogs.type";
import { FaRegComment } from "react-icons/fa";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { appConfig } from "@/config/appConfig";
import TooltipComponent from "../common/TooltipComponent";

interface IProp {
	blog: BlogsType;
	isBookMark: boolean;
	handleBookMark: (value: BlogsType) => void;
}
const BlogCard = ({ blog, isBookMark, handleBookMark }: IProp) => {
	return (
		<motion.div
			whileHover={{ y: -2 }}
			transition={{ duration: 0.2 }}
			layout
			className="relative group"
		>
			<a href={`${appConfig.PATH_BLOG}${blog.path}`} target="_blank">
				<div className="p-4 rounded-lg border bg-[#1e1e2e]/80 border-gray-500/50 flex flex-col gap-2 relative cursor-pointer ">
					<div className="flex flex-col">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 h-8 flex-1">
								<div className="size-8 rounded-full overflow-hidden border border-gray-500/10">
									<img
										src={blog.user.profile_image_90}
										alt=""
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="flex flex-col">
									<span className="text-base truncate text-gray-300">
										{blog.user.username}
									</span>
									<span className="text-xs text-gray-500 ">
										{new Date(
											blog.published_at_int * 1000,
										).toLocaleDateString()}
									</span>
								</div>
							</div>

							<div className="px-2 py-1 border rounded-md text-sm bg-white text-black hidden group-hover:block">
								Đọc ngay
							</div>
						</div>
						<h3 className="text-lg text-white w-full line-clamp-1 font-semibold mt-2 group-hover:text-blue-500">
							{blog.title}
						</h3>
					</div>

					<div className="flex flex-col flex-1">
						<div className="flex items-center gap-1 h-6">
							{blog.tag_list.slice(0, 4).map((tag) => (
								<div
									key={tag}
									className="border border-gray-500/50 rounded-lg px-2 py-1 text-xs text-gray-300 h-6 my-2 "
								>
									#{tag}
								</div>
							))}

							{blog.tag_list.length > 4 && (
								<div className="border border-gray-500/50 rounded-lg px-2 py-1 text-xs text-gray-300 h-6 my-2 ">
									+{blog.tag_list.length - 4}
								</div>
							)}
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="flex items-center gap-2">
							<div>
								<FaRegComment size={20} className="" />
							</div>
							<span className="text-sm text-gray-300">
								{blog.comments_count}
							</span>
						</div>
						<div
							className="flex items-center gap-2"
							onClick={(e) => e.preventDefault()}
						>
							<span className="text-sm text-gray-500">
								{blog.reading_time} phút đọc
							</span>

							<TooltipComponent label="Lưu bài viết">
								<div
									className="p-1 rounded-sm hover:bg-gray-500/10 cursor-pointer"
									onClick={() => {
										if (isBookMark) return;
										handleBookMark(blog);
									}}
								>
									{isBookMark ? (
										<IoBookmark size={20} />
									) : (
										<IoBookmarkOutline size={20} />
									)}
								</div>
							</TooltipComponent>
						</div>
					</div>
				</div>
			</a>
		</motion.div>
	);
};

export default BlogCard;
