import RootLayout from "@/layout/RootLayout";
import AiPage from "@/page/AiPage";
import ChatAIDetail from "@/page/ChatAIDetail";
import EditorLang from "@/page/EditorLang";
import HomePage from "@/page/HomePage";
import ProfilePage from "@/page/ProfilePage";
import SettingPage from "@/page/SettingPage";
import SnippetDetail from "@/page/SnippetDetail";
import SnippetsPage from "@/page/SnippetsPage";
import TestPage from "@/page/TestPage";

const RootRouter = [
	{
		path: "",
		element: <RootLayout />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "/snippets", element: <SnippetsPage /> },
			{ path: "/snippets/:id", element: <SnippetDetail /> },
			{ path: "/ai", element: <AiPage /> },
			{ path: "/profile", element: <ProfilePage /> },
			{ path: "/setting", element: <SettingPage /> },
			{ path: "/tests", element: <TestPage /> },
		],
	},
	{ path: "/editor", element: <EditorLang /> },
	{ path: "/ai/:id", element: <ChatAIDetail /> },
	{ path: "*", element: <div>Not found</div> },
];

export default RootRouter;
