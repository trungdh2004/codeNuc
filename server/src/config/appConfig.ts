import { getEnv } from "../utils/getEnv";

const funcConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  URL_CLIENT: getEnv("URL_CLIENT"),
  PORT: getEnv("PORT", "8000"),
  DB_URL: getEnv("DB_URL", "mongodb://localhost:27017/codeNuc"),
  COOKIE_EXPIRES_IN: getEnv("COOKIE_EXPIRES_IN"),
  GEMINI_API_KEY: getEnv("GEMINI_API_KEY"),
  JWT: {
    SECRET: getEnv("JWT_SECRET", "trungnef"),
    EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "30d"),
    ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET", "trungnef"),
    ACCESS_EXPIRES_IN: getEnv("JWT_ACCESS_EXPIRES_IN", "1h"),
  },
});

export const appConfig = funcConfig();
