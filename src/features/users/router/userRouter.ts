import { Router } from "express";
import UserController from "../controller/UserController.js";
import UserMongooseRepository from "../repository/UsersMongooseRepository.js";

export const userRouter = Router();

const userRepository = new UserMongooseRepository();
const userController = new UserController(userRepository);

userRouter.post("/login", userController.loginUser);
