import { model, generationConfig } from "../../config/gemini.config";
import {
  MessageClientDto,
  PagingMessageDto,
  RoomDto,
} from "../../interface/gemini.dto";
import MessageModel from "../../models/Message.model";
import RoomModel from "../../models/Room.model";
import { BadRequestException } from "../../utils/catchError";
import { generateFormQuestionPrompt } from "../../utils/prompt";
import { formatResponse } from "../../utils/response";

export class GeminiService {
  async createRoom(data: RoomDto) {
    const newRoom = await RoomModel.create({
      userId: data.userId,
      message: data.message,
      language: data.language,
    });

    if (!newRoom) {
      throw new BadRequestException("Tạo thất bại");
    }

    await this.createMessage({
      message: data.message,
      language: data.language,
      roomId: newRoom._id as string,
    });

    await this.renderAi({
      message: data.message,
      language: data.language,
      roomId: newRoom._id as string,
    });

    return newRoom;
  }

  async createMessage(data: MessageClientDto) {
    const newMessage = await MessageModel.create({
      isAi: data.isAi || false,
      message: data.message,
      language: data.language,
      code: data.code || null,
      roomId: data.roomId,
    });

    if (!newMessage) {
      throw new BadRequestException("Lỗi tạo thất bại");
    }

    return newMessage;
  }

  async findByRoomId(roomId: string) {
    const room = await RoomModel.findById(roomId);

    if (!room) {
      throw new BadRequestException("Không có phòng này");
    }

    return room;
  }

  async renderAi(data: MessageClientDto) {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(
      generateFormQuestionPrompt(data.message, data.language)
    );

    const response = JSON.parse(result.response.text());

    let responseData = {
      message: response.message,
      isAi: true,
      language: data.language,
      code: response.code,
      roomId: data.roomId,
    };

    if (Array.isArray(response)) {
      responseData = {
        message: response[0].message,
        isAi: true,
        language: data.language,
        code: response[0].code,
        roomId: data.roomId,
      };
    }
    const newMessageAI = await this.createMessage(responseData);

    await RoomModel.findByIdAndUpdate(data.roomId, {
      isFirst: false,
      code: newMessageAI.code,
      message: newMessageAI.message,
      isAi: true,
      language: data.language,
    });

    return newMessageAI;
  }

  async paging(data: PagingMessageDto) {
    const limit = data.pageSize || 10;
    const skip = (data.pageIndex - 1) * limit || 0;

    let queryBefore = {};

    if (data.before) {
      queryBefore = {
        createdAt: {
          $lte: data.before,
        },
      };
    }

    await this.findByRoomId(data.roomId);

    const listData = await MessageModel.find({
      roomId: data.roomId,
      ...queryBefore,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const countData = await MessageModel.countDocuments({
      roomId: data.roomId,
      ...queryBefore,
    });
    let before = data.before || null;

    if (listData?.length > 0 && !data.before) {
      before = listData[0].createdAt;
    }

    return {
      ...formatResponse({
        skip: data.pageIndex,
        limit,
        data: listData,
        count: countData,
      }),
      before,
    };
  }

  async findRoom(userId: string) {
    const listRoom = await RoomModel.find({
      userId: userId,
    });

    return listRoom;
  }

  async remove(id: string, userId: string) {
    const room = await this.findByRoomId(id);
    console.log("room", room);

    if (room.userId.toString() !== userId.toString()) {
      throw new BadRequestException("Bạn không có quyền");
    }

    await RoomModel.findByIdAndDelete(id);
    await MessageModel.deleteMany({
      roomId: room.id,
    });

    return true;
  }
}
