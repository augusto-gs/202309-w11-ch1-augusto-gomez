import { connectToDatabase } from "./database/index.js";
import { startServer } from "./server/app.js";
import "./server/index.js";
import debugCreator from "debug";

const debug = debugCreator(":robots:src:index");

const port = process.env.PORT ?? 4000;

if (!process.env.MONGODB_URL) {
  debug("Missing MongoDV Connection String");
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

await connectToDatabase(mongoUrl);

startServer(+port);
