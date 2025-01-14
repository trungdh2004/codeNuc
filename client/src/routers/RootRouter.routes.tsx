import RootLayout from "@/layout/RootLayout";
import EditorLang from "@/page/EditorLang";
import HomePage from "@/page/HomePage";

const RootRouter = [
	{ path: "*", element: <div>Not found</div> },

	{
		path: "",
		element: <RootLayout />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "/editor", element: <EditorLang /> },
		],
	},
];

export default RootRouter;
