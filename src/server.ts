import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "./config/mongoose";
import UserRouter from "./components/User/UserRouter";
import { handleError } from "./tools/handleError";
import { secure } from "./middlewares/authorization";

const app = express();

app.use("/api/auth", UserRouter);

app.use("/api/test", (req, res) => {
  res.send("test");
});

app.use("/api/stest", secure, (req, res) => {
  res.send("secure test");
});

app.use(handleError);

app.listen(process.env.PORT, () => console.log("App working"));
