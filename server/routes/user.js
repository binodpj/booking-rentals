import express from "express";
const router = express.Router();
import booking from "../models/booking.js";
import User from "../models/user.js";
import Listing from "../models/listing.js";

//getting trip list
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await booking
      .find({ customerId: userId })
      .populate("customerId hostId listingId");
    res.status(200).json(trips);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed getting trips", error: error.message });
  }
});

// ADD LISTING TO WISHLIST
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("createdBy");

    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        message: "Listing is removed from wish list",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "Listing is added to wish list",
        wishList: user.wishList,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
});

// GET PROPERTY LIST
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ createdBy: userId }).populate(
      "createdBy"
    );
    //console.log(properties);
    res.status(202).json(properties);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find properties!", error: err.message });
  }
});

// GET RESERVATION LIST
router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await booking
      .find({ hostId: userId })
      .populate("customerId hostId listingId");
    res.status(202).json(reservations);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find reservations!", error: err.message });
  }
});

export default router;
