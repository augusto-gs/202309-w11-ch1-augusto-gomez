import "../../../server/index";
import app from "../../../server/app";
import request from "supertest";
import { connectToDatabase } from "../../../database";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { type TransformerStructure } from "../types";
import transformersMock from "../mocks/transformersMock";
import Transformer from "../../model/Transformer";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();
  await connectToDatabase(mongoDbUrl);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a GET/robotos endpoint", () => {
  describe("When it receives a request", () => {
    test.only("Then it should respond with a status 200 and a robot Barricade and Bumblebee", async () => {
      const expectedStatus = 200;
      const path = "/robots";

      await Transformer.create(transformersMock[0]);
      await Transformer.create(transformersMock[1]);

      const response = await request(app).get(path).expect(expectedStatus);

      const responseBody = response.body as {
        transformers: TransformerStructure[];
      };
      responseBody.transformers.forEach((transformer, transformersPosition) => {
        expect(transformer).toHaveProperty(
          "name",
          transformersMock[transformersPosition].name,
        );
      });
    });
  });
});
