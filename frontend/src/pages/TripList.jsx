import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import Footer from "../components/Footer";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const tripList = useSelector((state) => state.user.tripList);
  const userId = useSelector((state) => state.user._id);

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://localhost:8000/api/${userId}/trips`,
        {
          method: "GET",
        },
      );
      const data = await response.json();

      dispatch(setTripList(data));
      //console.log(tripList);
      setLoading(false);
    } catch (error) {
      console.log(`Error getting trip list, Error: ${error.message}`);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="m-16 text-center text-4xl">Explore Your Trip Lists</h1>
          <div className="mx-32 flex flex-wrap justify-center gap-4 md:gap-12">
            {tripList?.map(
              ({ listingId, startDate, endDate, price, booking = true }) => (
                <ListingCard
                  key={listingId._id}
                  listingId={listingId._id}
                  listingImagePaths={listingId.listingImagePaths}
                  city={listingId.city}
                  state={listingId.state}
                  country={listingId.country}
                  price={price}
                  startDate={startDate}
                  endDate={endDate}
                  booking={booking}
                />
              ),
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default TripList;
