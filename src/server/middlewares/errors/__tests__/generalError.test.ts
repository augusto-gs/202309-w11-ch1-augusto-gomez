import { type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import generalError from "../errors";
import { type NextFunction } from "connect";

describe("Given a generalError controller", () => {
  describe("When it receives a response and an error with a status code 404", () => {
    test("Then it should call the status method of the response with a 404", () => {
      const error: CustomError = new CustomError("Endpoint not found", 404);

      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const req = {};
      const next = {};

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
