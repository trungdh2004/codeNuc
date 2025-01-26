import { LANGUAGE_CONFIG } from "@/constants/language";
import { Code } from "lucide-react";
import TooltipComponent from "../common/TooltipComponent";

interface IProps {
	message: string;
	language: string;
	avatar?: string;
	isAi: boolean;
	code?: string;
	handleCode?: (code: string, language: string) => void;
}

const MessageItem = ({
	message,
	language,
	avatar,
	isAi,
	code,
	handleCode,
}: IProps) => {
	return (
		<div className="p-3 rounded-lg mb-4 flex gap-2 items-center leading-7 bg-[#272727]/50 text-sm">
			{!isAi && !!avatar && (
				<div className="size-8 rounded-full overflow-hidden flex-shrink-0">
					<img src={avatar} className="w-full h-full object-cover" />
				</div>
			)}
			<div className="flex flex-col gap-2 flex-1">
				<p>{message}</p>

				{isAi && code && (
					<div className="flex justify-end">
						<TooltipComponent label={"Run"}>
							<button
								className="px-4 py-1 border border-gray-500/50 rounded-md flex items-center gap-2 hover:bg-gray-400/30"
								onClick={() => {
									if (handleCode) {
										handleCode(code, language);
									}
								}}
							>
								<Code size={16} />

								<div className="flex items-center text-gray-400 text-sm">
									{LANGUAGE_CONFIG[language].label}
								</div>
							</button>
						</TooltipComponent>
					</div>
				)}
			</div>
		</div>
	);
};

export default MessageItem;
