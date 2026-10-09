import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import {
  Search,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Menu,
  ShoppingBag,
  Sparkles,
  Plus,
  Check,
  Users,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import {
  HERO_IMAGE,
  PANEER_CURD_IMAGE,
  GHEE_IMAGE,
  SWEETS_IMAGE,
  WEDDING_CATERING_IMAGE
} from '../../data/mockData';

export const MobileStorefront: React.FC = () => {
  const { navigate, products, addToCart, currentUser } = useApp();

  // Active view toggle between Image 1 style (Categories & Sales) and Image 2 style (Main Food & Popular This Week)
  const [activeScreen, setActiveScreen] = useState<'screen1' | 'screen2'>('screen1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Dairy');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Categories matching Image 1
  const categoryCards = [
    {
      id: 'milk',
      title: 'Fresh Milk',
      subtitle: '2 Varieties · Cow & Buffalo',
      image: HERO_IMAGE,
      categoryFilter: 'Milk'
    },
    {
      id: 'paneer',
      title: 'Malai Paneer',
      subtitle: 'Fresh Sponge Churned Daily',
      image: PANEER_CURD_IMAGE,
      categoryFilter: 'Paneer'
    },
    {
      id: 'curd',
      title: 'Artisanal Curd (Dahi)',
      subtitle: 'Traditional Clay Matka Set',
      image: PANEER_CURD_IMAGE,
      categoryFilter: 'Curd & Butter'
    },
    {
      id: 'ghee',
      title: 'Desi Cow Ghee',
      subtitle: 'Bilona Churned · 99.7% Fat',
      image: GHEE_IMAGE,
      categoryFilter: 'Ghee'
    },
    {
      id: 'sweets',
      title: 'Traditional Sweets',
      subtitle: 'Gulab Jamun, Rasgulla, Milk Cake',
      image: SWEETS_IMAGE,
      categoryFilter: 'Sweets'
    },
    {
      id: 'bulk',
      title: 'Bulk Wedding Packages',
      subtitle: '300–500 Guests · 30% Advance',
      image: WEDDING_CATERING_IMAGE,
      categoryFilter: 'Packages'
    }
  ];

  // Quick menu thumbnails row matching Image 2
  const quickThumbnails = [
    { name: 'Cow Milk', image: HERO_IMAGE, filter: 'Milk' },
    { name: 'Paneer', image: PANEER_CURD_IMAGE, filter: 'Paneer' },
    { name: 'Ghee', image: GHEE_IMAGE, filter: 'Ghee' },
    { name: 'Sweets', image: SWEETS_IMAGE, filter: 'Sweets' },
    { name: 'Wedding', image: WEDDING_CATERING_IMAGE, filter: 'Packages' }
  ];

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1200);
  };

  const popularThisWeek = products.filter((p) => {
    if (selectedFilter === 'All Dairy') return true;
    if (selectedFilter === 'Milk') return p.category === 'Milk';
    if (selectedFilter === 'Paneer') return p.category === 'Paneer';
    if (selectedFilter === 'Ghee') return p.category === 'Ghee';
    if (selectedFilter === 'Sweets') return p.category === 'Sweets';
    return true;
  });

  return (
    <div className="bg-[#F6EFEA] min-h-screen text-stone-900 pb-28 select-none font-sans">
      {/* Top Mobile Screen Switcher / Pills to easily toggle between Image 1 UI and Image 2 UI */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-stone-200/50 bg-[#F6EFEA]/90 sticky top-0 z-20 backdrop-blur-xs">
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-full text-xs font-semibold">
          <button
            onClick={() => setActiveScreen('screen1')}
            className={`px-3 py-1 rounded-full transition-all ${
              activeScreen === 'screen1'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveScreen('screen2')}
            className={`px-3 py-1 rounded-full transition-all ${
              activeScreen === 'screen2'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            The Main Food
          </button>
        </div>

        <button
          onClick={() => navigate('/bulk-order')}
          className="px-2.5 py-1 bg-amber-700 text-white rounded-full text-[11px] font-bold shadow-xs flex items-center gap-1 active:scale-95 transition-transform"
        >
          <Sparkles className="w-3 h-3 text-amber-200" />
          <span>Bulk 30%</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SCREEN 1: EXACT MATCH TO USER'S FIRST REFERENCE IMAGE    */}
      {/* ======================================================== */}
      {activeScreen === 'screen1' && (
        <div className="px-4 pt-3 space-y-4 animate-fade-in">
          {/* 1. Header Greeting & Avatar */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-stone-500 font-medium">
                Hello {currentUser?.name ? currentUser.name.split(' ')[0] : 'Rahul'}
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight leading-tight mt-0.5 font-display">
                Choose Your Food Today
              </h1>
            </div>

            <button
              onClick={() => navigate('/profile')}
              className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 ring-1 ring-stone-200 active:scale-95 transition-transform bg-amber-100 flex items-center justify-center text-amber-900 font-bold text-sm"
              title="Open Profile"
            >
              <img
                src="/images/avatar.svg"
                alt="User Avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="hidden">R</span>
            </button>
          </div>

          {/* 2. Rounded Pill Search Bar */}
          <div className="bg-white rounded-2xl shadow-xs border border-stone-200/80 px-3.5 py-2.5 flex items-center">
            <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search dairy, milk, paneer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
            />
            <div className="w-px h-5 bg-stone-200 mx-2.5 shrink-0" />
            <button
              onClick={() => setActiveScreen('screen2')}
              className="text-stone-500 hover:text-stone-800 p-0.5 shrink-0"
              title="Filter"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* 3. Promotional "Sales of Today" Banner Card */}
          <div
            onClick={() => navigate('/bulk-order')}
            className="bg-gradient-to-r from-sky-50 via-white to-amber-50/70 rounded-2xl p-4 border border-stone-200/70 shadow-xs flex items-center justify-between overflow-hidden relative cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="space-y-1 z-10 max-w-[60%]">
              <div className="text-xl font-black text-stone-900 tracking-tight leading-tight font-display">
                Sales of Today
              </div>
              <div className="text-[11px] text-amber-800 font-semibold leading-tight">
                30% Advance on Wedding &amp; Bulk Orders
              </div>
              <div className="pt-1.5">
                <span className="inline-block px-3 py-1 bg-amber-700 text-white rounded-lg text-[10px] font-bold shadow-xs">
                  Book Batch &rarr;
                </span>
              </div>
            </div>

            <div className="w-28 h-24 relative overflow-hidden rounded-xl shrink-0 shadow-2xs bg-stone-100">
              <img
                src={HERO_IMAGE}
                alt="Sales of Today Fresh Dairy"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (!el.dataset.fallback) {
                    el.dataset.fallback = '1';
                    el.src = '/images/hero_dairy_farm_fresh_1791460606584.jpg';
                  }
                }}
              />
            </div>
          </div>

          {/* 4. "Food Catagori" Section Header with "View All" */}
          <div className="flex items-center justify-between pt-1">
            <h2 className="text-base font-extrabold text-stone-900 tracking-tight font-display">
              Food Catagori
            </h2>
            <button
              onClick={() => setActiveScreen('screen2')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
            >
              View All
            </button>
          </div>

          {/* 5. Vertical List of Rounded Category Cards (Matching Image 1) */}
          <div className="space-y-2.5">
            {categoryCards.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  if (cat.categoryFilter === 'Packages') navigate('/bulk-order');
                  else {
                    setSelectedFilter(cat.categoryFilter);
                    setActiveScreen('screen2');
                  }
                }}
                className="bg-white rounded-2xl shadow-xs border border-stone-200/70 p-2.5 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all hover:border-amber-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const el = e.currentTarget;
                        if (!el.dataset.fallback) {
                          el.dataset.fallback = '1';
                          el.src = '/images/hero_dairy_farm_fresh_1791460606584.jpg';
                        }
                      }}
                    />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-stone-900 tracking-tight">
                      {cat.title}
                    </h3>
                    <div className="text-xs text-stone-400 font-medium mt-0.5">
                      {cat.subtitle}
                    </div>
                  </div>
                </div>

                <div className="pr-1 text-stone-400">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 2: EXACT MATCH TO USER'S SECOND REFERENCE IMAGE   */}
      {/* ======================================================== */}
      {activeScreen === 'screen2' && (
        <div className="px-4 pt-2 space-y-4 animate-fade-in">
          {/* Top Bar with Back Arrow and Hamburger Menu */}
          <div className="flex items-center justify-between py-1">
            <button
              onClick={() => setActiveScreen('screen1')}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-stone-800 shadow-xs border border-stone-200/70 active:scale-95 transition-transform"
              aria-label="Back to Categories"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/products')}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-stone-800 shadow-xs border border-stone-200/70 active:scale-95 transition-transform"
              aria-label="Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Section Header: "The Main Food" / "12 Menu" */}
          <div>
            <h1 className="text-xl font-extrabold text-stone-900 tracking-tight font-display">
              The Main Food
            </h1>
            <div className="text-xs text-stone-400 font-medium mt-0.5">
              12 Products Available
            </div>
          </div>

          {/* Horizontal Mini Thumbnails Row (Matching Image 2) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {quickThumbnails.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFilter(item.filter)}
                className={`w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 transition-transform active:scale-95 shadow-2xs ${
                  selectedFilter === item.filter
                    ? 'border-orange-500 ring-2 ring-orange-200'
                    : 'border-white'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (!el.dataset.fallback) {
                      el.dataset.fallback = '1';
                      el.src = '/images/hero_dairy_farm_fresh_1791460606584.jpg';
                    }
                  }}
                />
              </button>
            ))}
          </div>

          {/* Featured Hero Banner Card with Pagination Dots (Matching Image 2) */}
          <div className="space-y-2">
            <div
              onClick={() => navigate('/bulk-order')}
              className="w-full h-44 rounded-3xl overflow-hidden shadow-sm relative cursor-pointer border border-stone-200/70 bg-stone-100"
            >
              <img
                src={PANEER_CURD_IMAGE}
                alt="Fresh Artisanal Paneer & Curd"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (!el.dataset.fallback) {
                    el.dataset.fallback = '1';
                    el.src = '/images/hero_dairy_farm_fresh_1791460606584.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3.5">
                <div>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                    Fresh Harvest Daily
                  </span>
                  <div className="text-sm font-extrabold text-white">
                    Pure Artisanal Malai Paneer &amp; Curd
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Dots (Active orange dot + inactive dots) */}
            <div className="flex items-center gap-1.5 pl-1">
              <span className="w-3 h-2 rounded-full bg-orange-600 transition-all"></span>
              <span className="w-2 h-2 rounded-full bg-stone-300"></span>
              <span className="w-2 h-2 rounded-full bg-stone-300"></span>
              <span className="w-2 h-2 rounded-full bg-stone-300"></span>
            </div>
          </div>

          {/* "Popular this week" Section with Dropdown Filter */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-extrabold text-stone-900 tracking-tight font-display">
                Popular this week
              </h2>

              {/* Dropdown filter */}
              <div className="relative">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="appearance-none bg-white border border-stone-300/80 rounded-xl px-3 py-1 pr-7 text-xs font-semibold text-stone-800 shadow-2xs focus:outline-hidden"
                >
                  <option value="All Dairy">All Dairy</option>
                  <option value="Milk">Fresh Milk</option>
                  <option value="Paneer">Paneer</option>
                  <option value="Ghee">Desi Ghee</option>
                  <option value="Sweets">Sweets</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>

            {/* Product Cards Grid (Matching Image 2 style) */}
            <div className="grid grid-cols-2 gap-3">
              {popularThisWeek.map((product) => {
                const isAdded = addedProductId === product.id;
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl p-2.5 shadow-xs border border-stone-200/70 flex flex-col justify-between transition-all hover:border-amber-300"
                  >
                    <div>
                      <div className="w-full h-32 rounded-xl overflow-hidden bg-stone-100 border border-stone-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const el = e.currentTarget;
                            if (!el.dataset.fallback) {
                              el.dataset.fallback = '1';
                              el.src = '/images/hero_dairy_farm_fresh_1791460606584.jpg';
                            }
                          }}
                        />
                      </div>

                      <div className="mt-2">
                        <h3 className="font-bold text-xs text-stone-900 truncate">
                          {product.name}
                        </h3>
                        <div className="text-xs font-bold text-stone-700 mt-0.5 tabular-nums">
                          ₹{product.unitPrice}.00
                          <span className="text-[10px] text-stone-400 font-normal"> / {product.unit}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                      <button
                        onClick={(e) => handleAdd(product, e)}
                        className={`p-1.5 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                        }`}
                        title="Add to Cart"
                      >
                        {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => navigate('/bulk-order')}
                        className="px-2 py-1 bg-amber-700 hover:bg-amber-800 text-white text-[10px] font-bold rounded-lg shadow-2xs"
                      >
                        Bulk
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
