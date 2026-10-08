import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  CreditCard,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Smartphone
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { currentRoute, navigate, switchRole, logout, currentUser, orders } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingPaymentsCount = orders.filter(
    (o) => o.paymentStatus !== 'Fully Paid'
  ).length;

  const menuItems = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Bulk Orders', route: '/admin/bulk-orders', icon: Layers, badge: orders.length },
    { label: 'All Orders', route: '/admin/orders', icon: Package },
    { label: 'Payments Control', route: '/admin/payments', icon: CreditCard, alert: pendingPaymentsCount },
    { label: 'Event Calendar', route: '/admin/calendar', icon: Calendar },
    { label: 'Products & Rates', route: '/admin/products', icon: ShoppingBag },
    { label: 'Customers', route: '/admin/customers', icon: Users },
    { label: 'Reports', route: '/admin/reports', icon: BarChart3 },
    { label: 'Settings', route: '/admin/settings', icon: Settings }
  ];

  const handleNav = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row text-stone-900">
      {/* Mobile Top App Bar (Only visible on screens < md) */}
      <div className="md:hidden bg-stone-900 text-white px-4 h-14 flex items-center justify-between border-b border-stone-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800"
            aria-label="Toggle admin menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div>
            <div className="font-bold text-white text-sm font-display leading-tight">
              DairyFlow Admin
            </div>
            <div className="text-[9px] text-amber-400 uppercase tracking-wider font-semibold">
              Operations Console
            </div>
          </div>
        </div>

        <button
          onClick={() => switchRole('customer')}
          className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 px-2.5 py-1 rounded-md flex items-center gap-1 font-medium border border-stone-700"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          <span>Store</span>
        </button>
      </div>

      {/* Sidebar (Desktop permanent, Mobile off-canvas drawer) */}
      <aside
        aria-label="Admin Navigation"
        className={`fixed md:sticky top-0 bottom-0 left-0 z-50 md:z-auto w-64 bg-stone-900 text-stone-300 flex flex-col justify-between shrink-0 border-r border-stone-800 transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Brand (Desktop) */}
          <div className="hidden md:flex h-16 px-6 items-center justify-between border-b border-stone-800">
            <div>
              <div className="font-bold text-white text-base tracking-tight font-display">
                DairyFlow Admin
              </div>
              <div className="text-[10px] text-amber-400 font-medium tracking-wider uppercase">
                Bulk Pre-Order Engine
              </div>
            </div>
          </div>

          {/* Mobile drawer header close */}
          <div className="md:hidden p-4 border-b border-stone-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
              Navigation Menu
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-stone-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isActive ? 'bg-amber-700 text-white' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {item.alert !== undefined && item.alert > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {item.alert}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switcher & Profile */}
        <div className="p-3 border-t border-stone-800 space-y-2">
          {/* Switch to Customer Portal */}
          <button
            onClick={() => switchRole('customer')}
            className="w-full py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Customer Storefront</span>
          </button>

          <div className="flex items-center justify-between pt-2 px-2 text-xs text-stone-400">
            <div className="truncate">
              <div className="font-semibold text-stone-200 truncate">{currentUser.name}</div>
              <div className="text-[10px] text-stone-500 truncate">Manager</div>
            </div>
            <button
              onClick={logout}
              className="p-1 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
        />
      )}

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar (Desktop) */}
        <header className="hidden md:flex h-14 bg-white border-b border-stone-200 px-6 items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span>Dairy Operations</span>
            <span>/</span>
            <span className="text-stone-900 font-semibold capitalize">
              {currentRoute.replace('/admin/', '').replace('-', ' ') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-medium rounded-md border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Morning Dispatch Cold Van: Active</span>
            </span>

            <button
              onClick={() => navigate('/admin/bulk-orders')}
              className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
            >
              + View All Bulk Orders
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
