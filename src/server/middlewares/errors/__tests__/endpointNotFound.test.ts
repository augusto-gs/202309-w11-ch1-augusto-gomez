import { type NextFunction, type Request, type Response } from "express";
import { endpointNotFound } from "../errors";
import type CustomError from "../../../CustomError/CustomError";

describe("Given endpointNotFound middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the next function with a 404 status and a 'Endpoint not found error", () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      const expectedError: Partial<CustomError> = {
        statusCode: 404,
        message: "Endpoint not found",
      };

      endpointNotFound(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
