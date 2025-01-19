import { GeminiController } from "./gemini.controller";
import { GeminiService } from "./gemini.service";

const geminiService = new GeminiService();
const geminiController = new GeminiController(geminiService);

export { geminiController, geminiService };
