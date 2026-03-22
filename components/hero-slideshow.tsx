"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Smartphone } from "lucide-react";

const shoppingImages = [
  "/images/iphones/shopping3.webp",
  "/images/iphones/shopping.webp",
  "/images/iphones/shopping1.webp",
  "/images/iphones/shopping4.webp",
  "/images/iphones/shopping5.webp",
];

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shoppingImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + shoppingImages.length) % shoppingImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shoppingImages.length);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const currentImage = shoppingImages[currentIndex];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-width Hero Slideshow */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-gradient-to-br from-[#2874f0] to-[#1a5bbf]">
        {/* Background Image - Full width */}
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
          <Image
            src={currentImage}
            alt={`Shopping ${currentIndex + 1}`}
            fill
            className="object-cover object-center opacity-90"
            priority
            quality={95}
          />
        </div>

        {/* Flipkart-style Brand Overlay */}
        <div className="absolute top-4 left-4 z-30">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded shadow-lg">
            <span className="text-xl font-bold italic text-[#2874f0]">iStore</span>
            <span className="ml-1 text-xs font-bold bg-[#ffe500] text-gray-900 px-1.5 py-0.5 rounded">Plus</span>
          </div>
        </div>

        {/* Banner Tag */}
        <div className="absolute bottom-4 left-4 z-30">
          <div className="bg-[#ffe500] px-4 py-2 rounded shadow-lg">
            <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              iPhones FREE - Limited Time Offer!
            </p>
          </div>
        </div>

        {/* Navigation Arrows - Flipkart Style */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900 rounded-full text-gray-900 dark:text-white shadow-lg transition-all duration-200 hover:scale-110 z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900 rounded-full text-gray-900 dark:text-white shadow-lg transition-all duration-200 hover:scale-110 z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slide Indicators - Flipkart Style */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {shoppingImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#ffe500] rounded-full scale-125"
                  : "bg-white/60 rounded-full hover:bg-white/90"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Pause/Play Button */}
        <button
          onClick={togglePause}
          className="absolute bottom-4 right-4 p-2 bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900 rounded-full text-gray-900 dark:text-white shadow-lg transition-all duration-200 z-20"
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? (
            <Play className="h-4 w-4" fill="currentColor" />
          ) : (
            <Pause className="h-4 w-4" />
          )}
        </button>
      </div>
    </section>
  );
}
