import { LANGUAGE_CONFIG } from "@/constants/language";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CodeIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface IProps {
	handleLanguage: (value: string) => void;
	value?: string;
	className?: string;
}
const CommentLanguage = ({ handleLanguage, value, className }: IProps) => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutsize = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutsize);

		return () => document.removeEventListener("mousedown", handleClickOutsize);
	}, []);
	return (
		<div
			className=" text-xs text-[#808086] space-y-1 relative"
			ref={dropdownRef}
		>
			<div
				onClick={() => {
					setOpen((prev) => !prev);
				}}
				className={cn(
					"p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 group relative border border-gray-500/50 cursor-pointer ",
					className,
				)}
			>
				<CodeIcon className=" size-4 text-gray-400 group-hover:text-gray-300" />
			</div>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.96 }}
						transition={{ duration: 0.2 }}
						className="absolute bottom-0 left-full w-full mt-2 min-w-[240px] bg-[#1e1e2e]/95 backdrop-blur-xl rounded-md border border-[#313244] shadow-2xl py-2 z-50"
					>
						<div className="px-2 pb-1 mb-1 border-b border-gray-800/50">
							<p className="text-xs font-medium text-gray-400 px-2">
								Chọn ngôn ngữ
							</p>
						</div>

						<div className="max-h-[240px] overflow-y-auto scroll-style overflow-x-hidden px-1">
							{Object.values(LANGUAGE_CONFIG).map((t, index) => {
								// const isLocked = !hasAccess && t.id !== "javascript";
								return (
									<motion.button
										key={t.id}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: index * 0.1 }}
										className={cn(
											"relative group w-full flex items-center gap-3 px-2 py-1 hover:bg-[#262637] transition-all duration-200",
											value === t.id &&
												"border-blue-500/50 border text-blue-500 rounded-sm cursor-not-allowed",
										)}
										onClick={() => {
											setOpen(false);
											handleLanguage(t.monacoLanguage);
										}}
										type="button"
										disabled={value === t.id}
									>
										{/* bg gradient */}
										<div
											className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 
              group-hover:opacity-100 transition-opacity"
										/>

										{/* icon */}
										<div
											className={cn(
												`
                flex items-center justify-center size-6 rounded-lg group-hover:scale-110 transition-all duration-200`,
											)}
										>
											<div
												className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity"
											/>
											<img
												src={t.logoPath}
												alt=""
												className="w-full h-full object-cover"
											/>
										</div>
										{/* label */}
										<span className="flex-1 text-left group-hover:text-white transition-colors text-sm">
											{t.label}
										</span>
									</motion.button>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CommentLanguage;
