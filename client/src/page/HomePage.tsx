import CodeBlock from "@/components/comment/CodeBlock";
import { BackgroundLines } from "@/components/common/BackgroundLine";
import { Code2 } from "lucide-react";
import { motion } from "framer-motion";
import SliderInfinite from "@/components/home/SliderInfinite";

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
	return (
		<div className="max-w-7xl py-8 mx-auto h-full">
			<section className="flex items-center justify-between relative pb-10">
				<BackgroundLines className="absolute h-full bg-transparent -z-1">
					<div></div>
				</BackgroundLines>
				<div className="flex flex-col gap-2 max-w-2xl relative">
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
							className="text-7xl font-bold bg-gradient-to-r
                 from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text"
						>
							The web builder for stunning sites.
						</h1>
					</motion.div>
					<motion.div
						className="max-w-md"
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
						<h3 className="text-2xl ">
							Design and publish modern sites at any scale with Framer’s web
							builder.
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
						<div
							className="relative group inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-gray-300 bg-gray-800/50 
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden cursor-pointer"
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
								Snippets
							</span>
						</div>
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
		</div>
	);
};

export default HomePage;
