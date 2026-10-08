import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar as CalendarIcon, Clock, Users, ArrowRight, Package, MapPin } from 'lucide-react';

export const AdminCalendarPage: React.FC = () => {
  const { orders, navigate } = useApp();
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-25');

  // Group bulk orders by date
  const eventsByDate = orders.reduce<Record<string, typeof orders>>((acc, order) => {
    const d = order.eventDate;
    if (!acc[d]) acc[d] = [];
    acc[d].push(order);
    return acc;
  }, {});

  const datesList = Object.keys(eventsByDate).sort();

  const selectedOrders = eventsByDate[selectedDate] || [];

  // Calculate daily dairy requirements
  const totalMilkLitres = selectedOrders.reduce((sum, o) => {
    const milkItem = o.items.find((i) => i.name.toLowerCase().includes('milk'));
    return sum + (milkItem ? milkItem.quantity : 0);
  }, 0);

  const totalPaneerKg = selectedOrders.reduce((sum, o) => {
    const paneerItem = o.items.find((i) => i.name.toLowerCase().includes('paneer'));
    return sum + (paneerItem ? paneerItem.quantity : 0);
  }, 0);

  const totalCurdKg = selectedOrders.reduce((sum, o) => {
    const curdItem = o.items.find((i) => i.name.toLowerCase().includes('curd'));
    return sum + (curdItem ? curdItem.quantity : 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="pb-2 border-b border-stone-200">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
          Event &amp; Function Delivery Calendar
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Schedule upcoming bulk functions, prepare milk procurement batches, and allocate cold vans.
        </p>
      </div>

      {/* Date selector tabs */}
      <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs flex items-center gap-2 overflow-x-auto">
        {datesList.map((d) => {
          const count = eventsByDate[d]?.length || 0;
          const isSelected = selectedDate === d;
          return (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                isSelected
                  ? 'bg-amber-700 text-white shadow-2xs'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{d}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-amber-800 text-white' : 'bg-stone-200 text-stone-700'
                }`}
              >
                {count} {count === 1 ? 'Event' : 'Events'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Daily Production Load Banner */}
      <div className="bg-linear-to-r from-amber-50 to-stone-50 p-4 rounded-xl border border-amber-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <div className="text-stone-500 font-medium">Daily Milk Procurement Load:</div>
          <div className="text-xl font-bold text-stone-900 tabular-nums mt-0.5">
            {totalMilkLitres > 0 ? `${totalMilkLitres} Litres` : '100 Litres scheduled'}
          </div>
          <div className="text-[11px] text-stone-400">Night churn batch allocated</div>
        </div>

        <div>
          <div className="text-stone-500 font-medium">Malai Paneer Production:</div>
          <div className="text-xl font-bold text-stone-900 tabular-nums mt-0.5">
            {totalPaneerKg > 0 ? `${totalPaneerKg} kg` : '30 kg scheduled'}
          </div>
          <div className="text-[11px] text-stone-400">Early morning press cycle</div>
        </div>

        <div>
          <div className="text-stone-500 font-medium">Artisanal Set Curd (Dahi):</div>
          <div className="text-xl font-bold text-stone-900 tabular-nums mt-0.5">
            {totalCurdKg > 0 ? `${totalCurdKg} kg` : '50 kg scheduled'}
          </div>
          <div className="text-[11px] text-stone-400">Earthen matka chill rooms</div>
        </div>
      </div>

      {/* Functions on Selected Date */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-stone-900 font-display">
          Functions Scheduled for {selectedDate} ({selectedOrders.length} bookings)
        </h2>

        {selectedOrders.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center text-stone-400 text-xs">
            No bulk functions booked for this date yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-3">
                    <span className="font-mono font-bold text-stone-900 text-sm">{order.id}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                      {order.functionType}
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base">{order.customerName}</h3>
                  <div className="text-xs text-stone-500 flex items-center gap-2 mt-1">
                    <Users className="w-3.5 h-3.5 text-stone-400" />
                    <span>{order.guests} Guests</span>
                    <span>·</span>
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Delivery: {order.deliveryTime}</span>
                  </div>

                  <div className="mt-3 p-2.5 bg-stone-50 rounded-lg text-xs text-stone-600 border border-stone-100 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{order.deliveryAddress}</span>
                  </div>

                  <div className="mt-3 text-xs text-stone-600">
                    <span className="font-medium text-stone-800">Items: </span>
                    {order.items.map((i) => `${i.name} (${i.quantity}${i.unit})`).join(', ')}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400">Order Value</span>
                    <div className="font-bold text-sm text-stone-900 tabular-nums">
                      ₹{order.grandTotal.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/admin/orders', { orderId: order.id })}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>View Order</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
