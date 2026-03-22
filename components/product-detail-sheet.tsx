"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronRight, Cpu, Battery, Camera, Ruler, Wifi, Bluetooth, Usb } from "lucide-react";
import { Iphone, ColorVariant, StoragePricing } from "@/types";
import { Button } from "@/components/ui/button";

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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="fixed inset-0 sm:inset-auto sm:bottom-0 sm:top-20 sm:max-h-[calc(100vh-5rem)] sm:rounded-t-3xl bg-white dark:bg-gray-950 z-[51] shadow-2xl animate-in slide-in-from-bottom-4 duration-300 ease-out overflow-hidden flex flex-col"
      >
        {/* Handle bar for mobile swipe indicator */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="h-1 w-12 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                {iphone.model}
              </h2>
              {iphone.isNew && (
                <span className="text-xs font-medium text-red-500">New</span>
              )}
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-semibold text-green-600 dark:text-green-400">
            FREE
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Image */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-8 sm:p-12 flex items-center justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <img
                src={iphone.image}
                alt={iphone.model}
                className="w-full h-auto drop-shadow-2xl transition-all duration-500 object-contain"
                style={{
                  filter: `drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))`
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="px-4 sm:px-8 py-6">
            <p className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-2">
              {iphone.tagline}
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {iphone.description}
            </p>
          </div>

          {/* Color Selection */}
          <div className="px-4 sm:px-8 py-6 border-t border-gray-200/50 dark:border-gray-800/50">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Finish
            </h3>
            <div className="flex flex-wrap gap-4">
              {iphone.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label={color.name}
                >
                  <div
                    className={`h-10 w-10 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? "border-gray-900 dark:border-white scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <span
                    className={`text-sm ${
                      selectedColor.name === color.name
                        ? "font-medium text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Storage Selection */}
          <div className="px-4 sm:px-8 py-6 border-t border-gray-200/50 dark:border-gray-800/50">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Storage
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {iphone.storageOptions.map((storage) => (
                <button
                  key={storage.storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    selectedStorage.storage === storage.storage
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      selectedStorage.storage === storage.storage
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {storage.storage}
                  </span>
                  {selectedStorage.storage === storage.storage && (
                    <svg
                      className="absolute top-2 right-2 h-4 w-4 text-blue-600 dark:text-blue-400"
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

          {/* Specifications */}
          <div className="px-4 sm:px-8 py-6 border-t border-gray-200/50 dark:border-gray-800/50">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">
              Tech Specs
            </h3>

            <div className="space-y-6">
              {/* Display */}
              <SpecSection icon={<Ruler className="h-5 w-5" />} title="Display">
                <SpecRow label="Size" value={iphone.specs.display.size} />
                <SpecRow label="Resolution" value={iphone.specs.display.resolution} />
                <SpecRow label="Technology" value={iphone.specs.display.technology} />
                <SpecRow label="Brightness" value={iphone.specs.display.brightness} />
              </SpecSection>

              {/* Chip */}
              <SpecSection icon={<Cpu className="h-5 w-5" />} title="Chip">
                <SpecRow label="Processor" value={iphone.specs.chip.name} />
                <SpecRow label="CPU" value={iphone.specs.chip.cpu} />
                <SpecRow label="GPU" value={iphone.specs.chip.gpu} />
                <SpecRow label="Neural Engine" value={iphone.specs.chip.neuralEngine} />
              </SpecSection>

              {/* Camera */}
              <SpecSection icon={<Camera className="h-5 w-5" />} title="Camera">
                <SpecRow label="Main" value={iphone.specs.camera.main} />
                {iphone.specs.camera.ultraWide && (
                  <SpecRow label="Ultra Wide" value={iphone.specs.camera.ultraWide} />
                )}
                {iphone.specs.camera.telephoto && (
                  <SpecRow label="Telephoto" value={iphone.specs.camera.telephoto} />
                )}
                <SpecRow label="Front" value={iphone.specs.camera.front} />
                <div className="mt-3 flex flex-wrap gap-2">
                  {iphone.specs.camera.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </SpecSection>

              {/* Battery */}
              <SpecSection icon={<Battery className="h-5 w-5" />} title="Battery">
                <SpecRow label="Video Playback" value={iphone.specs.battery.videoPlayback} />
                <SpecRow label="Audio Playback" value={iphone.specs.battery.audioPlayback} />
                <SpecRow label="Fast Charging" value={iphone.specs.battery.fastCharging} />
              </SpecSection>

              {/* Physical */}
              <SpecSection icon={<Ruler className="h-5 w-5" />} title="Dimensions & Weight">
                <SpecRow label="Dimensions" value={iphone.specs.physical.dimensions} />
                <SpecRow label="Weight" value={iphone.specs.physical.weight} />
                <SpecRow label="Material" value={iphone.specs.physical.material} />
              </SpecSection>

              {/* Connectivity */}
              <SpecSection icon={<Wifi className="h-5 w-5" />} title="Connectivity">
                <SpecRow label="Cellular" value={iphone.specs.connectivity.cellular} />
                <SpecRow label="Wi-Fi" value={iphone.specs.connectivity.wifi} />
                <SpecRow label="Bluetooth" value={iphone.specs.connectivity.bluetooth} />
                <SpecRow label="Port" value={iphone.specs.connectivity.usb} />
              </SpecSection>
            </div>
          </div>

          {/* Bottom Spacer for sticky action bar */}
          <div className="h-24 sm:h-8" />
        </div>

        {/* Buy Now Button - Fixed at bottom */}
        <div className="p-4 sm:p-6 border-t border-gray-200/50 dark:border-gray-800/50 bg-white dark:bg-gray-950">
          <Button
            onClick={onBuyNow}
            className="w-full h-12 rounded-full font-semibold text-base bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Buy Now - FREE
          </Button>
        </div>
      </div>
    </>
  );
}

function SpecSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-gray-900 dark:text-white">{icon}</span>
        <h4 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h4>
      </div>
      <div className="pl-7 space-y-2">{children}</div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 dark:border-gray-800/50 last:border-0">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm text-gray-900 dark:text-white text-right max-w-[60%]">
        {value}
      </span>
    </div>
  );
}
