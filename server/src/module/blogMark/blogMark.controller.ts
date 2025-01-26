import { Response } from "express";
import { RequestUser } from "../../interface/system";
import { asyncHandler } from "../../middleware/asyncHandler";
import { BadRequestException } from "../../utils/catchError";
import { blogMarkValidator } from "../../validator/blogMark.validator";
import { BlogMarkService } from "./blogMark.service";
import { HTTPSTATUS } from "../../config/http.config";

export class BlogMarkController {
    private blogMarkService: BlogMarkService;

    constructor(blogMarkService: BlogMarkService) {
        this.blogMarkService = blogMarkService;
    }


    createBlog = asyncHandler(async (req:RequestUser,res:Response) => {
        const user = req.user
        const {error,value} = blogMarkValidator.validate(req.body)
        if(error) {
            throw new BadRequestException(error.message)
        }
        const newBlog = await this.blogMarkService.create({
            ...value,
            createBy:user?.id,
            tagList:value.tagList || []
        })
        return  res.status(HTTPSTATUS.OK).json(newBlog)
    })

    getAll = asyncHandler(async (req:RequestUser,res:Response) => {
        const user = req.user
        const blogMarks = await this.blogMarkService.getAll(user?.id as string)
        return res.status(HTTPSTATUS.OK).json(blogMarks)
    })

    remove = asyncHandler(async (req:RequestUser,res:Response) => {
        const {id} = req.params
        const blogMark = await this.blogMarkService.remove(id)
        return res.status(HTTPSTATUS.OK).json(blogMark)
    })

    getAllId = asyncHandler(async (req:RequestUser,res:Response) => {
        const user = req.user
        const blogMarks = await this.blogMarkService.getAllId(user?.id as string)
        return res.status(HTTPSTATUS.OK).json(blogMarks)
    })
}
