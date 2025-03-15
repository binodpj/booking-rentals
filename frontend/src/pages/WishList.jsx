import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
// import Footer from "../components/Footer";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <Navbar />
      <h1 className="m-16 text-center text-4xl">Your Wish List</h1>
      <div className="mx-4 flex flex-wrap justify-center gap-4 md:mx-10 md:gap-12">
        {wishList?.map(
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

export default WishList;
