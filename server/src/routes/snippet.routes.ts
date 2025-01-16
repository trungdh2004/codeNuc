import { Router } from "express";
import authentication from "../middleware/authentication";
import { snippetController } from "../module/snippets/snippet.module";

const snippetRouter = Router();

snippetRouter.post("/create", authentication, snippetController.createSnippet);
snippetRouter.get("/detail/:id", snippetController.getDetail);
snippetRouter.post("/paging", snippetController.pagingSnippet);

export default snippetRouter;
