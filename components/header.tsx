"use client";

import { useState, useEffect } from "react";
import { Menu, X, Package, Clock } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  onOrdersClick?: () => void;
}

export function Header({ onOrdersClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 24-hour countdown timer for free offer - persisted in localStorage
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // Total seconds

  // Initialize timer from localStorage or set new
  useEffect(() => {
    const storedTimer = localStorage.getItem('offerTimer');
    const storedStartTime = localStorage.getItem('offerStartTime');

    if (storedTimer && storedStartTime) {
      // Resume from stored time
      const startTime = parseInt(storedStartTime);
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      const remainingSeconds = Math.max(0, 24 * 60 * 60 - elapsedSeconds);
      setTimeLeft(remainingSeconds);
    } else {
      // Start new timer
      const now = Date.now();
      localStorage.setItem('offerStartTime', now.toString());
      localStorage.setItem('offerTimer', '24:00:00');
      setTimeLeft(24 * 60 * 60);
    }

    // Save timer to localStorage every second
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          // Reset timer - start new 24-hour cycle
          const now = Date.now();
          localStorage.setItem('offerStartTime', now.toString());
          localStorage.setItem('offerTimer', '24:00:00');
          return 24 * 60 * 60 - 1;
        }
        const remaining = prev - 1;
        // Parse stored timer to get HH:MM:SS format
        const storedTimer = localStorage.getItem('offerTimer');
        if (storedTimer) {
          const [h, m, s] = storedTimer.split(':').map(Number);
          const totalSeconds = h * 3600 + m * 60 + s;
          localStorage.setItem('offerTimer', formatSecondsToTime(totalSeconds));
        }
        return remaining;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatSecondsToTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  const hours = Math.floor(timeLeft / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#2874f0] dark:bg-[#1a5bbf] shadow-md">
        <nav className="mx-auto max-w-[1440px] px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Logo / Brand */}
            <div className="flex items-center space-x-4 sm:space-x-8 flex-1">
              <a
                href="/"
                className="flex items-center gap-1.5 text-white hover:opacity-90 transition-opacity"
              >
                <span className="text-xl sm:text-2xl font-bold italic tracking-tight">iStore</span>
                <span className="text-[8px] sm:text-[10px] bg-yellow-400 text-gray-900 px-1 rounded font-bold">
                  Plus
                </span>
              </a>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex flex-1 max-w-xl">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more"
                    className="w-full h-9 pl-10 pr-4 text-sm rounded-sm border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    disabled
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
 strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right side: Timer, Orders, Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Free Offer Countdown */}
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white/20 rounded">
                <Clock className="h-3.5 w-3.5 text-yellow-300" />
                <span className="text-white font-mono font-bold text-xs">
                  {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
                </span>
              </div>

              {/* Login Button */}
              <button className="hidden sm:block px-4 py-1 bg-white text-[#2874f0] font-medium text-sm rounded-sm hover:bg-gray-100 transition-colors">
                Login
              </button>

              {/* My Orders Button */}
              <button
                onClick={onOrdersClick}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-white hover:bg-white/10 rounded transition-colors"
              >
                <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden lg:inline text-sm font-medium">My Orders</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-3 animate-in slide-in-from-top-2">
              {/* Mobile Search */}
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full h-9 pl-10 pr-4 text-sm rounded-sm border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  disabled
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
 strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Mobile Timer */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded mb-3">
                <Clock className="h-4 w-4 text-yellow-300" />
                <span className="text-white text-xs font-medium">Free offer ends in:</span>
                <span className="text-white font-mono font-bold text-xs">
                  {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
                </span>
              </div>

              <div className="flex flex-col space-y-2 pt-2 border-t border-white/20">
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-white py-2 px-3 hover:bg-white/10 rounded"
                >
                  iPhone
                </a>
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-white py-2 px-3 hover:bg-white/10 rounded"
                >
                  Mac
                </a>
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-white py-2 px-3 hover:bg-white/10 rounded"
                >
                  iPad
                </a>
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-white py-2 px-3 hover:bg-white/10 rounded"
                >
                  Watch
                </a>
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-white py-2 px-3 hover:bg-white/10 rounded"
                >
                  AirPods
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
