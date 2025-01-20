import { ISnippetDto, ISnippetPagingDto } from "../../interface/snippet.dto";
import SnippetModel from "../../models/Snippet.model";
import { UserDocument } from "../../models/User.model";
import { BadRequestException, NotFoundException } from "../../utils/catchError";
import { removeVietnameseTones } from "../../utils/func";
import { formatResponse } from "../../utils/response";
import { authService } from "../auth/auth.module";

export class SnippetService {
  async create(data: ISnippetDto) {
    const user = await authService.findById(data.userId);

    const newSnippet = await SnippetModel.create({
      title: data.title,
      language: data.language,
      code: data.code,
      createBy: user._id,
      description: data.description,
    });

    return newSnippet;
  }

  async findById(id: string) {
    const snippet = await SnippetModel.findById(id).populate({
      path: "createBy",
      select: "name email avatar",
    });

    if (!snippet) {
      throw new NotFoundException("Không có bài nào");
    }

    return snippet;
  }

  async paging(data: ISnippetPagingDto) {
    const limit = data.pageSize || 10;
    const skip = (data.pageIndex - 1) * limit || 0;
    const keywordNoTone = removeVietnameseTones(data.keyword);
    const queryCreateBy = data.userId
      ? {
          createBy: data.userId,
        }
      : {};
    const queryKey = data.keyword
      ? {
          $or: [
            {
              title: {
                $regex: data.keyword,
                $options: "i",
              },
            },
            {
              titleNoTone: {
                $regex: keywordNoTone,
                $options: "i",
              },
            },
          ],
        }
      : {};
    const queryLanguage = data.language?.length
      ? {
          language: {
            $in: data.language,
          },
        }
      : {};

    const listData = await SnippetModel.find({
      ...queryKey,
      ...queryLanguage,
      ...queryCreateBy,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "createBy",
        select: "name email avatar",
      });

    const countData = await SnippetModel.countDocuments({
      ...queryKey,
      ...queryLanguage,
      ...queryCreateBy,
    });

    return formatResponse({
      skip: data.pageIndex,
      limit,
      data: listData,
      count: countData,
    });
  }

  async remove(id: string, userId: string) {
    const snippet = await this.findById(id);

    if (
      (snippet.createBy as UserDocument)._id?.toString() !== userId.toString()
    ) {
      throw new BadRequestException("Bạn không có quyền xóa");
    }

    await SnippetModel.findByIdAndDelete(id);

    return true;
  }
}
