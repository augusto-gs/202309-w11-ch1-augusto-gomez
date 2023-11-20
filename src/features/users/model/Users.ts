import { Schema, model } from "mongoose";
import { type UserStructure } from "../types";

const userSchema = new Schema<UserStructure>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, minlength: 4 },
  password: { type: String, required: true },
});

const User = model("Users", userSchema, "users");

export default User;
