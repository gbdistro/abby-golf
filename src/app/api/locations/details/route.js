import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  // https://developers.google.com/maps/documentation/places/web-service/details#optional-parameters
  const fields = [
    "formatted_phone_number",
    "opening_hours",
    "rating",
    "user_ratings_total",
  ];

  const requestOptions = { method: "GET" };
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
      body.placeId
    }&fields=${fields.join("%2C")}&key=${process.env.GOOGLE_PLACES_KEY}`,
    requestOptions
  );

  const data = await res.json();

  return NextResponse.json(data.result);
}
