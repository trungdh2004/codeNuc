import Logo from "@/components/Logo";
import { ArrowBigLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="fixed inset-0 z-50 grid h-screen px-4">
			<div className="flex items-center gap-8 h-16">
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
			<div className="flex flex-col items-center gap-3 text-center">
				<h1 className="text-6xl font-black lg:text-9xl text-custom-400">404</h1>

				<p className="text-lg font-bold tracking-tight text-gray-500 lg:text-2xl sm:text-4xl">
					Không tìm thấy nội dung
				</p>
				<div className="flex flex-col">
					<p className="mt-4 text-gray-500 text-[15px] lg:text-[18px]">
						URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.
					</p>
					<p className="mt-4 text-gray-500 text-[15px] lg:text-[18px]">
						{" "}
						Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì
						dùng URL đã lưu.
					</p>
				</div>

				<Link
					to="/"
					className="w-[200px] mt-6 inline-block bg-custom-300 px-4 py-2 lg:px-5 lg:py-3 text-sm flex items-center gap-2 font-medium text-white hover:bg-custom-500 focus:outline-none focus:ring rounded-full"
				>
					<ArrowBigLeft />Trở về trang chủ
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
