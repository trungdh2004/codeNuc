import { PagingDtoBase } from "./gemini.type";

export interface SnippetDto {
	code: string;
	title: string;
	language: string;
	description?: string;
}

export interface SnippetPagingDto extends PagingDtoBase {
	language: string[];
}

export interface ICreateBy {
	name: string;
	_id: string;
	avatar: string;
	email: string;
}

export interface SnippetResponse {
	_id: string;
	title: string;
	description: string;
	code: string;
	language: string;
	countStar: number;
	createdAt: string;
	createBy: ICreateBy;
	countComment: number;
}
