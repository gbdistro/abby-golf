"use client";

import Link from "next/link";
import { useState, useCallback, memo } from "react";
import {
  GoogleMap,
  InfoWindowF,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

import locations from "@/lib/locations.json";
import { mapConfig } from "@/lib/mapConfig";

import Controls from "./Controls";
import LocationReviews from "@/components/locations/LocationReviews";
import LocationImageGallery from "@/components/locations/LocationImageGallery";

const center = {
  lat: 34.2588171915625,
  lng: -92.58897345490621,
};

// This component is the map on the locations page that has all the location pins on it.
function LocationsMap({ isSidebarOpen, setIsSidebarOpen }) {
  const { isLoaded } = useJsApiLoader(mapConfig);
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const [zoom, setZoom] = useState(8.1);
  const [iconScale, setIconScale] = useState(50);
  const [fontSize, setFontSize] = useState(9);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (location, index) => {
    // DISABLED INFOWINDOW WHILE COMMENTED
    // setSelectedMarker(location);

    if (window?.innerWidth >= 768) {
      // Scroll location card into view without messing with browser history.
      // Tried using nextjs's useRouter hook, but it was causing full page refreshes
      // each time a map pin was clicked (only in production).
      // https://stackoverflow.com/a/37279489
      document.getElementById(index + 1).scrollIntoView(true);
    }
  };

  const handleSetZoom = (value) => {
    setZoom(value);
  };
  const handleSetIconScale = (value) => {
    setIconScale(value);
  };
  const handleSetFontSize = (value) => {
    setFontSize(value);
  };

  return isLoaded ? (
    <div className="flex flex-col w-full">
      <Controls
        showLabels={showLabels}
        setShowLabels={setShowLabels}
        zoom={zoom}
        setZoom={handleSetZoom}
        iconScale={iconScale}
        setIconScale={handleSetIconScale}
        fontSize={fontSize}
        setFontSize={handleSetFontSize}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <GoogleMap
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerClassName="w-full h-full"
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>
          {locations.map((loc, index) => (
            <Marker
              key={index}
              position={loc.position}
              icon={{
                url:
                  loc.type === "store"
                    ? "/abbydudedisc50px.png"
                    : "/disc-golf-goal.svg",
                fillOpacity: 0.9,
                scaledSize: { width: iconScale, height: iconScale },
              }}
              label={
                showLabels
                  ? {
                      text: `${loc.name}`,
                      fontSize: `${fontSize}pt`,
                      className:
                        "absolute bottom-0 translate-x-[-50%] text-black bg-neutral-200 p-1",
                    }
                  : null
              }
              title={loc.name}
              onClick={() => handleMarkerClick(loc, index)}
              className="relative"
            />
          ))}
          {selectedMarker && (
            <InfoWindowF
              position={selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="text-black flex flex-col gap-1">
                <h2 className="text-lg">{selectedMarker.name}</h2>
                <p>{selectedMarker.address}</p>
                <Link
                  href={`locations/${selectedMarker.slug}`}
                  className="link"
                >
                  View details
                </Link>
              </div>
            </InfoWindowF>
          )}
        </>
      </GoogleMap>
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-slate-900">
      <p className="text-white text-lg">Loading map...</p>
    </div>
  );
}

export default memo(LocationsMap);
