import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, CheckCircle2, ChevronDown, ChevronUp, RotateCcw, Sparkles, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';

export const HeroDemoBar: React.FC = () => {
  const {
    currentRoute,
    navigate,
    switchRole,
    currentUser,
    orders,
    sendPaymentReminder,
    payRemaining,
    resetToDemoState,
    deviceMode,
    toggleDeviceMode,
    setDeviceMode
  } = useApp();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Target demo order
  const targetOrder = orders.find((o) => o.id === 'BULK-1024') || orders[0];

  // Determine current step index (0-based) based on app state
  const getCurrentStepIndex = (): number => {
    if (currentRoute === '/home' && !targetOrder?.reminders?.length && targetOrder?.remainingAmount > 0) return 0;
    if (currentRoute === '/bulk-order') return 1;
    if (currentRoute === '/checkout') return 4;
    if (currentRoute === '/order-success') return 6;
    if (currentRoute.startsWith('/admin') && (!targetOrder?.reminders || targetOrder.reminders.length === 0)) return 7;
    if (targetOrder?.reminders && targetOrder.reminders.length > 0 && targetOrder.remainingAmount > 0 && currentUser.role === 'customer') return 9;
    if (targetOrder && targetOrder.remainingAmount === 0) return 11;
    return 0;
  };

  const steps = [
    {
      num: 1,
      title: 'Instagram Entry',
      desc: 'Customer arrives on DairyFlow from Instagram promo',
      action: () => {
        switchRole('customer');
        navigate('/home');
      }
    },
    {
      num: 2,
      title: 'Plan Bulk Order',
      desc: 'Click "Plan a Bulk Order" CTA',
      action: () => {
        switchRole('customer');
        navigate('/bulk-order');
      }
    },
    {
      num: 3,
      title: 'Event Details',
      desc: 'Wedding · 500 Guests · 25 Oct 2026 · 7:00 AM',
      action: () => {
        switchRole('customer');
        navigate('/bulk-order');
      }
    },
    {
      num: 4,
      title: 'Product Selection',
      desc: '100L Milk, 50kg Curd, 30kg Paneer, 10kg Ghee, 20kg Sweets',
      action: () => {
        switchRole('customer');
        navigate('/bulk-order');
      }
    },
    {
      num: 5,
      title: '30% Advance Calculation',
      desc: 'Total: ₹37,500 · Advance: ₹11,250 · Pending: ₹26,250',
      action: () => {
        switchRole('customer');
        navigate('/bulk-order');
      }
    },
    {
      num: 6,
      title: 'Simulate Advance Payment',
      desc: 'Customer pays ₹11,250 via UPI/Cards',
      action: () => {
        switchRole('customer');
        navigate('/checkout', { orderId: targetOrder?.id });
      }
    },
    {
      num: 7,
      title: 'Order Confirmed',
      desc: 'BULK-1024 confirmed with ₹11,250 paid receipt',
      action: () => {
        switchRole('customer');
        navigate('/order-success', { orderId: targetOrder?.id });
      }
    },
    {
      num: 8,
      title: 'Switch to Admin Portal',
      desc: 'Admin dashboard instantly reflects BULK-1024',
      action: () => {
        switchRole('admin');
        navigate('/admin/bulk-orders');
      }
    },
    {
      num: 9,
      title: 'Send Payment Reminder',
      desc: 'Admin triggers 1-Click WhatsApp payment reminder',
      action: () => {
        if (targetOrder) {
          sendPaymentReminder(targetOrder.id, 'WhatsApp');
          switchRole('admin');
          navigate('/admin/payments');
        }
      }
    },
    {
      num: 10,
      title: 'Simulated Notification',
      desc: 'Customer receives WhatsApp alert with pending amount',
      action: () => {
        if (targetOrder) {
          sendPaymentReminder(targetOrder.id, 'WhatsApp');
          switchRole('customer');
          navigate('/orders', { orderId: targetOrder.id });
        }
      }
    },
    {
      num: 11,
      title: 'Pay Remaining ₹26,250',
      desc: 'Customer pays final amount before delivery',
      action: () => {
        if (targetOrder) {
          payRemaining(targetOrder.id, 'UPI');
          switchRole('customer');
          navigate('/orders', { orderId: targetOrder.id });
        }
      }
    },
    {
      num: 12,
      title: 'Fully Paid & Cleared',
      desc: 'Admin & Customer see Paid ₹37,500 · Pending ₹0',
      action: () => {
        switchRole('admin');
        navigate('/admin/orders', { orderId: targetOrder?.id });
      }
    }
  ];

  const currentStep = getCurrentStepIndex();

  return (
    <aside aria-label="Demo Presentation Controller" className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Client Hero Scenario:
          </span>
          <span className="text-stone-300 hidden sm:inline">
            12-Step Bulk Dairy Advance & Settlement Demo
          </span>
        </div>

        {/* Center / Right: Quick actions */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1 bg-stone-800/80 px-2 py-1 rounded border border-stone-700 text-[11px] text-stone-300">
            <span>Current Role:</span>
            <span className={`font-semibold ${currentUser.role === 'admin' ? 'text-blue-400' : 'text-amber-400'}`}>
              {currentUser.role === 'admin' ? 'Admin Portal' : 'Customer Storefront'}
            </span>
          </div>

          <button
            onClick={() => switchRole(currentUser.role === 'admin' ? 'customer' : 'admin')}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 rounded font-medium transition-colors flex items-center gap-1 text-[11px]"
          >
            <span>Switch to {currentUser.role === 'admin' ? 'Customer' : 'Admin'}</span>
          </button>

          {/* View Mode Selector for Client Demo */}
          <div className="hidden md:flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700 text-[11px]">
            <button
              onClick={() => setDeviceMode('fluid')}
              className={`px-2 py-0.5 rounded transition-colors ${
                deviceMode === 'fluid'
                  ? 'bg-stone-700 text-white font-semibold shadow-2xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Full responsive web view"
            >
              Desktop Web
            </button>
            <button
              onClick={() => setDeviceMode('mobile_app')}
              className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
                deviceMode === 'mobile_app'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-2xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Dedicated Mobile App User Interface"
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile App</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile_frame')}
              className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
                deviceMode === 'mobile_frame'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-2xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="iPhone Device Mockup Frame"
            >
              <span>Phone Frame</span>
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold rounded flex items-center gap-1 text-[11px] transition-colors"
          >
            <span>Walkthrough Steps</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={resetToDemoState}
            title="Reset data back to initial state"
            className="p-1 text-stone-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expanded Stepper Drawer */}
      {isExpanded && (
        <div className="border-t border-stone-800 bg-stone-950/95 px-4 py-4 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3 text-stone-400 text-xs">
              <span className="font-semibold text-stone-200">
                12-Step Business Flow (Click any step to test immediately):
              </span>
              <span className="text-[11px] text-stone-400">
                Order Value: ₹37,500 · 30% Advance: ₹11,250 · Pending: ₹26,250
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {steps.map((st, idx) => {
                const isActive = idx === currentStep;
                return (
                  <button
                    key={st.num}
                    onClick={() => {
                      st.action();
                    }}
                    className={`text-left p-2.5 rounded-lg border transition-all text-[11px] ${
                      isActive
                        ? 'bg-amber-500/10 border-amber-500/60 text-white shadow-xs'
                        : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="w-4 h-4 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center font-bold text-[10px] text-amber-400 tabular-nums">
                        {st.num}
                      </span>
                      {isActive && (
                        <span className="text-[9px] uppercase tracking-wider text-amber-400 font-semibold">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="font-semibold truncate text-white">{st.title}</div>
                    <div className="text-[10px] text-stone-400 line-clamp-2 leading-tight mt-0.5">
                      {st.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
