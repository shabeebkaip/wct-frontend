"use client";

import Image from "next/image";

interface ImageData {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface ImageGalleryProps {
  images: ImageData[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px]">
      {/* Large Featured Image */}
      <div className="relative lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden group">
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-white mb-2">
              {images[0].title}
            </h3>
            <p className="text-gray-300 text-sm">{images[0].description}</p>
          </div>
        </div>
      </div>

      {/* Grid Items */}
      {images.slice(1).map((image, index) => (
        <div
          key={index + 1}
          className={`relative rounded-2xl overflow-hidden group ${
            index === 0 ? "md:col-span-2 lg:col-span-2" : ""
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-lg font-bold text-white mb-1">
                {image.title}
              </h3>
              <p className="text-gray-300 text-xs line-clamp-2">
                {image.description}
              </p>
            </div>
          </div>
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 border-2 border-blue-500/50 rounded-2xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
