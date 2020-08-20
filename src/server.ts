import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import "./config/mongoose";
import UserRouter from "./components/user/UserRouter";
import { handleError } from "./tools/handleError";
import secure from "./middlewares/secure";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", UserRouter);

app.use("/api/test", (req, res) => {
  res.send("test");
});

app.use("/api/stest", secure, (req, res) => {
  res.send("secure test");
});

app.use("/api/tests", secure, (req, res) => {
  console.log(req.user);

  res.send("secure test");
});

app.use(handleError);

app.listen(process.env.PORT, () => console.log("App working"));
