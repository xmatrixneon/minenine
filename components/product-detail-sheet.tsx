"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronRight, Cpu, Battery, Camera, Ruler, Wifi, Bluetooth, Usb, Star, Shield, Truck } from "lucide-react";
import { Iphone, ColorVariant, StoragePricing } from "@/types";

interface ProductDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  iphone: Iphone;
  initialColor: ColorVariant;
  initialStorage: StoragePricing;
  onBuyNow: () => void;
  onColorChange: (color: ColorVariant) => void;
  onStorageChange: (storage: StoragePricing) => void;
}

export function ProductDetailSheet({
  isOpen,
  onClose,
  iphone,
  initialColor,
  initialStorage,
  onBuyNow,
  onColorChange,
  onStorageChange,
}: ProductDetailSheetProps) {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(initialColor);
  const [selectedStorage, setSelectedStorage] = useState<StoragePricing>(initialStorage);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Generate random rating
  const rating = (4 + Math.random() * 0.8).toFixed(1);
  const ratingsCount = Math.floor(Math.random() * 5000) + 1000;

  // Update local state when initial values change
  useEffect(() => {
    setSelectedColor(initialColor);
    setSelectedStorage(initialStorage);
  }, [initialColor, initialStorage]);

  // Notify parent of changes
  useEffect(() => {
    onColorChange(selectedColor);
  }, [selectedColor, onColorChange]);

  useEffect(() => {
    onStorageChange(selectedStorage);
  }, [selectedStorage, onStorageChange]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="fixed inset-0 sm:inset-auto sm:bottom-0 sm:top-16 sm:max-h-[calc(100vh-4rem)] sm:rounded-t-xl bg-white dark:bg-gray-900 z-[51] shadow-2xl animate-in slide-in-from-bottom-4 duration-300 ease-out overflow-hidden flex flex-col"
      >
        {/* Handle bar for mobile swipe indicator */}
        <div className="sm:hidden flex justify-center pt-3 pb-1 bg-gray-50 dark:bg-gray-950">
          <div className="h-1 w-12 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 -ml-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                {iphone.model}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {iphone.isNew && (
              <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded">NEW</span>
            )}
            {iphone.isPro && (
              <span className="text-[10px] font-bold bg-purple-600 text-white px-2 py-0.5 rounded">PRO</span>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Product Image */}
          <div className="relative bg-gray-50 dark:bg-gray-950 p-6 sm:p-10 flex items-center justify-center">
            <img
              src={iphone.image}
              alt={iphone.model}
              className="max-h-48 sm:max-h-64 w-auto object-contain"
            />
          </div>

          {/* Price and Rating */}
          <div className="p-3 sm:p-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">FREE</span>
                  <span className="text-sm text-gray-500 line-through">₹1</span>
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">100% off</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex items-center bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded gap-0.5">
                    <span className="font-bold">{rating}</span>
                    <Star className="h-3 w-3 fill-white" />
                  </div>
                  <span className="text-[10px] text-gray-500">({ratingsCount.toLocaleString()} ratings)</span>
                </div>
              </div>
              {/* Flipkart Assured */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                <span className="text-[8px] font-bold text-[#2874f0]">ASSURED</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center gap-3 mt-2 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>COD Available</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-3 sm:p-4 border-b border-gray-100 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              {iphone.tagline}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {iphone.description}
            </p>
          </div>

          {/* Color Selection */}
          <div className="p-3 sm:p-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Color: <span className="text-[#2874f0]">{selectedColor.name}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {iphone.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`relative h-8 w-8 rounded-full border-2 transition-all ${
                    selectedColor.name === color.name
                      ? "border-[#2874f0] scale-110"
                      : "border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* Storage Selection */}
          <div className="p-3 sm:p-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Storage: <span className="text-[#2874f0]">{selectedStorage.storage}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {iphone.storageOptions.map((storage) => (
                <button
                  key={storage.storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`px-4 py-2 rounded border-2 text-sm font-medium transition-all ${
                    selectedStorage.storage === storage.storage
                      ? "border-[#2874f0] bg-[#2874f0] text-white"
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  {storage.storage}
                </button>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="p-3 sm:p-4">
            <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              Specifications
            </h3>

            <div className="space-y-4">
              {/* Display */}
              <SpecSection title="Display">
                <SpecRow label="Size" value={iphone.specs.display.size} />
                <SpecRow label="Resolution" value={iphone.specs.display.resolution} />
              </SpecSection>

              {/* Chip */}
              <SpecSection title="Performance">
                <SpecRow label="Chip" value={iphone.specs.chip.name} />
                <SpecRow label="CPU" value={iphone.specs.chip.cpu} />
              </SpecSection>

              {/* Camera */}
              <SpecSection title="Camera">
                <SpecRow label="Main" value={iphone.specs.camera.main} />
                {iphone.specs.camera.ultraWide && (
                  <SpecRow label="Ultra Wide" value={iphone.specs.camera.ultraWide} />
                )}
                <SpecRow label="Front" value={iphone.specs.camera.front} />
              </SpecSection>

              {/* Battery */}
              <SpecSection title="Battery">
                <SpecRow label="Video Playback" value={iphone.specs.battery.videoPlayback} />
                <SpecRow label="Fast Charging" value={iphone.specs.battery.fastCharging} />
              </SpecSection>
            </div>
          </div>

          {/* Bottom Spacer for sticky action bar */}
          <div className="h-20 sm:h-16" />
        </div>

        {/* Buy Now Button - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={onBuyNow}
            className="w-full h-12 rounded font-semibold text-base bg-[#ffe500] hover:bg-[#ffd000] text-gray-900 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>BUY NOW - FREE</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}

function SpecSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-1">
        <span className="w-1 h-3 bg-[#2874f0] rounded-sm"></span>
        {title}
      </h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 py-1.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className="text-[11px] text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-[11px] text-gray-800 dark:text-gray-200 text-right max-w-[60%]">
        {value}
      </span>
    </div>
  );
}
