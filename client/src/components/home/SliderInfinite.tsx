import { animate, useMotionValue } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const data = [
	{
		label: "JavaScript",
		imagePath: "/javascript.png",
	},
	{
		label: "TypeScript",
		imagePath: "/typescript.png",
	},
	{
		label: "Python",
		imagePath: "/python.png",
	},
	{
		label: "Java",
		imagePath: "/java.png",
	},
	{
		label: "Go",
		imagePath: "/go.png",
	},
	{
		label: "Rust",
		imagePath: "/rust.png",
	},
	{
		label: "C++",
		imagePath: "/cpp.png",
	},
	{
		label: "C#",
		imagePath: "/csharp.png",
	},
	{
		label: "Ruby",
		imagePath: "/ruby.png",
	},
	{
		label: "Swift",
		imagePath: "/swift.png",
	},
];

const SliderInfinite = () => {
	const xTransition = useMotionValue(0);
	const divRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let controls;
		if (divRef.current) {
			const finalPosition = -divRef.current?.scrollWidth / 2 - 8;

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			controls = animate(xTransition, [0, finalPosition], {
				ease: "linear",
				duration: 25,
				repeat: Infinity,
				repeatType: "loop",
				repeatDelay: 0,
			});
		}
	}, [xTransition]);
	return (
		<section className="flex  w-full py-10 overflow-hidden">
			<motion.div
				className=" h-20 flex gap-4 relative left-0"
				ref={divRef}
				style={{ x: xTransition }}
			>
				{[...data, ...data].map((item) => (
					<div
						className="w-40 px-4 flex items-center justify-center gap-2  rounded-sm"
						key={item.label}
					>
						<div className="size-10 border p-1.5 border-gray-500/50 rounded-sm">
							<img
								src={item.imagePath}
								alt=""
								className="w-full h-full object-cover"
							/>
						</div>
						<span className="text-white text-base font-semibold">
							{item.label}
						</span>
					</div>
				))}
			</motion.div>
		</section>
	);
};

export default SliderInfinite;
