import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  ShieldCheck,
  Truck,
  ArrowRight,
  MessageCircle,
  Instagram,
  CheckCircle2,
  Clock,
  Sparkles,
  ShoppingBag,
  Plus,
  Users,
  Smartphone
} from 'lucide-react';
import { HERO_IMAGE, WEDDING_CATERING_IMAGE, PANEER_CURD_IMAGE, GHEE_IMAGE, SWEETS_IMAGE } from '../../data/mockData';
import { MobileStorefront } from './MobileStorefront';

export const HomePage: React.FC = () => {
  const { navigate, products, addToCart, deviceMode, setDeviceMode } = useApp();

  const popularProducts = products.filter((p) => p.popular && p.category !== 'Packages').slice(0, 4);

  const handleCustomizePackage = (pkgType: 'wedding' | 'essentials') => {
    navigate('/bulk-order');
  };

  // If mobile mode is active, render the dedicated mobile storefront
  if (deviceMode === 'mobile_frame' || deviceMode === 'mobile_app') {
    return <MobileStorefront />;
  }

  return (
    <>
      {/* MOBILE APP STOREFRONT (Displayed on mobile screens < md matching reference pictures) */}
      <div className="block md:hidden">
        <MobileStorefront />
      </div>

      {/* DESKTOP STOREFRONT (Displayed on screens >= md) */}
      <div className="hidden md:block min-h-screen bg-stone-50 pb-28 md:pb-12">
      {/* Top Banner */}
      <div className="bg-amber-900 text-amber-50 px-4 py-2 text-xs text-center border-b border-amber-950/40">
        <span className="font-medium">
          Hosting an upcoming function? Book your fresh dairy batch early with 30% advance for guaranteed 6:00 AM cold delivery.
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-md border border-amber-200/80">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Direct From Farm · Same-Day Churned Artisanal Dairy</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-display leading-[1.15] text-balance">
              Fresh Dairy Products for Your Everyday Needs &amp; Big Functions
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Order milk, curd, paneer, ghee, butter and dairy sweets for home, business or bulk functions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3 text-sm font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-sm transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>Order Now</span>
                <ShoppingBag className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/bulk-order')}
                className="px-6 py-3 text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>Plan a Bulk Order</span>
                <ArrowRight className="w-4 h-4 text-stone-600" />
              </button>

              <button
                onClick={() => setDeviceMode('mobile_app')}
                className="px-5 py-3 text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shadow-xs"
                title="Switch to the exact mobile app user interface"
              >
                <Smartphone className="w-4 h-4 text-amber-800" />
                <span>Mobile App View</span>
              </button>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-stone-100 text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">30% Advance Lock</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">6:00 AM Cold Van</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">100% Pure Milk</span>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 aspect-4/3 bg-stone-100">
              <img
                src={HERO_IMAGE}
                alt="Fresh farm milk bottles and earthen dairy pots"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (!el.dataset.fallback) {
                    el.dataset.fallback = '1';
                    el.src = '/images/hero_dairy.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent"></div>

              {/* Overlaid Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200/80 shadow-md">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span>Upcoming Wedding Season Booking</span>
                  <span className="text-emerald-700 font-semibold">Available</span>
                </div>
                <div className="text-sm font-bold text-stone-900 truncate">
                  Grand Wedding Dairy Package (300–500 Guests)
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100 text-xs">
                  <span className="font-semibold text-stone-900 tabular-nums">From ₹37,500</span>
                  <button
                    onClick={() => navigate('/bulk-order')}
                    className="text-amber-800 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Configure Batch</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM ENTRY POINT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-linear-to-br from-amber-500/10 via-stone-100 to-amber-100/40 border border-amber-200/80 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-pink-700 uppercase tracking-wider">
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Order From Instagram</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
                Discovered our fresh dairy reels or wedding feeds on Instagram?
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Skip the back-and-forth WhatsApp price negotiations. Pick your function date, calculate required milk, paneer and sweets for your guest count, and lock your slot instantly with 30% advance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => navigate('/bulk-order')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-xs transition-colors text-center whitespace-nowrap"
              >
                Order Now
              </button>
              <a
                href="#instagram-profile"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Instagram Profile placeholder: @freshdairy_artisanal (Actual handle will be linked per client account)');
                }}
                className="px-4 py-2.5 text-xs font-semibold text-pink-800 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>Instagram Profile</span>
              </a>
            </div>
          </div>

          {/* 5-Step Visual Flow */}
          <div className="mt-8 pt-6 border-t border-amber-200/60">
            <div className="text-xs font-semibold text-stone-700 mb-4 uppercase tracking-wider">
              Seamless 5-Step Booking Workflow:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { step: '1', title: 'Instagram', desc: 'Browse reels & stories' },
                { step: '2', title: 'Website', desc: 'Open bulk pre-order app' },
                { step: '3', title: 'Bulk Order', desc: 'Choose kg / litres & date' },
                { step: '4', title: '30% Advance', desc: 'Instant UPI / card lock' },
                { step: '5', title: 'Confirmation', desc: 'Live dispatch timeline' }
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="bg-white/90 p-3 rounded-lg border border-stone-200/70 shadow-2xs relative"
                >
                  <div className="text-[10px] font-bold text-amber-700 mb-0.5">STEP {item.step}</div>
                  <div className="font-semibold text-xs text-stone-900">{item.title}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5 leading-tight">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BULK PACKAGES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              Curated Bulk Packages
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
              Ready-Made Event &amp; Function Packages
            </h2>
          </div>
          <button
            onClick={() => navigate('/bulk-order')}
            className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Custom Bulk Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wedding Dairy Package */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:border-amber-300 transition-all flex flex-col">
            <div className="h-48 relative overflow-hidden bg-stone-100">
              <img
                src={WEDDING_CATERING_IMAGE}
                alt="Wedding Dairy Package Catering Setup"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (!el.dataset.fallback) {
                    el.dataset.fallback = '1';
                    el.src = '/images/hero_dairy.jpg';
                  }
                }}
              />
              <div className="absolute top-3 left-3 bg-amber-900/90 text-amber-100 px-2.5 py-1 rounded text-xs font-medium backdrop-blur-xs flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>For 300–500 Guests</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1">Wedding Dairy Package</h3>
                <p className="text-xs text-stone-600 mb-4">
                  Complete dairy requirement for grand marriage banquets, morning pooja &amp; evening buffet.
                </p>

                <div className="bg-stone-50 rounded-lg p-3 border border-stone-200/80 mb-4 space-y-1.5 text-xs">
                  <div className="font-semibold text-stone-800 text-[11px] uppercase tracking-wider">
                    Included in standard package:
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>• Fresh Cow Milk</span>
                    <span className="font-medium text-stone-900">100 Litres</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>• Artisanal Set Curd (Dahi)</span>
                    <span className="font-medium text-stone-900">50 kg</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>• Fresh Malai Paneer</span>
                    <span className="font-medium text-stone-900">30 kg</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>• Pure Desi Cow Ghee (Bilona)</span>
                    <span className="font-medium text-stone-900">10 kg</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>• Traditional Milk Sweets</span>
                    <span className="font-medium text-stone-900">20 kg</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-3 text-xs">
                  <div>
                    <span className="text-stone-500">Estimated Total: </span>
                    <span className="text-base font-bold text-stone-900 tabular-nums">₹37,500</span>
                  </div>
                  <span className="text-emerald-700 font-medium">30% Advance: ₹11,250</span>
                </div>

                <button
                  onClick={() => handleCustomizePackage('wedding')}
                  className="w-full py-2.5 px-4 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Customize Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Function Essentials */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:border-amber-300 transition-all flex flex-col">
            <div className="h-48 relative overflow-hidden bg-stone-100">
              <img
                src={PANEER_CURD_IMAGE}
                alt="Function Essentials Paneer and Curd"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (!el.dataset.fallback) {
                    el.dataset.fallback = '1';
                    el.src = '/images/paneer_curd.jpg';
                  }
                }}
              />
              <div className="absolute top-3 left-3 bg-stone-900/90 text-stone-100 px-2.5 py-1 rounded text-xs font-medium backdrop-blur-xs flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>For 150–250 Guests</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1">Function Essentials Package</h3>
                <p className="text-xs text-stone-600 mb-4">
                  Essential dairy essentials tailored for engagements, birthday dinners, and caterers.
                </p>

                <div className="bg-stone-50 rounded-lg p-3 border border-stone-200/80 mb-4 space-y-1.5 text-xs">
                  <div className="font-semibold text-stone-800 text-[11px] uppercase tracking-wider">
                    Included in standard package:
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>• Fresh Cow Milk</span>
                    <span className="font-medium text-stone-900">50 Litres</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>• Thick Set Curd (Dahi)</span>
                    <span className="font-medium text-stone-900">25 kg</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>• Fresh Malai Paneer</span>
                    <span className="font-medium text-stone-900">15 kg</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>• Traditional White Butter</span>
                    <span className="font-medium text-stone-900">5 kg</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-3 text-xs">
                  <div>
                    <span className="text-stone-500">Estimated Total: </span>
                    <span className="text-base font-bold text-stone-900 tabular-nums">₹18,500</span>
                  </div>
                  <span className="text-emerald-700 font-medium">30% Advance: ₹5,550</span>
                </div>

                <button
                  onClick={() => handleCustomizePackage('essentials')}
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Customize Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TODAY'S POPULAR PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              Fresh Daily Harvest
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
              Today's Popular Products
            </h2>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col"
            >
              <div className="h-44 relative bg-stone-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (!el.dataset.fallback) {
                      el.dataset.fallback = '1';
                      el.src = '/images/hero_dairy.jpg';
                    }
                  }}
                />
                <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-stone-700 px-2 py-0.5 rounded border border-stone-200">
                  {product.category}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-stone-900">{product.name}</h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">{product.description}</p>
                  {product.fatContent && (
                    <div className="text-[11px] text-stone-400 mt-2">
                      {product.fatContent} · {product.shelfLife}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-stone-900 tabular-nums">
                      ₹{product.unitPrice}
                    </span>
                    <span className="text-xs text-stone-500"> / {product.unit}</span>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors"
                      title="Add to daily cart"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate('/bulk-order')}
                      className="px-2.5 py-1 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-md transition-colors"
                    >
                      Bulk
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE VALUE PROPOSITION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-8 lg:p-12">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              The DairyFlow Guarantee
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display text-balance">
              Take bulk orders with advance payment and manage every order in one place.
            </h2>
            <p className="text-sm text-stone-300 mt-2 leading-relaxed">
              We eliminate chaotic WhatsApp spreadsheets and uncertain collections. Your event dairy needs are locked, chilled, and tracked end-to-end.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Reduce Payment Delays',
                desc: '30% advance secures raw milk procurement in advance, keeping operations predictable.'
              },
              {
                title: 'Secure Bulk Orders',
                desc: 'No last-minute cancellations. Every bulk slot is guaranteed with scheduled morning route allocation.'
              },
              {
                title: 'Manage Function Orders Easily',
                desc: 'Automated guest-to-dairy calculators for weddings, engagements, poojas, and banquets.'
              },
              {
                title: 'Know Upcoming Deliveries',
                desc: 'Clear timeline from order confirmation, fresh churn, cold storage, to dispatch.'
              },
              {
                title: 'Track Paid & Pending Amounts',
                desc: 'Transparent real-time balances, automated payment receipts, and instant settlement.'
              },
              {
                title: 'Improve Cash-Flow Visibility',
                desc: 'Predictable working capital for farmers, processing units, and delivery fleets.'
              }
            ].map((pillar, i) => (
              <div key={i} className="bg-stone-800/70 p-4 rounded-xl border border-stone-700/60">
                <div className="font-semibold text-stone-100 text-sm mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  {pillar.title}
                </div>
                <div className="text-xs text-stone-400 leading-relaxed">{pillar.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-400">
              Need immediate assistance for a function happening within 48 hours?
            </span>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Business on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
          Local Function Organizers
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 font-display mb-6">
          Trusted by Top Wedding Planners &amp; Caterers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                'For an 800-guest marriage banquet, locking 100L milk, 50kg curd, and 30kg fresh paneer with a 30% advance removed all stress. It arrived at 6:45 AM chilled perfectly.',
              author: 'Rahul Sharma',
              role: 'Groom Family Host',
              event: 'Grand Palace Lawn Wedding'
            },
            {
              quote:
                'We cater 12+ large banquets a month. Before DairyFlow, collecting delayed payments was our biggest headache. The advance pre-order system solved our cash flow completely.',
              author: 'Suresh Reddy',
              role: 'Head Chef & Owner',
              event: 'Reddy Convention Catering'
            },
            {
              quote:
                'The Desi Ghee aroma and soft spongy Malai Paneer quality are far superior to open market vendors. The clear WhatsApp reminder before delivery makes settlement simple.',
              author: 'Priya Patel',
              role: 'Event Coordinator',
              event: 'Shubham Banquet Celebrations'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between"
            >
              <p className="text-xs text-stone-600 italic leading-relaxed mb-4">
                "{item.quote}"
              </p>
              <div className="pt-3 border-t border-stone-100">
                <div className="font-semibold text-xs text-stone-900">{item.author}</div>
                <div className="text-[11px] text-stone-500">{item.role} · {item.event}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </>
  );
};
