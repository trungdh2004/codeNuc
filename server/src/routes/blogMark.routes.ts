import { Router } from "express";
import authentication from "../middleware/authentication";
import { blogMarkController } from "../module/blogMark/blogMark.module";

const routerBlogMark = Router();

routerBlogMark.post("/create", authentication, blogMarkController.createBlog);
routerBlogMark.get("/getAll",authentication, blogMarkController.getAll);
routerBlogMark.delete("/remove/:id",authentication, blogMarkController.remove);
routerBlogMark.get("/getAllId",authentication, blogMarkController.getAllId);
export default routerBlogMark;
