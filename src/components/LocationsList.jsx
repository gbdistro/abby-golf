import Image from "next/image";

import locations from "@/lib/locations.json";
import SvgComponent from "@/components/disc_golf_goal";

export default function List({ isSidebarOpen }) {
  return (
    <ul
      className={`hidden max-w-sm md:flex flex-col overflow-y-scroll scroll-smooth bg-slate-900 transition-all ease-in ${
        isSidebarOpen ? "w-full" : "w-0"
      }`}
    >
      {locations.map((loc, index) => (
        <li
          key={loc.name}
          id={index + 1}
          className="px-2 py-4 flex items-center gap-2 snap-start scroll-mt-5"
        >
          {loc.type === "store" ? (
            <Image
              src="/abbydudedisc50px.png"
              alt={loc.type}
              width={30}
              height={30}
              className="fill-white text-white"
            />
          ) : (
            <SvgComponent className="fill-slate-800 dark:fill-slate-300 w-[30px] h-[30px]" />
          )}
          <div>
            <h2 className="text-xl">{loc.name}</h2>
            <p>{loc.address}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
