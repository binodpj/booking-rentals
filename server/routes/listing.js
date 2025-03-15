import express from "express";
const router = express.Router();
import User from "../models/user.js";
import Listing from "../models/listing.js";

import mongoose from "mongoose";
import multer from "multer";

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

//create new listing
router.post(
  "/create-listing",
  upload.array("listingImages"),
  async (req, res) => {
    try {
      const {
        createdBy,
        category,
        type,
        streetAddress,
        apar_suite,
        city,
        state,
        country,
        bedCount,
        guestCount,
        bedroomCount,
        bathroomCount,
        facilities,
        title,
        description,
        highlight,
        highlightDetails,
        price,
      } = req.body;

      const listingImages = req.files;
      if (!listingImages || listingImages.length === 0) {
        return res.status(400).send("No file uploaded");
      }

      const listingImagePaths = listingImages.map((file) => file.path);

      const newListing = await Listing.create({
        createdBy,
        category,
        type,
        streetAddress,
        apar_suite,
        city,
        state,
        country,
        bedCount,
        guestCount,
        bedroomCount,
        bathroomCount,
        facilities,
        listingImagePaths,
        title,
        description,
        highlight,
        highlightDetails,
        price,
      });

      res.status(200).json(newListing);
    } catch (error) {
      res
        .status(409)
        .json({ message: "Failed to create listing", error: error.message });
    }
  }
);

//get all listings or listings by category
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "createdBy"
      );
    } else {
      listings = await Listing.find({}).populate("createdBy");
    }

    res.status(200).json(listings);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Failed to fetch listing", error: error.message });
  }
});

//get listing details
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listingDetail = await Listing.findById(listingId).populate(
      "createdBy"
    );
    res.status(202).json(listingDetail);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;
  //console.log(search);
  try {
    let listings = [];

    if (!search || search === "all") {
      listings = await Listing.find().populate("createdBy");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
          { state: { $regex: search, $options: "i" } },
          { country: { $regex: search, $options: "i" } },
        ],
      }).populate("createdBy");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

export default router;
