export type FunctionType = 
  | 'Wedding'
  | 'Engagement'
  | 'Birthday'
  | 'Party'
  | 'Religious Function'
  | 'Catering'
  | 'Hotel/Restaurant'
  | 'Community Event'
  | 'Other';

export type OrderStatus =
  | 'Requested'
  | 'Advance Paid'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Fully Paid'
  | 'Cancelled';

export type PaymentStatus =
  | 'Fully Paid'
  | 'Advance Paid'
  | 'Payment Pending'
  | 'Payment Due'
  | 'Overdue'
  | 'Failed';

export type PaymentMethod = 'UPI' | 'Card' | 'Net Banking' | 'Cash / Offline';

export interface Product {
  id: string;
  name: string;
  category: 'Milk' | 'Curd & Butter' | 'Paneer' | 'Ghee' | 'Sweets' | 'Packages';
  unit: string;
  unitPrice: number;
  bulkMinQty: number;
  bulkPrice: number;
  description: string;
  image: string;
  popular?: boolean;
  inStock: boolean;
  fatContent?: string;
  shelfLife?: string;
}

export interface BulkOrderItem {
  productId: string;
  name: string;
  quantity: number;
  unit: string;
  rate: number;
  total: number;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  timestamp?: string;
  completed: boolean;
  current?: boolean;
  note?: string;
}

export interface PaymentReminderRecord {
  id: string;
  orderId: string;
  channel: 'WhatsApp' | 'SMS' | 'Email';
  timestamp: string;
  message: string;
  sentTo: string;
}

export interface BulkOrder {
  id: string; // e.g. "BULK-1024"
  customerName: string;
  customerPhone: string;
  customerWhatsapp: string;
  customerEmail?: string;
  functionType: FunctionType;
  eventDate: string; // e.g. "2026-10-25"
  guests: number;
  deliveryDate: string;
  deliveryTime: string; // e.g. "7:00 AM"
  deliveryAddress: string;
  specialInstructions?: string;
  items: BulkOrderItem[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  advancePercentage: number; // default 30
  advanceRequired: number;
  advancePaid: number;
  remainingAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  timeline: OrderTimelineEvent[];
  reminders: PaymentReminderRecord[];
  isBulk: boolean;
}

export interface PaymentRecord {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  type: 'Advance' | 'Remaining' | 'Full' | 'Refund';
  method: PaymentMethod;
  status: 'Successful' | 'Pending' | 'Failed';
  transactionRef: string;
  timestamp: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  totalOrders: number;
  bulkOrders: number;
  totalSpent: number;
  pendingAmount: number;
  lastOrderDate: string;
}

export interface AdminSettings {
  businessName: string;
  advancePercentage: number;
  whatsappNumber: string;
  upiVpa: string;
  deliveryChargeDefault: number;
  autoRemindersEnabled: boolean;
}
