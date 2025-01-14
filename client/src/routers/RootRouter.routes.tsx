import RootLayout from "@/layout/RootLayout";
import EditorLang from "@/page/EditorLang";
import HomePage from "@/page/HomePage";
import SnippetDetail from "@/page/SnippetDetail";
import SnippetsPage from "@/page/SnippetsPage";

const RootRouter = [
	{
		path: "",
		element: <RootLayout />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "/snippets", element: <SnippetsPage /> },
			{ path: "/snippets/:id", element: <SnippetDetail /> },
		],
	},
	{ path: "/editor", element: <EditorLang /> },
	{ path: "*", element: <div>Not found</div> },
];

export default RootRouter;
