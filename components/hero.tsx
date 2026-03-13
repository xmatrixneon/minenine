import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white dark:from-black dark:via-gray-950 dark:to-black">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
        {/* Hero Content */}
        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
            iPhone 16 Pro
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 dark:text-gray-300 font-medium">
            Titanium. So strong. So light. So Pro.
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The ultimate iPhone with A18 Pro chip, 48MP camera system, and all-day
            battery life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
            >
              Buy
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-base font-medium px-6 py-3 hover:underline"
            >
              Learn more
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* iPhone Image Placeholder */}
        <div className="relative mt-12 sm:mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="relative mx-auto max-w-3xl aspect-[16/10] sm:aspect-[21/9]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-black/50 z-10 pointer-events-none" />
            <svg
              viewBox="0 0 400 300"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* iPhone Frame */}
              <rect
                x="50"
                y="20"
                width="300"
                height="260"
                rx="40"
                fill="#1D1D1F"
                className="dark:fill-gray-800"
              />
              {/* Screen */}
              <rect
                x="60"
                y="30"
                width="280"
                height="240"
                rx="35"
                fill="#000000"
              />
              {/* Dynamic Island */}
              <rect
                x="150"
                y="45"
                width="100"
                height="30"
                rx="15"
                fill="#000000"
              />
              {/* Screen Glow */}
              <rect
                x="60"
                y="30"
                width="280"
                height="240"
                rx="35"
                fill="url(#screenGradient)"
                opacity="0.3"
              />
              {/* Camera Module */}
              <rect
                x="65"
                y="35"
                width="35"
                height="35"
                rx="8"
                fill="#2A2A2C"
              />
              <circle cx="72" cy="42" r="4" fill="#3A3A3C" />
              <circle cx="93" cy="42" r="4" fill="#3A3A3C" />
              <circle cx="72" cy="63" r="4" fill="#3A3A3C" />
              <defs>
                <linearGradient
                  id="screenGradient"
                  x1="0"
                  y1="0"
                  x2="400"
                  y2="300"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#6B9BD2" />
                  <stop offset="1" stopColor="#4A6FA5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />
    </section>
  );
}
