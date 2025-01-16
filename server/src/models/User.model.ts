import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  uuid: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: Date;
  updatedAT: Date;
}

const UserSchema = new Schema(
  {
    uuid: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    isPro: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;
