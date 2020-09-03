import mongoose from "mongoose";
import { ShoppingListInterface } from "./ShoppingListInterface";

const ShoppingListShema = new mongoose.Schema<ShoppingListInterface>(
  {
    name: String,
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    status: String,
  },
  { timestamps: true }
);

export default mongoose.model<ShoppingListInterface>(
  "ShoppingList",
  ShoppingListShema
);
