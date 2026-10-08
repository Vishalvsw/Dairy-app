import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, switchRole } = useApp();

  return (
    <footer className="hidden md:block bg-stone-900 text-stone-300 border-t border-stone-800 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="text-xl font-bold tracking-tight text-white font-display">
              DairyFlow
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Fresh farm dairy pre-orders and bulk catering supply for weddings, engagements, birthday functions, and culinary establishments.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>30% Advance Pre-Orders · Zero Quality Compromise</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Bulk Pre-Orders
            </div>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <button onClick={() => navigate('/bulk-order')} className="hover:text-white transition-colors">
                  Wedding Dairy Packages
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/bulk-order')} className="hover:text-white transition-colors">
                  Engagement & Banquet Supply
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/bulk-order')} className="hover:text-white transition-colors">
                  Catering & Hotel Rates
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/bulk-order')} className="hover:text-white transition-colors">
                  Festive Religious Offerings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Dairy Products
            </div>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <button onClick={() => navigate('/products')} className="hover:text-white transition-colors">
                  Fresh Cow & Buffalo Milk
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products')} className="hover:text-white transition-colors">
                  Artisanal Malai Paneer & Curd
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products')} className="hover:text-white transition-colors">
                  Bilona Desi Cow Ghee
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products')} className="hover:text-white transition-colors">
                  Traditional Milk Sweets
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Dispatch & Contact
            </div>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>Central Processing Plant, Tonk Road, Jaipur & Regional Hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Bulk Morning Dispatch: 4:30 AM – 8:30 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-stone-300">WhatsApp Hotline: +91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} DairyFlow Artisanal. Built for fresh event catering & transparent pre-order payments.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => switchRole('admin')}
              className="text-stone-400 hover:text-amber-400 transition-colors"
            >
              Admin Dashboard Login
            </button>
            <span>·</span>
            <button onClick={() => navigate('/home')} className="hover:text-stone-300">
              Terms & Advance Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
