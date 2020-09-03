import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
  id: mongoose.Schema.Types.ObjectId;
  strategy: string;
  strategyId: string;
  name: string;
  photoURL: string;
  email: string;
  password: string;
}

const UserShema = new mongoose.Schema<UserInterface>(
  {
    strategy: String,
    strategyId: String,
    name: String,
    photoURL: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model<UserInterface>("User", UserShema);
