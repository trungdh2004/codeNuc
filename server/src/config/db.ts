import mongoose from "mongoose";
import { appConfig } from "./appConfig";

const dbConnect = () => {
  mongoose
    .connect(appConfig.DB_URL)
    .then(() => {
      console.log("Connect succeeded");
    })
    .catch(() => {
      console.log("Failed to connect");
    });
};

export default dbConnect;
