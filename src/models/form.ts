import { Document, Schema, model, Types } from "mongoose";

interface Form extends Document {
  name: string;
  email: string;
  message: string;
}

const formSchema = new Schema<Form>(
  {
    name: {
      type: String,
      required: [true, "Full Name is required"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: 3,
      maxlength: 30,
      lowercase: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  { timestamps: true }
);

export default model<Form>("Form", formSchema);
