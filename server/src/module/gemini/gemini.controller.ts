import { asyncHandler } from "./../../middleware/asyncHandler";
import { Response } from "express";
import { RequestUser } from "../../interface/system";
import { GeminiService } from "./gemini.service";
import {
  geminiValidator,
  messagePagingValidator,
} from "../../validator/gemini.validator";
import { BadRequestException, NotFoundException } from "../../utils/catchError";
import { STATES } from "mongoose";
import { HTTPSTATUS } from "../../config/http.config";
import { appConfig } from "../../config/appConfig";

export class GeminiController {
  private geminiService: GeminiService;

  constructor(geminiService: GeminiService) {
    this.geminiService = geminiService;
  }

  public createRoom = asyncHandler(async (req: RequestUser, res: Response) => {
    const user = req.user;
    const { error, value } = await geminiValidator.validate(req.body);

    if (error) {
      throw new BadRequestException(error.message);
    }

    console.log("value", value);

    const data = await this.geminiService.createRoom({
      ...value,
      userId: user?.id,
    });

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public createMessage = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const user = req.user;
      const { id } = req.params;
      const { error, value } = await geminiValidator.validate(req.body);
      console.log("appConfig.GEMINI_API_KEY", appConfig.GEMINI_API_KEY);

      if (error) {
        throw new BadRequestException(error.message);
      }

      if (!id) {
        throw new NotFoundException("Không có ");
      }

      await this.geminiService.findByRoomId(id);

      const message = await this.geminiService.createMessage({
        ...value,
        userId: user?.id,
        roomId: id,
      });

      const data = await this.geminiService.renderAi({
        ...value,
        userId: user?.id,
        roomId: id,
      });

      return res.status(HTTPSTATUS.OK).json(data);
    }
  );

  public test = asyncHandler(async (req: RequestUser, res: Response) => {
    return res.status(HTTPSTATUS.OK).json({
      api: appConfig.GEMINI_API_KEY,
      cookie: appConfig.COOKIE_EXPIRES_IN,
    });
  });
  public pagingMessage = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const query = req.query;

      const { error, value } = messagePagingValidator.validate(req.body);

      if (error) {
        throw new BadRequestException(error.message);
      }

      const data = await this.geminiService.paging({
        ...value,
        before: query.before,
      });

      return res.status(HTTPSTATUS.OK).json(data);
    }
  );

  public findByRoom = asyncHandler(async (req: RequestUser, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new NotFoundException("Không có id");
    }

    const data = await this.geminiService.findByRoomId(id);

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public renderAI = asyncHandler(async (req: RequestUser, res: Response) => {
    const user = req.user;
    const { id } = req.params;
    console.log("req", req.body);

    const { error, value } = await geminiValidator.validate(req.body);

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!id) {
      throw new NotFoundException("Không có ");
    }

    await this.geminiService.findByRoomId(id);
    const data = await this.geminiService.renderAi({
      ...value,
      userId: user?.id,
      roomId: id,
    });

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public listRooms = asyncHandler(async (req: RequestUser, res: Response) => {
    const user = req.user;

    const data = await this.geminiService.findRoom(user?.id as string);

    return res.status(HTTPSTATUS.OK).json(data);
  });
}
