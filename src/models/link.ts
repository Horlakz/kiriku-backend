import { Document, Schema, model, Types } from "mongoose";

interface Link extends Document {
  user: Types.ObjectId;
  link: string;
  description: string;
  isPublic: boolean;
  isActive: boolean;
}

const linkSchema = new Schema<Link>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
    link: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      maxlength: [100, "Description must not be more than 100 characters"],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

linkSchema.pre("save", async function (next) {
  // if (!this.isModified("link")) {
  //   return next();
  // }

  const link = Math.floor(Math.random() * 1000000).toString();
  const linkExists = await model<Link>("Link").findOne({ link });

  if (linkExists) {
    this.link = link;
    next();
  }

  this.link = link;

  next();
});

export default model<Link>("Link", linkSchema);
