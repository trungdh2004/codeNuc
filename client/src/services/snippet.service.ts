import { SnippetDto, SnippetPagingDto } from "@/types/snippet.type";
import instance from "@/utils/instance";

export const createSnippetApi = (data: SnippetDto) =>
	instance.post("/snippet/create", data);

export const pagingSnippetApi = (data: SnippetPagingDto) =>
	instance.post("/snippet/paging", data);

export const detailSnippetApi = (id: string) =>
	instance.get("/snippet/detail/" + id);
