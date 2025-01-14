import { cn } from "@/lib/utils";
import { Blocks } from "lucide-react";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(
				"relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all",
				className,
			)}
		>
			<Blocks className="w-6 h-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
		</div>
	);
};

export default Logo;
