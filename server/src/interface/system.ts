import { Request } from "express";

export interface RequestUser extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    uuid: string;
  };
}

export interface PagingDtoBase {
  pageIndex: number;
  pageSize: number;
  keyword: string;
}
