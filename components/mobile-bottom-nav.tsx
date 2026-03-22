"use client";

import { Home, Package } from "lucide-react";
import { useState } from "react";

interface MobileBottomNavProps {
  onOrdersClick?: () => void;
}

export function MobileBottomNav({ onOrdersClick }: MobileBottomNavProps) {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 safe-area-inset-bottom z-40">
      <div className="flex items-center justify-around h-16">
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === "home"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
          aria-label="Home"
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-medium mt-1">Home</span>
        </button>

        {/* Products Tab */}
        <button
          onClick={() => {
            setActiveTab("products");
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === "products"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
          aria-label="Products"
        >
          <div className="h-5 w-5 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-full w-full"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
            </svg>
          </div>
          <span className="text-[10px] font-medium mt-1">Products</span>
        </button>

        {/* Orders Tab */}
        <button
          onClick={() => {
            setActiveTab("orders");
            if (onOrdersClick) onOrdersClick();
          }}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === "orders"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
          aria-label="My Orders"
        >
          <Package className="h-5 w-5" />
          <span className="text-[10px] font-medium mt-1">Orders</span>
        </button>
      </div>
    </nav>
  );
}
