import RootLayout from "@/layout/RootLayout";
import AiPage from "@/page/AiPage";
import ChatAIDetail from "@/page/ChatAIDetail";
import EditorLang from "@/page/EditorLang";
import HomePage from "@/page/HomePage";
import ProfilePage from "@/page/ProfilePage";
import SnippetDetail from "@/page/SnippetDetail";
import SnippetsPage from "@/page/SnippetsPage";
import PrivateRouter from "./PrivateRouter";
import NotFound from "@/page/NotFound";

const RootRouter = [
	{
		path: "",
		element: <RootLayout />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "/snippets", element: <SnippetsPage /> },
			{ path: "/snippets/:id", element: <SnippetDetail /> },
			{ path: "/ai", element: <AiPage /> },
			{
				path: "/profile",
				element: (
					<PrivateRouter>
						<ProfilePage />{" "}
					</PrivateRouter>
				),
			},
		],
	},
	{ path: "/editor", element: <EditorLang /> },
	{
		path: "/ai/:id",
		element: (
			<PrivateRouter>
				<ChatAIDetail />
			</PrivateRouter>
		),
	},
	{ path: "*", element: <NotFound /> },
];

export default RootRouter;
