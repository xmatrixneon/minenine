"use client";

import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StickyActionBarProps {
  mode: "product" | "cart";
  productName?: string;
  price?: number;
  cartCount?: number;
  subtotal?: number;
  onCartClick?: () => void;
  onBuyNow?: () => void;
  onCheckout?: () => void;
}

export function StickyActionBar({
  mode,
  productName,
  price,
  cartCount = 0,
  subtotal = 0,
  onCartClick,
  onBuyNow,
  onCheckout,
}: StickyActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 safe-area-inset-bottom">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Bar */}
      <div className="relative bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 px-4 py-3 sm:py-4">
        <div className="mx-auto max-w-[1440px] flex items-center justify-between gap-4">
          {/* Left side - Product info or Cart summary */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1">
            {mode === "product" ? (
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {productName}
                </p>
                <p className="text-xl sm:text-2xl font-semibold text-green-600 dark:text-green-400">
                  FREE
                </p>
              </div>
            ) : (
              <button
                onClick={onCartClick}
                className="flex items-center gap-3 flex-1 min-w-0 group"
              >
                <div className="relative">
                  <ShoppingCart className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 bg-blue-600 rounded-full text-[10px] text-white font-semibold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                  </p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    FREE
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
              </button>
            )}
          </div>

          {/* Right side - Action button */}
          <Button
            onClick={mode === "product" ? onBuyNow : onCheckout}
            className="h-12 sm:h-14 px-6 sm:px-8 rounded-full font-semibold text-base sm:text-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
          >
            {mode === "product" ? "Buy Now" : "Checkout"}
          </Button>
        </div>
      </div>
    </div>
  );
}
