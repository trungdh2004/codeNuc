import CodeBlock from "@/components/comment/CodeBlock";
import { BackgroundLines } from "@/components/common/BackgroundLine";
import { Bot, Code, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import SliderInfinite from "@/components/home/SliderInfinite";
import { Link } from "react-router-dom";
import { MdTextSnippet } from "react-icons/md";
import { useTranslation } from "react-i18next";

const code = `
// JavaScript Playground
const numbers = [1, 2, 3, 4, 5];

// Map numbers to their squares
const squares = numbers.map(n => n * n);
console.log('Original numbers:', numbers);
console.log('Squared numbers:', squares);

// Filter for even numbers
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evenNumbers);

// Calculate sum using reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum of numbers:', sum);
`;

const HomePage = () => {
	const { t } = useTranslation();

	return (
		<div className="max-w-7xl py-8 mx-auto h-full px-4 overflow-x-hidden">
			<section className="flex items-center justify-center lg:justify-between h-[80vh] lg:h-auto relative pb-10">
				<BackgroundLines className="absolute h-full bg-transparent -z-1">
					<div></div>
				</BackgroundLines>
				<div className="flex flex-col gap-2 max-w-2xl relative items-center lg:items-start">
					<motion.div
						initial={{
							opacity: 0,
							x: -8,
						}}
						animate={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							duration: 0.5,
						}}
					>
						<h1
							className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r
                 from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text text-center lg:text-start my-4"
						>
							{t("home.title")}
						</h1>
					</motion.div>
					<motion.div
						className="max-w-xl"
						initial={{
							opacity: 0,
							x: -8,
						}}
						animate={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							duration: 0.5,
							delay: 0.2,
						}}
					>
						<h3 className="text-base sm:text-lg md:text-xl text-center lg:text-start">
							{t("home.description")}
						</h3>
					</motion.div>

					<motion.div
						initial={{
							opacity: 0,
							x: -8,
						}}
						animate={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							duration: 0.5,
							delay: 0.4,
						}}
					>
						<Link to={"/editor"}>
							<div
								className="relative group inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-gray-300 bg-gray-800/50 
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden cursor-pointer mt-4"
							>
								<div
									className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
								/>
								<Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
								<span
									className="text-base font-medium relative z-10 group-hover:text-white
                 transition-colors bg-gradient-to-r
                 from-blue-400 via-blue-300 to-purple-400 bg-clip-text text-transparent"
								>
									{t("home.start")}
								</span>
							</div>
						</Link>
					</motion.div>
				</div>
				<motion.div
					className=" hidden lg:block max-w-xl relative group"
					initial={{
						opacity: 0,
						x: 8,
					}}
					animate={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						duration: 0.5,
						delay: 0.1,
					}}
				>
					<div
						className="absolute inset-y-2 -inset-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-100 
              group-hover:opacity-100 transition-all duration-500 blur-xl"
					></div>
					<CodeBlock language="javascript" code={code} />
				</motion.div>
			</section>

			<SliderInfinite />

			<div className=" relative py-10 w-full">
				<div className="w-full flex flex-col gap-4 items-center">
					<motion.h1
						initial={{
							y: 20,
							opacity: 0,
						}}
						whileInView={{
							y: 0,
							opacity: 1,
						}}
						transition={{
							duration: 0.7,
						}}
						className="text-3xl text-center font-semibold w-full"
					>
						{t("home.main")}
					</motion.h1>
					<motion.p
						initial={{
							x: 20,
							opacity: 0,
						}}
						whileInView={{
							y: 0,
							opacity: 1,
						}}
						transition={{
							duration: 0.7,
						}}
						className="text-sm md:text-base text-center text-gray-500 max-w-xl"
					>
						{t("home.mainDescription")}
					</motion.p>
				</div>

				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
					<motion.div
						initial={{
							x: -10,
						}}
						whileInView={{
							x: 0,
						}}
						transition={{
							duration: 0.3,
						}}
						className="w-full relative"
					>
						<Link
							to={"/snippets"}
							className="w-full p-4 md:p-6 rounded-md border border-gray-500/50 shadow-md shadow-gray-500/50 flex flex-col hover:border-blue-500/50 relative group"
						>
							<div
								className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
                group-hover:opacity-100 transition-all duration-500 blur-xl"
							/>
							<div className="">
								<MdTextSnippet className="size-6 sm:size-8 md:size-10 " />
							</div>
							<h2 className="mt-4 text-base md:text-lg font-bold text-gray-200">
								{t("home.title1Primary")}
							</h2>
							<p className="text-sm md:text-base text-gray-400">
								{t("home.description1Primary")}
							</p>
						</Link>
					</motion.div>
					<motion.div
						initial={{
							x: -10,
						}}
						whileInView={{
							x: 0,
						}}
						transition={{
							duration: 0.3,
						}}
					>
						<Link
							to={"/editor"}
							className="w-full p-6 rounded-md border border-gray-500/50 shadow-md shadow-gray-500/50 flex flex-col hover:border-blue-500/50 relative group"
						>
							<div
								className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
                group-hover:opacity-100 transition-all duration-500 blur-xl"
							/>
							<div className="">
								<Code className="size-6 sm:size-8 md:size-10 " />
							</div>
							<h2 className="mt-4 text-base md:text-lg font-bold text-gray-200">
								{t("home.title2Primary")}
							</h2>
							<p className="text-sm md:text-base text-gray-400">
								{t("home.description2Primary")}
							</p>
						</Link>
					</motion.div>

					<motion.div
						initial={{
							x: -10,
						}}
						whileInView={{
							x: 0,
						}}
						transition={{
							duration: 0.3,
						}}
					>
						<Link
							to={"/ai"}
							className="w-full p-6 rounded-md border border-gray-500/50 shadow-md shadow-gray-500/50 flex flex-col hover:border-blue-500/50 relative group"
						>
							<div
								className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
                group-hover:opacity-100 transition-all duration-500 blur-xl"
							/>
							<div className="">
								<Bot className="size-6 sm:size-8 md:size-10 " />
							</div>
							<h2 className="mt-4 text-base md:text-lg font-bold text-gray-200">
								{t("home.title3Primary")}
							</h2>
							<p className="text-sm md:text-base text-gray-400">
								{t("home.description3Primary")}
							</p>
						</Link>
					</motion.div>
				</div>
			</div>

			<div className="py-10 w-full">
				<div className="flex flex-col items-center gap-4">
					<motion.h1
						initial={{
							y: 20,
							opacity: 0,
						}}
						whileInView={{
							y: 0,
							opacity: 1,
						}}
						transition={{
							duration: 0.7,
						}}
						className="text-3xl text-center font-semibold w-full"
					>
						{t("home.titleCode")}
					</motion.h1>
					<motion.p
						initial={{
							x: 20,
							opacity: 0,
						}}
						whileInView={{
							y: 0,
							opacity: 1,
						}}
						transition={{
							duration: 0.7,
						}}
						className="text-sm md:text-base text-center text-gray-500 max-w-xl"
					>
						{t("home.descriptionCode")}
					</motion.p>
				</div>
				<motion.div
					initial={{
						scale: 0.5,
					}}
					whileInView={{
						scale: 1,
					}}
					transition={{
						duration: 0.5,
					}}
					className="border border-gray-500/50 mt-8 rounded-md overflow-hidden"
				>
					<img src="/nucCode.png" alt="" className="object-contain" />
				</motion.div>
			</div>

			<div className="py-10 w-full">
				<div className="flex flex-col items-center gap-4">
					<motion.h1
						initial={{
							y: 20,
							opacity: 0,
						}}
						whileInView={{
							y: 0,
							opacity: 1,
						}}
						transition={{
							duration: 0.7,
						}}
						className="text-3xl text-center font-semibold w-full"
					>
						{t("home.titleAi")}
					</motion.h1>
					<motion.p
						initial={{
							x: 20,
							opacity: 0,
						}}
						whileInView={{
							y: 0,
							opacity: 1,
						}}
						transition={{
							duration: 0.7,
						}}
						className="text-sm md:text-base text-center text-gray-500 max-w-xl"
					>
						{t("home.descriptionAi")}
					</motion.p>
				</div>
				<motion.div
					initial={{
						scale: 0.5,
					}}
					whileInView={{
						scale: 1,
					}}
					transition={{
						duration: 0.5,
					}}
					className="border border-gray-500/50 mt-8  rounded-md overflow-hidden"
				>
					<img src="/screenAi.png" alt="" className="object-contain" />
				</motion.div>
			</div>
		</div>
	);
};

export default HomePage;
