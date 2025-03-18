import {
  faBars,
  faMagnifyingGlass,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="flex h-14 w-full items-center justify-between border-b-1 border-gray-200 px-6 lg:px-14">
      <a href="/" className="text-xl font-semibold">
        <span>RentYourPlace</span>
      </a>

      {/* search div */}
      <div
        id="Navbar-search"
        className="hidden rounded-4xl border px-4 py-1.5 md:block"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border-none focus:outline-none"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="cursor-pointer text-gray-600 hover:text-gray-400"
          onClick={() => navigate(`/search/${search}`)}
        />
      </div>

      <div className="flex items-center gap-6">
        {user ? (
          <Link
            to={"/create-listing"}
            className="hidden hover:text-gray-500 sm:block"
          >
            Become a host
          </Link>
        ) : (
          <Link to={"/login"} className="hidden hover:text-gray-500 sm:block">
            Become a host
          </Link>
        )}

        <button
          onClick={() => setDropdownMenu((prev) => !prev)}
          className="flex cursor-pointer items-center gap-2 rounded-4xl border border-gray-400 px-2 py-1"
        >
          <FontAwesomeIcon icon={faBars} className="text-xl text-gray-500" />
          {user ? (
            <img
              src={`https://booking-rentals-api.vercel.app/${user.profileImageUrl.replace("public", "")}`}
              alt="profile photo"
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <FontAwesomeIcon icon={faUser} className="text-gray-500" />
          )}
        </button>
      </div>

      {dropdownMenu && !user && (
        <div className="absolute top-16 right-16 z-50 flex flex-col rounded-2xl border border-gray-300 bg-gray-100 opacity-90">
          <FontAwesomeIcon
            icon={faXmark}
            className="relative top-1 left-8 cursor-pointer"
            onClick={() => setDropdownMenu(false)}
          />
          <Link to={"/login"} className="px-5 py-1.5 hover:bg-gray-300">
            Log In
          </Link>
          <Link
            to={"/register"}
            className="rounded-b-2xl px-5 pt-1.5 pb-3 hover:bg-gray-300"
          >
            Sign Up
          </Link>
        </div>
      )}
      {dropdownMenu && user && (
        <div className="absolute top-16 right-16 z-50 flex flex-col rounded-2xl border border-gray-300 bg-gray-100 opacity-90">
          <FontAwesomeIcon
            icon={faXmark}
            className="relative top-2 left-14 cursor-pointer hover:text-gray-600"
            onClick={() => setDropdownMenu(false)}
          />
          <Link
            to={`/${user._id}/trips`}
            className="px-5 py-1.5 hover:bg-gray-300"
          >
            Trip List
          </Link>
          <Link
            to={`/${user._id}/wishList`}
            className="px-5 py-1.5 hover:bg-gray-300"
          >
            Wish List
          </Link>
          <Link
            to={`/${user._id}/reservation`}
            className="px-5 py-1.5 hover:bg-gray-300"
          >
            Reservation List
          </Link>
          <Link
            to={"/create-listing"}
            className="px-5 py-1.5 hover:bg-gray-300"
          >
            Become a Host
          </Link>
          <Link
            to={`/${user._id}/propertyList`}
            className="px-5 py-1.5 hover:bg-gray-300"
          >
            Property List
          </Link>
          <Link
            to="/login"
            onClick={() => dispatch(setLogout())}
            className="rounded-b-2xl px-5 pt-1.5 pb-3 hover:bg-gray-300"
          >
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
