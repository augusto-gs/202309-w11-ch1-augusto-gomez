import "dotenv/config.js";
import MongoMemoryServer from "mongodb-memory-server-core";
import { connectToDatabase } from "./database";
import mongoose from "mongoose";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongodbUrl = server.getUri();
  await connectToDatabase(mongodbUrl);
});

afterAll(async () => {
  await server.stop();
  await mongoose.disconnect();
});
