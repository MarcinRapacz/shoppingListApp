import mongoose from "mongoose";
import { IProduct } from "./IProduct";

const ProductShema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductShema);
