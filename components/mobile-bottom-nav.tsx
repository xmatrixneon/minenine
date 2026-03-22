"use client";

import { Home, Package, Smartphone } from "lucide-react";
import { useState } from "react";

interface MobileBottomNavProps {
  onOrdersClick?: () => void;
}

export function MobileBottomNav({ onOrdersClick }: MobileBottomNavProps) {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-inset-bottom z-40">
      <div className="flex items-center justify-around h-14">
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === "home"
              ? "text-[#2874f0]"
              : "text-gray-500 dark:text-gray-400"
          }`}
          aria-label="Home"
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-medium mt-0.5">Home</span>
        </button>

        {/* Products Tab */}
        <button
          onClick={() => {
            setActiveTab("products");
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === "products"
              ? "text-[#2874f0]"
              : "text-gray-500 dark:text-gray-400"
          }`}
          aria-label="Products"
        >
          <Smartphone className="h-5 w-5" />
          <span className="text-[10px] font-medium mt-0.5">Products</span>
        </button>

        {/* Orders Tab */}
        <button
          onClick={() => {
            setActiveTab("orders");
            if (onOrdersClick) onOrdersClick();
          }}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === "orders"
              ? "text-[#2874f0]"
              : "text-gray-500 dark:text-gray-400"
          }`}
          aria-label="My Orders"
        >
          <Package className="h-5 w-5" />
          <span className="text-[10px] font-medium mt-0.5">Orders</span>
        </button>
      </div>
    </nav>
  );
}
