import { NewMessageDto, NewRoomDto, PagingAIDto } from "@/types/gemini.type";
import instance from "@/utils/instance";

export const createRoomApi = (data: NewRoomDto) =>
	instance.post("/geminiChat/create", data);

export const findByRoomApi = (id: string) =>
	instance.get("/geminiChat/findRoom/" + id);

export const createMessageApi = (data: NewRoomDto, id: string) =>
	instance.post("/geminiChat/conversation/" + id, data);

export const renderAiApi = (data: NewMessageDto) =>
	instance.post("/geminiChat/renderAi/" + data.id, {
		message: data.message,
		language: data.language,
	});

export const pagingGeminiApi = (data: PagingAIDto, query?: string) =>
	instance.post(`/geminiChat/paging${query ? `?before=${query}` : ""}`, data);

export const listRoomApi = () => instance.get(`/geminiChat/listRoom`);

export const removeRoomApi = (id: string) =>
	instance.delete(`/geminiChat/remove/` + id);
