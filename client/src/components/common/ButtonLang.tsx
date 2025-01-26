import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const ButtonLang = () => {
	const { i18n } = useTranslation();
	return (
		<div className="flex p-1 rounded-sm bg-gray-500/10 gap-1">
			<button
				className={cn(
					"text-xs flex items-center justify-center  hover:bg-gray-500/30 rounded-sm size-6",
					i18n.language === "en" && "bg-blue-500/30",
				)}
				onClick={() => {
					i18n.changeLanguage("en");
				}}
			>
				EN
			</button>
			<button
				className={cn(
					"text-xs flex items-center justify-center  hover:bg-gray-500/30 rounded-sm size-6",
					i18n.language === "vi" && "bg-blue-500/30",
				)}
				onClick={() => {
					i18n.changeLanguage("vi");
				}}
			>
				VI
			</button>
		</div>
	);
};

export default ButtonLang;
