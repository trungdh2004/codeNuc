import TooltipComponent from "@/components/common/TooltipComponent";
import { useCodeEditorStore } from "@/store/useCodeEditor.store";
import {
	AlertTriangle,
	CheckCircle,
	CircleHelp,
	Clock,
	Copy,
	ForwardIcon,
	Terminal,
} from "lucide-react";
import { useState } from "react";
import ShareCodeDialog from "./ShareCodeDialog";
import { useAuthContext } from "@/context/AuthProvider";
import useModelLogin from "@/store/useModelLogin";
import { useTranslation } from "react-i18next";

const OutputPanel = () => {
	const { isLoggedIn } = useAuthContext();
	const { setOpen } = useModelLogin();
	const { output, error, isRunning } = useCodeEditorStore();
	const [isCopied, setIsCopied] = useState(false);
	const [isShare, setShare] = useState(false);
	// const [isQuestion, setQuestion] = useState(false);
	const { t } = useTranslation();
	const hasContent = error || output;

	const handleCopy = async () => {
		if (!hasContent) return;
		await navigator.clipboard.writeText(error || output);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<>
			<div className="w-full h-full relative bg-[#181825] rounded-md p-4 ring-gray-800/50 flex flex-col">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
							<Terminal className="w-4 h-4 text-blue-400" />
						</div>
						<span className="text-sm font-medium text-gray-300">{t("output")}</span>
					</div>

					{hasContent && (
						<div className="flex items-center gap-2">
							<TooltipComponent label={t("copy")}>
								<button
									onClick={handleCopy}
									className="flex items-center gap-1.5 p-2 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
								>
									{isCopied ? (
										<>
											<CheckCircle className="w-3.5 h-3.5" />
										</>
									) : (
										<>
											<Copy className="w-3.5 h-3.5" />
										</>
									)}
								</button>
							</TooltipComponent>
							<TooltipComponent label={t("share")}>
								<button
									onClick={() => {
										if (!isLoggedIn) {
											setOpen();
											return;
										}
										setShare(true);
									}}
									className="flex items-center gap-1.5 p-2 text-xs text-white hover:text-gray-300 bg-gradient-to-r
               from-blue-500 to-blue-600 
            rounded-lg ring-1 ring-blue-800/50 hover:ring-gray-700/50 transition-all"
								>
									<ForwardIcon className="w-3.5 h-3.5" />
								</button>
							</TooltipComponent>
							<TooltipComponent label={t("question")}>
								<button
									onClick={handleCopy}
									className="flex items-center gap-1.5 p-2 text-xs text-white hover:text-gray-300 bg-gradient-to-r
               from-yellow-500 to-yellow-600 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
								>
									<CircleHelp className="w-3.5 h-3.5" />
								</button>
							</TooltipComponent>
						</div>
					)}
				</div>

				{/* Output Area */}
				<div className="relative flex-1 min-h-72">
					<div
						className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
        rounded-xl p-4 h-full overflow-auto font-mono text-sm"
					>
						{isRunning ? (
							<RunningCodeSkeleton />
						) : error ? (
							<div className="flex items-start gap-3 text-red-400">
								<AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
								<div className="space-y-1">
									<div className="font-medium">{t("failure")}</div>
									<pre className="whitespace-pre-wrap text-red-400/80">
										{error}
									</pre>
								</div>
							</div>
						) : output ? (
							<div className="space-y-2">
								<div className="flex items-center gap-2 text-emerald-400 mb-3">
									<CheckCircle className="w-5 h-5" />
									<span className="font-medium">{t("success")}</span>
								</div>
								<pre className="whitespace-pre-wrap text-gray-300">
									{output}
								</pre>
							</div>
						) : (
							<div className="h-full flex flex-col items-center justify-center text-gray-500">
								<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
									<Clock className="w-6 h-6" />
								</div>
								<p className="text-center">{t("outPanel.notRun")}</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<ShareCodeDialog
				open={isShare}
				handleClose={() => {
					setShare(false);
				}}
			/>
		</>
	);
};

export default OutputPanel;

export function RunningCodeSkeleton() {
	return (
		<div className="space-y-4 animate-pulse">
			<div className="space-y-2">
				<div className="h-4 bg-gray-800/50 rounded w-3/4" />
				<div className="h-4 bg-gray-800/50 rounded w-1/2" />
				<div className="h-4 bg-gray-800/50 rounded w-5/6" />
			</div>

			<div className="space-y-2 pt-4">
				<div className="h-4 bg-gray-800/50 rounded w-2/3" />
				<div className="h-4 bg-gray-800/50 rounded w-4/5" />
				<div className="h-4 bg-gray-800/50 rounded w-3/4" />
			</div>
		</div>
	);
}
