import bcrypt from "bcryptjs";
import { DataTypes, Model, Sequelize } from "sequelize";

const sequelize = new Sequelize(`${process.env.DB_URL}`);

interface UserAttributes extends Model {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const User = sequelize.define<UserAttributes>(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      set() {
        this.setDataValue("id", Math.random().toString(36).substring(2, 15));
      },
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      set(value: string) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      },
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;
