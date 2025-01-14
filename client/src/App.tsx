import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootRouter from "./routers/RootRouter.routes";

function App() {
	const router = createBrowserRouter([...RootRouter]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
