import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, Check, RotateCcw, ShieldCheck } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, resetToDemoState } = useApp();

  const [businessName, setBusinessName] = useState(settings.businessName);
  const [advancePercentage, setAdvancePercentage] = useState(settings.advancePercentage);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [upiVpa, setUpiVpa] = useState(settings.upiVpa);
  const [deliveryChargeDefault, setDeliveryChargeDefault] = useState(settings.deliveryChargeDefault);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      businessName,
      advancePercentage,
      whatsappNumber,
      upiVpa,
      deliveryChargeDefault
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Title */}
      <div className="pb-2 border-b border-stone-200">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
          Business &amp; Policy Settings
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Configure default advance deposit ratio, UPI collection handle, and customer notification channels.
        </p>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>Settings successfully updated across customer and admin portals.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-5 text-xs">
        <div>
          <label className="block font-semibold text-stone-700 mb-1">Dairy Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Minimum Advance Percentage Required (%)
            </label>
            <input
              type="number"
              min={10}
              max={100}
              value={advancePercentage}
              onChange={(e) => setAdvancePercentage(parseInt(e.target.value) || 30)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
            <span className="text-[11px] text-stone-400 mt-0.5 block">
              Default is 30% to secure raw milk batch and route allocation.
            </span>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Cold Chain Base Delivery Charge (₹)
            </label>
            <input
              type="number"
              min={0}
              value={deliveryChargeDefault}
              onChange={(e) => setDeliveryChargeDefault(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Business WhatsApp Hotline Number
            </label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Corporate UPI VPA Handle
            </label>
            <input
              type="text"
              value={upiVpa}
              onChange={(e) => setUpiVpa(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <button
            type="submit"
            className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>

          <button
            type="button"
            onClick={resetToDemoState}
            className="px-3.5 py-2 border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-lg font-medium flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo to Initial State</span>
          </button>
        </div>
      </form>
    </div>
  );
};
