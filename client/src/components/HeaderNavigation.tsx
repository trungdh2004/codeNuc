import { dataNavigation } from "@/config/navigation.config";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import TooltipComponent from "./common/TooltipComponent";
import ButtonProfile from "./ButtonProfile";

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

					<nav className=" items-center gap-4 text-sm hidden md:flex">
						{dataNavigation.map((nav, index) => (
							<Link to={nav.link} className="" key={index}>
								<TooltipComponent
									label={nav.label}
									className="border border-gray-500/50"
								>
									<div
										className="relative group flex items-center justify-center size-9 rounded-full text-gray-300 bg-gray-800/50 
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
									>
										<span className="text-base font-semibold group-hover:text-blue-500">
											<nav.icon size={18} />
										</span>
									</div>
								</TooltipComponent>
							</Link>
						))}
					</nav>

					<div className="flex items-center gap-4">
						<ButtonProfile />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderNavigation;
