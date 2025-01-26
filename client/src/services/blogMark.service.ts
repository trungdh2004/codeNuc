import { BlogMarkDto } from "@/types/blogs.type";
import instance from "@/utils/instance";


export const createBookMarkApi = (data: BlogMarkDto) =>
	instance.post("/blogMark/create", data);

export const getAllBookMarkApi = () =>
	instance.get("/blogMark/getAll");

export const getAllIdBookMarkApi = () =>
	instance.get("/blogMark/getAllId");

export const removeBookMarkApi = (id:string) =>
	instance.delete("/blogMark/remove/"+ id);