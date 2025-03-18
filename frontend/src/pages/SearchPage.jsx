import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
// import Footer from "../components/Footer";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useParams();
  const listings = useSelector((state) => state.listings);

  const dispatch = useDispatch();

  const getSearchListings = async () => {
    try {
      const response = await fetch(
        `https://localhost:8000/api/listing/search/${search}`,
        {
          method: "GET",
        },
      );

      const data = await response.json();
      //console.log(data);
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="m-16 text-center text-4xl">{search}</h1>
      <div className="mx-32 flex flex-wrap justify-center gap-4 md:gap-12">
        {listings?.map(
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

export default SearchPage;
