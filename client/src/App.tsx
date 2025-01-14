import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootRouter from "./routers/RootRouter.routes";

function App() {
	const router = createBrowserRouter([...RootRouter]);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
