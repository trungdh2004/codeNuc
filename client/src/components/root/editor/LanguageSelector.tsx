import { LANGUAGE_CONFIG } from "@/constants/language";
import { cn } from "@/lib/utils";
import { useCodeEditorStore } from "@/store/useCodeEditor.store";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
	const [isOpen, setOpen] = useState(false);
	const { language, setLanguage } = useCodeEditorStore();
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const currentLanguage = LANGUAGE_CONFIG[language];
	const { t } = useTranslation();
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
		<div className="relative " ref={dropdownRef}>
			<motion.button
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => setOpen((prev) => !prev)}
				className={cn(
					"relative w-32 md:w-40 group flex items-center gap-2 px-2.5 py-1.5 bg-[#1e1e2e]/80 hover:bg-[#262637] rounded-lg transition-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700 text-sm",
				)}
			>
				<div
					className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
					aria-hidden="true"
				></div>

				<div className="size-4 rounded-md bg-gray-800/50 p-0.5 group-hover:scale-110 transition-transform">
					<img
						src={currentLanguage.logoPath}
						alt="programming language logo"
						className="w-full h-full object-contain relative z-10"
					/>
				</div>

				<span className="text-gray-300 min-w-20 text-left group-hover:text-white transition-colors text-xs">
					{currentLanguage?.label}
				</span>

				<ChevronDownIcon
					className={cn(
						`hidden md:block size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300`,
						isOpen ? "rotate-180" : "",
					)}
				/>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.96 }}
						transition={{ duration: 0.2 }}
						className="absolute top-full right-0 md:left-0 w-full mt-2 min-w-[200px] sm:min-w-[240px] bg-[#1e1e2e]/95 backdrop-blur-xl rounded-md border border-[#313244] shadow-2xl py-2 z-50"
					>
						<div className="px-2 pb-1 mb-1 border-b border-gray-800/50">
							<p className="text-xs font-medium text-gray-400 px-2">
								{t("selectedLang")}
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
											currentLanguage.id === t.id
												? "bg-blue-500/10 text-blue-400"
												: "text-gray-300",
										)}
										onClick={() => {
											setLanguage(t.id);
											setOpen(false);
										}}
										// disabled={isLocked}
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
												language === t.id
													? "bg-blue-500/10 text-blue-400"
													: "bg-gray-800/50 text-gray-400",
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

										{language === t.id && (
											<motion.div
												className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
												transition={{
													type: "spring",
													bounce: 0.2,
													duration: 0.6,
												}}
											/>
										)}
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

export default LanguageSelector;
