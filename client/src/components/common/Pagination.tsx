import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface Props {
	pageCount: number;
	handlePageClick: ({ selected }: { selected: number }) => void;
	size?: "sm" | "md";
	forcePage: number;
	marginPagesDisplayed?: number;
}

function Paginations({
	pageCount,
	handlePageClick,
	size = "md",
	forcePage = 0,
	marginPagesDisplayed = 2,
}: Props) {
	return (
		<>
			{" "}
			{pageCount > 0 ? (
				<ReactPaginate
					forcePage={forcePage}
					breakLabel=". . ."
					nextLabel={<FaAngleRight />}
					onPageChange={handlePageClick}
					pageRangeDisplayed={1}
					marginPagesDisplayed={marginPagesDisplayed}
					pageCount={pageCount}
					previousLabel={<FaAngleLeft />}
					renderOnZeroPageCount={null}
					pageLinkClassName={cn(
						"border border-gray-500/50 w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-500/10",
						size === "md" && "md:w-10 md:h-10",
						size === "sm" && "md:w-8 md:h-8",
					)}
					previousLinkClassName={cn(
						"border w-8 h-8 border-gray-500/50 flex items-center justify-center rounded-md hover:bg-gray-500/10",
						size === "md" && "md:w-10 md:h-10",
						size === "sm" && "md:w-8 md:h-8",
					)}
					nextLinkClassName={cn(
						"border w-8 h-8 border-gray-500/50 flex items-center justify-center rounded-md hover:bg-gray-500/10",
						size === "md" && "md:w-10 md:h-10",
						size === "sm" && "md:w-8 md:h-8",
					)}
					disabledLinkClassName={
						"border-gray-500/10 cursor-not-allowed text-zinc-200 bg-gray-500/20 opacity-50"
					}
					breakLinkClassName={cn(
						"border w-8 h-8 border-gray-500/50 flex items-end justify-center rounded-md hover:bg-gray-500/10",
						size === "md" && "md:w-10 md:h-10",
						size === "sm" && "md:w-8 md:h-8",
					)}
					activeLinkClassName={"border-blue-500  text-blue-500 font-medium"}
					containerClassName={"flex gap-1"}
				/>
			) : (
				<div className="flex gap-1">
					<button
						className={cn(
							"border w-8 h-8  flex items-center justify-center rounded-md p-0 border-gray-500/50 cursor-not-allowed text-gray-500/50 hover:bg-gray-500/10",
						)}
						disabled
					>
						<FaAngleLeft />
					</button>
					<button
						className={cn(
							"border w-8 h-8  flex items-center justify-center rounded-md p-0 border-blue-500/50  text-blue-500/50 font-medium cursor-pointer",
						)}
					>
						1
					</button>
					<button
						className={cn(
							"border w-8 h-8  flex items-center justify-center rounded-md p-0 border-gray-500/50 cursor-not-allowed text-gray-500/50",
						)}
						disabled
					>
						<FaAngleRight />
					</button>
				</div>
			)}
		</>
	);
}

export default Paginations;
