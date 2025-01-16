import { PagingDtoBase } from "./system";

export interface CommentDto {
  content: string;
  createBy: string;
  parent: string;
  type: string;
}

export interface PagingCommentDto extends Omit<PagingDtoBase, "keyword"> {
  parent: string;
}
