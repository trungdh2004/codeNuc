import { THEMES } from "@/constants/theme";
import { useCodeEditorStore } from "@/store/useCodeEditor.store";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleOff, Github, Laptop, Moon, Palette, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const THEME_ICONS: Record<string, React.ReactNode> = {
	"vs-dark": <Moon size={14} />,
	"vs-light": <Sun size={14} />,
	"github-dark": <Github size={14} />,
	monokai: <Laptop size={14} />,
};

const ThemeSelector = () => {
	const [isOpen, setOpen] = useState(false);
	const { theme, setTheme } = useCodeEditorStore();
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const currentTheme = THEMES.find((t) => t.id === theme);

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
				className="relative w-40 group flex items-center gap-2 px-2.5 py-1.5 bg-[#1e1e2e]/80 hover:bg-[#262637] rounded-lg transition-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700 text-sm"
			>
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>

				<Palette
					size={16}
					className="text-gray-400 group-hover:text-gray-300 transition-colors"
				/>

				<span className="text-gray-300 min-w-20 text-left group-hover:text-white transition-colors text-xs">
					{currentTheme?.label}
				</span>

				<div
					className="relative size-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors"
					style={{
						background: currentTheme?.color,
					}}
				></div>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.96 }}
						transition={{ duration: 0.2 }}
						className="absolute top-full left-0 w-full mt-2 min-w-[240px] bg-[#1e1e2e]/95 backdrop-blur-xl rounded-md border border-[#313244] shadow-2xl py-2 z-50"
					>
						<div className="px-2 pb-1 mb-1 border-b border-gray-800/50">
							<p className="text-xs font-medium text-gray-400 px-2">
								Chọn theme
							</p>
						</div>

						{THEMES.map((t, index) => (
							<motion.button
								key={t.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: index * 0.1 }}
								className={cn(
									"relative group w-full flex items-center gap-3 px-2 py-1 hover:bg-[#262637] transition-all duration-200",
									theme === t.id
										? "bg-blue-500/10 text-blue-400"
										: "text-gray-300",
								)}
								onClick={() => setTheme(t.id)}
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
                flex items-center justify-center size-7 rounded-lg group-hover:scale-110 transition-all duration-200`,
										theme === t.id
											? "bg-blue-500/10 text-blue-400"
											: "bg-gray-800/50 text-gray-400",
									)}
								>
									{THEME_ICONS[t.id] || <CircleOff size={14} />}
								</div>
								{/* label */}
								<span className="flex-1 text-left group-hover:text-white transition-colors text-sm">
									{t.label}
								</span>

								{/* color indicator */}
								<div
									className="relative size-4 rounded-full border border-gray-600 
                group-hover:border-gray-500 transition-colors"
									style={{ background: t.color }}
								/>

								{/* active theme border */}
								{theme === t.id && (
									<motion.div
										className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
										transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
									/>
								)}
							</motion.button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ThemeSelector;
