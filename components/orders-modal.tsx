"use client";

import { useState, useEffect } from "react";
import { X, Package, Calendar, MapPin, IndianRupee, CheckCircle2, Clock, Truck, Trash2 } from "lucide-react";

interface StoredOrder {
  id: string;
  trackingId: string;
  items: Array<{
    model: string;
    selectedColor: { name: string };
    selectedStorage: { storage: string };
    totalPrice: number;
  }>;
  subtotal: number;
  shippingAddress: {
    fullName: string;
    streetAddress: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
  };
  paymentMethod: string;
  date: string;
  status: string;
}

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrdersModal({ isOpen, onClose }: OrdersModalProps) {
  const [orders, setOrders] = useState<StoredOrder[]>([]);

  // Load orders from localStorage on mount and when modal opens
  useEffect(() => {
    if (isOpen) {
      loadOrders();
    }
  }, [isOpen]);

  const loadOrders = () => {
    try {
      const storedOrders = localStorage.getItem('userOrders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  const clearAllOrders = () => {
    if (confirm('Are you sure you want to clear all order history?')) {
      localStorage.removeItem('userOrders');
      setOrders([]);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-3xl sm:max-h-[85vh] bg-white dark:bg-gray-900 z-[51] shadow-2xl animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-bottom-8 duration-300 ease-out overflow-hidden flex flex-col">
        {/* Header - Flipkart Blue */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-800 bg-[#2874f0]">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
              <Package className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                My Orders
              </h2>
              <p className="text-xs text-white/80">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {orders.length > 0 && (
              <button
                onClick={clearAllOrders}
                className="flex items-center gap-1 px-2 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded transition-colors"
              >
                <Trash2 className="h-3 w-3" />
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-white hover:bg-white/20 rounded transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50 dark:bg-gray-950">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-base font-medium text-gray-800 dark:text-white mb-2">
                No orders yet
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[200px]">
                Your order history will appear here after you place an order.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                          {order.id}
                        </p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] font-medium rounded">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="p-3">
                    {/* Items */}
                    <div className="mb-3 space-y-2">
                      {order.items.map((item, index) => (
                        <div key={`${order.id}-${index}`} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-950 rounded">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 bg-gradient-to-br from-[#2874f0] to-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                              {item.model.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                                {item.model}
                              </p>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                {item.selectedColor.name} • {item.selectedStorage.storage}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-green-600 dark:text-green-400">
                              FREE
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tracking & Shipping Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Tracking ID */}
                      <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <Truck className="h-4 w-4 text-[#2874f0]" />
                        <div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">Tracking</p>
                          <p className="text-xs font-mono font-semibold text-gray-800 dark:text-gray-200">
                            {order.trackingId}
                          </p>
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div className="flex items-start gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
                        <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">To</p>
                          <p className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
                            {order.shippingAddress.fullName}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method & Phone */}
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">
                          {order.paymentMethod === 'cod' ? 'COD' : 'UPI'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">
                          +91 {order.shippingAddress.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <button
            onClick={onClose}
            className="w-full h-10 rounded font-medium bg-[#2874f0] hover:bg-[#1a5bbf] text-white transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}
