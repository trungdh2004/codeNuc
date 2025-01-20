import { asyncHandler } from "./../../middleware/asyncHandler";
import { Request, Response } from "express";
import { RequestUser } from "../../interface/system";
import { SnippetService } from "./snippet.service";
import {
  snippetPagingValidator,
  snippetValidator,
} from "../../validator/snippet.validator";
import { BadRequestException, NotFoundException } from "../../utils/catchError";
import { HTTPSTATUS } from "../../config/http.config";

export class SnippetController {
  private snippetService: SnippetService;
  constructor(snippetService: SnippetService) {
    this.snippetService = snippetService;
  }

  public createSnippet = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const user = req.user;
      const { error, value } = snippetValidator.validate(req.body);
      if (error) {
        throw new BadRequestException(error.message);
      }

      console.log("value", value);

      const data = await this.snippetService.create({
        ...value,
        userId: user?.id,
      });
      return res.status(HTTPSTATUS.OK).json(data);
    }
  );

  public getDetail = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException("Chưa truyền id");
    }

    const data = await this.snippetService.findById(id);

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public pagingSnippet = asyncHandler(async (req: Request, res: Response) => {
    const { error, value } = snippetPagingValidator.validate(req.body);
    if (error) {
      throw new BadRequestException(error.message);
    }
    const data = await this.snippetService.paging(value);
    return res.status(HTTPSTATUS.OK).json(data);
  });

  public pagingCurrent = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const { error, value } = snippetPagingValidator.validate(req.body);
      const user = req.user;
      if (error) {
        throw new BadRequestException(error.message);
      }
      const data = await this.snippetService.paging({
        ...value,
        userId: user?.id,
      });
      return res.status(HTTPSTATUS.OK).json(data);
    }
  );

  public removeSnippet = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const user = req.user;
      const { id } = req.params;
      if (!id) {
        throw new NotFoundException(id);
      }
      const data = await this.snippetService.remove(id, user?.id as string);
      return res.status(HTTPSTATUS.OK).json({
        message: "Xóa thành công",
        id,
      });
    }
  );
}
