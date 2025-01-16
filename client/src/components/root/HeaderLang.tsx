import { Blocks, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

import LanguageSelector from "./editor/LanguageSelector";
import ThemeSelector from "./editor/ThemeSelector";
import ButtonProfile from "../ButtonProfile";

const HeaderLang = () => {
	return (
		<div className="relative z-10">
			<div className="flex items-center lg:justify-between justify-center bg-[#0a0a0f]/80 backdrop-blur-xl py-2 px-6 mb-4 rounded-md">
				<div className="hidden lg:flex items-center gap-8">
					<Link to="/" className="flex items-center gap-3 group relative">
						{/* Logo hover effect */}

						<div
							className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
                group-hover:opacity-100 transition-all duration-500 blur-xl"
						/>

						{/* Logo */}
						<div
							className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
              ring-white/10 group-hover:ring-white/20 transition-all"
						>
							<Blocks className="size-5 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
						</div>

						<div className="flex flex-col">
							<span className="block text-base font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
								CodeNuc
							</span>
							<span className="block text-[10px] text-blue-400/60 font-medium">
								Trình soạn mã code
							</span>
						</div>
					</Link>

					{/* Navigation */}
					<nav className="flex items-center space-x-1">
						<Link
							to="/snippets"
							className="relative group flex items-center gap-2 px-2 py-1.5 rounded-md text-gray-300 bg-gray-800/50 
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
						>
							<div
								className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
							/>
							<Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
							<span
								className="text-xs font-medium relative z-10 group-hover:text-white
                 transition-colors"
							>
								Khám phá
							</span>
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex items-center gap-3">
						<ThemeSelector />
						<LanguageSelector />
					</div>

					<div className="pl-3 border-l border-gray-800">
						<ButtonProfile />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderLang;
