import { type NextFunction, type Response } from "express";
import UserController from "../UserController";
import {
  type UserMongooseRepositoryStructure,
  type UserCredentialStructure,
} from "../../types";
import { userMock } from "../../mocks/userMock";
import jwt from "jsonwebtoken";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a UsersController loginUser method", () => {
  const mockUserWithoutName = {
    username: "augustogs",
    password: "$2a$10$bg1UhyIyFvluLjkLJfYybutfu3BqJo6vuH80ksqbJmPXRSBmzI4DG",
  };

  const token = "AHRTPIUHQR3PTIUY53PNTY";
  jwt.sign = jest.fn().mockReturnValue(token);

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const req: Pick<UserCredentialStructure, "body"> = {
    body: mockUserWithoutName,
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a response and an existent user", () => {
    const userRepository: Pick<UserMongooseRepositoryStructure, "getUser"> = {
      getUser: jest.fn().mockResolvedValue(userMock),
    };

    const userController = new UserController(userRepository);

    test("Then it should call status method of the response", async () => {
      const expectedStatusCode = 200;

      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the json method of the response with the token 'AHRTPIUHQR3PTIUY53PNTY'", async () => {
      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ token: { token } });
    });
  });

  describe("When it receives a request with an invalidated password and username", () => {
    const userRepository: Pick<UserMongooseRepositoryStructure, "getUser"> = {
      getUser: jest.fn().mockRejectedValue("errors"),
    };
    const userController = new UserController(userRepository);

    test("Then it should call the next method with an error 401", async () => {
      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
        next,
      );
      const expectedError = { message: "Wrong credentials", statusCode: 401 };

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });

    test("Then it should call the json method of the response with an error message", async () => {
      const expectedError: Partial<CustomError> = {
        message: "Wrong credentials",
        statusCode: 401,
      };

      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
