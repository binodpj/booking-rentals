import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "listing",
    },
    startDate: {
      type: String,
      required: Number,
    },
    endDate: {
      type: String,
      required: Number,
    },
    price: {
      type: Number,
      required: Number,
    },
  },
  { timestamps: true }
);

const Booking = model("booking", bookingSchema);

export default Booking;
