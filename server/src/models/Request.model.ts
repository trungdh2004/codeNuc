import mongoose from "mongoose";

const TagsSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    ip2: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const RequestModel = mongoose.model("Request", TagsSchema);

export default RequestModel;
