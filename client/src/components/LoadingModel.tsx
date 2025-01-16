import useModelLoading from "@/store/useModelLoading.store";
import { Loader } from "lucide-react";

const LoadingModel = () => {
	const { open } = useModelLoading();
	return (
		<>
			{open && (
				<div className="fixed inset-0 w-full h-screen  z-[100] flex items-center justify-center px-2">
					<div className="absolute inset-0 bg-black/80 cursor-pointer z-0 "></div>

					<div className="text-gray-500">
						<Loader size={40} className="animate-spin" />
					</div>
				</div>
			)}
		</>
	);
};

export default LoadingModel;
