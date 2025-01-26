import { BlogMarkDto } from "../../interface/BlogMark.dto";
import BlogMarkModel from "../../models/BlogMark.model";
import { BadRequestException } from "../../utils/catchError";


export class BlogMarkService {
    async create(data:BlogMarkDto) {
        const newBlog = await BlogMarkModel.create({
            title: data.title,
            id: data.id,
            path: data.path,
            userName: data.userName,
            createBy: data.createBy,
            tagList: data.tagList
        })

        if(!newBlog) {
            throw new BadRequestException("Tạo thất bại")
        }

        return newBlog
    }

    async getAll(userId:string) {
        const blogMarks = await BlogMarkModel.find({
            createBy:userId
        })
        return blogMarks
    }

    async getOne(id:string) {
        const blogMark = await BlogMarkModel.findById(id)
        if(!blogMark) {
            throw new BadRequestException("Không tìm thấy bài viết")
        }
        return blogMark
    }

    async remove(id:string) {
        await this.getOne(id)
        const blogMark = await BlogMarkModel.findByIdAndDelete(id)
        if(!blogMark) {
            throw new BadRequestException("Xóa thất bại")
        }
        return blogMark
    }

    async getAllId(userId:string) {
        const blogMarks = await BlogMarkModel.find({
            createBy:userId
        }).select("id")
        return blogMarks.map(blogMark => blogMark.id)
    }
}