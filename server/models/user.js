import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/uploads/default.png",
    },
    tripList: {
      type: Array,
      default: [],
    },
    wishList: {
      type: Array,
      default: [],
    },
    reservationList: {
      type: Array,
      default: [],
    },
    propertyList: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema);

export default User;
