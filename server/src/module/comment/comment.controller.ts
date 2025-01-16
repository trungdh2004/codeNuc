import { Request, Response } from "express";
import { RequestUser } from "../../interface/system";
import { asyncHandler } from "../../middleware/asyncHandler";
import { CommentService } from "./comment.service";
import {
  commentPagingValidator,
  commentValidator,
} from "../../validator/comment.validator";
import { BadRequestException } from "../../utils/catchError";
import { HTTPSTATUS } from "../../config/http.config";

export class CommentController {
  private commentService: CommentService;

  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }

  public createComment = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const user = req.user;

      const { error, value } = commentValidator.validate(req.body);

      if (error) {
        throw new BadRequestException(error.message);
      }

      const data = await this.commentService.create({
        ...value,
        createBy: user?.id,
      });

      return res.status(HTTPSTATUS.OK).json(data);
    }
  );

  public pagingComment = asyncHandler(async (req: Request, res: Response) => {
    const { error, value } = commentPagingValidator.validate(req.body);

    if (error) {
      throw new BadRequestException(error.message);
    }

    const data = await this.commentService.paging(value);

    return res.status(HTTPSTATUS.OK).json(data);
  });
}
