import mongoose, { Document, Schema } from "mongoose";
import { commentType } from "../config/comment.config";

export interface CommentDocument extends Document {
  createBy: string;
  content: string;
  type: (typeof commentType)[keyof typeof commentType];
  parent: string;
  replies: []; //câu trả lời
  replies_count: number;
}

const CommentSchema = new Schema(
  {
    createBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: true,
    },
    replies: [
      {
        type: String,
      },
    ], //câu trả lời
    replies_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model<CommentDocument>("Comment", CommentSchema);
export default CommentModel;
