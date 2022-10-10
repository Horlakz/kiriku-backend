import { Document, Schema, model, Types } from "mongoose";

interface Message extends Document {
  link: string;
  message: string;
  image: string;
  isRead: boolean;
}

const messageSchema = new Schema<Message>(
  {
    link: {
      type: String,
      required: [true, "Link is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    image: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<Message>("Message", messageSchema);
