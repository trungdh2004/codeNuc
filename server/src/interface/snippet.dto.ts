import { PagingDtoBase } from "./system";

export interface ISnippetDto {
  code: string;
  language: string;
  userId: string;
  title: string;
  description?: string;
}

export interface ISnippetPagingDto extends PagingDtoBase {
  language: string[];
}
