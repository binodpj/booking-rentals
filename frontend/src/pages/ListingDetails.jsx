import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data.jsx";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useSelector } from "react-redux";
import { GiHotSpices } from "react-icons/gi";
import Footer from "../components/Footer.jsx";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [bookingExist, setBookingExist] = useState(false);

  const { listingId } = useParams();

  const getListingDetails = async () => {
    try {
      const details = await fetch(
        `http://localhost:8000/api/listing/${listingId}`,
        {
          method: "GET",
        },
      );
      const data = await details.json();
      setListing(data);
      setLoading(false);
    } catch (error) {
      console.log(`Error fetching listing details, ${error.message}`);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24) + 1; // Calculate the difference in day unit

  //handle submit booking
  const customerId = useSelector((state) => state.user._id);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        hostId: listing.createdBy._id,
        listingId,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        price: listing.price * dayCount,
      };

      const response = await fetch(
        "http://localhost:8000/api/booking/create-booking",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(bookingForm),
        },
      );

      const data = await response.json();

      if (data.message === "already booked") {
        setBookingExist(true);
        return;
      }

      if (response.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (error) {
      console.log(`Booking failed, Error: ${error.message}`);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto w-[95%] lg:w-[80%]">
          <h2 className="my-8 text-3xl text-gray-800">{listing.title}</h2>
          <div className="flex flex-wrap justify-around gap-2 lg:justify-start lg:gap-8">
            {listing.listingImagePaths?.map((item, index) => (
              <div
                key={index}
                className="h-40 w-64 rounded-2xl lg:h-64 lg:w-80"
              >
                <img
                  src={`http://localhost:8000/${item.replace("public", "")}`}
                  alt="listing photos"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
            ))}
          </div>

          <div>
            <h2 className="mt-6 text-2xl">
              {listing.type}, {listing.city}, {listing.state}, {listing.country}
            </h2>
            <p className="mt-3 text-gray-600">
              {listing.guestCount} Guests, {listing.bedCount} Beds,{" "}
              {listing.bedroomCount} Bedrooms, {listing.bathroomCount} Bathrooms
            </p>
          </div>

          <hr className="my-4 text-gray-600" />
          <div className="flex items-center gap-6">
            <img
              src={`http://localhost:8000/${listing.createdBy.profileImageUrl.replace("public", "")}`}
              alt="Profile Pic"
              className="h-16 w-16 rounded-full object-cover shadow-2xl"
            />
            <p className="text-xl">Hosted By {listing.createdBy.name}</p>
          </div>
          <hr className="my-4 text-gray-600" />

          <div>
            <h2 className="mt-6 mb-4 text-2xl text-gray-800">Description</h2>
            <p className="text-gray-700">{listing.description}</p>
          </div>
          <hr className="my-4 text-gray-600" />
          <div>
            <h2 className="mt-6 mb-4 text-2xl text-gray-800">
              {listing.highlight}
            </h2>
            <p className="text-gray-700">{listing.highlightDetails}</p>
          </div>

          <div>
            <h2 className="mt-6 mb-4 text-2xl text-gray-800">
              What this place offers?
            </h2>
            <div className="flex flex-wrap gap-4">
              {listing.facilities[0].split(",").map((item, index) => (
                <div key={index} className="flex w-40 gap-2 lg:w-60">
                  <div className="text-2xl">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mt-6 mb-4 text-2xl text-gray-800">
              How long do you want to stay?
            </h2>
            <div className="flex flex-col items-center gap-10 md:flex-row">
              <div className="flex justify-center">
                <DateRange
                  ranges={dateRange}
                  onChange={handleSelect}
                  className="mx-auto"
                />
              </div>

              <div className="px-10">
                {dayCount > 1 ? (
                  <h2 className="mb-2 text-2xl">
                    Rs {listing.price} x {dayCount} nights
                  </h2>
                ) : (
                  <h2 className="mb-2 text-2xl">
                    Rs {listing.price} x {dayCount} night
                  </h2>
                )}

                <h2 className="mb-2 text-2xl">
                  Total price: Rs {listing.price * dayCount}
                </h2>
                <p className="text-gray-700">
                  Start Date: {dateRange[0].startDate.toDateString()}
                </p>
                <p className="text-gray-700">
                  End Date: {dateRange[0].endDate.toDateString()}
                </p>

                <button
                  className="mt-4 mb-4 cursor-pointer rounded-2xl bg-gray-700 px-4 py-2 text-lg text-white hover:bg-gray-900"
                  type="submit"
                  onClick={handleSubmit}
                >
                  BOOKING
                </button>
                {bookingExist && <p className="text-red-500">Already Booked</p>}
              </div>
            </div>
          </div>

          <div className="h-20"></div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ListingDetails;
