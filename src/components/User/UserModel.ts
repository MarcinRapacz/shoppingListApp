import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
  strategy: string;
  strategyId: string;
  name: string;
  photoURL: string;
  email: string;
}

const UserShema = new mongoose.Schema<UserInterface>(
  {
    strategy: String,
    strategyId: String,
    name: String,
    photoURL: String,
    email: String,
  },
  { timestamps: true }
);

export default mongoose.model<UserInterface>("user", UserShema);
