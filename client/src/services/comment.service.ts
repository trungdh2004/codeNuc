import { CommentDto, CommentPagingDto } from "@/types/comment.type";
import instance from "@/utils/instance";

export const createCommentApi = (data: CommentDto) =>
	instance.post("/comment/create", data);

export const pagingCommentApi = (data: CommentPagingDto) =>
	instance.post("/comment/paging", data);
