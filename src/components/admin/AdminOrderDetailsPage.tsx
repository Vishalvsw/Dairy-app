import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus, PaymentMethod } from '../../types';
import {
  ChevronLeft,
  Send,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  IndianRupee,
  MapPin,
  Calendar,
  AlertTriangle,
  FileText,
  User,
  Phone,
  MessageCircle,
  XCircle,
  Plus
} from 'lucide-react';

export const AdminOrderDetailsPage: React.FC = () => {
  const {
    selectedOrderId,
    orders,
    navigate,
    updateOrderStatus,
    sendPaymentReminder,
    recordOfflinePayment,
    cancelOrder
  } = useApp();

  const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const [offlineAmount, setOfflineAmount] = useState<number>(0);
  const [offlineNote, setOfflineNote] = useState('');
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!order) {
    return (
      <div className="bg-white p-8 rounded-xl text-center">
        <p className="text-sm text-stone-600 mb-3">Order not found.</p>
        <button
          onClick={() => navigate('/admin/bulk-orders')}
          className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs"
        >
          Back to Bulk Orders
        </button>
      </div>
    );
  }

  const notifyAction = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleStatusChange = (status: OrderStatus) => {
    updateOrderStatus(order.id, status);
    notifyAction(`Order stage updated to: ${status}`);
  };

  const handleSendReminder = () => {
    sendPaymentReminder(order.id, 'WhatsApp');
    notifyAction(`✓ WhatsApp payment reminder sent to ${order.customerName}`);
  };

  const handleRecordOfflineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (offlineAmount > 0) {
      recordOfflinePayment(order.id, offlineAmount, offlineNote);
      setShowOfflineModal(false);
      setOfflineAmount(0);
      setOfflineNote('');
      notifyAction(`Offline payment of ₹${offlineAmount.toLocaleString('en-IN')} recorded`);
    }
  };

  const allStatuses: OrderStatus[] = [
    'Confirmed',
    'Preparing',
    'Ready',
    'Out for Delivery',
    'Delivered',
    'Fully Paid'
  ];

  return (
    <div className="space-y-6">
      {/* Top back bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/bulk-orders')}
            className="p-1.5 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg text-stone-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-mono text-stone-900">{order.id}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                {order.functionType}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded font-semibold ${
                  order.paymentStatus === 'Fully Paid'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Logged on {new Date(order.createdAt).toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* ADMIN ACTIONS TOOLBAR (Section 17) */}
        <div className="flex flex-wrap items-center gap-2">
          {order.remainingAmount > 0 && (
            <button
              onClick={handleSendReminder}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send WhatsApp Reminder</span>
            </button>
          )}

          {order.remainingAmount > 0 && (
            <button
              onClick={() => {
                setOfflineAmount(order.remainingAmount);
                setShowOfflineModal(true);
              }}
              className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-lg text-xs font-semibold transition-colors"
            >
              Record Offline Cash
            </button>
          )}

          {order.orderStatus !== 'Cancelled' && (
            <button
              onClick={() => cancelOrder(order.id)}
              className="px-3 py-1.5 border border-red-200 hover:bg-red-50 text-red-700 rounded-lg text-xs font-semibold transition-colors"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {actionNotice && (
        <div className="p-3 bg-stone-900 text-stone-100 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Grid: Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Customer, Function, Products, Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Customer & Function Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-2.5">
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider pb-1 border-b border-stone-100 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Customer Contact</span>
              </h2>
              <div className="font-bold text-sm text-stone-900">{order.customerName}</div>
              <div className="text-xs text-stone-600 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>Phone: {order.customerPhone}</span>
              </div>
              <div className="text-xs text-stone-600 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: {order.customerWhatsapp}</span>
              </div>
              {order.customerEmail && (
                <div className="text-xs text-stone-500">Email: {order.customerEmail}</div>
              )}
            </div>

            {/* Function & Delivery */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-2.5">
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider pb-1 border-b border-stone-100 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Function &amp; Venue</span>
              </h2>
              <div className="font-bold text-sm text-stone-900">
                {order.functionType} · {order.guests} Guests
              </div>
              <div className="text-xs text-stone-600">
                <span className="font-medium text-stone-800">Event Date: </span>
                {order.eventDate}
              </div>
              <div className="text-xs text-stone-600">
                <span className="font-medium text-stone-800">Delivery Slot: </span>
                {order.deliveryDate} at {order.deliveryTime}
              </div>
              <div className="text-xs text-stone-600 truncate">
                <span className="font-medium text-stone-800">Venue Address: </span>
                {order.deliveryAddress}
              </div>
            </div>
          </div>

          {/* 2. Products Breakdown Table */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-stone-200">
              <h2 className="text-sm font-bold text-stone-900">
                Products &amp; Quantities Ordered
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Product</th>
                    <th className="py-2.5 px-4">Quantity</th>
                    <th className="py-2.5 px-4 text-right">Rate</th>
                    <th className="py-2.5 px-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-4 font-semibold text-stone-900">{item.name}</td>
                      <td className="py-2.5 px-4">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-2.5 px-4 text-right tabular-nums">₹{item.rate}</td>
                      <td className="py-2.5 px-4 text-right font-bold text-stone-900 tabular-nums">
                        ₹{item.total.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-stone-50/60 font-medium">
                    <td colSpan={3} className="py-2 px-4 text-right text-stone-500">
                      Subtotal
                    </td>
                    <td className="py-2 px-4 text-right tabular-nums">
                      ₹{order.subtotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="bg-stone-50/60 font-medium">
                    <td colSpan={3} className="py-2 px-4 text-right text-stone-500">
                      Cold Chain Delivery Fee
                    </td>
                    <td className="py-2 px-4 text-right tabular-nums">
                      ₹{order.deliveryCharge.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="bg-stone-50 font-bold text-sm text-stone-900 border-t border-stone-200">
                    <td colSpan={3} className="py-2.5 px-4 text-right">
                      Grand Total
                    </td>
                    <td className="py-2.5 px-4 text-right tabular-nums">
                      ₹{order.grandTotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Order Timeline Progression */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
            <h2 className="text-sm font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100 font-display">
              Order Timeline Progression
            </h2>

            <div className="space-y-3">
              {order.timeline.map((event, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full flex items-center justify-center ${
                        event.completed ? 'bg-emerald-500 text-white' : 'bg-stone-300'
                      }`}
                    >
                      {event.completed && <CheckCircle2 className="w-2.5 h-2.5" />}
                    </span>
                    <span className={`font-semibold ${event.completed ? 'text-stone-900' : 'text-stone-400'}`}>
                      {event.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-mono">
                    {event.timestamp || 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 cols: Payment card & Status update actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Payment Summary */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <h2 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100 font-display">
              Payment Control Card
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Grand Total:</span>
                <span className="font-bold text-stone-900 tabular-nums">
                  ₹{order.grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Advance Paid ({order.advancePercentage}%):</span>
                <span className="font-bold tabular-nums">
                  ₹{order.advancePaid.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-amber-900 font-semibold pt-1 border-t border-stone-100">
                <span>Pending Amount:</span>
                <span className="tabular-nums">
                  ₹{order.remainingAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-stone-500">Payment Status:</span>
                <span className="font-semibold text-stone-800">{order.paymentStatus}</span>
              </div>
            </div>

            {/* Quick Action to Clear Balance */}
            {order.remainingAmount > 0 ? (
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <button
                  onClick={handleSendReminder}
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send WhatsApp Reminder</span>
                </button>
                <button
                  onClick={() => {
                    setOfflineAmount(order.remainingAmount);
                    setShowOfflineModal(true);
                  }}
                  className="w-full py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Record Full Settlement (₹{order.remainingAmount.toLocaleString('en-IN')})
                </button>
              </div>
            ) : (
              <div className="pt-2 text-center text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                ✓ 100% Cleared &amp; Settled
              </div>
            )}
          </div>

          {/* Advance Stage Control */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <h2 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100 font-display">
              Advance Order State
            </h2>
            <p className="text-[11px] text-stone-500">
              Update operational stage in one click to inform kitchen and logistics:
            </p>

            <div className="space-y-1.5">
              {[
                { status: 'Confirmed', label: 'Confirm Order' },
                { status: 'Preparing', label: 'Start Preparation' },
                { status: 'Ready', label: 'Mark Ready' },
                { status: 'Out for Delivery', label: 'Mark Out for Delivery' },
                { status: 'Delivered', label: 'Mark Delivered' }
              ].map((btn) => (
                <button
                  key={btn.status}
                  onClick={() => handleStatusChange(btn.status as OrderStatus)}
                  className={`w-full py-2 px-3 text-xs font-semibold rounded-lg text-left transition-colors flex items-center justify-between ${
                    order.orderStatus === btn.status
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  <span>{btn.label}</span>
                  {order.orderStatus === btn.status && (
                    <span className="text-[10px] uppercase font-bold tracking-wider">Active</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RECORD OFFLINE MODAL */}
      {showOfflineModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <form
            onSubmit={handleRecordOfflineSubmit}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200"
          >
            <h3 className="font-bold text-sm text-stone-900 mb-3">Record Offline Settlement</h3>
            <div className="space-y-3 text-xs mb-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Amount Received (₹)
                </label>
                <input
                  type="number"
                  required
                  value={offlineAmount}
                  onChange={(e) => setOfflineAmount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm font-bold text-stone-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Receipt Note</label>
                <input
                  type="text"
                  value={offlineNote}
                  onChange={(e) => setOfflineNote(e.target.value)}
                  placeholder="e.g. Received cash at venue by driver Ramesh"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowOfflineModal(false)}
                className="flex-1 py-2 text-xs border border-stone-300 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 text-xs bg-emerald-600 text-white rounded-lg font-bold"
              >
                Record Payment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
