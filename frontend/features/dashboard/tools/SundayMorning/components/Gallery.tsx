import React from "react";
import { useInView } from "../hooks/useInView";

import img1 from "../../../../../assets/albums/SundayMorning/weverse_0-299937994.jpeg";
import img2 from "../../../../../assets/albums/SundayMorning/weverse_0-299937995.jpeg";
import img3 from "../../../../../assets/albums/SundayMorning/weverse_0-299937996.jpeg";
import img4 from "../../../../../assets/albums/SundayMorning/weverse_3-324049938.jpeg";
import img5 from "../../../../../assets/albums/SundayMorning/weverse_3-324049939.jpeg";
import img6 from "../../../../../assets/albums/SundayMorning/weverse_4-324516037.jpeg";

const PHOTOS = [
  { id: 1, src: img1, caption: "Morning Haze", ratio: "3/4" },
  { id: 2, src: img2, caption: "Coffee Stain", ratio: "1" },
  { id: 3, src: img3, caption: "Soft Focus", ratio: "4/3" },
  { id: 4, src: img4, caption: "Gentle Breeze", ratio: "3/4" },
  { id: 5, src: img5, caption: "Lost in Thought", ratio: "1" },
  { id: 6, src: img6, caption: "Sunday Sunlight", ratio: "4/3" },
];

export const Gallery: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="gallery"
      className="min-h-screen p-[var(--sm-space-8)] pt-[calc(var(--sm-space-16)+var(--sm-space-8))] md:p-[var(--sm-space-16)] md:pt-[calc(var(--sm-space-16)+var(--sm-space-8))] bg-[var(--sm-color-background)] snap-center flex flex-col justify-center"
    >
      <div
        ref={ref}
        className="max-w-6xl mx-auto w-full space-y-[var(--sm-space-12)]"
      >
        <h2
          className={`text-[var(--sm-text-3xl)] md:text-[var(--sm-text-4xl)] sm-font-serif text-[var(--sm-color-primary)] text-center mb-[var(--sm-space-12)] transition-all duration-1000 ease-out transform ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Moments
        </h2>

        {/* 
          Grid Layout.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--sm-space-6)] auto-rows-[200px]">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.id}
              className={`group cursor-pointer relative rounded-sm overflow-hidden shadow-sm transition-all duration-700 ease-out hover:scale-[1.02] ${
                photo.ratio === "3/4" ? "row-span-2" : "row-span-1"
              } transform ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center text-[var(--sm-color-surface)] sm-font-serif italic opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--sm-color-primary)]/40 backdrop-blur-[2px]">
                {photo.caption}
              </div>
            </div>
          ))}
        </div>

        <p
          className={`text-center text-[var(--sm-text-xs)] text-[var(--sm-color-text-muted)] group-hover:text-[var(--sm-color-primary)] uppercase tracking-widest opacity-60 transition-all duration-1000 delay-700 ease-out ${
            isInView ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Gallery Collection
        </p>
      </div>
    </section>
  );
};
