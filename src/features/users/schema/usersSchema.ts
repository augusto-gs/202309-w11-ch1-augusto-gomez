import { Joi, validate } from "express-validation";
import { type UserStructure } from "../types";

const userSchema = {
  body: Joi.object<Omit<UserStructure, "id">>({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const userValidation = validate(userSchema, {}, { abortEarly: false });

export default userValidation;
