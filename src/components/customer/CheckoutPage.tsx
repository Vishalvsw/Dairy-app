import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { selectedOrderId, orders, payAdvance, navigate } = useApp();

  const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [upiId, setUpiId] = useState('rahul.sharma@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!order) {
    return (
      <div className="min-h-screen bg-stone-50 py-16 px-4 text-center">
        <p className="text-sm text-stone-600 mb-4">No order found for payment.</p>
        <button
          onClick={() => navigate('/bulk-order')}
          className="px-4 py-2 bg-amber-700 text-white rounded-lg text-xs font-semibold"
        >
          Create Bulk Order
        </button>
      </div>
    );
  }

  const advanceAmount = order.advanceRequired > 0 ? order.advanceRequired : Math.round((order.grandTotal * 30) / 100);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    // Simulate 1.2s payment processing gateway
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      payAdvance(order.id, paymentMethod);

      setTimeout(() => {
        navigate('/order-success', { orderId: order.id });
      }, 900);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>256-Bit SSL Secured Advance Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
            Secure Advance Payment
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            30% advance payment required to confirm bulk orders.
          </p>
        </div>

        {/* Order Card Preview */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs mb-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs">
            <div>
              <span className="text-stone-400">Order ID: </span>
              <span className="font-bold text-stone-900 font-mono">{order.id}</span>
            </div>
            <span className="font-semibold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              {order.functionType} ({order.guests} Guests)
            </span>
          </div>

          <div className="py-3 flex justify-between items-center text-xs text-stone-600 border-b border-stone-100">
            <div>
              <div>Total Order Value: ₹{order.grandTotal.toLocaleString('en-IN')}</div>
              <div className="text-[11px] text-stone-400">Scheduled: {order.deliveryDate} · {order.deliveryTime}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                30% Advance Due
              </div>
              <div className="text-xl font-bold text-stone-900 tabular-nums">
                ₹{advanceAmount.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-stone-500 flex items-center justify-between">
            <span>Remaining balance (₹{(order.grandTotal - advanceAmount).toLocaleString('en-IN')}) due before delivery</span>
            <span className="text-emerald-700 font-medium">Auto-receipt enabled</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs mb-6">
          <h2 className="text-sm font-bold text-stone-900 mb-3">Select Payment Method</h2>

          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {[
              { id: 'UPI', label: 'UPI / QR', icon: Smartphone, desc: 'GPay, PhonePe' },
              { id: 'Card', label: 'Cards', icon: CreditCard, desc: 'Visa, Master' },
              { id: 'Net Banking', label: 'NetBanking', icon: Building, desc: 'All Banks' }
            ].map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-50/60 border-amber-500 text-amber-950 ring-1 ring-amber-500'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-amber-700' : 'text-stone-500'}`} />
                  <div className="text-xs font-semibold">{method.label}</div>
                  <div className="text-[10px] text-stone-400 truncate">{method.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Conditional Method Inputs */}
          {paymentMethod === 'UPI' && (
            <div className="space-y-3 bg-stone-50 p-3.5 rounded-lg border border-stone-200 text-xs">
              <label className="block font-semibold text-stone-700">Enter UPI ID / VPA</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  placeholder="yourname@okhdfcbank"
                />
                <span className="px-3 py-2 bg-stone-200 text-stone-700 rounded-md font-semibold text-[11px] flex items-center">
                  Verified
                </span>
              </div>
              <div className="flex gap-2 text-[11px] text-stone-500">
                <span className="bg-white px-2 py-0.5 rounded border border-stone-200">Google Pay</span>
                <span className="bg-white px-2 py-0.5 rounded border border-stone-200">PhonePe</span>
                <span className="bg-white px-2 py-0.5 rounded border border-stone-200">Paytm</span>
              </div>
            </div>
          )}

          {paymentMethod === 'Card' && (
            <div className="space-y-3 bg-stone-50 p-3.5 rounded-lg border border-stone-200 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Expiry</label>
                  <input
                    type="text"
                    defaultValue="10/28"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">CVV</label>
                  <input
                    type="password"
                    defaultValue="882"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'Net Banking' && (
            <div className="space-y-3 bg-stone-50 p-3.5 rounded-lg border border-stone-200 text-xs">
              <label className="block font-semibold text-stone-700">Select Bank</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md"
              >
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="State Bank of India">State Bank of India</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
              </select>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={handleSimulatePayment}
          disabled={isProcessing || isSuccess}
          className="w-full py-3.5 px-4 bg-amber-700 hover:bg-amber-800 disabled:opacity-75 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Authorizing ₹{advanceAmount.toLocaleString('en-IN')} with Bank...</span>
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Payment Successful! Confirming Bulk Order...</span>
            </>
          ) : (
            <>
              <span>Pay ₹{advanceAmount.toLocaleString('en-IN')} via {paymentMethod}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="mt-4 text-center text-xs text-stone-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Simulated demo gateway · No real card charges incurred</span>
        </div>
      </div>
    </div>
  );
};
