import { commentType } from "../../config/comment.config";
import { CommentDto, PagingCommentDto } from "../../interface/comment.dto";
import CommentModel from "../../models/Comment.model";
import { BadRequestException } from "../../utils/catchError";
import { formatResponse } from "../../utils/response";
import { snippetService } from "../snippets/snippet.module";

export class CommentService {
  async create(data: CommentDto) {
    if (data.type === commentType.SNIPPET) {
      await snippetService.findById(data.parent);
    }

    const newComment = await CommentModel.create({
      createBy: data.createBy,
      content: data.content,
      type: data.type,
      parent: data.parent,
    });

    if (!newComment) {
      throw new BadRequestException("Tạo thất bại");
    }

    return newComment;
  }

  async paging(data: PagingCommentDto) {
    const limit = data.pageSize || 10;
    const skip = (data.pageIndex - 1) * limit || 0;

    const listData = await CommentModel.find({
      parent: data.parent,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "createBy",
        select: "name email avatar",
      });

    const countData = await CommentModel.countDocuments({
      parent: data.parent,
    });

    return formatResponse({
      skip: data.pageIndex,
      limit,
      data: listData,
      count: countData,
    });
  }
}
