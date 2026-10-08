import React from 'react';
import { useApp } from '../../context/AppContext';
import { Package, Calendar, Clock, ArrowRight, ShieldCheck, Plus } from 'lucide-react';

export const CustomerOrdersListPage: React.FC = () => {
  const { orders, navigate, currentUser } = useApp();

  // Show all orders or those related to current user
  const userOrders = orders.filter((o) =>
    o.customerName.toLowerCase().includes('rahul') ||
    o.customerEmail === currentUser.email ||
    true // For demo convenience show available orders
  );

  return (
    <div className="min-h-screen bg-stone-50 py-6 sm:py-8 px-3 sm:px-6 pb-28 md:pb-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              Order History &amp; Tracking
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
              My Bulk &amp; Event Orders
            </h1>
          </div>

          <button
            onClick={() => navigate('/bulk-order')}
            className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Plan New Bulk Order</span>
          </button>
        </div>

        {/* Orders list */}
        <div className="space-y-4">
          {userOrders.map((order) => {
            const isFullyPaid = order.paymentStatus === 'Fully Paid';
            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs hover:border-amber-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-sm text-stone-900">{order.id}</span>
                    <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      {order.functionType} ({order.guests} Guests)
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded font-semibold ${
                        isFullyPaid
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>

                  <div className="text-xs text-stone-500 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      Event: {order.eventDate}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      Delivery: {order.deliveryDate} at {order.deliveryTime}
                    </span>
                  </div>

                  <div className="text-xs text-stone-600 truncate max-w-xl">
                    <span className="font-medium">Items: </span>
                    {order.items.map((i) => `${i.name} (${i.quantity} ${i.unit})`).join(', ')}
                  </div>
                </div>

                {/* Right col: financials and button */}
                <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                  <div className="text-left md:text-right">
                    <div className="text-xs text-stone-400">Total Value</div>
                    <div className="text-base font-bold text-stone-900 tabular-nums">
                      ₹{order.grandTotal.toLocaleString('en-IN')}
                    </div>
                    {order.remainingAmount > 0 ? (
                      <div className="text-[11px] text-amber-800 font-semibold">
                        Pending: ₹{order.remainingAmount.toLocaleString('en-IN')}
                      </div>
                    ) : (
                      <div className="text-[11px] text-emerald-700 font-medium">
                        Fully Cleared
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => navigate('/orders', { orderId: order.id })}
                    className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1 whitespace-nowrap transition-colors"
                  >
                    <span>Track Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
