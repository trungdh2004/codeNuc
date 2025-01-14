import CodePanel from "@/components/root/editor/CodePanel";
import OutputPanel from "@/components/root/editor/OutputPanel";
import HeaderLang from "@/components/root/HeaderLang";

const EditorLang = () => {
	return (
		<div className="min-h-screen">
			<div className="max-w-[1800px] mx-auto p-4 flex flex-col min-h-screen">
				<HeaderLang />

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
					<CodePanel />
					<OutputPanel />
				</div>
			</div>
		</div>
	);
};

export default EditorLang;
