import TooltipComponent from "@/components/common/TooltipComponent";
import { LANGUAGE_CONFIG } from "@/constants/language";
import { defineMonacoThemes } from "@/constants/theme";
import { useCodeEditorStore } from "@/store/useCodeEditor.store";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import { Copy, Loader2, PlayIcon, RotateCcwIcon, TypeIcon } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const CodePanel = () => {
	const {
		language,
		theme,
		fontSize,
		editor,
		setFontSize,
		setEditor,
		getCode,
		runCode,
		isRunning,
	} = useCodeEditorStore();
	const { t } = useTranslation();
	useEffect(() => {
		const savedCode = localStorage.getItem(`editor-code-${language}`);
		const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
		if (editor) editor.setValue(newCode);
	}, [language]);

	useEffect(() => {
		const savedFontSize = localStorage.getItem(`editor-font-size`);

		if (savedFontSize) setFontSize(parseInt(savedFontSize));
	}, [setFontSize]);

	const handleRefresh = () => {
		const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
		if (editor) editor.setValue(defaultCode);
		localStorage.removeItem(`editor-code-${language}`);
	};
	const handleEditorChange = (value: string | undefined) => {
		if (value) localStorage.setItem(`editor-code-${language}`, value);
	};
	const handleFontSizeChange = (value: number) => {
		const size = Math.min(Math.max(value, 12), 24);
		setFontSize(size);
	};

	const handleClipboard = () => {
		if (navigator.clipboard) {
			console.log("getCOde", {
				get: getCode(),
				editor: editor?.getValue(),
				editorType: editor,
			});

			navigator.clipboard.writeText(getCode()).then(() => {
				toast.success("Đã lưu mã code vào Clipboard");
			});
		}
	};

	return (
		<div className="relative h-full">
			<div className="relative bg-[#12121a]/90 backdrop-blur rounded-md border border-white/[0.05] p-2 md:p-4 h-full flex flex-col min-h-[500px]">
				<div className="w-full flex flex-col gap-2 md:flex-row items-start md:items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<div className="flex items-center justify-center size-6  bg-[#1e1e2e] rounded-sm overflow-hidden">
							<img
								src={"/" + language + ".png"}
								alt=""
								className="w-full h-full object-cover"
							/>
						</div>
						<div>
							<p className="text-xs text-white">
								{LANGUAGE_CONFIG[language].label}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						{/* Font Size Slider */}
						<div className="flex items-center gap-3 px-3 py-1 bg-[#1e1e2e] rounded-md ring-1 ring-white/5">
							<TypeIcon className="size-[14px] text-gray-400" />
							<div className="flex items-center gap-2">
								<input
									type="range"
									min="12"
									max="24"
									value={fontSize}
									onChange={(e) => {
										handleFontSizeChange(parseInt(e.target.value));
									}}
									className="w-16 md:w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
								/>
								<span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center">
									{fontSize}
								</span>
							</div>
						</div>
						<TooltipComponent label={t("reset")}>
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleRefresh}
								className="p-1.5 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-md ring-1 ring-white/5 transition-colors"
								aria-label="Reset to default code"
							>
								<RotateCcwIcon className="size-4 text-gray-400" />
							</motion.button>
						</TooltipComponent>

						<TooltipComponent label={t("copy")}>
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleClipboard}
								className="p-1.5 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-md ring-1 ring-white/5 transition-colors"
								aria-label="Reset to default code"
							>
								<Copy className="size-4 text-gray-400" />
							</motion.button>
						</TooltipComponent>

						{/* Share Button */}
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => {
								runCode();
							}}
							disabled={isRunning}
							className="inline-flex items-center gap-2 px-4  py-2 sm:py-1.5 rounded-lg overflow-hidden bg-gradient-to-r
               from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity"
						>
							{isRunning ? (
								<Loader2 className="size-[14px] text-white animate-spin" />
							) : (
								<PlayIcon className="size-[14px] text-white" />
							)}
							<span className="text-xs hidden sm:block font-medium text-white ">
								{t("run")}
							</span>
						</motion.button>
					</div>
				</div>

				{/* editor */}
				<div className="relative group rounded-md overflow-hidden ring-1 ring-white/5 flex-1">
					<Editor
						height={"100%"}
						language={LANGUAGE_CONFIG[language].monacoLanguage}
						theme={theme}
						beforeMount={defineMonacoThemes}
						onMount={(editor) => {
							console.log("editor", editor);
							setEditor(editor);
						}}
						onChange={handleEditorChange}
						// defaultValue={getCode()}
						options={{
							minimap: { enabled: false },
							fontSize: fontSize,
							padding: {
								bottom: 8,
								top: 8,
							},
							automaticLayout: true,
							scrollBeyondLastLine: false,
							renderWhitespace: "selection",
							fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
							fontLigatures: true,
							cursorBlinking: "smooth",
							smoothScrolling: true,
							contextmenu: true,
							renderLineHighlight: "all",
							lineHeight: 1.6,
							letterSpacing: 0.5,
							roundedSelection: true,
							scrollbar: {
								verticalScrollbarSize: 8,
								horizontalScrollbarSize: 8,
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default CodePanel;
