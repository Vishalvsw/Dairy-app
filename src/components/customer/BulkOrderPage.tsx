import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FunctionType, BulkOrderItem } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
  Package,
  Plus,
  Minus
} from 'lucide-react';

export const BulkOrderPage: React.FC = () => {
  const { products, createBulkOrder, navigate, settings } = useApp();

  // Form states
  const [customerName, setCustomerName] = useState('Rahul Sharma');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [customerWhatsapp, setCustomerWhatsapp] = useState('+91 98765 43210');
  const [customerEmail, setCustomerEmail] = useState('rahul@example.com');

  const [functionType, setFunctionType] = useState<FunctionType>('Wedding');
  const [eventDate, setEventDate] = useState('2026-10-25');
  const [guests, setGuests] = useState<number>(500);
  const [deliveryDate, setDeliveryDate] = useState('2026-10-25');
  const [deliveryTime, setDeliveryTime] = useState('7:00 AM');
  const [deliveryAddress, setDeliveryAddress] = useState('Grand Palace Lawn, Gate 2, Tonk Road, Jaipur');
  const [specialInstructions, setSpecialInstructions] = useState('Morning banquet delivery. Ensure curd pots are chilled. Handover to Chef Jagdish.');

  // Quantities for bulk items (defaults matching the hero demo scenario)
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'prod-milk-cow': 100, // 100L Milk @ 60 = 6,000
    'prod-curd': 50,      // 50kg Curd @ 100 = 5,000
    'prod-paneer': 30,    // 30kg Paneer @ 350 = 10,500
    'prod-ghee': 10,      // 10kg Ghee @ 650 = 6,500
    'prod-milk-cake': 20  // 20kg Milk Sweets @ 450 = 9,000
  });

  const availableBulkProducts = products.filter((p) => p.category !== 'Packages');

  // Handle quantity changes
  const handleQuantityChange = (productId: string, val: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, val)
    }));
  };

  // Build items array
  const selectedItems: BulkOrderItem[] = [];
  let calculatedSubtotal = 0;

  availableBulkProducts.forEach((p) => {
    const qty = quantities[p.id] || 0;
    if (qty > 0) {
      const rate = p.bulkPrice || p.unitPrice;
      const total = qty * rate;
      calculatedSubtotal += total;
      selectedItems.push({
        productId: p.id,
        name: p.name,
        quantity: qty,
        unit: p.unit,
        rate: rate,
        total: total
      });
    }
  });

  const deliveryCharge = calculatedSubtotal > 0 ? settings.deliveryChargeDefault : 0;
  const grandTotal = calculatedSubtotal + deliveryCharge;
  const advancePercentage = settings.advancePercentage || 30;
  const advanceRequired = Math.round((grandTotal * advancePercentage) / 100);
  const remainingAmount = grandTotal - advanceRequired;

  // Quick pre-filler for client demonstration
  const handleLoadDemoScenario = () => {
    setCustomerName('Rahul Sharma');
    setCustomerPhone('+91 98765 43210');
    setCustomerWhatsapp('+91 98765 43210');
    setCustomerEmail('rahul@example.com');
    setFunctionType('Wedding');
    setEventDate('2026-10-25');
    setGuests(500);
    setDeliveryDate('2026-10-25');
    setDeliveryTime('7:00 AM');
    setDeliveryAddress('Grand Palace Lawn, Gate 2, Tonk Road, Jaipur');
    setSpecialInstructions('Morning banquet delivery. Ensure curd pots are chilled. Handover to Chef Jagdish.');
    setQuantities({
      'prod-milk-cow': 100,
      'prod-curd': 50,
      'prod-paneer': 30,
      'prod-ghee': 10,
      'prod-milk-cake': 20
    });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      alert('Please select at least one dairy product and quantity.');
      return;
    }

    const orderId = createBulkOrder({
      customerName,
      customerPhone,
      customerWhatsapp,
      customerEmail,
      functionType,
      eventDate,
      guests,
      deliveryDate,
      deliveryTime,
      deliveryAddress,
      specialInstructions,
      items: selectedItems,
      subtotal: calculatedSubtotal,
      deliveryCharge,
      grandTotal
    });

    // Navigate to simulated advance checkout
    navigate('/checkout', { orderId });
  };

  const functionOptions: FunctionType[] = [
    'Wedding',
    'Engagement',
    'Birthday',
    'Party',
    'Religious Function',
    'Catering',
    'Hotel/Restaurant',
    'Community Event',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-6 sm:py-8 px-3 sm:px-6 pb-36 lg:pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Breadcrumb / Title */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Bulk Function Pre-Order Portal
            </div>

            <button
              type="button"
              onClick={handleLoadDemoScenario}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Auto-Fill Hero Demo Scenario (500 Guests · Wedding)</span>
            </button>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-stone-900 font-display">
            Plan Your Bulk Function Dairy Order
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-3xl">
            Lock guaranteed morning supply for your wedding, engagement, or banquet. 30% advance confirms your fresh batch and reserves dedicated cold van dispatch.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Details & Product Selection */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Customer Details */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs">
              <h2 className="text-base font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100 flex items-center justify-between">
                <span>1. Customer &amp; Coordinator Details</span>
                <span className="text-xs font-normal text-stone-400">Step 1 of 3</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp Number (for delivery alerts &amp; bills) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerWhatsapp}
                    onChange={(e) => setCustomerWhatsapp(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
                    placeholder="rahul@example.com"
                  />
                </div>
              </div>
            </div>

            {/* 2. Function & Logistics Details */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs">
              <h2 className="text-base font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100 flex items-center justify-between">
                <span>2. Function &amp; Delivery Logistics</span>
                <span className="text-xs font-normal text-stone-400">Step 2 of 3</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Function Type *
                  </label>
                  <select
                    value={functionType}
                    onChange={(e) => setFunctionType(e.target.value as FunctionType)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {functionOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Expected Number of Guests *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={50}
                      step={50}
                      required
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                    <Users className="w-4 h-4 text-stone-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Event Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => {
                        setEventDate(e.target.value);
                        setDeliveryDate(e.target.value);
                      }}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Delivery Slot Time *
                  </label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="5:30 AM">5:30 AM (Early Kitchen Prep)</option>
                    <option value="6:30 AM">6:30 AM (Morning Batch)</option>
                    <option value="7:00 AM">7:00 AM (Recommended Morning)</option>
                    <option value="8:00 AM">8:00 AM (Breakfast / Pooja)</option>
                    <option value="11:00 AM">11:00 AM (Lunch Prep)</option>
                    <option value="4:00 PM">4:00 PM (Evening Reception Prep)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Delivery Address / Venue Details *
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                    placeholder="e.g. Grand Palace Lawn, Gate 2, Tonk Road, Jaipur"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                    placeholder="e.g. Handover to Chef Jagdish. Keep curd tubs in ice room."
                  />
                </div>
              </div>
            </div>

            {/* 3. Bulk Product Selection */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs">
              <h2 className="text-base font-bold text-stone-900 mb-2 pb-2 border-b border-stone-100 flex items-center justify-between">
                <span>3. Select Products &amp; Bulk Quantities</span>
                <span className="text-xs font-normal text-stone-400">Step 3 of 3</span>
              </h2>
              <p className="text-xs text-stone-500 mb-4">
                Adjust quantities based on your function requirements. Wholesale bulk tier prices apply automatically.
              </p>

              <div className="space-y-3">
                {availableBulkProducts.map((p) => {
                  const currentQty = quantities[p.id] || 0;
                  const rate = p.bulkPrice || p.unitPrice;
                  const itemTotal = currentQty * rate;

                  return (
                    <div
                      key={p.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        currentQty > 0
                          ? 'bg-amber-50/40 border-amber-300 shadow-2xs'
                          : 'bg-white border-stone-200/90 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Info */}
                        <div className="flex items-start gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const el = e.currentTarget;
                              if (!el.dataset.fallback) {
                                el.dataset.fallback = '1';
                                el.src = '/images/hero_dairy_farm_fresh_1791460606584.jpg';
                              }
                            }}
                          />
                          <div>
                            <div className="font-semibold text-sm text-stone-900">{p.name}</div>
                            <div className="text-xs text-stone-500">
                              Wholesale Rate: <span className="font-semibold text-stone-800 tabular-nums">₹{rate}</span> per {p.unit}
                            </div>
                            {p.fatContent && (
                              <div className="text-[11px] text-stone-400 mt-0.5">{p.fatContent}</div>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls & Line Total */}
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <div className="flex items-center gap-1 border border-stone-300 rounded-lg p-0.5 bg-white shadow-2xs">
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  p.id,
                                  Math.max(0, currentQty - (p.category === 'Milk' ? 10 : 5))
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>

                            <input
                              type="number"
                              min={0}
                              value={currentQty}
                              onChange={(e) =>
                                handleQuantityChange(p.id, parseInt(e.target.value) || 0)
                              }
                              className="w-14 text-center text-xs font-bold text-stone-900 border-none focus:outline-hidden tabular-nums"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  p.id,
                                  currentQty + (p.category === 'Milk' ? 10 : 5)
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-[11px] text-stone-500 pr-1.5">{p.unit}</span>
                          </div>

                          <div className="text-right min-w-[70px]">
                            <div className="text-xs text-stone-400">Total</div>
                            <div className="text-sm font-bold text-stone-900 tabular-nums">
                              ₹{itemTotal.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: SMART BULK ORDER SUMMARY */}
          <div className="lg:col-span-5">
            <div className="sticky top-20 space-y-4">
              <div className="bg-white rounded-xl border border-stone-200 shadow-md p-5 overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                  <h3 className="text-base font-bold text-stone-900 font-display">
                    Function Order Summary
                  </h3>
                  <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Live Calculation
                  </span>
                </div>

                {/* Key metadata */}
                <div className="space-y-2 text-xs pb-4 border-b border-stone-100">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Customer:</span>
                    <span className="font-semibold text-stone-900">{customerName || 'Rahul Sharma'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Function:</span>
                    <span className="font-semibold text-stone-900">{functionType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Guests:</span>
                    <span className="font-semibold text-stone-900">{guests} Guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Event Date:</span>
                    <span className="font-semibold text-stone-900">{eventDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Delivery Slot:</span>
                    <span className="font-semibold text-stone-900">
                      {deliveryDate} · {deliveryTime}
                    </span>
                  </div>
                </div>

                {/* Selected Products List */}
                <div className="py-3 border-b border-stone-100">
                  <div className="text-xs font-semibold text-stone-700 mb-2">
                    Selected Dairy Products ({selectedItems.length}):
                  </div>
                  {selectedItems.length === 0 ? (
                    <div className="text-xs text-stone-400 italic py-2">
                      No products selected yet. Select items on the left.
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-xs">
                      {selectedItems.map((item) => (
                        <div key={item.productId} className="flex justify-between text-stone-700">
                          <span>
                            {item.name} — {item.quantity} {item.unit}
                          </span>
                          <span className="font-semibold tabular-nums">
                            ₹{item.total.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Financial breakdown */}
                <div className="py-3 space-y-2 text-xs border-b border-stone-200">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal:</span>
                    <span className="font-medium tabular-nums">
                      ₹{calculatedSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Cold Chain Delivery Charge:</span>
                    <span className="font-medium tabular-nums">
                      ₹{deliveryCharge.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-1">
                    <span>Grand Total:</span>
                    <span className="tabular-nums">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* ADVANCE BREAKDOWN HIGHLIGHT */}
                <div className="my-4 p-3 bg-amber-50/80 rounded-lg border border-amber-200/90 space-y-1.5">
                  <div className="flex justify-between text-xs text-amber-900">
                    <span className="font-semibold">Required Advance ({advancePercentage}%):</span>
                    <span className="font-bold tabular-nums">
                      ₹{advanceRequired.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Remaining (Pay before/on delivery):</span>
                    <span className="font-medium tabular-nums">
                      ₹{remainingAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={selectedItems.length === 0}
                  className="w-full py-3 px-4 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Pay ₹{advanceRequired.toLocaleString('en-IN')} &amp; Confirm Bulk Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-3 text-[11px] text-stone-500 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>30% advance locks morning cold route and guarantees batch</span>
                </div>
              </div>

              {/* Policy Note Box */}
              <div className="bg-stone-100 rounded-xl p-4 border border-stone-200/80 text-xs text-stone-600 space-y-1.5">
                <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-stone-600" />
                  <span>How Dairy Pre-Orders Work:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-stone-500 text-[11px] leading-relaxed">
                  <li>Advance payment immediately notifies the dairy plant master-churner.</li>
                  <li>Milk is sourced fresh on the eve of your event and set overnight.</li>
                  <li>Final payment of ₹{remainingAmount.toLocaleString('en-IN')} is settled via automated WhatsApp link before or upon van delivery.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* MOBILE FLOATING STICKY ACTION BAR */}
          <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-4 py-2.5 shadow-2xl">
            <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
              <div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                  30% Advance Due
                </div>
                <div className="text-base font-bold text-stone-900 tabular-nums">
                  ₹{advanceRequired.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-stone-500">
                  Total: ₹{grandTotal.toLocaleString('en-IN')} · {selectedItems.length} items
                </div>
              </div>

              <button
                type="submit"
                disabled={selectedItems.length === 0}
                className="py-2.5 px-4 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <span>Pay &amp; Confirm</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
