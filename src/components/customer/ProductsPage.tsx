import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { Search, Plus, Check, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, addToCart, navigate } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = ['All', 'Milk', 'Curd & Butter', 'Paneer', 'Ghee', 'Sweets', 'Packages'];

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-6 sm:py-8 px-3 sm:px-6 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              Dairy Catalogue
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
              Pure Artisanal Milk &amp; Dairy Products
            </h1>
          </div>

          <button
            onClick={() => navigate('/bulk-order')}
            className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 self-start sm:self-auto whitespace-nowrap"
          >
            <span>Switch to Bulk Pre-Order Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Segmented Filter (Anti-slop buttons with active state) */}
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 p-1 rounded-lg border border-stone-200/80 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search milk, paneer, ghee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const isJustAdded = addedId === product.id;
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 relative bg-stone-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-stone-900 text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-3 py-2 border-y border-stone-100 text-[11px] text-stone-500 space-y-0.5">
                      {product.fatContent && (
                        <div className="flex justify-between">
                          <span>Composition:</span>
                          <span className="font-medium text-stone-700">{product.fatContent}</span>
                        </div>
                      )}
                      {product.shelfLife && (
                        <div className="flex justify-between">
                          <span>Shelf Life:</span>
                          <span className="font-medium text-stone-700">{product.shelfLife}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-amber-900">
                        <span>Wholesale Bulk Tier:</span>
                        <span className="font-semibold tabular-nums">
                          ₹{product.bulkPrice}/{product.unit} (Min {product.bulkMinQty}{product.unit})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xs text-stone-400">Retail Rate</span>
                      <div className="text-lg font-bold text-stone-900 tabular-nums">
                        ₹{product.unitPrice}
                        <span className="text-xs font-normal text-stone-500"> / {product.unit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/bulk-order')}
                      className="py-2 px-3 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Bulk Plan</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
