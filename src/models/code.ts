import { Document, Schema, model, Types } from "mongoose";

interface Code extends Document {
  user: Types.ObjectId;
  code: number | string;
}

const codeSchema = new Schema<Code>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required"],
      unique: true,
      ref: "User",
    },
    code: {
      type: Number,
      required: [true, "Code is required"],
      minlength: [6, "Code must not be less than 6 characters"],
      maxlength: [6, "Code must not be more than 6 characters"],
    },
  },
  { timestamps: true }
);

export default model<Code>("Code", codeSchema);
