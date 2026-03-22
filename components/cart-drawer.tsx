"use client";

import { X, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  subtotal,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] max-w-full bg-white dark:bg-gray-950 z-[51] shadow-2xl animate-in slide-in-from-right duration-300 ease-out">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-800/50">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Bag
            </h2>
            {items.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <ShoppingBag className="h-10 w-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Your bag is empty
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[200px]">
                Looks like you haven't added anything to your bag yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.model}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {item.model}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {item.selectedColor.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {item.selectedStorage.storage}
                    </p>
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                      FREE
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200/50 dark:border-gray-800/50 p-6 space-y-4">
            <div className="flex items-center justify-between text-base">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                FREE
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Shipping and taxes calculated at checkout.
            </p>
            <Button onClick={onCheckout} className="w-full h-12 rounded-full font-medium text-base bg-blue-600 hover:bg-blue-700">
              Checkout
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full h-12 rounded-full font-medium text-base"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
