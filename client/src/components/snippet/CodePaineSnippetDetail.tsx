import { Code, Loader2, PlayIcon } from "lucide-react";
import TooltipComponent from "../common/TooltipComponent";
import { motion } from "framer-motion";
import CopyButton from "../CopyButton";
import { Editor } from "@monaco-editor/react";
import { LANGUAGE_CONFIG } from "@/constants/language";
import { defineMonacoThemes } from "@/constants/theme";
import { MonacoEditor } from "@/types";

interface IProps {
	language: string;
	code: string;
	onMount: (editor: MonacoEditor) => void;
	handleRunCode: () => void;
	isRunning: boolean;
}
const CodePaineSnippetDetail = ({
	language,
	code,
	onMount,
	handleRunCode,
	isRunning,
}: IProps) => {
	return (
		<div className=" rounded-md overflow-hidden border border-[#ffffff0a] bg-[#121218] md:col-span-3">
			<div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ffffff0a]">
				<div className="flex items-center gap-2 text-[#808086]">
					<Code className="w-4 h-4" />
					<span className="text-sm font-medium">Source Code</span>
				</div>

				<div className="flex items-center gap-2">
					<TooltipComponent label="Copy mã code">
						<CopyButton code="" />
					</TooltipComponent>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={handleRunCode}
						disabled={isRunning}
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg overflow-hidden bg-gradient-to-r
               from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity"
					>
						{isRunning ? (
							<Loader2 className="size-[14px] text-white animate-spin" />
						) : (
							<PlayIcon className="size-[14px] text-white" />
						)}
						<span className="text-xs font-medium text-white ">Chạy</span>
					</motion.button>
				</div>
				{/* <CopyButton code={snippet.code} /> */}
			</div>
			<Editor
				height="500px"
				language={LANGUAGE_CONFIG[language].monacoLanguage}
				value={code}
				theme="vs-dark"
				beforeMount={defineMonacoThemes}
				onMount={onMount}
				options={{
					minimap: { enabled: false },
					fontSize: 14,
					readOnly: false,
					automaticLayout: true,
					scrollBeyondLastLine: false,
					padding: { top: 16 },
					renderWhitespace: "selection",
					fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
					fontLigatures: true,
				}}
			/>
		</div>
	);
};

export default CodePaineSnippetDetail;
