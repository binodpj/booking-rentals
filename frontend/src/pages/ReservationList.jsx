import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
// import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);

  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `https://booking-rentals-api.vercel.app/api/${userId}/reservations`,
        {
          method: "GET",
        },
      );

      const data = await response.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="m-16 text-center text-4xl">Your Reservation List</h1>
      <div className="mx-32 flex flex-wrap justify-center gap-4 md:gap-12">
        {reservationList?.map(
          ({
            listingId,
            hostId,
            startDate,
            endDate,
            price,
            booking = true,
          }) => (
            <ListingCard
              key={listingId._id}
              listingId={listingId._id}
              createdBy={hostId._id}
              listingImagePaths={listingId.listingImagePaths}
              city={listingId.city}
              state={listingId.state}
              country={listingId.country}
              category={listingId.category}
              startDate={startDate}
              endDate={endDate}
              price={price}
              booking={booking}
            />
          ),
        )}
      </div>

      <Footer />
    </>
  );
};

export default ReservationList;
