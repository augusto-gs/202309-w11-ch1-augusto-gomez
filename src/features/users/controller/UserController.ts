import { type NextFunction, type Request, type Response } from "express";
import type UserMongooseRepository from "../repository/UsersMongooseRepository.js";
import { type JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { type UserCredentialStructure } from "../types.js";
import CustomError from "../../../server/CustomError/CustomError.js";

class UserController {
  constructor(private readonly userRepository: UserMongooseRepository) {}

  loginUser = async (
    req: UserCredentialStructure,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { username, password } = req.body;

      const user = await this.userRepository.getUser(username, password);
      const userData: JwtPayload = { sub: user._id, name: user.name };
      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY!);

      res.status(200).json({ token: { token } });
    } catch (error) {
      const userError = new CustomError("Wrong credentials", 404);
      next(userError);
    }
  };
}

export default UserController;
