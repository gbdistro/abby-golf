"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { BsArrowsExpand, BsArrowsCollapse } from "react-icons/bs";

export default function LocationImageGallery({ location, images }) {
  const options = {};
  const [isFullHeight, setIsFullHeight] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const imageByIndex = (index) => images[index % images.length];

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <>
      <div className="overflow-hidden relative" ref={emblaMainRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={index}
              className={"flex-hero_carousel min-w-0 transition-all duration-200 ease-in ".concat(
                isFullHeight ? "max-h-[700px]" : "max-h-[400px]"
              )}
            >
              <Image
                key={index}
                src={imageByIndex(index)}
                alt={`${location} picture ${index + 1}`}
                priority
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-full object-cover object-top"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => setIsFullHeight((prev) => !prev)}
          className="group hidden lg:block absolute bottom-0 bg-slate-800/70 backdrop-blur-sm p-4 rounded-full mb-2 ml-2 text-white"
        >
          {isFullHeight ? (
            <div>
              <span className="hidden group-hover:block absolute bottom-full left-1/2 ml-[-32px] bg-black p-1">
                Collapse
              </span>
              <BsArrowsCollapse
                size={30}
                aria-label="minimize image"
                className="relative"
              />
            </div>
          ) : (
            <div>
              <span className="hidden group-hover:block absolute bottom-full left-1/2 ml-[-32px] bg-black p-1">
                Expand
              </span>
              <BsArrowsExpand
                size={30}
                aria-label="maximize image"
                className="relative"
              />
            </div>
          )}
        </button>
      </div>

      <div className="flex gap-2 mt-2" ref={emblaThumbsRef}>
        {images.map((image, index) => (
          <Thumb
            onClick={() => onThumbClick(index)}
            selected={index === selectedIndex}
            index={index}
            imgSrc={imageByIndex(index)}
            key={index}
          />
        ))}
      </div>
    </>
  );
}

const Thumb = (props) => {
  const { selected, imgSrc, index, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={"".concat(
        selected
          ? "outline outline-2 outline-slate-800 dark:outline-slate-200"
          : ""
      )}
    >
      <Image
        src={imgSrc}
        alt={`${location} picture ${index + 1}`}
        priority
        width="0"
        height="0"
        sizes="100vw"
        className="w-[200px] h-[auto] object-contain"
      />
    </button>
  );
};
