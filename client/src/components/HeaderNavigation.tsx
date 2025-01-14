import { Link } from "react-router-dom";
import Logo from "./Logo";

const HeaderNavigation = () => {
	return (
		<div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150">
			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
			<div className="max-w-7xl mx-auto px-4 lg:px-0">
				<div className="relative h-16 flex items-center justify-between">
					<div className="flex items-center gap-8">
						{/* Logo */}
						<Link to="/" className="flex items-center gap-3 group relative">
							{/* logo hover effect */}
							<div
								className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
              group-hover:opacity-100 transition-all duration-500 blur-xl"
							/>

							{/* Logo */}
							<Logo />

							<div className="relative">
								<span
									className="block text-lg font-semibold bg-gradient-to-r
                 from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text"
								>
									CodeNuc
								</span>
							</div>
						</Link>
					</div>

					<nav className="flex items-center gap-2 text-sm">
						<div className="text-">
							<span>Home</span>
						</div>
						<div className="text-">
							<span>PlayCode</span>
						</div>
					</nav>

					<div className="flex items-center gap-4">
						<div className="size-8 rounded-full bg-blue-500/50"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderNavigation;
