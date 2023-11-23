import "dotenv/config";
import { type NextFunction, type Response } from "express";
import type UserMongooseRepository from "../repository/UsersMongooseRepository.js";
import { type JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { type UserCredentialStructure } from "../types.js";
import CustomError from "../../../server/CustomError/CustomError.js";
import debugCreator from "debug";

const debug = debugCreator("robots:features:controller");

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
      debug(error.message);
      const userError = new CustomError("Wrong credentials", 401);
      next(userError);
    }
  };
}

export default UserController;
