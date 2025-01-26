import { useAuthContext } from "@/context/AuthProvider";
import { logoutApi } from "@/services/user.service";
import useModelLogin from "@/store/useModelLogin";
import instance from "@/utils/instance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useNavigatePage from "@/config/navigation.config";
import { useTranslation } from "react-i18next";
import ButtonLang from "./common/ButtonLang";

const ButtonProfile = () => {
	const router = useNavigate();
	const dataNavigation = useNavigatePage();
	const { t } = useTranslation();
	const { authUser, isLoggedIn, setAuthUser, setIsLoggedIn } = useAuthContext();
	const { setOpen } = useModelLogin();

	const handleLogout = async () => {
		try {
			await logoutApi();
			instance.defaults.headers.common["Authorization"] = undefined;
			setAuthUser?.(undefined);
			setIsLoggedIn?.(false);
			router("/");
		} catch (error: unknown) {
			const err = error as Error;
			toast.error(err.message);
		}
	};

	return (
		<div className="flex items-center gap-2">
			<ButtonLang />
			<div>
				{isLoggedIn ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="size-8 md:size-9 border rounded-full focus-within:outline-none cursor-pointer overflow-hidden">
								<img
									src={authUser?.avatar}
									alt=""
									className="w-full h-full object-cover"
								/>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="bg-[#1e1e2e]/95 backdrop-blur-xl rounded-md border border-[#313244] shadow-2xl text-gray-400 max-w-56 w-56"
							side="bottom"
							align="end"
						>
							<DropdownMenuLabel>
								<div className="flex items-center w-full h-full justify-start  overflow-hidden">
									<div className="size-8 border rounded-full focus-within:outline-none cursor-pointer overflow-hidden flex-shrink-0">
										<img
											src={authUser?.avatar}
											alt=""
											className="w-full h-full object-cover"
										/>
									</div>

									<div className="flex-1 pl-2">
										<p className="text-sm font-semibold text-gray-400 line-clamp-1">
											{authUser?.name}
										</p>
										<p className="text-xs text-gray-500 truncate">
											{authUser?.email}
										</p>
									</div>
								</div>
							</DropdownMenuLabel>
							<div className="block md:hidden">
								<DropdownMenuSeparator className="bg-[#313244]" />
								{dataNavigation.map((nav, index) => (
									<Link to={nav.link} key={index} className="cursor-pointer">
										<DropdownMenuItem className="hover:bg-[#262637] focus:bg-[#262637] text-gray-300 hover:text-gray-300 focus:text-gray-300 cursor-pointer">
											{nav.label}
										</DropdownMenuItem>
									</Link>
								))}
							</div>

							<DropdownMenuSeparator className="bg-[#313244]" />
							<Link to={"/me/profile"} className="cursor-pointer">
								<DropdownMenuItem className="cursor-pointer">
									{t("navigator.profile")}
								</DropdownMenuItem>
							</Link>
							<Link to={"/me/bookMark"} className="cursor-pointer">
								<DropdownMenuItem className="cursor-pointer">
									{t("navigator.bookmark")}
								</DropdownMenuItem>
							</Link>

							<DropdownMenuSeparator className="bg-[#313244]" />

							<DropdownMenuItem
								className="bg-rose-100/10 text-rose-500 hover:bg-rose-100/30 cursor-pointer focus:bg-rose-100/30 focus:text-rose-500"
								onClick={handleLogout}
							>
								{t("logOut")}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<button
						className="relative group flex items-center justify-center px-3 py-1.5 rounded-full text-gray-300 cursor-pointer 
                hover:bg-blue-500/10 border border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
						onClick={() => {
							setOpen();
						}}
					>
						<span
							className="block text-sm font-semibold bg-gradient-to-r
                 from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text"
						>
							{t("signIn")}
						</span>
					</button>
				)}
			</div>
		</div>
	);
};

export default ButtonProfile;
