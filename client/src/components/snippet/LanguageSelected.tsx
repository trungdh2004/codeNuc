import { IValueLanguage, LANGUAGE_CONFIG } from "@/constants/language";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Tag } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface IProps {
	handleSelectedLanguage: (value: IValueLanguage[]) => void;
	listSelected: IValueLanguage[];
}

const LanguageSelected = ({ handleSelectedLanguage, listSelected }: IProps) => {
	const [isOpen, setOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const [selected, setSelected] = useState<IValueLanguage[]>([]);

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

	useEffect(() => {
		if (isOpen) {
			setSelected(listSelected);
		}
	}, [isOpen]);
	return (
		<div className="relative" ref={dropdownRef}>
			<div
				className="flex items-center gap-2 px-4 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800 cursor-pointer"
				onClick={() => {
					setOpen(!isOpen);
				}}
			>
				<Tag className="w-4 h-4 text-gray-400" />
				<span className="text-sm text-gray-400">Ngôn ngữ:</span>
			</div>
			<AnimatePresence>
				{isOpen && (
					<div className="fixed inset-0 w-full h-screen  z-[100] flex items-center justify-center px-2">
						<div
							className="absolute inset-0 bg-black/80 cursor-pointer z-0"
							onClick={() => {
								setOpen(false);
							}}
						></div>

						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 100 }}
							transition={{
								duration: 0.2,
							}}
							exit={{ scale: 0, opacity: 0 }}
							className="absolute w-full mt-2 max-w-md bg-[#1e1e2e]/95 backdrop-blur-xl rounded-md border border-[#313244] shadow-2xl py-2 z-50"
						>
							<div className="px-2 pb-1 mb-1 border-b border-gray-800/50">
								<p className="text-base font-medium text-gray-400 px-2">
									Chọn ngôn ngữ
								</p>
							</div>

							<div className="flex items-center gap-2 flex-wrap p-2">
								{Object.values(LANGUAGE_CONFIG).map((t) => {
									const isSelect = selected.some((value) => value.id === t.id);

									return (
										<button
											className={cn(
												"relative group  flex items-center gap-2 px-2 border border-gray-500/50 rounded-full py-1.5 hover:bg-[#262637] transition-all duration-200",
												isSelect ? "text-white bg-blue-600" : "text-gray-300",
											)}
											onClick={() => {
												if (isSelect) {
													setSelected((prev) => {
														const filter = prev.filter(
															(item) => item.id !== t.id,
														);
														return filter;
													});
												} else {
													setSelected((prev) => [...prev, t]);
												}
											}}
											key={t.id}
										>
											<div
												className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 
              group-hover:opacity-100 transition-opacity rounded-full"
											/>
											<div
												className={cn(
													`
                flex items-center justify-center size-6 rounded-full group-hover:scale-110 transition-all duration-200`,
													isSelect
														? "bg-blue-500/10 text-blue-400"
														: "bg-gray-800/50 text-gray-400",
												)}
											>
												<div
													className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full  
                        opacity-0 group-hover:opacity-100 transition-opacity"
												/>
												<img
													src={t.logoPath}
													alt=""
													className="w-full h-full object-cover rounded-md"
												/>
											</div>
											{/* label */}
											<span className="flex-1 text-left group-hover:text-white transition-colors text-xs">
												{t.label}
											</span>

											<span className="text-sm">
												<Plus
													size={14}
													className={cn(
														"transition-transform duration-200",
														isSelect && "rotate-45",
													)}
												/>
											</span>
										</button>
									);
								})}
							</div>
							<div className="px-2 pt-1 mt-1 border-t border-gray-800/50 flex justify-end items-center gap-2">
								<button
									className="px-2 py-1 rounded-sm   text-gray-400 text-sm hover:bg-gray-500/30"
									onClick={() => {
										setOpen(false);
									}}
								>
									Hủy
								</button>
								<button
									className="px-2 py-1 rounded-sm bg-blue-600 text-white text-sm hover:bg-blue-600/80"
									onClick={() => {
										handleSelectedLanguage(selected);
										setOpen(false);
									}}
								>
									Xác nhận
								</button>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default LanguageSelected;
