import { type Request, type Response } from "express";
import type UserMongooseRepository from "../../repository/UsersMongooseRepository";
import UserController from "../UserController";

describe("Given a UsersController loginUser method", () => {
  describe("When it receives a response and an existent user", () => {
    test("Then it should call status method of the response", async () => {
      const expectedStatusCode = 200;
      const mockUser = {
        _id: "123123",
        name: "Carlos",
        username: "pepito",
        password: "1234",
      };
      const userRepository: Pick<UserMongooseRepository, "getUser"> = {
        getUser: jest.fn().mockResolvedValue(mockUser),
      };

      const req: Pick<Request, "body"> = {
        body: jest.fn().mockReturnValue(mockUser),
      };
      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const userController = new UserController(
        userRepository as UserMongooseRepository,
      );

      await userController.loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          { username: string; password: string }
        >,
        res as Response,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
