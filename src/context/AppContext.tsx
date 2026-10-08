import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  BulkOrder,
  Customer,
  PaymentRecord,
  AdminSettings,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  FunctionType,
  BulkOrderItem
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_PAYMENTS,
  DEFAULT_SETTINGS
} from '../data/mockData';

export interface UserSession {
  role: 'customer' | 'admin';
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppContextType {
  // State
  orders: BulkOrder[];
  products: Product[];
  customers: Customer[];
  payments: PaymentRecord[];
  settings: AdminSettings;
  currentUser: UserSession;
  cart: CartItem[];
  currentRoute: string;
  selectedOrderId: string | null;
  selectedProductId: string | null;
  activeNotification: {
    id: string;
    type: 'whatsapp' | 'system';
    title: string;
    message: string;
    orderId?: string;
    timestamp: string;
  } | null;
  deviceMode: 'fluid' | 'mobile_app' | 'mobile_frame';
  setDeviceMode: (mode: 'fluid' | 'mobile_app' | 'mobile_frame') => void;
  toggleDeviceMode: () => void;

  // Navigation
  navigate: (route: string, params?: { orderId?: string; productId?: string }) => void;

  // Auth
  loginCustomer: (email: string, otp: string) => boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logout: () => void;
  switchRole: (role: 'customer' | 'admin') => void;

  // Cart
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Bulk Ordering & Flow
  createBulkOrder: (order: {
    customerName: string;
    customerPhone: string;
    customerWhatsapp: string;
    customerEmail?: string;
    functionType: FunctionType;
    eventDate: string;
    guests: number;
    deliveryDate: string;
    deliveryTime: string;
    deliveryAddress: string;
    specialInstructions?: string;
    items: BulkOrderItem[];
    subtotal: number;
    deliveryCharge: number;
    grandTotal: number;
  }) => string;
  payAdvance: (orderId: string, method: PaymentMethod) => boolean;
  payRemaining: (orderId: string, method: PaymentMethod) => boolean;
  sendPaymentReminder: (orderId: string, channel: 'WhatsApp' | 'SMS' | 'Email') => void;
  dismissNotification: () => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  recordOfflinePayment: (orderId: string, amount: number, note: string) => void;
  cancelOrder: (orderId: string) => void;
  updateProduct: (product: Product) => void;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
  resetToDemoState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence
  const [orders, setOrders] = useState<BulkOrder[]>(() => {
    const saved = localStorage.getItem('dairyflow_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dairyflow_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('dairyflow_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('dairyflow_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [settings, setSettings] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem('dairyflow_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [currentUser, setCurrentUser] = useState<UserSession>(() => {
    const saved = localStorage.getItem('dairyflow_user');
    return saved
      ? JSON.parse(saved)
      : {
          role: 'customer',
          name: 'Rahul Sharma',
          email: 'rahul@example.com',
          phone: '+91 98765 43210',
          isLoggedIn: true
        };
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dairyflow_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentRoute, setCurrentRoute] = useState<string>('/home');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('BULK-1024');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [deviceMode, setDeviceMode] = useState<'fluid' | 'mobile_app' | 'mobile_frame'>('fluid');

  const toggleDeviceMode = () => {
    setDeviceMode((prev) => {
      if (prev === 'fluid') return 'mobile_app';
      if (prev === 'mobile_app') return 'mobile_frame';
      return 'fluid';
    });
  };

  const [activeNotification, setActiveNotification] = useState<{
    id: string;
    type: 'whatsapp' | 'system';
    title: string;
    message: string;
    orderId?: string;
    timestamp: string;
  } | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('dairyflow_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dairyflow_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dairyflow_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('dairyflow_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('dairyflow_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('dairyflow_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('dairyflow_cart', JSON.stringify(cart));
  }, [cart]);

  const navigate = (route: string, params?: { orderId?: string; productId?: string }) => {
    if (params?.orderId) setSelectedOrderId(params.orderId);
    if (params?.productId) setSelectedProductId(params.productId);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginCustomer = (email: string, otp: string): boolean => {
    if (otp === '123456' || email === 'rahul@example.com') {
      const user: UserSession = {
        role: 'customer',
        name: 'Rahul Sharma',
        email: email || 'rahul@example.com',
        phone: '+91 98765 43210',
        isLoggedIn: true
      };
      setCurrentUser(user);
      navigate('/home');
      return true;
    }
    return false;
  };

  const loginAdmin = (email: string, pass: string): boolean => {
    if ((email === 'admin@demo.com' || email.includes('admin')) && pass === 'admin123') {
      const user: UserSession = {
        role: 'admin',
        name: 'Admin Manager',
        email: 'admin@demo.com',
        phone: '+91 98765 00000',
        isLoggedIn: true
      };
      setCurrentUser(user);
      navigate('/admin/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser({
      role: 'customer',
      name: 'Guest Customer',
      email: '',
      phone: '',
      isLoggedIn: false
    });
    navigate('/login');
  };

  const switchRole = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser({
        role: 'admin',
        name: 'DairyFlow Ops Admin',
        email: 'admin@demo.com',
        phone: '+91 98765 00000',
        isLoggedIn: true
      });
      navigate('/admin/dashboard');
    } else {
      setCurrentUser({
        role: 'customer',
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '+91 98765 43210',
        isLoggedIn: true
      });
      navigate('/home');
    }
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const createBulkOrder = (data: {
    customerName: string;
    customerPhone: string;
    customerWhatsapp: string;
    customerEmail?: string;
    functionType: FunctionType;
    eventDate: string;
    guests: number;
    deliveryDate: string;
    deliveryTime: string;
    deliveryAddress: string;
    specialInstructions?: string;
    items: BulkOrderItem[];
    subtotal: number;
    deliveryCharge: number;
    grandTotal: number;
  }): string => {
    // Generate order ID
    const nextNum = 1034 + orders.length - 10;
    const orderId = `BULK-${nextNum > 1024 ? nextNum : 1034}`;
    const advanceRequired = Math.round((data.grandTotal * settings.advancePercentage) / 100);

    const newOrder: BulkOrder = {
      id: orderId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerWhatsapp: data.customerWhatsapp,
      customerEmail: data.customerEmail || 'rahul@example.com',
      functionType: data.functionType,
      eventDate: data.eventDate,
      guests: data.guests,
      deliveryDate: data.deliveryDate,
      deliveryTime: data.deliveryTime,
      deliveryAddress: data.deliveryAddress,
      specialInstructions: data.specialInstructions,
      items: data.items,
      subtotal: data.subtotal,
      deliveryCharge: data.deliveryCharge,
      grandTotal: data.grandTotal,
      advancePercentage: settings.advancePercentage,
      advanceRequired: advanceRequired,
      advancePaid: 0,
      remainingAmount: data.grandTotal,
      orderStatus: 'Requested',
      paymentStatus: 'Payment Pending',
      createdAt: new Date().toISOString(),
      isBulk: true,
      reminders: [],
      timeline: [
        { status: 'Requested', label: 'Order Requested - Awaiting 30% Advance', timestamp: 'Just now', completed: true, current: true },
        { status: 'Advance Paid', label: `Advance Payment Required (₹${advanceRequired.toLocaleString('en-IN')})`, completed: false },
        { status: 'Confirmed', label: 'Order Confirmed & Scheduled', completed: false },
        { status: 'Preparing', label: 'Fresh Batch Preparation', completed: false },
        { status: 'Ready', label: 'Ready for Dispatch & Quality Check', completed: false },
        { status: 'Out for Delivery', label: 'Out for Delivery (Cold Van)', completed: false },
        { status: 'Delivered', label: 'Delivered to Venue', completed: false },
        { status: 'Fully Paid', label: 'Full Payment Cleared', completed: false }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setSelectedOrderId(orderId);
    return orderId;
  };

  const payAdvance = (orderId: string, method: PaymentMethod): boolean => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    const amount = order.advanceRequired;
    const remaining = order.grandTotal - amount;

    const paymentRecord: PaymentRecord = {
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: order.id,
      customerName: order.customerName,
      amount: amount,
      type: 'Advance',
      method: method,
      status: 'Successful',
      transactionRef: `${method.toUpperCase()}/${Date.now()}/AUTH_CONFIRMED`,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    };

    setPayments((prev) => [paymentRecord, ...prev]);

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const updatedTimeline = o.timeline.map((item) => {
          if (item.status === 'Requested') return { ...item, completed: true, current: false };
          if (item.status === 'Advance Paid') {
            return {
              ...item,
              label: `Advance Payment Received (₹${amount.toLocaleString('en-IN')})`,
              timestamp: 'Just now',
              completed: true,
              current: false
            };
          }
          if (item.status === 'Confirmed') {
            return {
              ...item,
              label: 'Order Confirmed & Scheduled for Event',
              timestamp: 'Confirmed',
              completed: true,
              current: true
            };
          }
          return item;
        });

        return {
          ...o,
          advancePaid: amount,
          remainingAmount: remaining,
          orderStatus: 'Confirmed',
          paymentStatus: 'Advance Paid',
          timeline: updatedTimeline
        };
      })
    );

    // Update customer stats
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.name.toLowerCase() === order.customerName.toLowerCase()) {
          return {
            ...c,
            totalOrders: c.totalOrders + 1,
            bulkOrders: c.bulkOrders + 1,
            totalSpent: c.totalSpent + amount,
            pendingAmount: c.pendingAmount + remaining
          };
        }
        return c;
      })
    );

    return true;
  };

  const payRemaining = (orderId: string, method: PaymentMethod): boolean => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    const amount = order.remainingAmount;
    if (amount <= 0) return true;

    const paymentRecord: PaymentRecord = {
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: order.id,
      customerName: order.customerName,
      amount: amount,
      type: 'Remaining',
      method: method,
      status: 'Successful',
      transactionRef: `${method.toUpperCase()}/${Date.now()}/FINAL_SETTLE`,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    };

    setPayments((prev) => [paymentRecord, ...prev]);

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const updatedTimeline = o.timeline.map((item) => {
          if (item.status === 'Fully Paid') {
            return {
              ...item,
              label: `Full Payment Cleared (₹${o.grandTotal.toLocaleString('en-IN')})`,
              timestamp: 'Just now',
              completed: true,
              current: true
            };
          }
          return item;
        });

        return {
          ...o,
          advancePaid: o.grandTotal,
          remainingAmount: 0,
          paymentStatus: 'Fully Paid',
          orderStatus: o.orderStatus === 'Delivered' ? 'Delivered' : o.orderStatus,
          timeline: updatedTimeline
        };
      })
    );

    // Update customer pending amount
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.name.toLowerCase() === order.customerName.toLowerCase()) {
          return {
            ...c,
            totalSpent: c.totalSpent + amount,
            pendingAmount: Math.max(0, c.pendingAmount - amount)
          };
        }
        return c;
      })
    );

    return true;
  };

  const sendPaymentReminder = (orderId: string, channel: 'WhatsApp' | 'SMS' | 'Email') => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const formattedPending = `₹${order.remainingAmount.toLocaleString('en-IN')}`;
    const msg = `Your bulk order ${order.id} has a pending payment of ${formattedPending}. Please complete the payment before the scheduled delivery on ${order.deliveryDate} at ${order.deliveryTime}.`;

    const reminderRecord = {
      id: `rem-${Date.now()}`,
      orderId: order.id,
      channel: channel,
      timestamp: new Date().toISOString(),
      message: msg,
      sentTo: order.customerWhatsapp || order.customerPhone
    };

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              reminders: [reminderRecord, ...o.reminders]
            }
          : o
      )
    );

    // Trigger visual notification toast/banner simulating WhatsApp receiving
    setActiveNotification({
      id: `notif-${Date.now()}`,
      type: channel.toLowerCase() === 'whatsapp' ? 'whatsapp' : 'system',
      title: `${channel} Reminder Sent to ${order.customerName}`,
      message: msg,
      orderId: order.id,
      timestamp: 'Just now'
    });
  };

  const dismissNotification = () => {
    setActiveNotification(null);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const updatedTimeline = o.timeline.map((item) => {
          if (item.status === newStatus) {
            return {
              ...item,
              timestamp: 'Updated just now',
              completed: true,
              current: true
            };
          }
          return item;
        });

        return {
          ...o,
          orderStatus: newStatus,
          timeline: updatedTimeline
        };
      })
    );
  };

  const recordOfflinePayment = (orderId: string, amount: number, note: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const remaining = Math.max(0, order.remainingAmount - amount);
    const isNowFullyPaid = remaining === 0;

    const paymentRecord: PaymentRecord = {
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: order.id,
      customerName: order.customerName,
      amount: amount,
      type: isNowFullyPaid ? 'Full' : 'Remaining',
      method: 'Cash / Offline',
      status: 'Successful',
      transactionRef: `OFFLINE/CASH/${note || 'COUNTER_RECEIPT'}`,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    };

    setPayments((prev) => [paymentRecord, ...prev]);

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          advancePaid: o.advancePaid + amount,
          remainingAmount: remaining,
          paymentStatus: isNowFullyPaid ? 'Fully Paid' : 'Advance Paid'
        };
      })
    );
  };

  const cancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'Cancelled');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetToDemoState = () => {
    localStorage.removeItem('dairyflow_orders');
    localStorage.removeItem('dairyflow_products');
    localStorage.removeItem('dairyflow_customers');
    localStorage.removeItem('dairyflow_payments');
    localStorage.removeItem('dairyflow_settings');
    localStorage.removeItem('dairyflow_cart');
    setOrders(INITIAL_ORDERS);
    setProducts(INITIAL_PRODUCTS);
    setCustomers(INITIAL_CUSTOMERS);
    setPayments(INITIAL_PAYMENTS);
    setSettings(DEFAULT_SETTINGS);
    setCart([]);
    setSelectedOrderId('BULK-1024');
    setActiveNotification(null);
  };

  return (
    <AppContext.Provider
      value={{
        orders,
        products,
        customers,
        payments,
        settings,
        currentUser,
        cart,
        currentRoute,
        selectedOrderId,
        selectedProductId,
        activeNotification,
        deviceMode,
        setDeviceMode,
        toggleDeviceMode,
        navigate,
        loginCustomer,
        loginAdmin,
        logout,
        switchRole,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        createBulkOrder,
        payAdvance,
        payRemaining,
        sendPaymentReminder,
        dismissNotification,
        updateOrderStatus,
        recordOfflinePayment,
        cancelOrder,
        updateProduct,
        updateSettings,
        resetToDemoState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
