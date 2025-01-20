import { Router } from "express";
import authentication from "../middleware/authentication";
import { geminiController } from "../module/gemini/gemini.module";

const routerGemini = Router();

routerGemini.post("/create", authentication, geminiController.createRoom);
routerGemini.get("/findRoom/:id", authentication, geminiController.findByRoom);
routerGemini.post("/paging", authentication, geminiController.pagingMessage);
routerGemini.get("/listRoom", authentication, geminiController.listRooms);
routerGemini.post(
  "/conversation/:id",
  authentication,
  geminiController.createMessage
);
routerGemini.post("/renderAi/:id", authentication, geminiController.renderAI);
routerGemini.delete("/remove/:id", authentication, geminiController.removeRooms);
export default routerGemini;
