import "dotenv/config";
import helmet from "helmet";
import chalk from "chalk";
import express from "express";
import debugCreator from "debug";

const debug = debugCreator("robots:server:middlewares:app");

const app = express();
app.use(helmet());

export const startServer = (port: number) => {
  app.listen(+port, () => {
    debug(chalk.green(`Server is listening on PORT ${port}`));
  });
};

export default app;
