"use client";

import { useState } from "react";
import { X, CheckCircle2, CreditCard, MapPin, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem, Address, CheckoutStep } from "@/types";

// Indian States and Union Territories
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onConfirmOrder: (address: Address, paymentMethod: string) => void;
  onShowOrders?: () => void;
}

export function Checkout({
  isOpen,
  onClose,
  items,
  subtotal,
  onConfirmOrder,
  onShowOrders,
}: CheckoutProps) {
  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [address, setAddress] = useState<Address>({
    fullName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"cod">("cod");
  const [errors, setErrors] = useState<Partial<Address>>({});
  const [orderId, setOrderId] = useState<string>("");
  const [trackingId, setTrackingId] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Generate order ID and tracking ID
  const generateOrderId = () => {
    return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  };

  const generateTrackingId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `TRK-${result}`;
  };

  // Save order to localStorage
  const saveOrderToLocalStorage = () => {
    try {
      const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const newOrder = {
        id: generateOrderId(),
        trackingId: generateTrackingId(),
        items: items,
        subtotal: 0, // Free for user
        shippingAddress: { ...address },
        paymentMethod,
        date: new Date().toISOString(),
        status: 'confirmed'
      };
      existingOrders.push(newOrder);
      localStorage.setItem('userOrders', JSON.stringify(existingOrders));
    } catch (error) {
      console.error('Failed to save order:', error);
    }
  };

  // Format phone number to Indian format
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      return cleaned;
    }
    return cleaned.substring(0, 10);
  };

  // Validate address for Indian format
  const validateAddress = (): boolean => {
    const newErrors: Partial<Address> = {};
    let isValid = true;

    if (!address.fullName.trim()) {
      newErrors.fullName = "Required";
      isValid = false;
    }
    if (!address.streetAddress.trim()) {
      newErrors.streetAddress = "Required";
      isValid = false;
    }
    if (!address.city.trim()) {
      newErrors.city = "Required";
      isValid = false;
    }
    if (!address.state.trim()) {
      newErrors.state = "Required";
      isValid = false;
    }
    if (!address.zipCode.trim()) {
      newErrors.zipCode = "Required";
      isValid = false;
    } else if (!/^\d{6}$/.test(address.zipCode)) {
      newErrors.zipCode = "Invalid PIN code (6 digits required)";
      isValid = false;
    }
    if (!address.phoneNumber.trim()) {
      newErrors.phoneNumber = "Required";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(address.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number (10 digits starting with 6-9)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle address input
  const handleAddressChange = (field: keyof Address, value: string) => {
    // Format phone number
    if (field === "phoneNumber") {
      value = formatPhoneNumber(value);
    }
    setAddress((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Proceed to payment
  const handleProceedToPayment = () => {
    if (validateAddress()) {
      setStep("payment");
    }
  };

  // Confirm order
  const handleConfirmOrder = () => {
    // Set loading state
    setIsProcessing(true);

    const newOrderId = generateOrderId();
    const newTrackingId = generateTrackingId();

    // Save order to localStorage
    saveOrderToLocalStorage();

    // Small delay to show loading effect
    setTimeout(() => {
      setOrderId(newOrderId);
      setTrackingId(newTrackingId);
      setStep("confirmation");
      setShowSuccess(true);
      setIsProcessing(false);
      onConfirmOrder(address, paymentMethod);
      // Open orders modal to show order history
      if (onShowOrders) {
        onShowOrders();
      }
    }, 2000);
  };

  // Reset checkout
  const handleReset = () => {
    setStep("shipping");
    setAddress({
      fullName: "",
      streetAddress: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
    });
    setPaymentMethod("cod");
    setErrors({});
    setOrderId("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Checkout Modal */}
      <div className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl sm:max-h-[90vh] bg-white dark:bg-gray-950 z-[51] shadow-2xl animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-bottom-8 duration-300 ease-out overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-800 bg-[#2874f0]">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 -ml-1.5 text-white hover:bg-white/20 rounded transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Checkout
              </h2>
              <p className="text-xs text-white/80">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <div className="text-base font-bold text-white">
            FREE
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          {["shipping", "payment", "confirmation"].map((s, index) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (s === "shipping" || (s === "payment" && step !== "confirmation")) {
                    setStep(s as CheckoutStep);
                  }
                }}
                className={`px-3 sm:px-4 py-1.5 rounded text-xs sm:text-sm font-medium transition-all ${
                  step === s
                    ? "bg-[#2874f0] text-white"
                    : step === "confirmation"
                    ? "text-gray-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {s === "shipping" && "Address"}
                {s === "payment" && "Payment"}
                {s === "confirmation" && "Done"}
              </button>
              {index < 2 && (
                <div className={`h-px w-6 sm:w-8 ${step === "confirmation" || (step === "payment" && index === 0) ? "bg-[#2874f0]" : "bg-gray-300 dark:bg-gray-700"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {step === "shipping" && (
            <div className="p-4 sm:p-6 space-y-6">
              <div className="flex items-center gap-2 text-gray-900 dark:text-white mb-4">
                <MapPin className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Delivery Address</h3>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={address.fullName}
                    onChange={(e) => handleAddressChange("fullName", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors ${
                      errors.fullName
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 dark:border-gray-800 focus:border-blue-600"
                    } focus:outline-none`}
                    placeholder="Rahul Sharma"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                {/* Street Address */}
                <div className="space-y-2">
                  <label
                    htmlFor="streetAddress"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    House No., Street Address *
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    value={address.streetAddress}
                    onChange={(e) => handleAddressChange("streetAddress", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors ${
                      errors.streetAddress
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 dark:border-gray-800 focus:border-blue-600"
                    } focus:outline-none`}
                    placeholder="123, Main Market Road"
                  />
                  {errors.streetAddress && (
                    <p className="text-sm text-red-500">{errors.streetAddress}</p>
                  )}
                </div>

                {/* Apartment (Optional) */}
                <div className="space-y-2">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Building, Floor, Area <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    value={address.apartment}
                    onChange={(e) => handleAddressChange("apartment", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="Shivam Complex, 2nd Floor, Sector 15"
                  />
                </div>

                {/* City and State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      City / Town *
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={address.city}
                      onChange={(e) => handleAddressChange("city", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors ${
                        errors.city
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 dark:border-gray-800 focus:border-blue-600"
                      } focus:outline-none`}
                      placeholder="Mumbai"
                    />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      State *
                    </label>
                    <select
                      id="state"
                      value={address.state}
                      onChange={(e) => handleAddressChange("state", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors ${
                        errors.state
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 dark:border-gray-800 focus:border-blue-600"
                      } focus:outline-none cursor-pointer`}
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                  </div>
                </div>

                {/* PIN Code */}
                <div className="space-y-2">
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={address.zipCode}
                    onChange={(e) => handleAddressChange("zipCode", e.target.value.replace(/\D/g, "").substring(0, 6))}
                    maxLength={6}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors ${
                      errors.zipCode
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 dark:border-gray-800 focus:border-blue-600"
                    } focus:outline-none`}
                    placeholder="400001"
                  />
                  {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode}</p>}
                  <p className="text-xs text-gray-500 dark:text-gray-400">6-digit PIN code</p>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      +91
                    </span>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={address.phoneNumber}
                      onChange={(e) => handleAddressChange("phoneNumber", e.target.value)}
                      maxLength={10}
                      className={`w-full pl-16 pr-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors ${
                        errors.phoneNumber
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 dark:border-gray-800 focus:border-blue-600"
                      } focus:outline-none`}
                      placeholder="9876543210"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">10-digit mobile number</p>
                </div>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="p-4 sm:p-6 space-y-6">
              <div className="flex items-center gap-2 text-gray-900 dark:text-white mb-4">
                <Lock className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Payment Method</h3>
              </div>

              {/* Payment Options */}
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    paymentMethod === "cod"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">Free iPhone Delivery</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get your iPhone delivered for free!
                    </p>
                  </div>
                  {paymentMethod === "cod" && (
                    <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h4>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.model} - {item.selectedColor.name}
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        FREE
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-3 flex justify-between">
                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                      You Pay
                    </span>
                    <span className="text-base font-bold text-green-600 dark:text-green-400">
                      ₹0 (Free iPhone Delivery)
                    </span>
                  </div>
                </div>
              </div>

              {/* Address Review */}
              <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Delivering to
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {address.fullName}
                  <br />
                  {address.streetAddress}
                  {address.apartment && `, ${address.apartment}`}
                  <br />
                  {address.city}, {address.state} - {address.zipCode}
                  <br />
                  +91 {address.phoneNumber}
                </p>
              </div>
            </div>
          )}

          {step === "confirmation" && (
            <div className="relative p-4 sm:p-6 flex flex-col items-center justify-center min-h-[400px] text-center space-y-6 overflow-hidden">
              {/* Confetti elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Flower petals - colorful circles blooming */}
                <div className="confetti absolute top-0 left-[5%] w-6 h-6 bg-pink-500 rounded-full" style={{ animationDelay: '0s' }} />
                <div className="confetti absolute top-0 left-[12%] w-5 h-5 bg-rose-500 rounded-full" style={{ animationDelay: '0.1s' }} />
                <div className="confetti absolute top-0 left-[18%] w-6 h-6 bg-orange-400 rounded-full" style={{ animationDelay: '0.2s' }} />
                <div className="confetti absolute top-0 left-[25%] w-5 h-5 bg-yellow-500 rounded-full" style={{ animationDelay: '0.3s' }} />
                <div className="confetti absolute top-0 left-[32%] w-6 h-6 bg-green-500 rounded-full" style={{ animationDelay: '0.4s' }} />
                <div className="confetti absolute top-0 left-[40%] w-5 h-5 bg-teal-500 rounded-full" style={{ animationDelay: '0.5s' }} />
                <div className="confetti absolute top-0 left-[48%] w-6 h-6 bg-blue-500 rounded-full" style={{ animationDelay: '0.6s' }} />
                <div className="confetti absolute top-0 left-[56%] w-5 h-5 bg-indigo-500 rounded-full" style={{ animationDelay: '0.7s' }} />
                <div className="confetti absolute top-0 left-[65%] w-6 h-6 bg-purple-500 rounded-full" style={{ animationDelay: '0.8s' }} />
                <div className="confetti absolute top-0 left-[72%] w-5 h-5 bg-fuchsia-500 rounded-full" style={{ animationDelay: '0.9s' }} />
                <div className="confetti absolute top-0 left-[80%] w-6 h-6 bg-red-500 rounded-full" style={{ animationDelay: '1.0s' }} />
                <div className="confetti absolute top-0 left-[88%] w-5 h-5 bg-pink-400 rounded-full" style={{ animationDelay: '1.1s' }} />
                <div className="confetti absolute top-0 left-[95%] w-6 h-6 bg-amber-400 rounded-full" style={{ animationDelay: '1.2s' }} />

                {/* Star/sparkle elements */}
                <div className="animate-bloom absolute top-[15%] left-[10%] w-2 h-2 bg-yellow-300 rounded-full" style={{ animationDelay: '0.5s' }} />
                <div className="animate-bloom absolute top-[25%] left-[85%] w-3 h-3 bg-white rounded-full" style={{ animationDelay: '0.7s' }} />
                <div className="animate-bloom absolute top-[45%] left-[15%] w-2 h-2 bg-blue-300 rounded-full" style={{ animationDelay: '0.9s' }} />
                <div className="animate-bloom absolute top-[55%] left-[90%] w-3 h-3 bg-pink-300 rounded-full" style={{ animationDelay: '1.1s' }} />
                <div className="animate-bloom absolute top-[70%] left-[5%] w-2 h-2 bg-green-300 rounded-full" style={{ animationDelay: '1.3s' }} />
              </div>

              {/* Success Animation */}
              <div className="relative z-10">
                {/* Multiple pulsing circles for celebration effect */}
                <div className="absolute inset-0 h-32 w-32 bg-green-400/20 rounded-full animate-ping" style={{ animationDuration: '1.5s' }} />
                <div className="absolute inset-2 h-28 w-28 bg-green-400/30 rounded-full animate-ping" style={{ animationDelay: '0.2s', animationDuration: '1.5s' }} />
                <div className="absolute inset-4 h-24 w-24 bg-green-400/40 rounded-full animate-ping" style={{ animationDelay: '0.4s', animationDuration: '1.5s' }} />

                {/* Main success circle */}
                <div className="relative h-32 w-32 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-600 dark:to-green-800 rounded-full flex items-center justify-center animate-in zoom-in duration-500 shadow-2xl shadow-green-500/50">
                  <CheckCircle2 className="h-20 w-20 text-white" strokeWidth={3} />
                </div>

                {/* Confetti-like sparkles */}
                <div className="absolute -top-4 -right-4 animate-bounce" style={{ animationDelay: '0.1s' }}>
                  <div className="h-3 w-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50" />
                </div>
                <div className="absolute -top-2 -left-6 animate-bounce" style={{ animationDelay: '0.2s' }}>
                  <div className="h-3 w-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
                </div>
                <div className="absolute top-8 -right-8 animate-bounce" style={{ animationDelay: '0.3s' }}>
                  <div className="h-3 w-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
                </div>
                <div className="absolute -bottom-2 -left-8 animate-bounce" style={{ animationDelay: '0.4s' }}>
                  <div className="h-3 w-3 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50" />
                </div>
                <div className="absolute -bottom-4 right-8 animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <div className="h-3 w-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                </div>
              </div>

              <div className="space-y-3 z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">
                  🎉 {address.fullName}, your order is placed!
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Congratulations! Your iPhone is on the way!
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-700 rounded-2xl p-6 w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 z-10">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Order ID</p>
                <p className="text-xl font-mono font-bold text-green-700 dark:text-green-300 mb-4">
                  {orderId}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Tracking ID</p>
                <p className="text-xl font-mono font-bold text-blue-700 dark:text-blue-300 mb-4">
                  {trackingId}
                </p>
                <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                    💝 Payment: Free iPhone Delivery
                  </p>
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 mt-1">
                    💝 Total: ₹0 (FREE!)
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 z-10">
                <p className="font-medium">📱 +91 {address.phoneNumber}</p>
                <p className="mt-2">Estimated delivery: 3-7 business days</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== "confirmation" && (
          <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex gap-2">
              {step === "payment" && (
                <button
                  onClick={() => setStep("shipping")}
                  className="flex-1 h-11 rounded font-medium border-2 border-[#2874f0] text-[#2874f0] hover:bg-[#2874f0] hover:text-white transition-colors"
                >
                  BACK
                </button>
              )}
              <button
                onClick={step === "shipping" ? handleProceedToPayment : handleConfirmOrder}
                disabled={isProcessing}
                className="flex-1 h-11 rounded font-semibold bg-[#ffe500] hover:bg-[#ffd000] text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 border-2 border-gray-900/30 border-t-transparent border-r-transparent animate-spin rounded-full" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>{step === "shipping" ? "CONTINUE" : "PLACE ORDER"}</>
                )}
              </button>
            </div>
          </div>
        )}

        {step === "confirmation" && (
          <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <button
              onClick={handleReset}
              className="w-full h-11 rounded font-semibold bg-[#ffe500] hover:bg-[#ffd000] text-gray-900 transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </>
  );
}
