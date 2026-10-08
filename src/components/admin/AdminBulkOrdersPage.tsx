import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FunctionType, PaymentStatus } from '../../types';
import { Search, Send, CheckCircle2, Eye, Filter, ArrowUpDown } from 'lucide-react';

export const AdminBulkOrdersPage: React.FC = () => {
  const { orders, navigate, sendPaymentReminder, payRemaining } = useApp();

  const [search, setSearch] = useState('');
  const [filterFunction, setFilterFunction] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search);
    const matchesFunction = filterFunction === 'All' || o.functionType === filterFunction;
    const matchesStatus = filterStatus === 'All' || o.paymentStatus === filterStatus;
    return matchesSearch && matchesFunction && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
            Bulk Function Orders
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage weddings, engagements, banquets, and catering reservations. Track 30% advance collection and morning dispatches.
          </p>
        </div>

        <button
          onClick={() => navigate('/bulk-order')}
          className="px-3.5 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-lg shadow-2xs self-start sm:self-auto transition-colors"
        >
          + Create New Bulk Booking
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search by order ID, customer, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2 pointer-events-none" />
          </div>

          {/* Function Filter */}
          <select
            value={filterFunction}
            onChange={(e) => setFilterFunction(e.target.value)}
            className="px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-700"
          >
            <option value="All">All Function Types</option>
            <option value="Wedding">Wedding</option>
            <option value="Engagement">Engagement</option>
            <option value="Birthday">Birthday</option>
            <option value="Religious Function">Religious Function</option>
            <option value="Catering">Catering</option>
            <option value="Hotel/Restaurant">Hotel/Restaurant</option>
          </select>

          {/* Payment Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-700"
          >
            <option value="All">All Payment States</option>
            <option value="Fully Paid">Fully Paid</option>
            <option value="Advance Paid">Advance Paid</option>
            <option value="Payment Pending">Payment Pending</option>
            <option value="Payment Due">Payment Due</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <div className="text-xs text-stone-500 font-medium">
          Showing <span className="font-bold text-stone-900">{filteredOrders.length}</span> of {orders.length} bulk bookings
        </div>
      </div>

      {/* DEDICATED BULK ORDERS TABLE (Matching Section 14 spec) */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
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
                <th className="py-3 px-4 text-right">Advance</th>
                <th className="py-3 px-4 text-right">Pending</th>
                <th className="py-3 px-4">Delivery</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-stone-400">
                    No orders match your search filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const isFullyPaid = order.paymentStatus === 'Fully Paid';
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-amber-50/40 transition-colors"
                    >
                      {/* 1. Order ID */}
                      <td className="py-3 px-4 font-mono font-bold text-stone-900 whitespace-nowrap">
                        {order.id}
                      </td>

                      {/* 2. Customer */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-semibold text-stone-900">{order.customerName}</div>
                        <div className="text-[10px] text-stone-400">{order.customerPhone}</div>
                      </td>

                      {/* 3. Function */}
                      <td className="py-3 px-4 font-medium text-stone-800 whitespace-nowrap">
                        {order.functionType}
                      </td>

                      {/* 4. Event Date */}
                      <td className="py-3 px-4 tabular-nums whitespace-nowrap">
                        {order.eventDate}
                      </td>

                      {/* 5. Guests */}
                      <td className="py-3 px-4 tabular-nums whitespace-nowrap">
                        {order.guests} Guests
                      </td>

                      {/* 6. Order Value */}
                      <td className="py-3 px-4 font-bold text-stone-900 text-right tabular-nums whitespace-nowrap">
                        ₹{order.grandTotal.toLocaleString('en-IN')}
                      </td>

                      {/* 7. Advance */}
                      <td className="py-3 px-4 text-emerald-700 font-semibold text-right tabular-nums whitespace-nowrap">
                        ₹{order.advancePaid.toLocaleString('en-IN')}
                      </td>

                      {/* 8. Pending */}
                      <td className="py-3 px-4 font-bold text-right tabular-nums whitespace-nowrap">
                        {order.remainingAmount > 0 ? (
                          <span className="text-amber-800">
                            ₹{order.remainingAmount.toLocaleString('en-IN')}
                          </span>
                        ) : (
                          <span className="text-emerald-700">₹0</span>
                        )}
                      </td>

                      {/* 9. Delivery */}
                      <td className="py-3 px-4 tabular-nums whitespace-nowrap">
                        {order.deliveryTime}
                      </td>

                      {/* 10. Status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            isFullyPaid
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : order.paymentStatus === 'Overdue'
                              ? 'bg-red-50 text-red-800 border border-red-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {order.paymentStatus === 'Fully Paid' ? 'Paid' : order.orderStatus}
                        </span>
                      </td>

                      {/* 11. Actions */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => navigate('/admin/orders', { orderId: order.id })}
                            className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded text-[11px] transition-colors"
                            title="Inspect full details"
                          >
                            Details
                          </button>

                          {order.remainingAmount > 0 ? (
                            <button
                              onClick={() => sendPaymentReminder(order.id, 'WhatsApp')}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold rounded text-[11px] flex items-center gap-1 transition-colors"
                              title="Send 1-Click WhatsApp reminder"
                            >
                              <Send className="w-3 h-3" />
                              <span>Remind</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-emerald-600 font-medium px-1 flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" /> Cleared
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
