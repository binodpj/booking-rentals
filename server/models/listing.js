import { Schema, model } from "mongoose";

const listingSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    apar_suite: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
      required: true,
    },
    bedCount: {
      type: Number,
      required: true,
    },
    bedroomCount: {
      type: Number,
      required: true,
    },
    bathroomCount: {
      type: Number,
      required: true,
    },
    facilities: {
      type: Array,
      default: [],
    },
    listingImagePaths: [{ type: String }],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    highlight: {
      type: String,
      required: true,
    },
    highlightDetails: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = model("listing", listingSchema);

export default Listing;
