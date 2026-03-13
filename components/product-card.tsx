"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Iphone, ColorVariant, StoragePricing } from "@/types";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  iphone: Iphone;
  onClick: (iphone: Iphone) => void;
  onQuickAdd: (
    iphone: Iphone,
    color: ColorVariant,
    storage: StoragePricing
  ) => void;
}

export function ProductCard({ iphone, onClick, onQuickAdd }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(iphone.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState<StoragePricing>(
    iphone.storageOptions[0]
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(iphone, selectedColor, selectedStorage);
  };

  return (
    <div
      onClick={() => onClick(iphone)}
      className="group bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-black/20 cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-8 flex items-center justify-center overflow-hidden">
        {iphone.isNew && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            New
          </div>
        )}
        {iphone.isPro && (
          <div className="absolute top-4 right-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium px-3 py-1 rounded-full">
            Pro
          </div>
        )}

        {/* iPhone Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={iphone.image}
            alt={iphone.model}
            className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2"
            style={{
              filter: `drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))`
            }}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {iphone.model}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            From ₹{selectedStorage.price}
          </p>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {iphone.description}
        </p>

        {/* Color Selector */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Color
          </p>
          <div className="flex flex-wrap gap-2">
            {iphone.colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`relative h-8 w-8 rounded-full border-2 transition-all duration-200 ${
                  selectedColor.name === color.name
                    ? "border-gray-900 dark:border-white scale-110"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
                title={color.name}
              >
                {selectedColor.name === color.name && (
                  <svg
                    className="absolute inset-0 m-auto h-4 w-4 text-gray-900 dark:text-white pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Storage Selector */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Storage
          </p>
          <div className="flex flex-wrap gap-2">
            {iphone.storageOptions.map((storage) => (
              <button
                key={storage.storage}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStorage(storage);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedStorage.storage === storage.storage
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                }`}
              >
                {storage.storage}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleQuickAdd}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-full font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add to Bag
        </Button>
      </div>
    </div>
  );
}
