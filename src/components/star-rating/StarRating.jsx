import React, { useState } from "react";

function StarRating({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const stars = new Array(noOfStars).fill(0);

  function handleMouseClick(index) {
    if (rating === ++index) {
      setRating(0);
      setHover(0);
      return;
    }
    setRating(index);
  }

  function handleMouseOver(index) {
    setHover(index + 1);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  console.log(rating, " ", hover);

  return (
    <div>
      {stars.map((_, index) => (
        <div
          key={index}
          className={`h-5 w-5 text-white border mr-1 rounded-full border-black inline-block ${
            hover > index ? "bg-[#fff700]" : ""
          }`}
          onClick={() => handleMouseClick(index)}
          onMouseOver={() => handleMouseOver(index)}
          onMouseLeave={() => handleMouseLeave()}
        ></div>
      ))}
    </div>
  );
}

export default StarRating;
