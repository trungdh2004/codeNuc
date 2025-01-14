import { useEffect, useRef, useState } from "react";
import CodeBlock from "./CodeBlock";
import { cn } from "@/lib/utils";

function CommentContent({ content }: { content: string }) {
	const [openMore, setOpenMore] = useState(false);
	const divRef = useRef<HTMLDivElement | null>(null);
	const [isOverflowing, setIsOverflowing] = useState(false);
	// regex
	const parts = content.split(/(```[\w-]*\n[\s\S]*?\n```)/g);
	useEffect(() => {
		if (divRef.current) {
			if (divRef.current.scrollHeight > divRef.current.clientHeight) {
				setIsOverflowing(true);
			}
		}
	});

	return (
		<div
			className={cn(
				"max-w-none text-white text-start overflow-hidden max-h-60 relative transition-all duration-200",
				openMore && "max-h-max",
			)}
			ref={divRef}
		>
			<div>
				{parts.map((part, index) => {
					if (part.trim().startsWith("```")) {
						//           ```javascript
						// const name = "John";
						// ```
						const match = part.match(/```([\w-]*)\n([\s\S]*?)\n```/);

						if (match) {
							const [, language, code] = match;
							return <CodeBlock language={language} code={code} key={index} />;
						}
					}

					return part.split("\n").map((line, lineIdx) => (
						<p key={lineIdx} className="mb-4 text-gray-300 last:mb-0">
							{line}
						</p>
					));
				})}
			</div>

			<div
				className={cn(
					"absolute bottom-0 right-1  group px-2 py-1 rounded-md text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden hidden cursor-pointer",
					isOverflowing && "flex items-center justify-center",
				)}
				onClick={() => {
					setOpenMore((prev) => !prev);
				}}
			>
				{/* <div
					className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
				/> */}
				<span
					className="text-xs font-medium leading-4 relative z-10 group-hover:text-white
                 transition-colors"
				>
					{openMore ? "Thu gọn" : "Xem thêm"}
				</span>
			</div>
		</div>
	);
}
export default CommentContent;
