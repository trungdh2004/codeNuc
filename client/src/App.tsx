import { Helmet } from "react-helmet";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoadingModel from "./components/LoadingModel";
import LoginModel from "./components/LoginModel";
import RootRouter from "./routers/RootRouter.routes";

function App() {
	const router = createBrowserRouter([...RootRouter]);

	return (
		<>
			<Helmet>
				<title>CodeNuc</title>
				<meta
					name="description"
					content="CodeNuc trang web hỗ trợ chạy trực tuyến mã nguồn nhiều ngôn ngữ"
				/>
				<meta
					name="keywords"
					content="CodeNuc,Runtimes,language,javascript,python,go,java,ai,snippets,programming"
				/>
				<meta
					property="og:image"
					content="https://res.cloudinary.com/dundmo7q8/image/upload/v1737365825/codeNuc/%E1%BA%A2nh_ch%E1%BB%A5p_m%C3%A0n_h%C3%ACnh_2025-01-20_163331_jtzot0.png"
				/>
				<meta property="og:url" content="https://codenuc.vercel.app/" />
				<meta property="og:type" content="website" />
			</Helmet>
			<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100">
				<RouterProvider router={router} />
				<LoginModel />
				<LoadingModel />
			</div>
		</>
	);
}

export default App;
