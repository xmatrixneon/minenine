export type IphoneModel =
  | "iPhone 16 Pro Max"
  | "iPhone 16 Pro"
  | "iPhone 16 Plus"
  | "iPhone 16"
  | "iPhone 15 Pro Max"
  | "iPhone 15 Pro"
  | "iPhone 15 Plus"
  | "iPhone 15"
  | "iPhone SE";

export type IphoneColor = string;

export type StorageOption = "64GB" | "128GB" | "256GB" | "512GB" | "1TB";

export interface ColorVariant {
  name: string;
  hex: string;
  class: string;
}

export interface StoragePricing {
  storage: StorageOption;
  price: number;
}

export interface Specifications {
  display: {
    size: string;
    resolution: string;
    technology: string;
    brightness: string;
  };
  chip: {
    name: string;
    cpu: string;
    gpu: string;
    neuralEngine: string;
  };
  camera: {
    main: string;
    ultraWide?: string;
    telephoto?: string;
    front: string;
    features: string[];
  };
  battery: {
    videoPlayback: string;
    audioPlayback: string;
    fastCharging: string;
  };
  storage: {
    options: StoragePricing[];
  };
  physical: {
    dimensions: string;
    weight: string;
    material: string;
  };
  connectivity: {
    cellular: string;
    wifi: string;
    bluetooth: string;
    usb: string;
  };
}

export interface Iphone {
  id: string;
  model: IphoneModel;
  tagline: string;
  description: string;
  basePrice: number;
  colors: ColorVariant[];
  storageOptions: StoragePricing[];
  image: string;
  isNew: boolean;
  isPro: boolean;
  specs: Specifications;
}

export interface CartItem extends Iphone {
  selectedColor: ColorVariant;
  selectedStorage: StoragePricing;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
}

export interface Address {
  fullName: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

export interface Order extends CartItem {
  orderId: string;
  address: Address;
  paymentMethod: string;
  orderDate: Date;
  status: "pending" | "confirmed" | "shipped" | "delivered";
}

export type CheckoutStep = "shipping" | "payment" | "confirmation";
