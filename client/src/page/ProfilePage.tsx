import Paginations from "@/components/common/Pagination";
import Logo from "@/components/Logo";
import SnippetLoading from "@/components/snippet/SnippetLoading";
import SnippetCard from "@/components/SnippetCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
	pagingCurrentSnippetApi,
	removeSnippetApi,
} from "@/services/snippet.service";
import { ResponseBase } from "@/types";
import { SnippetPagingDto, SnippetResponse } from "@/types/snippet.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { Bot, Clock, Loader, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { listRoomApi, removeRoomApi } from "@/services/gemini.service";
import { RoomResponse } from "@/types/gemini.type";
import { useAuthContext } from "@/context/AuthProvider";
const ProfilePage = () => {
	const query = useQueryClient();
	const { authUser } = useAuthContext();
	const [searchObject, setSearchObject] = useState<SnippetPagingDto>({
		pageIndex: 1,
		pageSize: 12,
		keyword: "",
		language: [],
	});
	const { data, isLoading } = useQuery<ResponseBase<SnippetResponse>>({
		queryKey: ["paging", searchObject],
		queryFn: async () => {
			const { data } = await pagingCurrentSnippetApi(searchObject);
			return data;
		},
	});
	const { data: listRoom, isLoading: isRoom } = useQuery<RoomResponse[]>({
		queryKey: ["roomsCurrent"],
		queryFn: async () => {
			const { data } = await listRoomApi();
			return data;
		},
	});
	const { mutate, isPending } = useMutation({
		mutationKey: ["removeSnippet"],
		mutationFn: (id: string) => removeSnippetApi(id),
		onSuccess: () => {
			query.refetchQueries({
				queryKey: ["paging", searchObject],
			});
			toast.success("Xóa thành công");
		},
		onError: () => {
			toast.error("Xóa thất bại");
		},
	});
	const { mutate: mutateRoom, isPending: isPendingRoom } = useMutation({
		mutationKey: ["removeRoom"],
		mutationFn: (id: string) => removeRoomApi(id),
		onSuccess: () => {
			query.refetchQueries({
				queryKey: ["roomsCurrent"],
			});
			toast.success("Xóa thành công");
		},
		onError: () => {
			toast.error("Xóa thất bại");
		},
	});
	const [confirmSnippet, setConfirmSnippet] = useState<string | null>(null);
	const [confirmRoom, setConfirmRoom] = useState<string | null>(null);

	const handleDeleteSnippet = (id: string) => {
		if (!id) return;

		mutate(id);
	};

	const handleConfirmSnippet = (id: string) => {
		setConfirmSnippet(id);
	};

	return (
		<div className="mx-auto max-w-5xl py-10 px-2 sm:px-4">
			<div>
				<div
					className="w-full bg-gradient-to-tr from-blue-800/50 to-indigo-600/50 h-32 rounded-lg relative
                 "
				>
					<div className="absolute -bottom-12 md:-bottom-16  gap-4 left-5 sm:left-10 flex items-end">
						<div className="size-20 sm:size-24 md:size-32 rounded-full overflow-hidden">
							<img
								src={authUser?.avatar}
								alt="avatar"
								className="w-full h-full object-cover"
							/>
						</div>

						<div className="text-white text-lg md:text-xl mb-2 md:mb-4 font-bold">
							{authUser?.name}
						</div>
					</div>
				</div>
			</div>

			<div className="w-full mt-20">
				<Tabs defaultValue="account" className="w-full">
					<TabsList className=" max-w-sm  grid w-full grid-cols-2 bg-gray-500/30">
						<TabsTrigger value="account">Bài code</TabsTrigger>
						<TabsTrigger value="password">AI</TabsTrigger>
					</TabsList>
					<TabsContent value="account" className="w-full">
						<motion.div
							className={`grid gap-6 ${"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
							layout
						>
							<AnimatePresence mode="popLayout">
								{data &&
									data?.content?.length > 0 &&
									data?.content.map((snippet) => (
										<SnippetCard
											key={snippet._id}
											snippet={snippet}
											isCurrent
											isDeleting={isPending}
											handleRemove={handleConfirmSnippet}
										/>
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
									Array.from({ length: 3 }).map((_, index) => (
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
					</TabsContent>
					<TabsContent value="password">
						<motion.div
							className={`grid gap-6 ${"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
							layout
						>
							<AnimatePresence mode="popLayout">
								{listRoom &&
									listRoom?.map((item) => (
										<div key={item._id} className="group relative ">
											<Link
												to={"/ai/" + item._id}
												className="w-full p-4 rounded-md bg-gray-500/20 flex flex-col gap-2  cursor-pointer group-hover:-translate-y-1 transition-transform duration-200"
											>
												<div className="flex items-center justify-between">
													<Bot size={20} className="text-white" />

													<div onClick={(e) => e.preventDefault()}>
														<button
															onClick={() => {
																setConfirmRoom(item._id);
															}}
															className={cn(
																"group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200",
																isPendingRoom
																	? "bg-red-500/20 text-red-400 cursor-not-allowed"
																	: "bg-gray-500/10 text-gray-400 hover:bg-red-500/10 hover:text-red-400",
															)}
														>
															{isPendingRoom ? (
																<div className="size-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
															) : (
																<Trash2 className="size-3.5" />
															)}
														</button>
													</div>
												</div>
												<p className="line-clamp-2 text-gray-300">
													{item.message}
												</p>
												<div className="flex items-center gap-1 text-[10px] text-gray-500">
													<Clock size={10} />
													{new Date(item.createdAt).toLocaleDateString()}
												</div>
											</Link>

											<div
												className={cn(
													"absolute hidden inset-0 z-10 bg-black/30  items-center justify-center ",
													isPendingRoom && "flex",
												)}
											>
												<Loader className="text-gray-500 animate-spin" />
											</div>
										</div>
									))}

								{!listRoom ||
									(listRoom.length === 0 && (
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
								{isRoom &&
									Array.from({ length: 3 }).map((_, index) => (
										<div
											className="w-full p-4 rounded-md bg-gray-500/20 flex flex-col gap-2 group cursor-pointer animate-pulse"
											key={index}
										>
											<div className="h-8 w-full flex items-center justify-between">
												<div className="h-full w-8  rounded-sm bg-gray-500/30"></div>
												<div className="h-full w-8  rounded-sm bg-gray-500/30"></div>
											</div>
											<div className="h-12 w-full rounded-sm bg-gray-500/30"></div>
											<div className="h-6 w-full rounded-sm bg-gray-500/30"></div>
										</div>
									))}
							</AnimatePresence>
						</motion.div>
					</TabsContent>
				</Tabs>
			</div>

			<ConfirmDialog
				open={!!confirmSnippet}
				handleClose={() => {
					setConfirmSnippet(null);
				}}
				handleSubmit={() => {
					handleDeleteSnippet(confirmSnippet as string);
					setConfirmSnippet(null);
				}}
			/>
			<ConfirmDialog
				open={!!confirmRoom}
				handleClose={() => {
					setConfirmRoom(null);
				}}
				handleSubmit={() => {
					if (confirmRoom) {
						mutateRoom(confirmRoom);
					}
					setConfirmRoom(null);
				}}
			/>
		</div>
	);
};

export default ProfilePage;
