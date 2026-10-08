import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  MessageCircle,
  User,
  ArrowUpRight,
  ChevronLeft,
  Smartphone,
  ShieldCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRoute, navigate, cart, currentUser, switchRole } = useApp();

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Home', route: '/home' },
    { label: 'Products', route: '/products' },
    { label: 'Bulk Order', route: '/bulk-order' },
    { label: 'My Orders', route: '/orders' }
  ];

  const isNotHome = currentRoute !== '/home';

  const handleBack = () => {
    if (currentRoute === '/checkout') navigate('/bulk-order');
    else if (currentRoute === '/order-success') navigate('/orders');
    else if (currentRoute === '/orders') navigate('/home');
    else navigate('/home');
  };

  return (
    <header className={`sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 ${currentRoute === '/home' ? 'hidden md:block' : ''}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
        {/* Left side: Mobile back button or Desktop Brand wordmark */}
        <div className="flex items-center gap-2">
          {isNotHome && (
            <button
              onClick={handleBack}
              className="md:hidden p-1.5 -ml-1 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 text-stone-800" />
            </button>
          )}

          {/* Brand Wordmark (Zone 1) */}
          <button
            onClick={() => navigate('/home')}
            className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 font-display text-left hover:text-amber-800 transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <span>DairyFlow</span>
            <span className="hidden sm:inline-block text-[10px] font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              Bulk Pre-Orders
            </span>
          </button>
        </div>

        {/* Zone 2: Desktop clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => navigate(link.route)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-stone-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600'
                    : 'hover:text-stone-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions (Mobile touch-friendly + Desktop) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick WhatsApp Contact CTA */}
          <a
            href="https://wa.me/919876543210?text=Hi%20DairyFlow,%20I%20want%20to%20inquire%20about%20a%20bulk%20dairy%20order"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 rounded-lg transition-colors whitespace-nowrap min-h-[38px]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="hidden xs:inline text-[11px] sm:text-xs">WhatsApp</span>
          </a>

          {/* Cart Icon */}
          <button
            onClick={() => navigate('/cart')}
            className="relative p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {cartTotalItems > 0 && (
              <span className="absolute 0 top-0.5 right-0.5 bg-amber-700 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {cartTotalItems}
              </span>
            )}
          </button>

          {/* Desktop "Plan Bulk Order" button */}
          <button
            onClick={() => navigate('/bulk-order')}
            className="hidden sm:flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-xs transition-colors whitespace-nowrap min-h-[36px]"
          >
            <span>Plan Bulk Order</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Profile link */}
          <button
            onClick={() => navigate(currentUser.isLoggedIn ? '/profile' : '/login')}
            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
            title={currentUser.name}
          >
            <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
