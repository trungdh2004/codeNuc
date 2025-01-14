import HeaderNavigation from "@/components/HeaderNavigation";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
	return (
		<div className="antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col">
			<HeaderNavigation />
			<div className="flex-1 h-full w-full">
				<Outlet />
			</div>
		</div>
	);
};

export default RootLayout;
