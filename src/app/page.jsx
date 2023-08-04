"use client";

import { useState } from "react";

import List from "@/components/locations/List";
import LocationsMap from "@/components/locations/LocationsMap";

export const metadata = {
  title: "Home | Mapper",
  description: "Discover places near you.",
};

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <section className="min-h-screen flex flex-col md:flex-row md:locations_map">
      <List isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <LocationsMap
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </section>
  );
}
