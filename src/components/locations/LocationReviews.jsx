"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LocationReviewText from "./LocationReviewText";
import LocationReviewsSkeleton from "./LocationReviewsSkeleton";

const LocationReviews = ({ googlePlaceId, rating, total_ratings }) => {
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewsType, setReviewsType] = useState("most_relevant");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function handleFetchReviews() {
      try {
        setIsLoadingReviews(true);
        // Add your logic to submit to your backend server here.
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            placeId: googlePlaceId,
            reviewsType: reviewsType,
          }),
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/locations/reviews`,
          requestOptions
        );

        const result = await response.json();
        setReviews(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingReviews(false);
      }
    }
    handleFetchReviews();
  }, [googlePlaceId, reviewsType]);

  return (
    <section className="flex flex-col gap-3 items-start">
      <div className="">
        <h2 className="text-2xl">Google Reviews</h2>
        <p className="text-neutral-400">
          {rating} / 5 from {total_ratings} reviews
        </p>
      </div>

      <select
        name="reviews-type"
        id="reviews-type"
        onChange={(e) => setReviewsType(e.target.value)}
        className="py-1 px-2 text-black dark:text-white bg-neutral-200 dark:bg-neutral-600"
      >
        <option value="most_relevant">Most Relevant</option>
        <option value="newest">Newest</option>
      </select>

      {isLoadingReviews ? (
        <LocationReviewsSkeleton />
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {reviews.map((review) => (
            <div
              key={review.author_url}
              className="outline outline-1 outline-slate-400 rounded-lg p-5"
            >
              <div className="flex items-start gap-3">
                <Image
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  width={50}
                  height={50}
                />

                <div className="flex flex-col">
                  <h3 className="text-lg">{review.author_name}</h3>
                  <p>{review.rating} / 5</p>
                </div>
              </div>

              <LocationReviewText text={review.text} />

              <p className="text-slate-600/70 dark:text-slate-300/70 mt-2">
                {review.relative_time_description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LocationReviews;
