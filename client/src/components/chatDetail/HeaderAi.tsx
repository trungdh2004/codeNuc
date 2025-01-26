import { BotMessageSquare, PanelRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonProfile from "../ButtonProfile";
import Logo from "../Logo";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";
import { listRoomApi } from "@/services/gemini.service";
import { RoomResponse } from "@/types/gemini.type";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const HeaderAi = () => {
	const { id } = useParams();
	const [open, setOpen] = useState(false);
	const [listChat, setListChat] = useState<RoomResponse[]>([]);
	const { t } = useTranslation();
	useEffect(() => {
		(async () => {
			try {
				console.log("hihi nef");

				const { data } = await listRoomApi();
				setListChat(data);
			} catch (error: unknown) {
				console.log("error: ", error);
			}
		})();
	}, []);

	return (
		<>
			<div className="sticky top-0 z-20 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
				<div className=" mx-auto px-2 sm:px-4 md:px-6">
					<div className="relative h-16 flex items-center justify-between">
						<div className="flex items-center gap-8">
							<div
								onClick={() => {
									setOpen(true);
								}}
								className="cursor-pointer hover:bg-gray-500/50 p-1 rounded-sm"
							>
								<PanelRight size={20} />
							</div>
							{/* Logo */}
							<Link
								to="/"
								className="flex items-center gap-3 group relative hidden sm:block"
							>
								{/* logo hover effect */}
								<div
									className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
              group-hover:opacity-100 transition-all duration-500 blur-xl"
								/>

								{/* Logo */}
								<Logo />

								<div className="relative">
									<span
										className="block text-lg font-semibold bg-gradient-to-r
                 from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text"
									>
										CodeNuc
									</span>
								</div>
							</Link>
						</div>

						<div className="flex items-center gap-4">
							<ButtonProfile />
						</div>
					</div>
				</div>
			</div>

			<Sheet open={open} onOpenChange={() => setOpen(false)}>
				<SheetContent
					side={"left"}
					className="sm:max-w-72 bg-[#1e1e2e] border-none p-4 flex flex-col gap-2"
				>
					<SheetHeader>
						<div>
							<Link to="/" className="flex items-center gap-3 group relative">
								{/* logo hover effect */}
								<div
									className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
              group-hover:opacity-100 transition-all duration-500 blur-xl"
								/>

								{/* Logo */}
								<Logo />

								<div className="relative">
									<span
										className="block text-lg font-semibold bg-gradient-to-r
                 from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text"
									>
										CodeNuc
									</span>
								</div>
							</Link>
						</div>
					</SheetHeader>
					<Link to={"/ai"}>
						<Button variant={"secondary"} className="my-4 w-full">
							<BotMessageSquare size={20} /> {t("ai.newChat")}
						</Button>
					</Link>
					<div className="flex-1 w-full overflow-y-auto scroll-style">
						<div>
							<span className="text-gray-500 text-sm">Chat</span>
						</div>
						<div className="flex flex-col w-full gap-1">
							{listChat.map((chat) => (
								<Link to={`/ai/${chat._id}`} key={chat._id}>
									<div
										className={cn(
											"py-1.5 px-2 text-gray-200 rounded-md cursor-pointer hover:bg-gray-500/50 text-sm overflow-hidden",
											id === chat._id && "bg-gray-500/20",
										)}
									>
										<p className="text-nowrap truncate">{chat.message}</p>
									</div>
								</Link>
							))}
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default HeaderAi;
