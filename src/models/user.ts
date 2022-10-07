import bcrypt from "bcryptjs";
import { Document, model, Schema } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: 3,
      maxlength: 30,
      lowercase: true,
      unique: true,
      validate: {
        validator: (v: string) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: 30,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre<User>("save", async function (next) {
  // create a salt and hash the password
  if (!this.isModified("password")) {
    return next();
  }

  if (this.isModified("password")) {
    const salt: string = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export default model<User>("User", userSchema);
