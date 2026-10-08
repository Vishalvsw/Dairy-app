import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { selectedOrderId, orders, navigate, switchRole } = useApp();

  const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

  if (!order) {
    return (
      <div className="min-h-screen bg-stone-50 py-16 px-4 text-center">
        <p className="text-sm text-stone-600 mb-4">No order found.</p>
        <button
          onClick={() => navigate('/home')}
          className="px-4 py-2 bg-amber-700 text-white rounded-lg text-xs"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-lg p-6 sm:p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
            ✓ Bulk Order Confirmed
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-md mx-auto">
            Your bulk order has been successfully confirmed.
          </p>

          {/* Key Summary Cards */}
          <div className="my-6 bg-stone-50 rounded-xl border border-stone-200/90 p-5 text-left text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="text-stone-500 font-medium">Order ID</span>
              <span className="font-mono font-bold text-stone-900 text-sm">{order.id}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-stone-500">Advance Paid</span>
              <span className="font-bold text-emerald-700 text-sm tabular-nums">
                ₹{order.advancePaid.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-stone-500">Remaining Amount</span>
              <span className="font-bold text-stone-900 text-sm tabular-nums">
                ₹{order.remainingAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100">
              <span className="text-stone-500">Function</span>
              <span className="font-semibold text-stone-800">
                {order.functionType} ({order.guests} Guests)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-stone-500">Event Date</span>
              <span className="font-semibold text-stone-800">{order.eventDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-stone-500">Delivery</span>
              <span className="font-semibold text-stone-800">
                {order.deliveryDate} • {order.deliveryTime}
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg p-3 text-xs mb-6 text-left flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Cold Chain Reserved: </span>
              Your batch is scheduled for production. An automated receipt and dispatch updates have been logged for your WhatsApp number.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={() => navigate('/orders', { orderId: order.id })}
              className="w-full py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>View Order &amp; Track Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/919876543210?text=Hi%20DairyFlow,%20I%20have%20confirmed%20bulk%20order%20${order.id}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Business on WhatsApp</span>
            </a>

            {/* Quick Demo Switcher Button */}
            <div className="pt-3 border-t border-stone-200">
              <button
                onClick={() => {
                  switchRole('admin');
                  navigate('/admin/bulk-orders');
                }}
                className="w-full py-2 px-3 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Switch to Admin Dashboard (Inspect Order as Admin)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
