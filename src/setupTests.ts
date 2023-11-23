import "dotenv/config.js";
import "./server/index.js";
import MongoMemoryServer from "mongodb-memory-server-core";
import { connectToDatabase } from "./database";
import mongoose from "mongoose";
import User from "./features/users/model/Users.js";
import bcrypt from "bcrypt";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongodbUrl = server.getUri();
  await connectToDatabase(mongodbUrl);

  const hashedPassword = await bcrypt.hash("4321", 10);

  await User.create({
    name: "test",
    username: "test",
    password: hashedPassword,
  });
});

afterAll(async () => {
  await server.stop();
  await mongoose.disconnect();
});
