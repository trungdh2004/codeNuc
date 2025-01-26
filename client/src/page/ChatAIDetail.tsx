import ChatDetailSkeleton from "@/components/chatDetail/ChatDetailSkeleton";
import Conversation from "@/components/chatDetail/Conversation";
import HeaderAi from "@/components/chatDetail/HeaderAi";
import CopyButton from "@/components/CopyButton";
import { RunningCodeSkeleton } from "@/components/root/editor/OutputPanel";
import CodePaineSnippetDetail from "@/components/snippet/CodePaineSnippetDetail";
import { LANGUAGE_CONFIG } from "@/constants/language";
import { cn } from "@/lib/utils";
import { findByRoomApi } from "@/services/gemini.service";
import { MonacoEditor } from "@/types";
import { RoomResponse } from "@/types/gemini.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
	AlertTriangle,
	CheckCircle,
	Clock,
	Loader,
	Terminal,
} from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ChatAIDetail = () => {
	const { id } = useParams();
	const { isLoading, error } = useQuery<RoomResponse>({
		queryKey: ["findByRoom", id],
		queryFn: async () => {
			const { data } = await findByRoomApi(id as string);
			return data;
		},
	});
	const { t } = useTranslation();
	const [output, setOutput] = useState<{
		isRunning: boolean;
		error: string | null;
		output: string;
	}>({
		isRunning: false,
		error: null,
		output: "",
	});
	const [loadingAI, setLoadingAI] = useState(false);
	const editorRef = useRef<MonacoEditor | null>(null);
	const [language, setLanguage] = useState("javascript");

	const handleSetCode = (code: string, language: string) => {
		if (editorRef.current) {
			editorRef.current.setValue(code);
			setLanguage(language);
		}
	};

	const onMount = (editor: MonacoEditor) => {
		editorRef.current = editor;
	};

	if (isLoading) {
		return <ChatDetailSkeleton />;
	}

	if (error) {
		toast.error("Có lỗi xảy ra ");
		return <Navigate to="/404" />;
	}

	const handleRunCode = async () => {
		try {
			const code = editorRef.current?.getValue();
			if (!code) {
				return;
			}

			setOutput({
				isRunning: true,
				error: null,
				output: "",
			});
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

			if (data.message) {
				setOutput({
					error: data.message,
					output: "",
					isRunning: false,
				});
			}

			if (data.run && data.run.code !== 0) {
				const err = data.run.stderr || data.run.stdout;
				setOutput({
					error: err,
					output: "",
					isRunning: false,
				});

				return;
			}

			setOutput({
				error: null,
				output: data.run.output,
				isRunning: false,
			});
		} catch (error: unknown) {
			console.log("err", error);
			const err = error as Error;
			setOutput({
				isRunning: false,
				error: err.message,
				output: "",
			});
		}
	};

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(editorRef.current?.getValue() || "")
			.then(() => {
				{
					toast.success("Copied to clipboard");
				}
			});
	};

	return (
		<div className="w-full min-h-screen h-full flex-col">
			<title>AI thông minh - CodeNuc</title>
			<meta
				property="description"
				content="Với AI Gemini giúp hỗ trợ tạo các mã nguồn theo yêu cầu người dùng nhiều ngôn ngữ tự chọn"
			/>
			<meta
				property="keywords"
				content="CodeNuc,mã nguồn, chạy trực tuyến, runtimes,javascript,"
			/>
			<meta
				property="og:image"
				content="https://res.cloudinary.com/dundmo7q8/image/upload/v1737365822/codeNuc/code_qfzeet.png"
			/>
			<meta property="og:url" content="https://codenuc.vercel.app/editor" />
			<meta property="og:type" content="website" />
			<HeaderAi />

			<div className="px-2 sm:px-4 md:px-6 w-full mx-auto flex-1 h-full py-4">
				<div className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-6">
					<Conversation
						id={id as string}
						handleSetCode={handleSetCode}
						handleLoading={(is) => setLoadingAI(is)}
						isLoadingAi={loadingAI}
					/>
					<div className="col-span-1 md:col-span-7 flex flex-col min-h-[85vh] md:max-h-[85vh] border border-gray-500/50 rounded-md relative">
						<div
							className={cn(
								"absolute inset-0 bg-black/50 items-center justify-center z-10 hidden",
								loadingAI && "flex",
							)}
						>
							<Loader size={20} className="text-gray-500 animate-spin" />
						</div>
						<div className="w-full h-3/5">
							<CodePaineSnippetDetail
								language={language}
								code={editorRef.current?.getValue() || ""}
								onMount={onMount}
								handleRunCode={handleRunCode}
								isRunning={output.isRunning}
								isEditor
								height="100%"
								copyToClipboard={copyToClipboard}
							/>
						</div>
						<div className="w-full  rounded-b-sm h-2/5  bg-[#121218] border-t border-blue-500/50 ">
							<div className="relative bg-[#181825] rounded-md  ring-gray-800/50 flex flex-col h-full">
								<div className="flex items-center justify-between p-2 border-b border-blue-500/10">
									<div className="flex items-center gap-2">
										<div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
											<Terminal className="w-4 h-4 text-blue-400" />
										</div>
										<span className="text-sm font-medium text-gray-300">
											Output
										</span>
									</div>

									<div className="flex items-center gap-2">
										<CopyButton code={output.error || output.output} />
									</div>
								</div>

								<div className="p-2 flex-1 w-full h-full">
									{output.isRunning ? (
										<RunningCodeSkeleton />
									) : output.error ? (
										<div className="flex h-full items-start gap-3 text-red-400 overflow-hidden">
											<AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
											<div className="space-y-1 md:max-h-44 overflow-y-auto scroll-style">
												<div className="font-medium">{t("failure")}</div>
												<pre className="whitespace-pre-wrap text-red-400/80">
													{output.error}
												</pre>
											</div>
										</div>
									) : output.output ? (
										<div className="space-y-2">
											<div className="flex text-sm items-center gap-2 text-emerald-400 mb-3">
												<CheckCircle className="w-5 h-5" />
												<span className="font-medium">{t("success")}</span>
											</div>
											<pre className="whitespace-pre-wrap text-gray-300 text-sm">
												{output.output}
											</pre>
										</div>
									) : (
										<div
											className="relative flex-1 bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
        rounded-xl p-2 overflow-auto font-mono text-sm h-full scroll-style"
										>
											<div className="h-full flex flex-col items-center justify-center text-gray-500">
												<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
													<Clock className="w-6 h-6" />
												</div>
												<p className="text-center">{t("outPanel.notRun")}</p>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatAIDetail;
