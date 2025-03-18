import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listing.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

//middlewares

app.use();
app.use(express.json());
app.use(express.static("public"));

// mongoose setup

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(`Error: ${err}`));

//routes

app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api", userRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server Started at PORT: ${process.env.PORT}`)
);
