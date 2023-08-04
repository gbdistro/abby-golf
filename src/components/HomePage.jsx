"use client";

import { useState } from "react";

import List from "@/components/LocationsList";
import LocationsMap from "@/components/Map";

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row md:locations_map">
      <List isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <LocationsMap
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
}

export default HomePage;
