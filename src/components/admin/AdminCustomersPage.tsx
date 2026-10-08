import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Phone, MessageSquare, ArrowRight, User } from 'lucide-react';

export const AdminCustomersPage: React.FC = () => {
  const { customers, navigate } = useApp();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
            Customer &amp; Caterer Directory
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            15+ registered event hosts, banquet managers, and regular bulk buyers.
          </p>
        </div>

        <div className="relative w-64 self-start sm:self-auto">
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2 pointer-events-none" />
        </div>
      </div>

      {/* Table (Section 22 spec) */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Phone / WhatsApp</th>
                <th className="py-3 px-4 text-center">Total Orders</th>
                <th className="py-3 px-4 text-center">Bulk Orders</th>
                <th className="py-3 px-4 text-right">Total Spending</th>
                <th className="py-3 px-4 text-right">Pending Amount</th>
                <th className="py-3 px-4">Last Order</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-stone-900">{cust.name}</div>
                    <div className="text-[10px] text-stone-400 truncate max-w-xs">{cust.address}</div>
                  </td>

                  <td className="py-3 px-4 font-mono text-stone-600">
                    <div>{cust.phone}</div>
                  </td>

                  <td className="py-3 px-4 text-center font-semibold tabular-nums">
                    {cust.totalOrders}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className="font-bold text-amber-800 tabular-nums">
                      {cust.bulkOrders}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right font-bold text-stone-900 tabular-nums">
                    ₹{cust.totalSpent.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3 px-4 text-right tabular-nums">
                    {cust.pendingAmount > 0 ? (
                      <span className="font-bold text-amber-800">
                        ₹{cust.pendingAmount.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-semibold">₹0</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-stone-500 tabular-nums">
                    {cust.lastOrderDate}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => navigate('/admin/bulk-orders')}
                      className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[11px] font-semibold"
                    >
                      Orders
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
