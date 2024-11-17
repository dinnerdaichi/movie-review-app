import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// ログイン
router.post("/login", async (req, res):Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ success: false, message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY as string, { expiresIn: "1h" });
    console.log("Generated token:", token);

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
});

router.get("/user-info", async (req:Request, res:Response):Promise<void> => {
  const token = (req.headers as {authorization?:string}).authorization?.split(" ")[1];

  if (!token) {
    (res.status(401) as Response).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY as string) as jwt.JwtPayload;
    const userId = decoded.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ username: user.username,userId:user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user information" });
  }
});

export default router;
