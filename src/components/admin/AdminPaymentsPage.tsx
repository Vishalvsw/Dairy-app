import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentStatus } from '../../types';
import {
  IndianRupee,
  Send,
  MessageSquare,
  Mail,
  Smartphone,
  CheckCircle2,
  X,
  AlertCircle,
  FileText,
  Clock,
  ShieldAlert
} from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const { orders, payments, sendPaymentReminder, recordOfflinePayment } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedOrderForReminder, setSelectedOrderForReminder] = useState<string | null>(null);
  const [reminderChannel, setReminderChannel] = useState<'WhatsApp' | 'SMS' | 'Email'>('WhatsApp');
  const [reminderToast, setReminderToast] = useState<string | null>(null);

  // Offline payment modal state
  const [offlinePaymentOrder, setOfflinePaymentOrder] = useState<string | null>(null);
  const [offlineAmount, setOfflineAmount] = useState<number>(0);
  const [offlineNote, setOfflineNote] = useState('');

  // Fixed demo KPIs matching Section 15
  const kpiTotalValue = 485000;
  const kpiAdvanceCollected = 215000;
  const kpiRemaining = 270000;
  const kpiOverdue = 45000;

  const paymentStatuses: PaymentStatus[] = [
    'Fully Paid',
    'Advance Paid',
    'Payment Pending',
    'Payment Due',
    'Overdue',
    'Failed'
  ];

  const pendingOrders = orders.filter((o) => {
    if (filterStatus === 'All') return true;
    return o.paymentStatus === filterStatus;
  });

  const activeReminderOrder = orders.find((o) => o.id === selectedOrderForReminder);

  const handleSendReminder = () => {
    if (activeReminderOrder) {
      sendPaymentReminder(activeReminderOrder.id, reminderChannel);
      setReminderToast(`✓ ${reminderChannel} payment reminder sent to ${activeReminderOrder.customerName}`);
      setSelectedOrderForReminder(null);
      setTimeout(() => setReminderToast(null), 4000);
    }
  };

  const handleRecordOffline = (e: React.FormEvent) => {
    e.preventDefault();
    if (offlinePaymentOrder && offlineAmount > 0) {
      recordOfflinePayment(offlinePaymentOrder, offlineAmount, offlineNote);
      setOfflinePaymentOrder(null);
      setOfflineAmount(0);
      setOfflineNote('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
            Payment Dashboard &amp; Collection Control
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Central ledger for advance deposits, pending function balances, overdue recovery, and automated WhatsApp payment reminders.
          </p>
        </div>
      </div>

      {/* Confirmation Toast */}
      {reminderToast && (
        <div className="p-4 bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{reminderToast}</span>
          </div>
          <button onClick={() => setReminderToast(null)} className="text-emerald-200 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TOP 4 PAYMENT KPI CARDS (Matching Section 15 exactly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Order Value */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-medium text-stone-500">Total Order Value</div>
          <div className="text-2xl font-bold text-stone-900 tabular-nums mt-1">
            ₹{kpiTotalValue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">Cumulative bulk contract pipeline</div>
        </div>

        {/* Advance Collected */}
        <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-2xs">
          <div className="text-xs font-semibold text-emerald-800">Advance Collected</div>
          <div className="text-2xl font-bold text-emerald-800 tabular-nums mt-1">
            ₹{kpiAdvanceCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">Locked in company escrow</div>
        </div>

        {/* Remaining */}
        <div className="bg-white p-5 rounded-xl border border-amber-300 bg-amber-50/20 shadow-2xs">
          <div className="text-xs font-semibold text-amber-900">Remaining Balance</div>
          <div className="text-2xl font-bold text-amber-900 tabular-nums mt-1">
            ₹{kpiRemaining.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">Due on morning delivery</div>
        </div>

        {/* Overdue */}
        <div className="bg-white p-5 rounded-xl border border-red-300 bg-red-50/20 shadow-2xs">
          <div className="text-xs font-semibold text-red-800">Overdue Payments</div>
          <div className="text-2xl font-bold text-red-800 tabular-nums mt-1">
            ₹{kpiOverdue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-red-700 font-medium mt-1">Action required (Reminder sent)</div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 rounded-xl border border-stone-200 shadow-2xs">
        <button
          onClick={() => setFilterStatus('All')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            filterStatus === 'All'
              ? 'bg-stone-900 text-white font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          All Orders ({orders.length})
        </button>

        {paymentStatuses.map((st) => {
          const count = orders.filter((o) => o.paymentStatus === st).length;
          const isActive = filterStatus === st;
          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>{st}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* INVOICES & REMINDERS TABLE */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-stone-900 font-display">
              Function Pre-Order Payment Ledger
            </h2>
            <p className="text-xs text-stone-500">
              Trigger 1-Click WhatsApp reminders or register cash/counter payments.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Function</th>
                <th className="py-3 px-4">Event Date</th>
                <th className="py-3 px-4 text-right">Total Value</th>
                <th className="py-3 px-4 text-right">Advance Received</th>
                <th className="py-3 px-4 text-right">Pending Amount</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-center">Reminders</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {pendingOrders.map((order) => {
                const isFullyPaid = order.paymentStatus === 'Fully Paid';
                return (
                  <tr key={order.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">
                      {order.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-900">
                      {order.customerName}
                    </td>
                    <td className="py-3 px-4">{order.functionType}</td>
                    <td className="py-3 px-4 tabular-nums">{order.eventDate}</td>
                    <td className="py-3 px-4 text-right font-bold text-stone-900 tabular-nums">
                      ₹{order.grandTotal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-emerald-700 tabular-nums">
                      ₹{order.advancePaid.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-bold tabular-nums">
                      {order.remainingAmount > 0 ? (
                        <span className="text-amber-800">
                          ₹{order.remainingAmount.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-emerald-700">₹0</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          isFullyPaid
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : order.paymentStatus === 'Overdue'
                            ? 'bg-red-50 text-red-800 border border-red-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {order.reminders && order.reminders.length > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{order.reminders.length} Sent</span>
                        </span>
                      ) : (
                        <span className="text-stone-400 text-[10px]">None</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {order.remainingAmount > 0 ? (
                          <>
                            <button
                              onClick={() => setSelectedOrderForReminder(order.id)}
                              className="px-2.5 py-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded text-[11px] flex items-center gap-1 shadow-2xs transition-colors"
                            >
                              <Send className="w-3 h-3" />
                              <span>Send Payment Reminder</span>
                            </button>

                            <button
                              onClick={() => {
                                setOfflinePaymentOrder(order.id);
                                setOfflineAmount(order.remainingAmount);
                              }}
                              className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[11px] font-medium transition-colors"
                              title="Record cash received on delivery"
                            >
                              Cash
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-emerald-700 font-semibold">
                            Full Settlement Cleared
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECENT TRANSACTION LOG */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs p-5">
        <h2 className="text-sm font-bold text-stone-900 mb-3 pb-2 border-b border-stone-100 font-display">
          Recent Payment Logs ({payments.length} Transactions)
        </h2>
        <div className="space-y-2">
          {payments.slice(0, 7).map((p) => (
            <div
              key={p.id}
              className="p-2.5 rounded-lg border border-stone-100 bg-stone-50/50 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-mono font-bold text-stone-900">{p.id}</span>
                <span className="text-stone-400 mx-2">·</span>
                <span className="font-semibold text-stone-800">{p.customerName}</span>
                <span className="text-stone-500 text-[11px] ml-2">({p.orderId})</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-stone-500 font-mono text-[11px]">{p.method}</span>
                <span className="font-bold text-emerald-700 tabular-nums">
                  +₹{p.amount.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-stone-400">{p.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAYMENT REMINDER MODAL (Matching Section 16) */}
      {activeReminderOrder && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900">Send Payment Reminder</h3>
                  <div className="text-[11px] text-stone-500">
                    Order {activeReminderOrder.id} · {activeReminderOrder.customerName}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrderForReminder(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Channel Selection */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Dispatch Notification Channel:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'WhatsApp', icon: MessageSquare, label: 'WhatsApp (Primary)' },
                  { id: 'SMS', icon: Smartphone, label: 'SMS Notice' },
                  { id: 'Email', icon: Mail, label: 'Email Invoice' }
                ].map((ch) => {
                  const Icon = ch.icon;
                  const isSelected = reminderChannel === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setReminderChannel(ch.id as any)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500 font-semibold'
                          : 'border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-1 text-emerald-700" />
                      <div className="text-xs">{ch.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Message Preview (Section 16 text) */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-5 space-y-2">
              <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Simulated Message Preview:
              </div>
              <div className="p-3 bg-white rounded-lg border border-stone-200/80 text-xs text-stone-800 leading-relaxed shadow-2xs font-mono">
                "Your bulk order {activeReminderOrder.id} has a pending payment of ₹{activeReminderOrder.remainingAmount.toLocaleString('en-IN')}. Please complete the payment before the scheduled delivery on {activeReminderOrder.deliveryDate} at {activeReminderOrder.deliveryTime}."
              </div>
              <div className="text-[11px] text-stone-500">
                Destination: <span className="font-semibold text-stone-800">{activeReminderOrder.customerWhatsapp || activeReminderOrder.customerPhone}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedOrderForReminder(null)}
                className="flex-1 py-2 px-3 border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendReminder}
                className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send {reminderChannel} Reminder</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECORD OFFLINE CASH PAYMENT MODAL */}
      {offlinePaymentOrder && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <form
            onSubmit={handleRecordOffline}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-bold text-sm text-stone-900">Record Cash / Van Payment</h3>
              <button
                type="button"
                onClick={() => setOfflinePaymentOrder(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 mb-5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Payment Amount Received (₹)
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
                <label className="block font-semibold text-stone-700 mb-1">
                  Cash Receipt Note / Reference
                </label>
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
                onClick={() => setOfflinePaymentOrder(null)}
                className="flex-1 py-2 text-xs border border-stone-300 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 text-xs bg-emerald-600 text-white rounded-lg font-bold"
              >
                Save Payment &amp; Clear
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
