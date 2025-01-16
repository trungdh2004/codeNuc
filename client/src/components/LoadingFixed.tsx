import { motion } from "framer-motion";
import { Blocks } from "lucide-react";

const LoadingFixed = () => {
	return (
		<div className="w-full min-h-screen fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col gap-4 items-center justify-center">
			<div className="relative group">
				<div
					className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
              group-hover:opacity-100 transition-all duration-500 blur-xl"
				/>
				<motion.div
					className={
						"relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all"
					}
					animate={{
						scale: [1, 2, 2, 1, 1],
						rotate: [0, 0, 180, 180, 0],
						borderRadius: ["12px", "12px", "50%", "50%", "12px"],
					}}
					transition={{
						duration: 2,
						ease: "easeInOut",
						times: [0, 0.2, 0.5, 0.8, 1],
						repeat: Infinity,
						repeatDelay: 1,
					}}
				>
					<Blocks className="size-8 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
				</motion.div>
			</div>

			<div className="flex items-center gap-4 mt-10">
				<motion.div
					animate={{
						y: [0, 10, 0, -10, 0],
						opacity: [100, 80, 100, 80, 100],
					}}
					transition={{
						duration: 1,
						repeat: Infinity,
						repeatDelay: 0,
					}}
					className="size-5 bg-blue-500/50 border border-blue-500/50 rounded-full"
				></motion.div>
				<motion.div
					animate={{
						y: [-10, 0, 10, 0, -10],
						opacity: [100, 80, 100, 80, 100],
					}}
					transition={{
						duration: 1,
						repeat: Infinity,
						repeatDelay: 0,
					}}
					className="size-5 bg-blue-500/50 border border-blue-500/50 rounded-full"
				></motion.div>
				<motion.div
					animate={{
						y: [0, -10, 0, 10, 0],
						opacity: [100, 80, 100, 80, 100],
					}}
					transition={{
						duration: 1,
						repeat: Infinity,
						repeatDelay: 0,
					}}
					className="size-5 bg-blue-500/50 border border-blue-500/50 rounded-full"
				></motion.div>
				<motion.div
					animate={{
						y: [10, 0, -10, 0, 10],
						opacity: [100, 80, 100, 80, 100],
					}}
					transition={{
						duration: 1,
						repeat: Infinity,
						repeatDelay: 0,
					}}
					className="size-5 bg-blue-500/50 border border-blue-500/50 rounded-full"
				></motion.div>
			</div>
		</div>
	);
};

export default LoadingFixed;
