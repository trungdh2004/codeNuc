export interface RoomDto {
  userId: string;
  message: string;
  language: string;
}

export interface MessageClientDto {
  message: string;
  language: string;
  isAi?: boolean;
  code?: string;
  roomId: string;
}

export interface PagingMessageDto {
  pageIndex: number;
  pageSize: number;
  keyword: string;
  roomId: string;
  before?: string;
}
