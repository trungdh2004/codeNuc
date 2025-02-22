import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import { appConfig } from "./config/appConfig";
import { errorhandler } from "./middleware/errorHandler";
import dbConnect from "./config/db";
import router from "./routes/index.routes";
const app = express();

app.use(
  compression({
    level: 6,
  })
);
app.use(
  cors({
    origin: appConfig.URL_CLIENT,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

dbConnect();
app.use("/api/v1", router);
app.use(errorhandler);
app.get("/",(req:Request,res:Response)=>{
   res.json({
    urlClient: appConfig.URL_CLIENT,
   })
   return 
})    

app.listen(appConfig.PORT, () => {
  console.log("running http://localhost:" + appConfig.PORT);
});
