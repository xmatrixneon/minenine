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
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-800/30">
        <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Apple Logo / Brand */}
            <div className="flex items-center space-x-8">
              <a
                href="/"
                className="text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
              >
                <Image
                  src="/apple.png"
                  alt="Apple"
                  width={20}
                  height={24}
                  className="h-5 w-5"
                  priority
                />
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-6">
                <a
                  href="#products"
                  className="text-sm text-gray-900 dark:text-white/90 hover:opacity-70 transition-opacity"
                >
                  iPhone
                </a>
                <a
                  href="#products"
                  className="text-sm text-gray-900 dark:text-white/90 hover:opacity-70 transition-opacity"
                >
                  Mac
                </a>
                <a
                  href="#products"
                  className="text-sm text-gray-900 dark:text-white/90 hover:opacity-70 transition-opacity"
                >
                  iPad
                </a>
                <a
                  href="#products"
                  className="text-sm text-gray-900 dark:text-white/90 hover:opacity-70 transition-opacity"
                >
                  Watch
                </a>
                <a
                  href="#products"
                  className="text-sm text-gray-900 dark:text-white/90 hover:opacity-70 transition-opacity"
                >
                  AirPods
                </a>
              </div>
            </div>

            {/* Right side: Free Offer Timer, Orders, Cart and Mobile Menu */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Free Offer Countdown - Mobile First Design */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg shadow-red-500/30">
                <div className="flex items-center gap-1">
                  <span className="text-white font-bold text-[10px] sm:text-xs leading-tight">
                    FREE OFFER
                  </span>
                  <div className="flex items-center gap-0.5">
                    <span className="text-white font-mono font-bold text-sm sm:text-base">
                      {formatTime(hours)}:
                    </span>
                    <span className="text-white font-mono font-bold text-sm sm:text-base">
                      {formatTime(minutes)}:
                    </span>
                    <span className="text-white font-mono font-bold text-sm sm:text-base">
                      {formatTime(seconds)}
                    </span>
                  </div>
                </div>
              </div>

              {/* My Orders Button */}
              <button
                onClick={onOrdersClick}
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Package className="h-4 w-4" />
                <span>My Orders</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-900 dark:text-white/90 hover:opacity-70 transition-opacity"
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
            <div className="md:hidden pb-4 animate-in slide-in-from-top-2">
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-gray-900 dark:text-white/90 py-2"
                >
                  iPhone
                </a>
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-gray-900 dark:text-white/90 py-2"
                >
                  Mac
                </a>
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-gray-900 dark:text-white/90 py-2"
                >
                  iPad
                </a>
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-gray-900 dark:text-white/90 py-2"
                >
                  Watch
                </a>
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-gray-900 dark:text-white/90 py-2"
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
