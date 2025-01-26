import RootLayout from "@/layout/RootLayout";
import AiPage from "@/page/AiPage";
import ChatAIDetail from "@/page/ChatAIDetail";
import EditorLang from "@/page/EditorLang";
import HomePage from "@/page/HomePage";
import SnippetDetail from "@/page/SnippetDetail";
import SnippetsPage from "@/page/SnippetsPage";
import PrivateRouter from "./PrivateRouter";
import NotFound from "@/page/NotFound";
import BlogsPage from "@/page/BlogsPage";
import ProfilePage from "@/page/profile/ProfilePage";
import BookmarkPage from "@/page/profile/BookmarkPage";
import { Outlet } from "react-router-dom";

const RootRouter = [
	{
		path: "",
		element: <RootLayout />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "/snippets", element: <SnippetsPage /> },
			{ path: "/blogs", element: <BlogsPage /> },
			{ path: "/snippets/:id", element: <SnippetDetail /> },
			{ path: "/ai", element: <AiPage /> },
			{
				path: "/me",
				element: (
					<PrivateRouter>
						<Outlet />
					</PrivateRouter>
				),
				children: [
					{
						path: "profile",
						element: <ProfilePage />,
					},
					{
						path: "bookmark",
						element: <BookmarkPage />,
					},
				],
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
