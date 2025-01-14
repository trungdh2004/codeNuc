import { LANGUAGE_CONFIG } from "@/constants/language";
import { CodeEditorState, MonacoEditor } from "@/types";
import { create } from "zustand";
import axios from "axios";

const getInitialState = () => {
	const savedLanguage = localStorage.getItem("editor-language") || "javascript";
	const theme = localStorage.getItem("editor-theme") || "vs-dark";
	const savedFontsize = localStorage.getItem("editor-fontsize") || 16;

	return {
		language: savedLanguage,
		theme,
		fontSize: Number(savedFontsize),
	};
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
	const initState = getInitialState();

	return {
		...initState,
		output: "",
		isRunning: false,
		error: null,
		editor: null,
		executionResult: null,
		getCode: () => get().editor?.getValue() || "",
		setEditor: (editor: MonacoEditor) => {
			const savedCode = localStorage.getItem(`editor-code-${get().language}`);
			if (savedCode) {
				editor.setValue(savedCode);
			}
			console.log("set Editor", editor);

			set({ editor });
		},
		setLanguage: (language: string) => {
			const currentCode = get().editor?.getValue();

			if (currentCode) {
				localStorage.setItem(`editor-code-${get().language}`, currentCode);
			}

			localStorage.setItem(`editor-language`, language);

			set({
				language,
				output: "",
				error: null,
			});
		},
		setTheme: (theme: string) => {
			localStorage.setItem(`editor-theme`, theme);

			set({
				theme,
			});
		},
		setFontSize: (fontSize: number) => {
			localStorage.setItem("editor-fontsize", `${fontSize}`);

			set({
				fontSize,
			});
		},
		runCode: async () => {
			const { language, getCode } = get();
			const code = getCode();

			if (!code) {
				set({ error: "Vui lòng nhập mã chạy" });
				return;
			}

			set({ isRunning: true, error: null, output: "" });

			try {
				const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
				const { data } = await axios.post(
					"https://emkc.org/api/v2/piston/execute",
					{
						...runtime,
						files: [
							{
								content: code,
							},
						],
					},
				);

				console.log("data", data);

				if (data.message) {
					set({
						error: data.message,
						executionResult: { code, output: "", error: data.message },
					});
				}

				if (data.run && data.run.code !== 0) {
					const err = data.run.stderr || data.run.stdout;
					set({
						error: err,
						output: "",
						executionResult: {
							code,
							output: "",
							error: err,
						},
					});

					return;
				}

				set({
					error: null,
					output: data.run.output,
					executionResult: {
						code,
						output: data.run.output,
						error: null,
					},
				});
			} catch (error: unknown) {
				console.log("error", error);
			} finally {
				set({ isRunning: false });
			}
		},
	};
});
