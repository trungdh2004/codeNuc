import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

interface Props {
	open: boolean;
	handleClose: () => void;
	title?: string;
	description?: string;
	cancelLabel?: string;
	successLabel?: string;
	type?: "danger" | "success" | "warning";
	handleSubmit: () => void;
}
const ConfirmDialog = ({
	open,
	handleClose,
	title,
	description,
	cancelLabel,
	successLabel,
	type = "danger",
	handleSubmit,
}: Props) => {
	return (
		<>
			<Dialog open={open} onOpenChange={handleClose}>
				<DialogContent className="w-[80%] rounded-md max-w-[400px] p-0 gap-0">
					<DialogHeader className="px-4 py-2 pb-2 font-bold border-b">
						{title ? title : "Xác nhận"}
					</DialogHeader>

					<div className="px-4 py-2">
						<span className="text-sm sm:text-base">
							{description || "Bạn có chắc chắn muốn xóa không!!"}
						</span>
					</div>

					<div className="flex justify-end px-4 py-2">
						<Button
							size={"sm"}
							variant={"secondary"}
							className="px-4 ml-2 border-none outline-none"
							onClick={handleClose}
						>
							{cancelLabel ? cancelLabel : "Hủy"}
						</Button>
						<Button
							size={"sm"}
							className="px-4 ml-2"
							variant={
								type === "danger"
									? "destructive"
									: type === "success"
									? "success"
									: "warning"
							}
							onClick={handleSubmit}
						>
							{successLabel ? successLabel : "Xóa"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ConfirmDialog;
