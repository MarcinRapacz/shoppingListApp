import mongoose from "mongoose";
import { ShoppingListInterface } from "./ShoppingListInterface";

const ShoppingListShema = new mongoose.Schema<ShoppingListInterface>(
  {
    name: String,
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    products: [
      {
        name: String,
        status: String,
      },
    ],
    status: String,
  },
  { timestamps: true }
);

export default mongoose.model<ShoppingListInterface>(
  "shoppingList",
  ShoppingListShema
);
