import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, X, CheckCheck, ArrowRight, ShieldCheck } from 'lucide-react';

export const WhatsAppSimulatedPopup: React.FC = () => {
  const { activeNotification, dismissNotification, navigate, payRemaining, orders } = useApp();

  if (!activeNotification) return null;

  const order = activeNotification.orderId
    ? orders.find((o) => o.id === activeNotification.orderId)
    : null;

  const handlePayNow = () => {
    if (activeNotification.orderId) {
      payRemaining(activeNotification.orderId, 'UPI');
      dismissNotification();
      navigate('/orders', { orderId: activeNotification.orderId });
    }
  };

  const handleViewOrder = () => {
    if (activeNotification.orderId) {
      dismissNotification();
      navigate('/orders', { orderId: activeNotification.orderId });
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 max-w-sm w-full bg-white rounded-xl shadow-2xl border border-emerald-200 overflow-hidden animate-bounce-subtle">
      {/* WhatsApp simulated header */}
      <div className="bg-emerald-700 px-4 py-2.5 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold leading-tight">WhatsApp Business Alert</div>
            <div className="text-[10px] text-emerald-100">DairyFlow Customer Dispatch</div>
          </div>
        </div>
        <button
          onClick={dismissNotification}
          className="text-emerald-100 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Message body */}
      <div className="p-4 bg-emerald-50/50">
        <div className="bg-white rounded-lg p-3 text-xs text-stone-800 shadow-xs border border-emerald-100">
          <div className="font-semibold text-stone-900 mb-1 flex items-center justify-between">
            <span>{activeNotification.title}</span>
            <span className="text-[10px] text-stone-400 tabular-nums">Just now</span>
          </div>
          <p className="leading-relaxed text-stone-700 mb-2">
            "{activeNotification.message}"
          </p>

          <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure UPI Link attached
            </span>
            <span className="flex items-center gap-0.5 text-blue-500">
              <CheckCheck className="w-3.5 h-3.5" /> Read
            </span>
          </div>
        </div>

        {/* Quick Simulated Actions */}
        {order && order.remainingAmount > 0 && (
          <div className="mt-3 flex gap-2">
            <button
              onClick={handlePayNow}
              className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <span>Pay ₹{order.remainingAmount.toLocaleString('en-IN')} (UPI)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={handleViewOrder}
              className="py-2 px-3 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium border border-stone-200 rounded-lg transition-colors whitespace-nowrap"
            >
              View Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
