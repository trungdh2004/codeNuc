import { loginApi } from "@/services/user.service";
import useModelLoading from "@/store/useModelLoading.store";
import useModelLogin from "@/store/useModelLogin";
import { useGoogleLogin } from "@react-oauth/google";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import Logo from "./Logo";
const LoginModel = () => {
	const { open, setClose } = useModelLogin();
	const { setOpen, setClose: setCloseLoading } = useModelLoading();
	const login = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			setOpen();
			try {
				await loginApi(tokenResponse.access_token);
				window.location.reload();
			} catch (error: unknown) {
				const err = error as Error;
				toast.error(err.message);
			} finally {
				setCloseLoading();
			}
		},
		onError: (error) => {
			const err = error as Error;
			toast.error(err.message);
		},
		flow: "implicit",
	});
	return (
		<>
			<AnimatePresence>
				{open && (
					<div className="fixed inset-0 w-full h-screen  z-[100] flex items-center justify-center px-2">
						<div
							className="absolute inset-0 bg-black/80 cursor-pointer z-0"
							onClick={() => {
								setClose();
							}}
						></div>

						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 100 }}
							transition={{
								duration: 0.2,
							}}
							exit={{ scale: 0, opacity: 0 }}
							className="absolute max-w-lg w-full  bg-gradient-to-b from-gray-900 to-gray-950 z-2 p-4 rounded-md border border-gray-500/50 pb-8"
						>
							<div className="flex items-center justify-end text-white mb-4">
								<div
									className="size-5 cursor-pointer"
									onClick={() => {
										setClose();
									}}
								>
									<X size={20} />
								</div>
							</div>
							<div className="w-full ">
								<div className="flex items-center justify-center">
									<Logo />
								</div>
								<div>
									<h1 className="font-semibold text-lg text-center mt-2">
										Đăng nhập vào{" "}
										<span
											className="bg-gradient-to-r
                 from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text"
										>
											CodeNuc
										</span>
									</h1>
								</div>

								<div className="flex items-center justify-center my-4">
									<div className="max-w-60 w-full border-t border-gray-500/20"></div>
								</div>

								<div className="mt-8 flex flex-col items-center">
									<button
										className="w-full py-2 px-3 rounded-lg relative border max-w-xs flex items-center justify-center gap-2 group"
										onClick={() => {
											login();
										}}
									>
										<div
											className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
                group-hover:opacity-100 transition-all duration-500 blur-xl"
										/>
										<FcGoogle size={20} />
										<span className="text-sm ">Đăng nhập bằng google</span>
									</button>
								</div>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
};

export default LoginModel;
