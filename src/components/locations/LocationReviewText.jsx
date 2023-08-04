"use client";

import { useState } from "react";

// Separated into its own component since each review needs to hold its
// own state. Including this code directly into the LocationReviews will
// toggle every review to expand/collapse when clicking on just one of them.

const LocationReviewText = ({ text }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore((prev) => !prev);
  };
  return (
    <p className="mt-2 flex flex-col items-start">
      {isReadMore
        ? text
        : `${text.slice(0, 250)}${text.length > 250 ? "..." : ""}`}
      {text.length > 250 && (
        <button
          onClick={toggleReadMore}
          className="text-neutral-400 hover:underline underline-offset-1"
        >
          {isReadMore ? "show less" : "read more"}
        </button>
      )}
    </p>
  );
};

export default LocationReviewText;
