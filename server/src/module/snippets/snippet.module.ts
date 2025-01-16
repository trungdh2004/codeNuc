import { SnippetController } from "./snippet.controller";
import { SnippetService } from "./snippet.service";

const snippetService = new SnippetService();
const snippetController = new SnippetController(snippetService);

export { snippetController, snippetService };
