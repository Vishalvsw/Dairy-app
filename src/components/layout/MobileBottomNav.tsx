import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  ShoppingBag,
  Sparkles,
  ClipboardList,
  User,
  PackageCheck
} from 'lucide-react';

interface MobileBottomNavProps {
  isInline?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ isInline = false }) => {
  const { currentRoute, navigate, orders, cart } = useApp();

  const pendingOrdersCount = orders.filter((o) => o.remainingAmount > 0).length;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      route: '/home'
    },
    {
      id: 'products',
      label: 'Dairy',
      icon: ShoppingBag,
      route: '/products',
      badge: cartCount > 0 ? cartCount : undefined
    },
    {
      id: 'bulk',
      label: 'Bulk Order',
      icon: Sparkles,
      route: '/bulk-order',
      isCenterAction: true
    },
    {
      id: 'orders',
      label: 'My Orders',
      icon: ClipboardList,
      route: '/orders',
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      route: '/profile'
    }
  ];

  return (
    <nav
      aria-label="Mobile Bottom App Navigation"
      className={
        isInline
          ? "w-full bg-white/95 backdrop-blur-lg border-t border-stone-200/90 shadow-lg px-2 pt-1.5 pb-2 transition-transform"
          : "md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200/90 shadow-lg px-2 pt-1.5 pb-3 sm:pb-2.5 transition-transform"
      }
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentRoute === item.route ||
            (item.id === 'orders' && (currentRoute === '/orders' || currentRoute === '/orders-list'));

          if (item.isCenterAction) {
            return (
              <div key={item.id} className="flex justify-center -mt-5">
                <button
                  type="button"
                  onClick={() => navigate(item.route)}
                  className={`flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform active:scale-95 ${
                    isActive
                      ? 'bg-amber-700 text-white ring-4 ring-amber-100'
                      : 'bg-gradient-to-tr from-amber-700 to-amber-600 text-white ring-4 ring-white shadow-amber-900/20'
                  }`}
                  aria-label="Start Bulk Order"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[9px] font-bold tracking-tight uppercase mt-0.5">Bulk</span>
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.route)}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-amber-800 font-bold'
                  : 'text-stone-500 hover:text-stone-900 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-amber-800' : 'text-stone-500'
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-700 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white tabular-nums">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 truncate ${
                  isActive ? 'font-bold text-amber-900' : 'text-stone-500'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
