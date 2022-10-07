import { Sequelize } from "sequelize";

const sequelize = new Sequelize(`${process.env.DB_URL}`);

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection DB success.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
