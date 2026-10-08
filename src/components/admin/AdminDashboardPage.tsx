import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Layers,
  IndianRupee,
  ShieldCheck,
  Clock,
  Calendar,
  ArrowRight,
  Send,
  CheckCircle2,
  AlertTriangle,
  Users,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { orders, navigate, sendPaymentReminder } = useApp();

  // Highlight recent bulk orders
  const bulkOrders = orders.filter((o) => o.isBulk).slice(0, 6);

  // Totals
  const totalOrderValue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const totalAdvanceCollected = orders.reduce((sum, o) => sum + o.advancePaid, 0);
  const totalPending = orders.reduce((sum, o) => sum + o.remainingAmount, 0);

  return (
    <div className="space-y-6">
      {/* Title & Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
            Dairy Operations &amp; Bulk Pre-Order Dashboard
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Monitor function bookings, advance payment clearance, and scheduled dairy batch dispatches.
          </p>
        </div>
        <div className="text-xs font-semibold text-stone-600 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs self-start sm:self-auto">
          Today: <span className="font-mono text-stone-900">08 Oct 2026</span>
        </div>
      </div>

      {/* TOP KPI CARDS (Matching Section 13 exactly) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* 1. Today's Orders */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-medium text-stone-500">Today's Orders</div>
          <div className="text-2xl font-bold text-stone-900 tabular-nums mt-1">24</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14% vs yesterday</span>
          </div>
        </div>

        {/* 2. Bulk Orders */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-medium text-stone-500">Bulk Orders</div>
          <div className="text-2xl font-bold text-amber-800 tabular-nums mt-1">8</div>
          <div className="text-[11px] text-stone-500 mt-1">Weddings &amp; events</div>
        </div>

        {/* 3. Today's Sales */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-medium text-stone-500">Today's Sales</div>
          <div className="text-xl font-bold text-stone-900 tabular-nums mt-1">₹48,500</div>
          <div className="text-[11px] text-stone-400 mt-1">Direct &amp; booked</div>
        </div>

        {/* 4. Advance Received */}
        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-2xs">
          <div className="text-xs font-semibold text-emerald-800">Advance Received</div>
          <div className="text-xl font-bold text-emerald-800 tabular-nums mt-1">₹32,500</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">100% Verified UPI</div>
        </div>

        {/* 5. Pending Payment */}
        <div className="bg-white p-4 rounded-xl border border-amber-300 bg-amber-50/20 shadow-2xs">
          <div className="text-xs font-semibold text-amber-800">Pending Payment</div>
          <div className="text-xl font-bold text-amber-900 tabular-nums mt-1">₹18,500</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">Due before delivery</div>
        </div>

        {/* 6. Upcoming Functions */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-medium text-stone-500">Upcoming Functions</div>
          <div className="text-2xl font-bold text-blue-900 tabular-nums mt-1">12</div>
          <div className="text-[11px] text-stone-500 mt-1">Next 14 days</div>
        </div>
      </div>

      {/* CASH-FLOW HEALTH BAR */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-stone-900 font-display">
              Bulk Pre-Order Cash-Flow Health
            </h2>
            <p className="text-xs text-stone-500">
              Total Order Value: <span className="font-semibold text-stone-800">₹{totalOrderValue.toLocaleString('en-IN')}</span> · 
              Advance Cleared: <span className="font-semibold text-emerald-700">₹{totalAdvanceCollected.toLocaleString('en-IN')}</span> · 
              Pending Settlement: <span className="font-semibold text-amber-800">₹{totalPending.toLocaleString('en-IN')}</span>
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/payments')}
            className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Open Payment Control</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-100 h-3.5 rounded-full overflow-hidden flex border border-stone-200">
          <div
            className="bg-emerald-600 h-full transition-all duration-500"
            style={{ width: `${Math.round((totalAdvanceCollected / (totalOrderValue || 1)) * 100)}%` }}
            title={`Advance Cleared: ₹${totalAdvanceCollected.toLocaleString('en-IN')}`}
          ></div>
          <div
            className="bg-amber-400 h-full transition-all duration-500"
            style={{ width: `${Math.round((totalPending / (totalOrderValue || 1)) * 100)}%` }}
            title={`Pending: ₹${totalPending.toLocaleString('en-IN')}`}
          ></div>
        </div>

        <div className="flex items-center gap-6 text-[11px] text-stone-500 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>Advance Received ({Math.round((totalAdvanceCollected / (totalOrderValue || 1)) * 100)}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Pending Balance Due</span>
          </div>
        </div>
      </div>

      {/* RECENT BULK ORDERS TABLE PREVIEW */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-stone-900 font-display">
              Active Bulk Function Orders
            </h2>
            <p className="text-xs text-stone-500">
              Orders requiring batch preparation, cold storage allocation, and payment collection.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/admin/bulk-orders')}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors"
            >
              View All ({orders.length})
            </button>
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
                <th className="py-3 px-4">Guests</th>
                <th className="py-3 px-4 text-right">Order Value</th>
                <th className="py-3 px-4 text-right">Advance Paid</th>
                <th className="py-3 px-4 text-right">Pending</th>
                <th className="py-3 px-4">Delivery</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {bulkOrders.map((order) => {
                const isFullyPaid = order.paymentStatus === 'Fully Paid';
                return (
                  <tr key={order.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">
                      {order.id}
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-900">
                      {order.customerName}
                    </td>
                    <td className="py-3 px-4">{order.functionType}</td>
                    <td className="py-3 px-4 tabular-nums">{order.eventDate}</td>
                    <td className="py-3 px-4 tabular-nums">{order.guests} Guests</td>
                    <td className="py-3 px-4 font-bold text-stone-900 text-right tabular-nums">
                      ₹{order.grandTotal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-emerald-700 font-semibold text-right tabular-nums">
                      ₹{order.advancePaid.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-bold text-right tabular-nums">
                      {order.remainingAmount > 0 ? (
                        <span className="text-amber-800">
                          ₹{order.remainingAmount.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-emerald-700">₹0</span>
                      )}
                    </td>
                    <td className="py-3 px-4 tabular-nums">{order.deliveryTime}</td>
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
                        {order.orderStatus} · {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => navigate('/admin/orders', { orderId: order.id })}
                          className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded text-[11px]"
                        >
                          View
                        </button>
                        {order.remainingAmount > 0 && (
                          <button
                            onClick={() => sendPaymentReminder(order.id, 'WhatsApp')}
                            title="Send WhatsApp payment reminder"
                            className="p-1 text-emerald-700 hover:bg-emerald-50 rounded"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
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
    </div>
  );
};
