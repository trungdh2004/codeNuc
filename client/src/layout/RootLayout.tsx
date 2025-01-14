import { Outlet } from "react-router-dom";
const RootLayout = () => {
	return (
		<div className="antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col">
			<Outlet />
		</div>
	);
};

export default RootLayout;
