import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, Mail, MapPin, Package, CreditCard, LogOut, ArrowRight } from 'lucide-react';

export const CustomerProfilePage: React.FC = () => {
  const { currentUser, logout, navigate, orders } = useApp();

  const userOrders = orders.filter((o) =>
    o.customerName.toLowerCase().includes('rahul')
  );

  const totalSpent = userOrders.reduce((sum, o) => sum + o.advancePaid, 0);
  const totalPending = userOrders.reduce((sum, o) => sum + o.remainingAmount, 0);

  return (
    <div className="min-h-screen bg-stone-50 py-6 sm:py-10 px-3 sm:px-6 pb-28 md:pb-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-900">{currentUser.name}</h1>
                <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                  <span>{currentUser.email}</span>
                  <span>·</span>
                  <span>{currentUser.phone}</span>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="px-3.5 py-1.5 border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500">Total Bulk Pre-Orders</span>
              <div className="text-lg font-bold text-stone-900 mt-1 tabular-nums">
                {userOrders.length}
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50/70 rounded-lg border border-emerald-200">
              <span className="text-emerald-800 font-medium">Total Paid (Advance &amp; Settled)</span>
              <div className="text-lg font-bold text-emerald-900 mt-1 tabular-nums">
                ₹{totalSpent.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/70 rounded-lg border border-amber-200">
              <span className="text-amber-800 font-medium">Pending Delivery Settlement</span>
              <div className="text-lg font-bold text-amber-950 mt-1 tabular-nums">
                ₹{totalPending.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Saved Venue Addresses */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs">
          <h2 className="text-sm font-bold text-stone-900 mb-3 pb-2 border-b border-stone-100">
            Registered Function Venues &amp; Addresses
          </h2>
          <div className="space-y-2 text-xs text-stone-600">
            <div className="p-3 rounded-lg border border-stone-200 bg-stone-50 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-stone-900">Primary Banquet Venue</div>
                <div className="text-stone-500">Grand Palace Lawn, Gate 2, Tonk Road, Jaipur</div>
              </div>
            </div>
            <div className="p-3 rounded-lg border border-stone-200 bg-stone-50 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-stone-900">Residence Address</div>
                <div className="text-stone-500">Flat 402, Royal Palms, Civil Lines, Jaipur</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
