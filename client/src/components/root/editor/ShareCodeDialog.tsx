import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createSnippetApi } from "@/services/snippet.service";
import { useCodeEditorStore } from "@/store/useCodeEditor.store";
import useModelLoading from "@/store/useModelLoading.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, {
			message: "Chưa nhập tiêu đề",
		})
		.max(50),
	description: z.string().optional(),
});

interface IProps {
	open: boolean;
	handleClose: () => void;
}

const ShareCodeDialog = ({ open, handleClose }: IProps) => {
	const { language, getCode } = useCodeEditorStore();
	const { setClose, setOpen } = useModelLoading();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setOpen();
		try {
			await createSnippetApi({
				...values,
				language,
				code: getCode(),
			});

			toast.success("Đăng tải thành công");
			handleClose();
			form.reset({
				title: "",
				description: "",
			});
		} catch (error: unknown) {
			const err = error as Error;
			toast.error(err.message);
		} finally {
			setClose();
		}
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(JSON.stringify(values));
	}
	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="bg-[#1e1e2e] rounded-lg p-4 w-full max-w-md border-none text-white">
				<DialogHeader>
					<DialogTitle className="text-base font-semibold text-white">
						Chia sẻ mã code
					</DialogTitle>
				</DialogHeader>

				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm text-white">
											Tiêu đề
										</FormLabel>
										<FormControl>
											<Input
												placeholder="CodeNuc...."
												{...field}
												className="text-white bg-[#181825] border border-[#313244] focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm text-white">Mô tả</FormLabel>
										<FormControl>
											<Textarea
												placeholder="CodeNuc...."
												{...field}
												className="text-white bg-[#181825] border border-[#313244] focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-60 resize-none"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex items-center justify-end gap-2">
								<Button
									type="button"
									onClick={() => {
										form.reset();
										handleClose();
									}}
									variant={"ghost"}
									className="hover:bg-gray-500/10 text-gray-500 hover:text-gray-500"
								>
									Hủy
								</Button>
								<Button
									type="submit"
									variant={"secondary"}
									className="bg-gradient-to-r
               from-blue-500 to-blue-600 
            rounded-lg ring-1 ring-blue-800/50 hover:ring-gray-700/50 transition-all text-white"
								>
									Đăng tải
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ShareCodeDialog;
