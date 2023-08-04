// Had to separate this into a standalone 'constant'
// https://github.com/JustFly1984/react-google-maps-api/issues/238
//
// Update:
// This was needed to load the places library, but it turns out
// that I don't get the option between loading the 'most_relevant'
// or 'newest' reviews client side.
// Will leave this config here anyway.

export const mapConfig = {
  id: "google-map-script",
  googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY,
  // libraries: ["places"],
};
