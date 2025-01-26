import CodePanel from "@/components/root/editor/CodePanel";
import OutputPanel from "@/components/root/editor/OutputPanel";
import HeaderLang from "@/components/root/HeaderLang";
import { Helmet } from "react-helmet";

const EditorLang = () => {
	return (
		<div className="min-h-screen">
			<Helmet>
				<title>Trình chạy mã nguồn - CodeNuc</title>
				<meta
					property="description"
					content="Hỗ trợ chạy trực tuyến mã nguồn nhiều ngôn ngữ lập trình nổi bật hiện tại như: javascript,python,go,java ..."
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
			</Helmet>
			<div className="max-w-[1800px] mx-auto p-4 flex flex-col min-h-screen">
				<HeaderLang />

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 ">
					<CodePanel />
					<OutputPanel />
				</div>
			</div>
		</div>
	);
};

export default EditorLang;
