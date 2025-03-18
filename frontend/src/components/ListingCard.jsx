import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const ListingCard = ({
  listingId,
  createdBy = {},
  listingImagePaths = [],
  city,
  state,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  booking,
}) => {
  /* SLIDER FOR IMAGES */
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingImagePaths.length) % listingImagePaths.length,
    );
  };

  const goToNextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingImagePaths.length);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ADD TO WISHLIST */
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];
  const isLiked = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if (user?._id !== createdBy._id) {
      const response = await fetch(
        `https://localhost:8000/api/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    }
  };

  return (
    <div
      className="relative mx-auto w-full max-w-76 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg"
      onClick={() => navigate(`/listing/${listingId}`)}
    >
      {/* Heart Button - Top Right */}
      <button
        className="absolute top-3 right-3 z-10 rounded-full bg-gray-500 px-1 shadow-md hover:bg-black"
        onClick={(e) => {
          e.stopPropagation();
          patchWishList();
        }}
        disabled={!user}
      >
        <FontAwesomeIcon
          icon={faHeart}
          className={isLiked ? "text-red-600" : "text-white"}
        />
      </button>

      {/* Image Slider */}
      <div className="relative h-60 w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingImagePaths.map((photo, index) => (
            <img
              key={index}
              src={`https://localhost:8000/${photo.replace("public", "")}`}
              alt={`photo ${index + 1}`}
              className="h-60 w-full flex-shrink-0 object-cover"
            />
          ))}
        </div>

        {/* Left Navigation Button */}
        <button
          className="bg-opacity-50 absolute top-1/2 left-3 -translate-y-1/2 transform rounded-full bg-gray-500 px-2 py-1 hover:bg-black"
          onClick={goToPrevSlide}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
        </button>

        {/* Right Navigation Button */}
        <button
          className="bg-opacity-50 absolute top-1/2 right-3 -translate-y-1/2 transform rounded-full bg-gray-500 px-2 py-1 hover:bg-black"
          onClick={goToNextSlide}
        >
          <FontAwesomeIcon icon={faArrowRight} className="text-white" />
        </button>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {city}, {state}, {country}
        </h3>
        <p className="text-gray-500">{category}</p>

        {!booking ? (
          <>
            <p className="text-sm text-gray-700">{type}</p>
            <p className="text-lg font-semibold">
              Rs {price}{" "}
              <span className="text-sm text-gray-500">per night</span>
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-700">
              {startDate} - {endDate}
            </p>
            <p className="text-lg font-semibold">
              Rs {price}{" "}
              <span className="text-sm text-gray-500">total price</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
