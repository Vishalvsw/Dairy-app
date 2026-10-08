import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HeroDemoBar } from './components/layout/HeroDemoBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { WhatsAppSimulatedPopup } from './components/layout/WhatsAppSimulatedPopup';
import { Wifi, Battery, Signal } from 'lucide-react';

// Customer pages
import { HomePage } from './components/customer/HomePage';
import { MobileStorefront } from './components/customer/MobileStorefront';
import { BulkOrderPage } from './components/customer/BulkOrderPage';
import { CheckoutPage } from './components/customer/CheckoutPage';
import { OrderSuccessPage } from './components/customer/OrderSuccessPage';
import { CustomerOrderTrackingPage } from './components/customer/CustomerOrderTrackingPage';
import { CustomerOrdersListPage } from './components/customer/CustomerOrdersListPage';
import { ProductsPage } from './components/customer/ProductsPage';
import { CartPage } from './components/customer/CartPage';
import { CustomerProfilePage } from './components/customer/CustomerProfilePage';
import { CustomerLoginPage } from './components/customer/CustomerLoginPage';

// Admin pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './components/admin/AdminDashboardPage';
import { AdminBulkOrdersPage } from './components/admin/AdminBulkOrdersPage';
import { AdminPaymentsPage } from './components/admin/AdminPaymentsPage';
import { AdminOrderDetailsPage } from './components/admin/AdminOrderDetailsPage';
import { AdminCalendarPage } from './components/admin/AdminCalendarPage';
import { AdminProductsPage } from './components/admin/AdminProductsPage';
import { AdminCustomersPage } from './components/admin/AdminCustomersPage';
import { AdminReportsPage } from './components/admin/AdminReportsPage';
import { AdminSettingsPage } from './components/admin/AdminSettingsPage';
import { AdminLoginPage } from './components/admin/AdminLoginPage';

const AppContent: React.FC = () => {
  const { currentRoute, currentUser, deviceMode } = useApp();

  const isAdminRoute = currentRoute.startsWith('/admin');

  // Customer page body content helper
  const renderCustomerBody = (isMobileView: boolean) => {
    if (currentRoute === '/home') {
      return isMobileView ? <MobileStorefront /> : <HomePage />;
    }
    if (currentRoute === '/bulk-order') return <BulkOrderPage />;
    if (currentRoute === '/checkout') return <CheckoutPage />;
    if (currentRoute === '/order-success') return <OrderSuccessPage />;
    if (currentRoute === '/orders') return <CustomerOrderTrackingPage />;
    if (currentRoute === '/orders-list') return <CustomerOrdersListPage />;
    if (currentRoute === '/products') return <ProductsPage />;
    if (currentRoute === '/cart') return <CartPage />;
    if (currentRoute === '/profile') return <CustomerProfilePage />;
    if (currentRoute === '/login') return <CustomerLoginPage />;
    return <HomePage />;
  };

  // Standard Customer view rendering
  const renderCustomerMain = () => (
    <>
      <Header />
      <main className="flex-1">
        {currentRoute === '/home' && <HomePage />}
        {currentRoute === '/bulk-order' && <BulkOrderPage />}
        {currentRoute === '/checkout' && <CheckoutPage />}
        {currentRoute === '/order-success' && <OrderSuccessPage />}
        {currentRoute === '/orders' && <CustomerOrderTrackingPage />}
        {currentRoute === '/orders-list' && <CustomerOrdersListPage />}
        {currentRoute === '/products' && <ProductsPage />}
        {currentRoute === '/cart' && <CartPage />}
        {currentRoute === '/profile' && <CustomerProfilePage />}
        {currentRoute === '/login' && <CustomerLoginPage />}
      </main>
      <Footer />
      {/* Mobile-first bottom app navigation */}
      <MobileBottomNav />
    </>
  );

  // Admin routing
  if (isAdminRoute) {
    if (currentRoute === '/admin/login' || (!currentUser.isLoggedIn && currentUser.role !== 'admin')) {
      return (
        <div className="min-h-screen bg-stone-900 flex flex-col">
          <HeroDemoBar />
          <AdminLoginPage />
          <WhatsAppSimulatedPopup />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-stone-100 flex flex-col">
        <HeroDemoBar />
        <AdminLayout>
          {currentRoute === '/admin/dashboard' && <AdminDashboardPage />}
          {currentRoute === '/admin/bulk-orders' && <AdminBulkOrdersPage />}
          {currentRoute === '/admin/orders' && <AdminOrderDetailsPage />}
          {currentRoute === '/admin/payments' && <AdminPaymentsPage />}
          {currentRoute === '/admin/calendar' && <AdminCalendarPage />}
          {currentRoute === '/admin/products' && <AdminProductsPage />}
          {currentRoute === '/admin/customers' && <AdminCustomersPage />}
          {currentRoute === '/admin/reports' && <AdminReportsPage />}
          {currentRoute === '/admin/settings' && <AdminSettingsPage />}
        </AdminLayout>
        <WhatsAppSimulatedPopup />
      </div>
    );
  }

  // Pure Mobile App View Mode (Full-height centered mobile app viewport)
  if (deviceMode === 'mobile_app') {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col text-stone-900">
        <HeroDemoBar />
        <div className="flex-1 py-4 sm:py-8 px-2 sm:px-4 flex items-center justify-center bg-radial from-stone-850 to-stone-950">
          <div className="w-full max-w-[430px] min-h-[850px] bg-[#F6EFEA] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border border-stone-700/60 ring-1 ring-white/10">
            {/* Top compact subpage header if not on home screen */}
            {currentRoute !== '/home' && <Header />}
            
            {/* Mobile App Scrollable Content */}
            <main className="flex-1 overflow-y-auto flex flex-col">
              {renderCustomerBody(true)}
            </main>

            {/* Mobile Bottom Navigation Docked */}
            <div className="shrink-0 z-40 bg-white">
              <MobileBottomNav isInline={true} />
            </div>
          </div>
        </div>
        <WhatsAppSimulatedPopup />
      </div>
    );
  }

  // Mobile App Phone Mockup Frame Mode (enabled via "Phone Frame" button)
  if (deviceMode === 'mobile_frame') {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col">
        <HeroDemoBar />

        <div className="flex-1 py-8 px-4 flex items-center justify-center bg-radial from-stone-800 to-stone-950">
          <div className="w-[390px] h-[844px] bg-[#F6EFEA] rounded-[50px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[10px] border-stone-800 overflow-hidden flex flex-col relative ring-1 ring-stone-700/50">
            {/* Phone Top Notch / Status Bar */}
            <div className="h-10 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between text-stone-900 text-[11px] font-semibold shrink-0 z-50 border-b border-stone-100/60 select-none">
              <span className="tabular-nums">9:41</span>
              {/* Dynamic Island pill */}
              <div className="w-24 h-4 bg-stone-950 rounded-full mx-auto"></div>
              <div className="flex items-center gap-1.5 text-stone-700">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4 text-stone-900" />
              </div>
            </div>

            {/* Top compact subpage header if not on home screen */}
            {currentRoute !== '/home' && <Header />}

            {/* Scrollable Mobile App Body */}
            <div className="flex-1 overflow-y-auto flex flex-col relative">
              {renderCustomerBody(true)}
            </div>

            {/* Docked Mobile Bottom Navigation Bar */}
            <div className="shrink-0 z-40 bg-white">
              <MobileBottomNav isInline={true} />
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="h-4 bg-white/95 shrink-0 flex items-center justify-center z-50">
              <div className="w-32 h-1 bg-stone-400/80 rounded-full"></div>
            </div>
          </div>
        </div>

        <WhatsAppSimulatedPopup />
      </div>
    );
  }

  // Standard Fluid Responsive Mode (scales seamlessly on phones 320px–414px up to 1440px+ desktop)
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900">
      {/* Interactive 12-Step Hero Scenario Presentation Bar */}
      <HeroDemoBar />

      {/* Main Responsive Customer App Viewport */}
      {renderCustomerMain()}

      {/* Simulated WhatsApp notification alert */}
      <WhatsAppSimulatedPopup />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
