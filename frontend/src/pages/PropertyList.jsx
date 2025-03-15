import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
// import Footer from "../components/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;
  //console.log(user);

  const dispatch = useDispatch();
  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/${user._id}/properties`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      //console.log(data);
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="m-16 text-center text-4xl">Your Property List</h1>
      <div className="mx-4 flex flex-wrap justify-center gap-4 md:mx-10 md:gap-12">
        {propertyList?.map(
          ({
            _id,
            createdBy,
            listingImagePaths,
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
              createdBy={createdBy}
              listingImagePaths={listingImagePaths}
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

      <Footer />
    </>
  );
};

export default PropertyList;
