"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { ProductCard } from "@/components/product-card";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { ProductDetailSheet } from "@/components/product-detail-sheet";
import { Checkout } from "@/components/checkout";
import { OrdersModal } from "@/components/orders-modal";
import { iphones } from "@/data/iphones";
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
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 md:pb-0">
      {/* Header */}
      <Header
        onOrdersClick={() => setIsOrdersOpen(true)}
      />

      {/* Main Content */}
      <main className="pt-14">
        {/* Hero Section - Hide in product detail mode */}
        {viewMode === "home" && <HeroSlideshow />}

        {/* Products Section - Hide in product detail mode */}
        {viewMode === "home" && (
          <section id="products" className="py-16 sm:py-24">
            {/* iPhone 16 Pro Max Featured Image */}
            <div className="relative w-full mb-8 sm:mb-12 overflow-hidden bg-black">
              <img
                src="/images/iphones/shopping3.webp"
                alt="iPhone 16 Pro Max"
                className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] object-cover object-center"
              />
              {/* Product Title Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 mx-auto max-w-4xl text-center">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
                    iPhone 16 Pro Max
                  </h2>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8">
                    Titanium. So strong. So Pro. So Max.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        const iphone = iphones.find(i => i.id === 'iphone-16-pro-max');
                        if (iphone) openProductDetail(iphone, iphone.colors[0], iphone.storageOptions[0]);
                      }}
                      className="h-14 px-10 text-lg font-semibold rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-2xl"
                    >
                      Shop Now
                    </button>
                    <button
                      onClick={() => {
                        const iphone = iphones.find(i => i.id === 'iphone-16-pro-max');
                        if (iphone) openProductDetail(iphone, iphone.colors[0], iphone.storageOptions[0]);
                      }}
                      className="h-14 px-10 text-lg font-semibold rounded-full border-2 border-white text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="text-center mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-white mb-4">
                  Which iPhone is right for you?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Compare all iPhone models and find the perfect one for your needs.
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {iphones.map((iphone, index) => (
                  <div
                    key={iphone.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{
                      animationDelay: `${index * 100}ms`,
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

      {/* Footer */}
      <footer className="hidden md:block bg-gray-100 dark:bg-gray-900/50 py-8 border-t border-gray-200/50 dark:border-gray-800/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2026 Apple Store Clone. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Terms of Use
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Sales Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
