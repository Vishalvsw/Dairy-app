import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, navigate } = useApp();
  const [checkedOut, setCheckedOut] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.unitPrice * item.quantity, 0);
  const delivery = subtotal > 0 ? 50 : 0;
  const total = subtotal + delivery;

  const handleCheckout = () => {
    setCheckedOut(true);
    setTimeout(() => {
      clearCart();
      setCheckedOut(false);
      navigate('/orders');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-16 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl border border-stone-200">
          <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-stone-900 mb-1">Your cart is empty</h2>
          <p className="text-xs text-stone-500 mb-6">
            Explore our artisanal fresh milk, malai paneer, and sweets.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={() => navigate('/products')}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
            >
              Browse Catalogue
            </button>
            <button
              onClick={() => navigate('/bulk-order')}
              className="px-4 py-2 bg-amber-700 text-white rounded-lg text-xs font-semibold"
            >
              Plan a Bulk Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-6 sm:py-10 px-3 sm:px-6 pb-28 md:pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-display mb-6">
          Shopping Cart ({cart.length} items)
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Cart items */}
          <div className="md:col-span-8 space-y-3">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded-lg border border-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-semibold text-sm text-stone-900">{item.product.name}</div>
                    <div className="text-xs text-stone-500">
                      ₹{item.product.unitPrice} per {item.product.unit}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 border border-stone-300 rounded-lg p-0.5 bg-stone-50">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-200 rounded"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold text-stone-900 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-200 rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <div className="font-bold text-sm text-stone-900 tabular-nums">
                      ₹{(item.product.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => navigate('/products')}
                className="text-xs text-amber-800 font-semibold hover:underline"
              >
                ← Continue Shopping
              </button>
              <button
                onClick={clearCart}
                className="text-xs text-stone-400 hover:text-stone-600"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4">
              <h2 className="text-base font-bold text-stone-900 pb-2 border-b border-stone-100 font-display">
                Order Summary
              </h2>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Dispatch:</span>
                  <span className="font-medium tabular-nums">₹{delivery.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-sm text-stone-900">
                  <span>Total:</span>
                  <span className="tabular-nums">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={checkedOut}
                className="w-full py-2.5 px-4 bg-amber-700 hover:bg-amber-800 disabled:opacity-75 text-white font-bold text-xs rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                {checkedOut ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Order Placed!</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                <span className="font-semibold">Planning a big event or wedding? </span>
                Bulk function orders with custom quantities and 30% advance lock are managed through the{' '}
                <button
                  onClick={() => navigate('/bulk-order')}
                  className="font-bold underline text-amber-950"
                >
                  Bulk Order Portal
                </button>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
