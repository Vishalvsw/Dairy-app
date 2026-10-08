import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, ShieldCheck, PieChart, ArrowUpRight } from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const { orders } = useApp();

  const totalValue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const totalAdvance = orders.reduce((sum, o) => sum + o.advancePaid, 0);
  const totalPending = orders.reduce((sum, o) => sum + o.remainingAmount, 0);

  const weddingOrders = orders.filter((o) => o.functionType === 'Wedding');
  const engagementOrders = orders.filter((o) => o.functionType === 'Engagement');
  const cateringOrders = orders.filter((o) => o.functionType === 'Catering');
  const otherOrders = orders.filter(
    (o) => !['Wedding', 'Engagement', 'Catering'].includes(o.functionType)
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="pb-2 border-b border-stone-200">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
          Business Reports &amp; Collection Analytics
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Auditing advance deposit recovery, function segmentation, and working capital cycles.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">Advance Recovery Rate</div>
          <div className="text-3xl font-bold text-emerald-700 tabular-nums mt-1">94.2%</div>
          <p className="text-[11px] text-stone-400 mt-1">
            Orders locked with 30% or higher deposit before procurement
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">Average Bulk Order Size</div>
          <div className="text-3xl font-bold text-stone-900 tabular-nums mt-1">₹31,400</div>
          <p className="text-[11px] text-stone-400 mt-1">
            Typical event size: 380 guests
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">Payment Delay Reduction</div>
          <div className="text-3xl font-bold text-amber-800 tabular-nums mt-1">-82%</div>
          <p className="text-[11px] text-stone-400 mt-1">
            Compared to traditional manual WhatsApp/Phone collection
          </p>
        </div>
      </div>

      {/* Distribution by Function Type */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-stone-900 font-display">
          Bulk Order Volume by Event Type
        </h2>

        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-stone-800">
                Weddings &amp; Marriages ({weddingOrders.length} bookings)
              </span>
              <span className="font-bold tabular-nums">48% of bulk revenue</span>
            </div>
            <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-amber-600 h-full" style={{ width: '48%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-stone-800">
                Catering &amp; Institutional Banquets ({cateringOrders.length} bookings)
              </span>
              <span className="font-bold tabular-nums">28% of bulk revenue</span>
            </div>
            <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-stone-800 h-full" style={{ width: '28%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-stone-800">
                Engagements &amp; Pre-Wedding ({engagementOrders.length} bookings)
              </span>
              <span className="font-bold tabular-nums">16% of bulk revenue</span>
            </div>
            <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: '16%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-stone-800">
                Birthdays &amp; Community Feasts ({otherOrders.length} bookings)
              </span>
              <span className="font-bold tabular-nums">8% of bulk revenue</span>
            </div>
            <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-stone-400 h-full" style={{ width: '8%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
