import mongoose, { Document, Schema } from "mongoose";

export interface BlogMarkDocument extends Document {
  title: string;
  id: string;
  path: string;
  userName: string;
  tagList: string[];
  createBy: string;
}

const BlogMarkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    createBy:{
      type:Schema.Types.ObjectId,
      required: true,
    },
    tagList:[
      {
        type:String
      }
    ]
  },
  {
    timestamps: true,
  }
);

const BlogMarkModel = mongoose.model<BlogMarkDocument>("BlogMark", BlogMarkSchema);
export default BlogMarkModel;
