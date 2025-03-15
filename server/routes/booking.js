import express from "express";
const router = express.Router();
import Booking from "../models/booking.js";

router.post("/create-booking", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, price } =
      req.body;

    const booking = await Booking.findOne({ listingId });
    if (booking) {
      return res.json({ message: "already booked" });
    }
    const newBooking = await Booking.create({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      price,
    });

    res.status(200).json(newBooking);
  } catch (err) {
    res
      .status(400)
      .json({ message: "failed in create booking", error: err.message });
  }
});

export default router;
