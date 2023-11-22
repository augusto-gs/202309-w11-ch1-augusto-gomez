import "../../../index.js";
import request from "supertest";
import app from "../../../app";

describe("Given a GET/patatas endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 404 and a 'Endpoint not found' error", async () => {
      const path = "/patatas";
      const expectedStatusCode = 404;
      const expectedError = "Endpoint not found";

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { error: string };
      expect(responseBody).toStrictEqual({ error: expectedError });
    });
  });
});
