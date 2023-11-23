import app from "../../../../server/app";
import "../../../../server/index";
import request from "supertest";
import User from "../../model/Users";

describe("Given a GET/login method", () => {
  const path = "/login";
  describe("When it receives a request with valid credentials", () => {
    test("Then it should respond with a 201 and a token", async () => {
      const expectedStatusCode = 200;
      const userCredentials = {
        username: "test",
        password: "4321",
      };

      const response = await request(app)
        .post(path)
        .send(userCredentials)
        .expect(expectedStatusCode);

      const responseBody = response.body as { token: string };

      await User.findByIdAndDelete();

      expect(responseBody).not.toBeUndefined();
    });
  });

  describe("When it receives a request with invalid credentials", () => {
    test("Then it should respond with a 401 and a 'Wrong credentials' error", async () => {
      const expectedWrongStatus = 401;
      const wrongUserCredentials = {
        username: "test",
        password: "1234",
      };
      const expectedError = { error: "Wrong credentials" };

      const response = await request(app)
        .post(path)
        .send(wrongUserCredentials)
        .expect(expectedWrongStatus);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
