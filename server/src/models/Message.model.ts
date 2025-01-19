import mongoose, { Document, Schema } from "mongoose";

export interface MessageDocument extends Document {
  language: string;
  message: string;
  isAi: boolean;
  code: string;
  roomId: string;
  createdAt: string;
}

const MessageSchema = new Schema(
  {
    isAi: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<MessageDocument>("Message", MessageSchema);
export default MessageModel;
