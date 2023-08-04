import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  const fields = ["reviews"];
  const reviewsType = body.reviewsType;
  const requestOptions = { method: "GET" };

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
      body.placeId
    }&fields=${fields.join("%2C")}&reviews_sort=${reviewsType}&key=${
      process.env.GOOGLE_PLACES_KEY
    }`,
    requestOptions
  );

  const data = await res.json();

  return NextResponse.json(data.result.reviews);
}
