import { connect, ConnectOptions } from "mongoose";

// import URI from .env
const URI: string | undefined = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await connect(`${URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log("Database connected successfully");
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;
