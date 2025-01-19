import mongoose, { Document, Schema } from "mongoose";
import { commentType } from "../config/comment.config";

export interface RoomDocument extends Document {
  createBy: string;
  userId: string;
  message: string;
  language:string
}

const RoomSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      default: null,
    },
    language:{
      type:String,
      required:true
    },
    isAi: {
      type: Boolean,
      default: false,
    },
    isFirst:{
      type:Boolean,
      default:true
    }
  },
  {
    timestamps: true,
  }
);

const RoomModel = mongoose.model<RoomDocument>("Room", RoomSchema);
export default RoomModel;
