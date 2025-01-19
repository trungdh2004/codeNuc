import { PagingDtoBase } from './../../../server/src/interface/system';

export interface NewRoomDto {
    message:string;
    language:string;
}

export interface RoomResponse {
 _id:       string;
    userId:    string;
    message:   string;
    isAi:      boolean;
    isFirst:   boolean;
    language:string
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface NewMessageDto {
    message:string;
    language:string;
    id:string
}

export interface PagingAIDto extends PagingDtoBase {
    roomId:string,
    before?:string
}

export interface MessageResponse {
     _id:       string;
    isAi:      boolean;
    message:   string;
    language:  string;
    code?:      string;
    roomId:    string;
}