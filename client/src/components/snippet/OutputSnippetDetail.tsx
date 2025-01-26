import { AlertTriangle, CheckCircle, Clock, Terminal } from "lucide-react";
import CopyButton from "../CopyButton";
import { RunningCodeSkeleton } from "../root/editor/OutputPanel";
import { useTranslation } from "react-i18next";

interface IProps {
	isRunning: boolean;
	output: string;
	error: null | string;
}
const OutputSnippetDetail = ({ isRunning, output, error }: IProps) => {
	const { t } = useTranslation();
	const hasContent = error || output || null;
	return (
		<div className="md:col-span-2 relative bg-[#181825] rounded-md  ring-gray-800/50 ">
			<div className="flex items-center justify-between px-5 py-4 border-b border-blue-500/10">
				<div className="flex items-center gap-2">
					<div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
						<Terminal className="w-4 h-4 text-blue-400" />
					</div>
					<span className="text-sm font-medium text-gray-300">
						{t("output")}
					</span>
				</div>

				<div className="flex items-center gap-2">
					{hasContent && <CopyButton code={hasContent} />}
				</div>
			</div>

			{/* Output Area */}
			<div className="relative min-h-60 md:h-[500px] p-4">
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
							<pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
						</div>
					) : (
						<div className="h-full flex flex-col items-center justify-center text-gray-500">
							<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
								<Clock className="w-6 h-6" />
							</div>
							<p className="text-center">
								Chạy mã của bạn để xem kết quả ở đây...
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default OutputSnippetDetail;
