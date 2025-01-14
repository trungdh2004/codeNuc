import Comments from "@/components/comment/Comments";
import CodeSnippetDetail from "@/components/snippet/CodeSnippetDetail";
import SnippetDetailSkeleton from "@/components/SnippetDetailSkeleton";
import { Clock, MessageSquare, User } from "lucide-react";
import { useState } from "react";

const SnippetDetail = () => {
	const [data, setData] = useState({
		id: "1",
		title: "Xin chào",
		language: "javascript",
		userName: "trung nè",
		_creationTime: new Date().getTime(),
		userId: "123",
		code: `// JavaScript Playground
const numbers = [1, 2, 3, 4, 5];

// Map numbers to their squares
const squares = numbers.map(n => n * n);
console.log('Original numbers:', numbers);
console.log('Squared numbers:', squares);`,
		description: "Chào bạn nhé\nmình là trung đây\nhihi bạn nshe\nchào nhé",
	});
	const [loading, setLoading] = useState(false);

	if (loading) {
		return <SnippetDetailSkeleton />;
	}

	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-0 sm:py-8 lg:py-12">
			<div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-xl">
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff08] p-2.5">
							<img
								src={`/${data.language}.png`}
								alt={`${data.language} logo`}
								className="w-full h-full object-contain"
							/>
						</div>
						<div>
							<h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">
								{data.title}
							</h1>
							<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
								<div className="flex items-center gap-2 text-[#8b8b8d]">
									<User className="w-4 h-4" />
									<span>{data.userName}</span>
								</div>
								<div className="flex items-center gap-2 text-[#8b8b8d]">
									<Clock className="w-4 h-4" />
									<span>
										{new Date(data._creationTime).toLocaleDateString()}
									</span>
								</div>
								<div className="flex items-center gap-2 text-[#8b8b8d]">
									<MessageSquare className="w-4 h-4" />
									<span>5 comments</span>
								</div>
							</div>
						</div>
					</div>
					<div className="inline-flex items-center px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium">
						{data.language}
					</div>
				</div>
			</div>

			<div className="bg-[#121218] border border-[#ffffff0a] rounded-md  mb-6 backdrop-blur-xl">
				<div className="px-6 py-2 border-b border-gray-500/50">
					<h5 className="text-lg font-semibold text-white">Mô tả</h5>
				</div>
				<div className="py-2 px-6 ">
					<pre className="font-[sans-serif]">{data.description}</pre>
				</div>
			</div>

			<CodeSnippetDetail language={data.language} code={data.code} />

			<Comments />
		</div>
	);
};

export default SnippetDetail;
