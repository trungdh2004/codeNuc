import { Code, Copy, Loader2, PlayIcon } from "lucide-react";
import TooltipComponent from "../common/TooltipComponent";
import { motion } from "framer-motion";
import { Editor } from "@monaco-editor/react";
import { LANGUAGE_CONFIG } from "@/constants/language";
import { defineMonacoThemes } from "@/constants/theme";
import { MonacoEditor } from "@/types";
import { useTranslation } from "react-i18next";

interface IProps {
	language: string;
	code: string;
	onMount: (editor: MonacoEditor) => void;
	handleRunCode: () => void;
	isRunning: boolean;
	isEditor?: boolean;
	height?: string;
	copyToClipboard: () => void;
}
const CodePaineSnippetDetail = ({
	language,
	code,
	onMount,
	handleRunCode,
	isRunning,
	isEditor = false,
	height = "500px",
	copyToClipboard,
}: IProps) => {
	const { t } = useTranslation();
	return (
		<div className=" rounded-md overflow-hidden border h-full border-[#ffffff0a] bg-[#121218] md:col-span-3 flex flex-col">
			<div className="flex items-center justify-between px-4 md:px-6 py-2 border-b border-[#ffffff0a]">
				<div className="flex items-center gap-2 text-[#808086]">
					<Code className="w-4 h-4" />
				</div>

				<div className="flex items-center gap-2">
					<TooltipComponent label={t("copy")}>
						<div
							onClick={copyToClipboard}
							className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group relative"
						>
							<Copy className=" size-4 text-gray-400 group-hover:text-gray-300" />
						</div>
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
						<span className="text-xs font-medium text-white ">{t("run")}</span>
					</motion.button>
				</div>
				{/* <CopyButton code={snippet.code} /> */}
			</div>
			<div className="flex-1">
				<Editor
					height={height}
					language={LANGUAGE_CONFIG[language].monacoLanguage}
					value={code}
					theme="vs-dark"
					beforeMount={defineMonacoThemes}
					onMount={onMount}
					options={{
						minimap: { enabled: false },
						fontSize: 14,
						readOnly: !isEditor,
						automaticLayout: true,
						scrollBeyondLastLine: false,
						padding: { top: 16 },
						renderWhitespace: "selection",
						fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
						fontLigatures: true,
					}}
				/>
			</div>
		</div>
	);
};

export default CodePaineSnippetDetail;
