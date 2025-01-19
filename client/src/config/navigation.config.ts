import { GoHomeFill } from "react-icons/go";
import { MdOutlinePlayCircleFilled, MdTextSnippet } from "react-icons/md";
import { PiStarFourFill } from "react-icons/pi";

export const dataNavigation = [
	{
		label: "Trang chủ",
		link: "/",
		icon: GoHomeFill,
	},
	{
		label: "Khám phá",
		link: "/snippets",
		icon: MdTextSnippet,
	},
	{
		label: "Chạy mã",
		link: "/editor",
		icon: MdOutlinePlayCircleFilled,
	},
	// {
	// 	label: "Hỏi đáp",
	// 	link: "/help",
	// 	icon: MdOutlineHelp,
	// },
	{
		label: "AI",
		link: "/ai",
		icon: PiStarFourFill,
	},
];
