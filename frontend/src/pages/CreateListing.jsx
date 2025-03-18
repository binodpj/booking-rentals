import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  IoMdAddCircleOutline,
  IoMdRemoveCircleOutline,
  IoIosImages,
} from "react-icons/io";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { categories, types, facilities } from "../data.jsx";
import { Provider, useSelector } from "react-redux";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const CreateListing = () => {
  //handle categories
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  //basics i.e beds, guests, bedrooms and bathrooms
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  //handling address
  const [address, setAddress] = useState({
    streetAddress: "",
    apar_suite: "",
    city: "",
    state: "",
    country: "",
  });
  const handleAddress = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  //console.log(address);

  //facillities
  const [facility, setFacility] = useState([]);
  const handleFacilityChange = (name) => {
    setFacility((prevFacility) =>
      prevFacility.includes(name)
        ? prevFacility.filter((item) => item !== name)
        : [...prevFacility, name],
    );
  };

  //functions to handle upload and drage photos
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhotos = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);
    setPhotos(items);
  };

  const handleRemovePhotos = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((photos, index) => index !== indexToRemove),
    );
  };

  //description handling
  const [description, setDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDetails: "",
    price: 100,
  });
  const handleDescription = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setDescription((prevDescription) => ({
      ...prevDescription,
      [name]: value,
    }));
  };
  //console.log(description);

  //handle form submission
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user._id);

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const listingForm = new FormData();
      listingForm.append("createdBy", userId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", address.streetAddress);
      listingForm.append("apar_suite", address.apar_suite);
      listingForm.append("city", address.city);
      listingForm.append("state", address.state);
      listingForm.append("country", address.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("facilities", facility);
      listingForm.append("title", description.title);
      listingForm.append("description", description.description);
      listingForm.append("highlight", description.highlight);
      listingForm.append("highlightDetails", description.highlightDetails);
      listingForm.append("price", description.price);

      //append images paths
      photos.forEach((photo) => {
        listingForm.append("listingImages", photo);
      });

      //send post request
      const response = await fetch(
        "http://localhost:8000/api/listing/create-listing",
        {
          method: "POST",
          body: listingForm,
        },
      );

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-10 md:px-40">
        <h1 className="my-8 text-3xl text-gray-800">Publish Your Place</h1>

        <form onSubmit={handlePost}>
          <div className="rounded-4xl bg-gray-50 p-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-600">
              Step 1: Tell us about your place
            </h2>
            <hr />
            <p className="my-4 text-lg font-semibold text-gray-600">
              Which of there categories best describes your place?
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {categories.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setCategory(item.label)}
                  className={`flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-400 hover:border-black ${category === item.label ? "selected" : ""} `}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="my-6 text-lg font-semibold text-gray-600">
                What type of place will guest have?
              </p>
              <div className="flex flex-wrap gap-6">
                {types.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setType(item.name)}
                    className={`flex w-md cursor-pointer items-center justify-between gap-10 rounded-2xl border-1 border-gray-300 px-4 py-2 hover:border-black ${type === item.name ? "selected" : ""}`}
                  >
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-sm text-gray-500">
                        {item.description}
                      </span>
                    </div>
                    <div>
                      <span className="text-2xl">{type.icon}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <p className="my-4 text-lg font-semibold text-gray-600">
                Where is your place located?
              </p>
              <div className="flex w-[90%] flex-col gap-1 sm:w-[70%]">
                <label htmlFor="streetAddress">Street Address</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={address.streetAddress}
                  onChange={handleAddress}
                  placeholder="Street Address"
                  className="rounded-xl border-1 border-gray-400 px-4 py-2"
                  required
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-6">
                <div className="flex w-[90%] flex-col gap-1 sm:w-[40%]">
                  <label htmlFor="apar_suite">Aparment, Suite, etc</label>
                  <input
                    type="text"
                    id="apar_suite"
                    name="apar_suite"
                    value={address.apar_suite}
                    onChange={handleAddress}
                    placeholder="Aparment, Suite, etc"
                    className="rounded-xl border-1 border-gray-400 px-4 py-2"
                  />
                </div>
                <div className="flex w-[90%] flex-col gap-1 sm:w-[40%]">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleAddress}
                    placeholder="City"
                    className="rounded-xl border-1 border-gray-400 px-4 py-2"
                    required
                  />
                </div>
                <div className="flex w-[90%] flex-col gap-1 sm:w-[40%]">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={address.state}
                    onChange={handleAddress}
                    placeholder="State"
                    className="rounded-xl border-1 border-gray-400 px-4 py-2"
                    required
                  />
                </div>
                <div className="flex w-[90%] flex-col gap-1 sm:w-[40%]">
                  <label htmlFor="Country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={address.country}
                    onChange={handleAddress}
                    placeholder="Country"
                    className="rounded-xl border-1 border-gray-400 px-4 py-2"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <p className="my-4 text-lg font-semibold text-gray-600">
                Share some basics about your place
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-4 rounded-xl border-1 border-gray-400 px-4 py-2 hover:border-black">
                  <p className="text-sm text-gray-700">Guests</p>
                  <div className="flex items-center gap-1">
                    <IoMdRemoveCircleOutline
                      onClick={() =>
                        guestCount > 1 && setGuestCount((prev) => prev - 1)
                      }
                      className="cursor-pointer hover:text-gray-500"
                    />
                    <p>{guestCount}</p>
                    <IoMdAddCircleOutline
                      onClick={() => setGuestCount((prev) => prev + 1)}
                      className="cursor-pointer hover:text-gray-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border-1 border-gray-400 px-4 py-2 hover:border-black">
                  <p className="text-sm text-gray-700">Bedrooms</p>
                  <div className="flex items-center gap-1">
                    <IoMdRemoveCircleOutline
                      onClick={() =>
                        bedroomCount > 1 && setBedroomCount((prev) => prev - 1)
                      }
                      className="cursor-pointer hover:text-gray-500"
                    />
                    <p>{bedroomCount}</p>
                    <IoMdAddCircleOutline
                      onClick={() => setBedroomCount((prev) => prev + 1)}
                      className="cursor-pointer hover:text-gray-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border-1 border-gray-400 px-4 py-2 hover:border-black">
                  <p className="text-sm text-gray-700">Beds</p>
                  <div className="flex items-center gap-1">
                    <IoMdRemoveCircleOutline
                      onClick={() =>
                        bedCount > 1 && setBedCount((prev) => prev - 1)
                      }
                      className="cursor-pointer hover:text-gray-500"
                    />
                    <p>{bedCount}</p>
                    <IoMdAddCircleOutline
                      onClick={() => setBedCount((prev) => prev + 1)}
                      className="cursor-pointer hover:text-gray-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border-1 border-gray-400 px-4 py-2 hover:border-black">
                  <p className="text-sm text-gray-700">Bathrooms</p>
                  <div className="flex items-center gap-1">
                    <IoMdRemoveCircleOutline
                      onClick={() =>
                        bathroomCount > 1 &&
                        setBathroomCount((prev) => prev - 1)
                      }
                      className="cursor-pointer hover:text-gray-500"
                    />
                    <p>{bathroomCount}</p>
                    <IoMdAddCircleOutline
                      onClick={() => setBathroomCount((prev) => prev + 1)}
                      className="cursor-pointer hover:text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-4xl bg-gray-50 p-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-600">
              Step 2: Make your place stand out
            </h2>
            <hr />
            <div>
              <p className="py-4 text-lg font-semibold text-gray-600">
                What your place has to offer
              </p>
              <div className="flex flex-wrap gap-6">
                {facilities.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleFacilityChange(item.name)}
                    className={`${facility.includes(item.name) ? "selected" : ""} flex h-14 w-28 cursor-pointer flex-col items-center justify-center rounded-xl border-1 border-gray-400 text-[11px] text-gray-700 hover:border-black hover:text-black md:h-16 md:w-40 md:text-[14px]`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <p className="py-4 text-lg font-semibold text-gray-600">
                Add some photos of your place
              </p>
              <DragDropContext onDragEnd={handleDragPhotos}>
                <Droppable droppableId="photos" direction="horizontal">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {photos.length < 1 && (
                        <div className="h-40 w-56 rounded-2xl border-2 border-dashed border-gray-500 text-gray-700 md:w-md">
                          <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleUploadPhotos}
                            className="hidden"
                            multiple
                          />
                          <label
                            htmlFor="image"
                            className="flex flex-col items-center gap-2 pt-10"
                          >
                            <IoIosImages className="text-5xl" />
                            <p>Upload from your device</p>
                          </label>
                        </div>
                      )}

                      {photos.length >= 1 && (
                        <div className="flex flex-wrap gap-4">
                          {photos.map((photo, index) => (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="relative h-40 w-56"
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place images"
                                    className="object-cover"
                                  />
                                  <button
                                    onClick={() => handleRemovePhotos(index)}
                                    className="absolute top-0 right-0 bg-gray-300 p-1"
                                  >
                                    <BiTrash className="cursor-pointer text-lg hover:text-xl" />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          <div className="h-40 w-56 rounded-2xl border-2 border-dashed border-gray-500 text-gray-700">
                            <input
                              type="file"
                              id="image"
                              accept="image/*"
                              onChange={handleUploadPhotos}
                              className="hidden"
                              multiple
                            />
                            <label
                              htmlFor="image"
                              className="flex flex-col items-center gap-2 pt-10"
                            >
                              <IoIosImages className="text-5xl" />
                              <p>Upload from your device</p>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <div className="mt-10">
              <p className="py-4 text-lg font-semibold text-gray-600">
                What makes your place attractive?
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={description.title}
                    onChange={handleDescription}
                    placeholder="Title"
                    className="lg:w[70%] w-[90%] rounded-lg border-1 border-gray-400 px-4 py-2 sm:w-[80%]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    value={description.description}
                    onChange={handleDescription}
                    placeholder="Description"
                    className="lg:w[70%] w-[90%] rounded-lg border-1 border-gray-400 px-4 py-2 sm:w-[80%]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="highlight">Highlight</label>
                  <input
                    type="text"
                    id="highlight"
                    name="highlight"
                    value={description.highlight}
                    onChange={handleDescription}
                    placeholder="Highlight"
                    className="lg:w[70%] w-[90%] rounded-lg border-1 border-gray-400 px-4 py-2 sm:w-[80%]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="highlightDetails">Highlight details</label>
                  <textarea
                    type="text"
                    id="highlightDetails"
                    name="highlightDetails"
                    value={description.highlightDetails}
                    onChange={handleDescription}
                    placeholder="Highlight details"
                    className="lg:w[70%] w-[90%] rounded-lg border-1 border-gray-400 px-4 py-2 sm:w-[80%]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="price">Set your price per night</label>
                  <div className="flex items-center gap-2">
                    <p className="text-lg">Rs</p>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={description.price}
                      onChange={handleDescription}
                      placeholder="100"
                      className="rounded-lg border-1 border-gray-500 px-4 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 mb-20 ml-4 cursor-pointer rounded-2xl bg-gray-700 px-4 py-2 text-lg text-white hover:bg-gray-900"
          >
            Create Your Listing
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateListing;
