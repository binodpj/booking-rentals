import React, { useEffect, useState } from "react";
import { categories } from "../data.jsx";
import ListingCard from "./ListingCard";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state.js";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getListings = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        selectedCategory === "All"
          ? `https://localhost:8000/api/listing`
          : `https://localhost:8000/api/listing?category=${selectedCategory}`,
        { method: "GET" },
      );

      const responseJson = await response.json();
      dispatch(setListings({ listings: responseJson }));
      setLoading(false);
      //console.log(response);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    getListings();
  }, [selectedCategory]);

  return (
    <>
      {/* categories */}
      <div className="text-center">
        <h1 className="mt-16 text-4xl">Explore Top Categories</h1>
        <p className="px-8 py-6 text-lg lg:px-36">
          Explore our wode range of vacation rentals that cater to all types of
          travellers. Immerse yourself in the local culture, enjoy the confort
          of home and create unforgettable memories in your dream destination
        </p>
        <div className="flex flex-wrap justify-center gap-9 rounded-xl px-8 lg:px-36">
          {categories?.map((category, index) => (
            <Link to="" key={index}>
              <div
                onClick={() => setSelectedCategory(() => category.label)}
                className="relative h-14 w-20 md:h-20 md:w-28"
              >
                <img
                  src={category.img}
                  alt="image"
                  className="absolute z-0 h-full w-full rounded-xl"
                />
                <div className="z-10 h-full w-full rounded-xl bg-black opacity-30"></div>
                <div className="absolute top-0 left-0 z-20">
                  <div className="flex h-14 w-20 flex-col items-center justify-center rounded-xl text-lg text-white hover:text-gray-200 md:h-20 md:w-28">
                    <span>{category.icon}</span>
                    <span className="text-[12px] md:text-[16px]">
                      {category.label}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Listing Products */}
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="mt-16 text-center text-4xl">Explore Top Places</h1>
          <div className="mx-8 mt-16 flex flex-wrap justify-around gap-4 md:mx-32 md:gap-12">
            {listings.map(
              ({
                _id,
                listingImagePaths,
                createdBY,
                city,
                state,
                country,
                category,
                type,
                price,
                booking = false,
              }) => (
                <ListingCard
                  key={_id}
                  listingId={_id}
                  listingImagePaths={listingImagePaths}
                  createdBy={createdBY}
                  city={city}
                  state={state}
                  country={country}
                  category={category}
                  type={type}
                  price={price}
                  booking={booking}
                />
              ),
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Listings;
