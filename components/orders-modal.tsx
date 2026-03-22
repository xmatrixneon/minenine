"use client";

import { useState, useEffect } from "react";
import { X, Package, Calendar, MapPin, IndianRupee, CheckCircle2, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-3xl sm:max-h-[85vh] bg-white dark:bg-gray-950 z-[51] shadow-2xl animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-bottom-8 duration-300 ease-out overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                My Orders
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {orders.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllOrders}
                className="text-xs"
              >
                Clear All
              </Button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Package className="h-10 w-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No orders yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[200px]">
                Your order history will appear here after you place an order.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Order {order.id}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="p-4 sm:p-6">
                    {/* Items */}
                    <div className="mb-4 space-y-3">
                      {order.items.map((item, index) => (
                        <div key={`${order.id}-${index}`} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                              {item.model.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {item.model}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Tracking ID */}
                      <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Tracking ID</p>
                          <p className="text-sm font-mono font-semibold text-gray-900 dark:text-white">
                            {order.trackingId}
                          </p>
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div className="flex items-start gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Deliver To</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {order.shippingAddress.fullName}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                            {order.shippingAddress.streetAddress}
                            {order.shippingAddress.apartment && `, ${order.shippingAddress.apartment}`}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method & Phone */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
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
        <div className="p-4 sm:p-6 border-t border-gray-200/50 dark:border-gray-800/50">
          <Button
            onClick={onClose}
            className="w-full h-12 rounded-full font-medium"
          >
            Close
          </Button>
        </div>
      </div>
    </>
  );
}
