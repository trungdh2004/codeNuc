import mongoose from "mongoose";

const TagsSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const RequestModel = mongoose.model("Request", TagsSchema);

export default RequestModel;
