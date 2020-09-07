import mongoose from "mongoose";

mongoose
  .connect(process.env.DB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB is connected"));
