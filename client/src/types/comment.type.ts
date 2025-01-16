import { SearchBase } from ".";
import { ICreateBy } from "./snippet.type";

export interface CommentDto {
	type: string;
	content: string;
	parent: string;
}

export interface CommentPagingDto extends Omit<SearchBase, "keyword"> {
	parent: string;
}

export interface CommentResponse {
	_id: string;
	createBy: ICreateBy;
	content: string;
	type: string;
	parent: string;
	replies: string[];
	replies_count: number;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}
