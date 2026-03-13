"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

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
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]">
        {/* Background Image - Full width */}
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
          <Image
            src={currentImage}
            alt={`Shopping ${currentIndex + 1}`}
            fill
            className="object-cover object-center"
            priority
            quality={95}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all duration-200 hover:scale-110 z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all duration-200 hover:scale-110 z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {shoppingImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 sm:h-3 sm:w-3 transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white rounded-full scale-125"
                  : "bg-white/50 rounded-full hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Pause/Play Button */}
        <button
          onClick={togglePause}
          className="absolute bottom-8 right-4 p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all duration-200 z-20"
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? (
            <Play className="h-5 w-5" />
          ) : (
            <Pause className="h-5 w-5" />
          )}
        </button>
      </div>
    </section>
  );
}
