"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { ProductCard } from "@/components/product-card";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { ProductDetailSheet } from "@/components/product-detail-sheet";
import { Checkout } from "@/components/checkout";
import { OrdersModal } from "@/components/orders-modal";
import { products } from "@/data/iphones";
import { Iphone, ColorVariant, StoragePricing, Address } from "@/types";

type ViewMode = "home" | "product-detail";

export default function Home() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("home");
  const [selectedProduct, setSelectedProduct] = useState<Iphone | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StoragePricing | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<{
    iphone: Iphone;
    color: ColorVariant;
    storage: StoragePricing;
  } | null>(null);

  // Open product detail
  const openProductDetail = (iphone: Iphone, color: ColorVariant, storage: StoragePricing) => {
    setSelectedProduct(iphone);
    setSelectedColor(color);
    setSelectedStorage(storage);
    setViewMode("product-detail");
  };

  // Close product detail
  const closeProductDetail = () => {
    setSelectedProduct(null);
    setSelectedColor(null);
    setSelectedStorage(null);
    setViewMode("home");
  };

  // Handle color change
  const handleColorChange = (color: ColorVariant) => {
    setSelectedColor(color);
  };

  // Handle storage change
  const handleStorageChange = (storage: StoragePricing) => {
    setSelectedStorage(storage);
  };

  // Handle buy now from product detail
  const handleBuyNow = () => {
    if (selectedProduct && selectedColor && selectedStorage) {
      setCheckoutItem({
        iphone: selectedProduct,
        color: selectedColor,
        storage: selectedStorage
      });
      setIsCheckoutOpen(true);
    }
  };

  // Handle buy now from product card
  const handleQuickBuy = (iphone: Iphone, color: ColorVariant, storage: StoragePricing) => {
    setCheckoutItem({
      iphone,
      color,
      storage
    });
    setIsCheckoutOpen(true);
  };

  // Confirm order
  const handleConfirmOrder = (address: Address, paymentMethod: string) => {
    console.log("Order confirmed:", { checkoutItem, address, paymentMethod });
    // Close checkout after delay so confirmation animation shows
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setCheckoutItem(null);
    }, 3000);
  };

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (isCheckoutOpen || isOrdersOpen || viewMode === "product-detail") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCheckoutOpen, isOrdersOpen, viewMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pb-14 md:pb-0">
      {/* Header */}
      <Header
        onOrdersClick={() => setIsOrdersOpen(true)}
      />

      {/* Main Content */}
      <main className="pt-12 sm:pt-14">
        {/* Hero Section - Hide in product detail mode */}
        {viewMode === "home" && <HeroSlideshow />}

        {/* Products Section - Hide in product detail mode */}
        {viewMode === "home" && (
          <section id="products" className="py-4 sm:py-6">
            <div className="mx-auto max-w-[1600px] px-2 sm:px-4">
              {/* Section Header - Flipkart Style */}
              <div className="bg-white dark:bg-gray-900 p-3 rounded mb-3 shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                  iPhones - <span className="text-green-600 dark:text-green-400 font-bold">FREE</span>
                </h2>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  Limited time offer • Free delivery • COD available
                </p>
              </div>

              {/* Products Grid - Bigger cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {products.map((iphone, index) => (
                  <div
                    key={iphone.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <ProductCard
                      iphone={iphone}
                      onClick={openProductDetail}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Section - Hide in product detail mode */}
        {viewMode === "home" && (
          <section className="py-16 sm:py-24 bg-white dark:bg-gray-900/50">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {/* Free Shipping */}
                <div className="text-center p-6">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <svg
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Free Shipping
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get free delivery on all orders
                  </p>
                </div>

                {/* Easy Returns */}
                <div className="text-center p-6">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <svg
                      className="h-8 w-8 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Easy Returns
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    14-day return policy
                  </p>
                </div>

                {/* Apple Care */}
                <div className="text-center p-6">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                    <svg
                      className="h-8 w-8 text-purple-600 dark:text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    AppleCare+
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Extended warranty available
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Product Detail Sheet */}
      {selectedProduct && (
        <ProductDetailSheet
          isOpen={viewMode === "product-detail"}
          onClose={closeProductDetail}
          iphone={selectedProduct}
          initialColor={selectedColor || selectedProduct.colors[0]}
          initialStorage={selectedStorage || selectedProduct.storageOptions[0]}
          onBuyNow={handleBuyNow}
          onColorChange={handleColorChange}
          onStorageChange={handleStorageChange}
        />
      )}

      {/* Orders Modal */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />

      {/* Checkout Modal */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItem ? [{
          ...checkoutItem.iphone,
          selectedColor: checkoutItem.color,
          selectedStorage: checkoutItem.storage,
          quantity: 1,
          totalPrice: 0,
        }] : []}
        subtotal={0}
        onConfirmOrder={handleConfirmOrder}
        onShowOrders={() => setIsOrdersOpen(true)}
      />

      {/* Mobile Bottom Navigation - Hide in product detail mode */}
      {viewMode === "home" && (
        <MobileBottomNav
          onOrdersClick={() => setIsOrdersOpen(true)}
        />
      )}

      {/* Footer - Flipkart Style */}
      <footer className="hidden md:block bg-[#2874f0] text-white py-8 border-t border-[#1a5bbf]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-xl font-bold italic">iStore</span>
              <span className="text-xs font-bold bg-[#ffe500] text-gray-900 px-1.5 py-0.5 rounded">Plus</span>
              <span className="ml-4 text-white/80">© 2026. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#ffe500] transition-colors">
                About Us
              </a>
              <a href="#" className="hover:text-[#ffe500] transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-[#ffe500] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#ffe500] transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
