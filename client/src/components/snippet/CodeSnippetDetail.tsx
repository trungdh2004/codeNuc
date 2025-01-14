import { LANGUAGE_CONFIG } from "@/constants/language";
import { MonacoEditor } from "@/types";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "sonner";
import CodePaineSnippetDetail from "./CodePaineSnippetDetail";
import OutputSnippetDetail from "./OutputSnippetDetail";

interface IProps {
	language: string;
	code: string;
}
const CodeSnippetDetail = ({ language, code }: IProps) => {
	const [output, setOutput] = useState({
		isRunning: false,
		error: null,
		output: "",
	});
	const editorRef = useRef<MonacoEditor | null>(null);

	const handleRunCode = async () => {
		if (!editorRef.current) {
			toast.warning("Hệ thống đang lỗi xin vui lòng load lại web");
			return;
		}
		console.log("value", editorRef.current.getValue());
		setOutput((prev) => ({
			...prev,
			isRunning: true,
		}));
		const codeData = editorRef.current.getValue();
		try {
			const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
			const { data } = await axios.post(
				"https://emkc.org/api/v2/piston/execute",
				{
					...runtime,
					files: [
						{
							content: codeData,
						},
					],
				},
			);

			if (data.run && data.run.code !== 0) {
				const err = data.run.stderr || data.run.stdout;
				setOutput({
					error: err,
					output: "",
					isRunning: false,
				});
			} else {
				setOutput({
					error: null,
					output: data.run.output,
					isRunning: false,
				});
			}
		} catch (error: unknown) {
			console.log("error: ", error);
			setOutput((prev) => ({
				...prev,
				isRunning: false,
			}));
		}
	};

	const onMount = (editor: MonacoEditor) => {
		editorRef.current = editor;
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
			<CodePaineSnippetDetail
				language={language}
				code={code}
				onMount={onMount}
				handleRunCode={handleRunCode}
				isRunning={output.isRunning}
			/>
			<OutputSnippetDetail {...output} />
		</div>
	);
};

export default CodeSnippetDetail;
