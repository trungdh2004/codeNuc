import { GoogleGenerativeAI } from "@google/generative-ai";
import { appConfig } from "./appConfig";
const genAI = new GoogleGenerativeAI(appConfig.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  response_mime_type: "application/json",
};
