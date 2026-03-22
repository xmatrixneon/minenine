"use client";

import { useState } from "react";
import { Iphone, ColorVariant, StoragePricing } from "@/types";
import { Star, Shield } from "lucide-react";

interface ProductCardProps {
  iphone: Iphone;
  onClick: (iphone: Iphone, color: ColorVariant, storage: StoragePricing) => void;
}

export function ProductCard({ iphone, onClick }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(iphone.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState<StoragePricing>(
    iphone.storageOptions[0]
  );

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(iphone, selectedColor, selectedStorage);
  };

  // Generate random rating between 4.0 and 4.8
  const rating = (4 + Math.random() * 0.8).toFixed(1);
  const ratingsCount = Math.floor(Math.random() * 5000) + 1000;

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* Product Image Area */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4 flex items-center justify-center overflow-hidden">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex gap-1">
          {iphone.isNew && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              NEW
            </span>
          )}
          {iphone.isPro && (
            <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              PRO
            </span>
          )}
        </div>

        {/* Assured Badge */}
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-white dark:bg-gray-800 rounded px-1.5 py-0.5 flex items-center gap-1 shadow-sm">
            <span className="text-[8px] font-bold text-[#2874f0]">ASSURED</span>
          </div>
        </div>

        {/* iPhone Image */}
        <div className="relative w-full h-36 flex items-center justify-center">
          <img
            src={iphone.image}
            alt={iphone.model}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-tight">
          {iphone.model}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded gap-0.5">
            <span className="font-bold">{rating}</span>
            <Star className="h-2.5 w-2.5 fill-white" />
          </div>
          <span className="text-[10px] text-gray-500 dark:text-gray-400">
            ({ratingsCount.toLocaleString()})
          </span>
        </div>

        {/* Price - FREE */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">FREE</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 line-through">₹1</span>
        </div>

        {/* Offers */}
        <div className="text-[10px] text-gray-600 dark:text-gray-400">
          <span className="text-green-700 dark:text-green-400 font-medium">Free Delivery</span>
          <span className="mx-1">•</span>
          <span>COD Available</span>
        </div>

        {/* Color Selector */}
        <div className="space-y-1">
          <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
            Color: <span className="text-gray-800 dark:text-gray-200">{selectedColor.name}</span>
          </p>
          <div className="flex gap-1.5">
            {iphone.colors.slice(0, 4).map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`h-5 w-5 rounded-full border transition-all ${
                  selectedColor.name === color.name
                    ? "border-[#2874f0] border-2 scale-110"
                    : "border-gray-300 hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Storage Selector */}
        <div className="space-y-1">
          <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
            Storage: <span className="text-gray-800 dark:text-gray-200">{selectedStorage.storage}</span>
          </p>
          <div className="flex flex-wrap gap-1">
            {iphone.storageOptions.map((storage) => (
              <button
                key={storage.storage}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStorage(storage);
                }}
                className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                  selectedStorage.storage === storage.storage
                    ? "bg-[#2874f0] text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {storage.storage}
              </button>
            ))}
          </div>
        </div>

        {/* Buy Now Button - Flipkart Yellow */}
        <button
          onClick={handleQuickBuy}
          className="w-full bg-[#ffe500] hover:bg-[#ffd000] text-gray-900 h-9 rounded font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>BUY NOW</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
