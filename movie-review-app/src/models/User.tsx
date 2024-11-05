import mongoose from "mongoose";


export interface User {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<User>("User", userSchema);
export default User;
