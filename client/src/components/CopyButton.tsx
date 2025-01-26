import { Check, Copy } from "lucide-react";
import { useState } from "react";
import TooltipComponent from "./common/TooltipComponent";
import { useTranslation } from "react-i18next";

function CopyButton({ code }: { code: string }) {
	const [copied, setCopied] = useState(false);
	const { t } = useTranslation();

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<TooltipComponent label={t("copy")}>
				<div
					onClick={copyToClipboard}
					className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group relative"
				>
					{copied ? (
						<Check className="size-4 text-green-400" />
					) : (
						<Copy className=" size-4 text-gray-400 group-hover:text-gray-300" />
					)}
				</div>
			</TooltipComponent>
		</>
	);
}

export default CopyButton;
