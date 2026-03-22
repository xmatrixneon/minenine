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
    <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* Product Image Area */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-6 sm:p-8 flex items-center justify-center overflow-hidden aspect-[4/5]">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-1">
          {iphone.isNew && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </span>
          )}
          {iphone.isPro && (
            <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
              PRO
            </span>
          )}
        </div>

        {/* Assured Badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-white dark:bg-gray-800 rounded px-2 py-1 flex items-center gap-1 shadow-sm">
            <span className="text-[10px] font-bold text-[#2874f0]">ASSURED</span>
          </div>
        </div>

        {/* iPhone Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={iphone.image}
            alt={iphone.model}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            style={{ minHeight: '280px', maxHeight: '400px' }}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-1 leading-tight">
          {iphone.model}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center bg-green-600 text-white text-xs px-2 py-1 rounded gap-1">
            <span className="font-bold">{rating}</span>
            <Star className="h-3 w-3 fill-white" />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({(ratingsCount / 1000).toFixed(1)}k)
          </span>
        </div>

        {/* Price - FREE */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">FREE</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹1</span>
        </div>

        {/* Offers */}
        <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <span className="text-green-700 dark:text-green-400 font-medium">Free Delivery</span>
          <span>•</span>
          <span>COD</span>
        </div>

        {/* Color Selector */}
        <div className="flex gap-1.5">
          {iphone.colors.slice(0, 5).map((color) => (
            <button
              key={color.name}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(color);
              }}
              className={`h-6 w-6 rounded-full border-2 transition-all ${
                selectedColor.name === color.name
                  ? "border-[#2874f0] scale-110"
                  : "border-gray-300 hover:scale-105"
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
              title={color.name}
            />
          ))}
        </div>

        {/* Storage Selector */}
        <div className="flex flex-wrap gap-1">
          {iphone.storageOptions.map((storage) => (
            <button
              key={storage.storage}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStorage(storage);
              }}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                selectedStorage.storage === storage.storage
                  ? "bg-[#2874f0] text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {storage.storage}
            </button>
          ))}
        </div>

        {/* Buy Now Button - Flipkart Yellow */}
        <button
          onClick={handleQuickBuy}
          className="w-full bg-[#ffe500] hover:bg-[#ffd000] text-gray-900 h-10 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2"
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
