import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

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
		if (divRef.current) {
			const finalPosition = -divRef.current?.scrollWidth / 2 - 8;

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			animate(xTransition, [0, finalPosition], {
				ease: "linear",
				duration: 25,
				repeat: Infinity,
				repeatType: "loop",
				repeatDelay: 0,
			});
		}
	}, [xTransition]);
	return (
		<section className="flex w-full py-6 md:py-10 overflow-hidden">
			<motion.div
				className=" h-20 flex gap-4 relative left-0"
				ref={divRef}
				style={{ x: xTransition }}
			>
				{[...data, ...data].map((item) => (
					<div
						className="w-28 md:w-40 px-4 flex items-center justify-center gap-2  rounded-sm"
						key={item.label}
					>
						<div className="size-8 md:size-10 p-1.5  rounded-sm">
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
