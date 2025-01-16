import mongoose, { Document, Schema } from "mongoose";
import { UserDocument } from "./User.model";
import { removeVietnameseTones } from "../utils/func";

export interface SnippetDocument extends Document {
  title: string;
  code: string;
  language: string;
  description: string;
  createBy: string | UserDocument;
  countStar: number;
  countComment: number;
}

const SnippetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    titleNoTone: {
      type: String,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    countStar: {
      type: Number,
      default: 0,
    },
    createBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    countComment: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

SnippetSchema.pre("save", function (next) {
  if (this.title) {
    this.titleNoTone = removeVietnameseTones(this.title);
  }
  next();
});

const SnippetModel = mongoose.model<SnippetDocument>("Snippet", SnippetSchema);
export default SnippetModel;
