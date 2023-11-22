import { type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import generalError from "../errors";
import { type NextFunction } from "connect";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError controller", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const req = {};
  const next = {};
  describe("When it receives a response and an error with a status code 404", () => {
    const error: CustomError = new CustomError("Endpoint not found", 404);

    test("Then it should call the status method of the response with a 404", () => {
      const expectedStatusCode = 404;

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the json method of the response with a an 'Endpoint not found'", () => {
      const expectedError = { error: "Endpoint not found" };

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a response without a status code", () => {
    test("Then it should call its status method with a 500", () => {
      const error = new Error("Error without status code");
      const expectedError = 500;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedError);
    });

    test("Then it should call its json method with a 'General error'", () => {
      const expectedError = { statusCode: 404, message: "General error" };

      generalError(
        expectedError as CustomError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ error: "General error" });
    });
  });
});
