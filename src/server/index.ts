import "dotenv/config";
import morgan from "morgan";
import app from "./app.js";
import pingRouter from "../features/ping/router/pingRouter.js";
import transformersRouter from "../features/transformer/router/transformersRouter.js";
import { generalError, endpointNotFound } from "./middlewares/errors/errors.js";
import cors from "cors";
import { userRouter } from "../features/users/router/userRouter.js";
import express from "express";

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://two02309-w10chwe-augusto-gomez-ivan.onrender.com",
      "https://two02309-w10chwe-augusto-gomez-ivan.onrender.com/robots",
    ],
  }),
);

app.use("/", transformersRouter);
app.use("/", pingRouter);
app.use("/", userRouter);
app.use(endpointNotFound);
app.use(generalError);
