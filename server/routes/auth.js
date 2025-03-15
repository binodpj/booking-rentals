import express from "express";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import multer from "multer";
import bcrypt from "bcryptjs";

import User from "../models/user.js";

const router = express.Router();

//multer configuration

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const imageName = Date.now() + file.originalname;
    cb(null, imageName);
  },
});
const upload = multer({ storage });

//user router

//api to create account
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const profileImage = req.file;

    let profileImageUrl = "/uploads/default.png";

    if (profileImage) {
      profileImageUrl = req.file.path;
    }

    //if if there is existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in /register:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//api for login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exixts
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    //compare with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Incorrect Password" });
    }

    //create token
    const token = JWT.sign({ id: user._id }, process.env.JWT_TOKEN);
    delete user.toObject().password; //password deleted from object before returning to frontend
    res.status(200).json({ token, user });
    //return res.cookie("token", token).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
