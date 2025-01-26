import { BlogMarkController } from "./blogMark.controller";
import { BlogMarkService } from "./blogMark.service";


const blogMarkService = new BlogMarkService();
const blogMarkController = new BlogMarkController(blogMarkService);

export { blogMarkController, blogMarkService };