import React from "react";

const Slide = () => {
  return (
    <div className="relative h-[70vh] w-full bg-[url(../assets/slide_bg.png)] bg-cover bg-center text-center">
      <div className="absolute z-0 h-full w-full bg-black opacity-25"></div>
      <p className="absolute top-10 z-10 h-full w-full text-center text-3xl text-white md:text-5xl">
        Welcome Home! Anywhere you roam, <br />
        Stay in the moment and make your memories.
      </p>
    </div>
  );
};

export default Slide;
