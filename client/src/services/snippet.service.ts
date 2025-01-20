import { SnippetDto, SnippetPagingDto } from "@/types/snippet.type";
import instance from "@/utils/instance";

export const createSnippetApi = (data: SnippetDto) =>
	instance.post("/snippet/create", data);

export const pagingSnippetApi = (data: SnippetPagingDto) =>
	instance.post("/snippet/paging", data);

export const detailSnippetApi = (id: string) =>
	instance.get("/snippet/detail/" + id);

export const pagingCurrentSnippetApi = (data: SnippetPagingDto) =>
	instance.post("/snippet/pagingCurrent", data);

export const removeSnippetApi = (id: string) =>
	instance.delete("/snippet/remove/" + id);
