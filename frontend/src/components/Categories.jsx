import React from "react";
import { categories } from "../data.jsx";
import { Link } from "react-router-dom";


const Categories = () => {

  return (
    <div className="text-center">
      <h1 className="mt-20 text-4xl">Explore Top Categories</h1>
      <p className="px-8 py-10 text-lg lg:px-36">
        Explore our wode range of vacation rentals that cater to all types of
        travellers. Immerse yourself in the local culture, enjoy the confort of
        home and create unforgettable memories in your dream destination
      </p>
      <div className="flex flex-wrap justify-center gap-9 rounded-xl px-8 lg:px-36">
        {categories?.map((category, index) => (
          <Link to="" key={index}>
            <div className="relative h-36 w-36 lg:h-64 lg:w-64">
              <img
                src={category.img}
                alt="image"
                className="absolute z-0 h-full w-full rounded-xl"
              />
              <div className="z-10 h-full w-full rounded-xl bg-black opacity-30"></div>
              <div className="absolute top-0 left-0 z-20">
                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-xl text-lg text-white hover:text-gray-200 lg:h-64 lg:w-64 lg:text-2xl">
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Categories;
