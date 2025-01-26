export const timeDateBlog = (date: number) => {
	const dateBlog = new Date(date * 1000);
	return dateBlog.toLocaleDateString("vi-VN", {
		month: "2-digit",
		day: "2-digit",
	});
};
