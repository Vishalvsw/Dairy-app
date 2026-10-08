import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Clock,
  Truck,
  Package,
  ShieldCheck,
  AlertCircle,
  MessageSquare,
  ArrowRight,
  CreditCard,
  MapPin,
  Calendar,
  ChevronLeft
} from 'lucide-react';
import { OrderStatus, PaymentMethod } from '../../types';

export const CustomerOrderTrackingPage: React.FC = () => {
  const { selectedOrderId, orders, payRemaining, navigate } = useApp();

  const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const [payingRemaining, setPayingRemaining] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

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

  const handlePayRemaining = (method: PaymentMethod = 'UPI') => {
    setPayingRemaining(true);
    setTimeout(() => {
      payRemaining(order.id, method);
      setPayingRemaining(false);
      setPaySuccess(true);
      setTimeout(() => setPaySuccess(false), 3000);
    }, 1000);
  };

  const stepsList: { status: OrderStatus; label: string }[] = [
    { status: 'Requested', label: 'Order Requested' },
    { status: 'Advance Paid', label: 'Advance Payment Received' },
    { status: 'Confirmed', label: 'Order Confirmed' },
    { status: 'Preparing', label: 'Preparing Fresh Batch' },
    { status: 'Ready', label: 'Ready for Delivery' },
    { status: 'Out for Delivery', label: 'Out for Delivery' },
    { status: 'Delivered', label: 'Delivered' },
    { status: 'Fully Paid', label: 'Fully Paid' }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Requested': return 0;
      case 'Advance Paid': return 1;
      case 'Confirmed': return 2;
      case 'Preparing': return 3;
      case 'Ready': return 4;
      case 'Out for Delivery': return 5;
      case 'Delivered': return order.remainingAmount === 0 ? 7 : 6;
      case 'Fully Paid': return 7;
      default: return 2;
    }
  };

  const currentStepIdx = order.remainingAmount === 0 ? 7 : getStepIndex(order.orderStatus);

  return (
    <div className="min-h-screen bg-stone-50 py-6 sm:py-8 px-3 sm:px-6 pb-28 md:pb-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top bar back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/orders')}
            className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Orders</span>
          </button>
          <div className="text-xs text-stone-500">
            Order Date: <span className="font-semibold text-stone-800">{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Header Hero */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-bold font-mono text-stone-900">{order.id}</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded font-semibold ${
                    order.paymentStatus === 'Fully Paid'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {order.paymentStatus}
                </span>
                <span className="text-xs px-2 py-0.5 bg-stone-100 text-stone-700 rounded border border-stone-200 font-medium">
                  {order.functionType}
                </span>
              </div>
              <div className="text-xs text-stone-500 flex items-center gap-2">
                <span>{order.customerName}</span>
                <span>·</span>
                <span>{order.guests} Guests</span>
                <span>·</span>
                <span>Event: {order.eventDate}</span>
              </div>
            </div>

            <div className="text-right sm:self-center">
              <div className="text-xs text-stone-400">Total Order Value</div>
              <div className="text-2xl font-bold text-stone-900 tabular-nums">
                ₹{order.grandTotal.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* SIMULATED WHATSAPP REMINDER NOTIFICATION BANNER */}
          {order.reminders && order.reminders.length > 0 && order.remainingAmount > 0 && (
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start justify-between gap-3 animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-2">
                    <span>Payment Reminder Received via WhatsApp</span>
                    <span className="text-[10px] text-emerald-700 font-normal">
                      ({order.reminders[0].channel} · Sent just now)
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                    "{order.reminders[0].message}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FINANCIAL BREAKDOWN CARD */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="text-xs text-stone-500">Total Value</div>
              <div className="text-xl font-bold text-stone-900 tabular-nums mt-1">
                ₹{order.grandTotal.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">Includes cold delivery fee</div>
            </div>

            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
              <div className="text-xs text-emerald-800 font-semibold">Advance / Total Paid</div>
              <div className="text-xl font-bold text-emerald-800 tabular-nums mt-1">
                ₹{order.advancePaid.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5">
                {order.advancePaid >= order.grandTotal ? '100% Cleared' : '30% Advance Secured'}
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${
              order.remainingAmount === 0
                ? 'bg-stone-50 border-stone-200'
                : 'bg-amber-50/70 border-amber-300'
            }`}>
              <div className="text-xs text-stone-600 font-semibold">Pending Balance</div>
              <div className="text-xl font-bold text-stone-900 tabular-nums mt-1">
                ₹{order.remainingAmount.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                {order.remainingAmount === 0 ? 'Nil balance' : 'Pay before/on delivery'}
              </div>
            </div>
          </div>

          {/* OUTSTANDING BALANCE ACTION */}
          {order.remainingAmount > 0 && (
            <div className="mt-5 p-4 bg-amber-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-amber-950">
                  Ready to settle remaining ₹{order.remainingAmount.toLocaleString('en-IN')}?
                </div>
                <div className="text-xs text-amber-800 mt-0.5">
                  Complete remaining payment now to mark this order Fully Paid.
                </div>
              </div>

              <button
                onClick={() => handlePayRemaining('UPI')}
                disabled={payingRemaining}
                className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-lg shadow-xs flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
              >
                {payingRemaining ? (
                  <span>Processing ₹{order.remainingAmount.toLocaleString('en-IN')}...</span>
                ) : (
                  <>
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay Remaining ₹{order.remainingAmount.toLocaleString('en-IN')} (UPI)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {paySuccess && (
            <div className="mt-4 p-3 bg-emerald-100 text-emerald-900 text-xs rounded-lg font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Payment confirmed! Order is now FULLY PAID.</span>
            </div>
          )}
        </div>

        {/* TIMELINE */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs">
          <h2 className="text-base font-bold text-stone-900 mb-6 pb-2 border-b border-stone-100 font-display">
            Order &amp; Delivery Timeline
          </h2>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {stepsList.map((step, idx) => {
              const isCompleted = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step.status} className="relative flex items-start gap-4">
                  {/* Step Dot */}
                  <div
                    className={`absolute -left-6 sm:-left-8 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isCompleted
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                        : 'bg-white border-2 border-stone-300 text-stone-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>

                  {/* Step Details */}
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <div className={`text-sm font-semibold ${isCompleted ? 'text-stone-900' : 'text-stone-400'}`}>
                        {step.label}
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Current Stage
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-stone-500 mt-0.5">
                      {step.status === 'Requested' && 'Order logged with event specifications.'}
                      {step.status === 'Advance Paid' && `₹${order.advancePaid.toLocaleString('en-IN')} received via secure channel.`}
                      {step.status === 'Confirmed' && `Batch scheduled for ${order.deliveryDate} at ${order.deliveryTime}.`}
                      {step.status === 'Preparing' && 'Fresh milk procurement and slow bilona curd setting.'}
                      {step.status === 'Ready' && 'Chilled quality check & temperature verification.'}
                      {step.status === 'Out for Delivery' && 'Dispatched via refrigerated vehicle.'}
                      {step.status === 'Delivered' && `Delivered to ${order.deliveryAddress}.`}
                      {step.status === 'Fully Paid' && (order.remainingAmount === 0 ? 'Entire order value settled.' : 'Pending final clearance.')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ITEMS & LOGISTICS BREAKDOWN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Items */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-stone-900 mb-3 pb-2 border-b border-stone-100">
              Bulk Products Ordered ({order.items.length})
            </h3>
            <div className="space-y-2 text-xs">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between py-1.5 border-b border-stone-50 text-stone-700">
                  <div>
                    <span className="font-semibold text-stone-900">{item.name}</span>
                    <span className="text-stone-500 text-[11px] block">
                      {item.quantity} {item.unit} @ ₹{item.rate}/{item.unit}
                    </span>
                  </div>
                  <span className="font-bold tabular-nums">₹{item.total.toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="pt-2 flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="font-medium tabular-nums">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Cold Delivery Fee</span>
                <span className="font-medium tabular-nums">₹{order.deliveryCharge.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-1 flex justify-between font-bold text-sm text-stone-900 border-t border-stone-200">
                <span>Grand Total</span>
                <span className="tabular-nums">₹{order.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Logistics */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-stone-900 mb-2 pb-2 border-b border-stone-100">
              Logistics &amp; Venue
            </h3>

            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800">Event Date: </span>
                  {order.eventDate} ({order.guests} Guests)
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800">Scheduled Dispatch: </span>
                  {order.deliveryDate} at {order.deliveryTime}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800">Venue Address: </span>
                  {order.deliveryAddress}
                </div>
              </div>

              {order.specialInstructions && (
                <div className="mt-2 p-2.5 bg-stone-50 rounded-lg text-stone-600 border border-stone-200/80">
                  <span className="font-semibold text-stone-800">Instructions: </span>
                  {order.specialInstructions}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
