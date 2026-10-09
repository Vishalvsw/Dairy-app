import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { Edit2, Check, X, ShoppingBag, Plus, Save, Sparkles } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { products, updateProduct } = useApp();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUnitPrice, setEditUnitPrice] = useState<number>(0);
  const [editBulkPrice, setEditBulkPrice] = useState<number>(0);
  const [editInStock, setEditInStock] = useState<boolean>(true);

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditUnitPrice(product.unitPrice);
    setEditBulkPrice(product.bulkPrice);
    setEditInStock(product.inStock);
  };

  const saveEdit = (product: Product) => {
    updateProduct({
      ...product,
      unitPrice: editUnitPrice,
      bulkPrice: editBulkPrice,
      inStock: editInStock
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
            Product Catalogue &amp; Bulk Pricing Rates
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Configure retail per-unit pricing, wholesale tier discounts, and daily stock availability.
          </p>
        </div>
      </div>

      {/* Catalogue Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-700">
            {products.length} Products Configured
          </span>
          <span className="text-[11px] text-amber-800 font-medium">
            Rates auto-sync with Customer Bulk Order Calculator
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Unit</th>
                <th className="py-3 px-4 text-right">Retail Price</th>
                <th className="py-3 px-4 text-right">Wholesale Bulk Price</th>
                <th className="py-3 px-4">Bulk Min Qty</th>
                <th className="py-3 px-4 text-center">In Stock</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {products.map((product) => {
                const isEditing = editingId === product.id;
                return (
                  <tr key={product.id} className="hover:bg-amber-50/20 transition-colors">
                    {/* Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-8 h-8 rounded-md object-cover border border-stone-200 shrink-0"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const el = e.currentTarget;
                            if (!el.dataset.fallback) {
                              el.dataset.fallback = '1';
                              el.src = '/images/hero_dairy_farm_fresh_1791460606584.jpg';
                            }
                          }}
                        />
                        <div>
                          <div className="font-semibold text-stone-900">{product.name}</div>
                          {product.fatContent && (
                            <div className="text-[10px] text-stone-400">{product.fatContent}</div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="text-stone-600 font-medium">{product.category}</span>
                    </td>

                    {/* Unit */}
                    <td className="py-3 px-4 font-mono text-stone-600">{product.unit}</td>

                    {/* Retail Price */}
                    <td className="py-3 px-4 text-right tabular-nums">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editUnitPrice}
                          onChange={(e) => setEditUnitPrice(parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 text-xs border border-amber-400 rounded text-right font-bold"
                        />
                      ) : (
                        <span className="font-bold text-stone-900">
                          ₹{product.unitPrice}
                        </span>
                      )}
                    </td>

                    {/* Wholesale Bulk Price */}
                    <td className="py-3 px-4 text-right tabular-nums">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editBulkPrice}
                          onChange={(e) => setEditBulkPrice(parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 text-xs border border-amber-400 rounded text-right font-bold text-amber-900"
                        />
                      ) : (
                        <span className="font-semibold text-amber-800">
                          ₹{product.bulkPrice}
                        </span>
                      )}
                    </td>

                    {/* Min Qty */}
                    <td className="py-3 px-4 text-stone-600">
                      {product.bulkMinQty} {product.unit}
                    </td>

                    {/* Stock Status */}
                    <td className="py-3 px-4 text-center">
                      {isEditing ? (
                        <input
                          type="checkbox"
                          checked={editInStock}
                          onChange={(e) => setEditInStock(e.target.checked)}
                          className="rounded text-amber-600"
                        />
                      ) : (
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            product.inStock
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-red-50 text-red-800 border border-red-200'
                          }`}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-center">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => saveEdit(product)}
                            className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                            title="Save rate"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1 bg-stone-200 text-stone-600 rounded hover:bg-stone-300 transition-colors"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(product)}
                          className="px-2.5 py-1 text-xs text-amber-800 hover:bg-amber-50 rounded font-semibold border border-amber-200/60 transition-colors"
                        >
                          Edit Rate
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
