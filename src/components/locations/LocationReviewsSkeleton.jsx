import React from "react";

export default function LocationReviewsSkeleton() {
  const reviews = [1, 2, 3, 4, 5];
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start w-full">
      {reviews.map((review) => (
        <div
          key={review}
          className="outline outline-1 outline-slate-400 rounded-lg p-5 flex flex-col gap-5"
        >
          <div className="flex items-start gap-3">
            <div className="bg-neutral-400 rounded-full w-[50px] h-[50px] shrink-0 overflow-hidden animate-pulse" />

            <div className="flex flex-col w-full gap-1">
              <div className="w-1/2 h-3 bg-neutral-400 animate-pulse" />
              <div className="w-1/3 h-3 bg-neutral-400 animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="w-full h-3 bg-neutral-400 animate-pulse" />
            <div className="w-full h-3 bg-neutral-400 animate-pulse" />
            <div className="w-full h-3 bg-neutral-400 animate-pulse" />
            <div className="w-full h-3 bg-neutral-400 animate-pulse" />
            <div className="w-full h-3 bg-neutral-400 animate-pulse" />
          </div>

          <div className="w-6 h-2 bg-neutral-400 animate-pulse" />
        </div>
      ))}
    </div>
  );
}
