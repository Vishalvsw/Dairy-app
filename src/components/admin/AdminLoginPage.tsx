import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, switchRole, navigate } = useApp();
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(email, password);
    if (!success) {
      setError('Invalid admin credentials. Use admin@demo.com and password: admin123');
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@demo.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-stone-900 py-16 px-4 flex items-center justify-center text-stone-100">
      <div className="max-w-md w-full bg-stone-950 rounded-2xl border border-stone-800 shadow-2xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            Operations &amp; Dispatch Console
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-display">
            DairyFlow Admin Login
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Sign in to oversee function pre-orders, advance receipts, and morning fleet dispatch.
          </p>
        </div>

        {/* Demo Credentials Pill */}
        <div className="mb-6 p-3 bg-stone-900 rounded-xl border border-stone-800 text-xs text-stone-300 flex items-center justify-between">
          <div>
            <div className="font-semibold text-white">Demo Staff Access:</div>
            <div className="text-[11px] text-stone-400 font-mono">
              admin@demo.com · admin123
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-[11px] rounded transition-colors"
          >
            Auto-Fill
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Admin Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-900 border border-stone-700 text-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                placeholder="admin@demo.com"
              />
              <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-900 border border-stone-700 text-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                placeholder="••••••••"
              />
              <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Log In to Admin Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span>Looking for customer storefront?</span>
          <button
            onClick={() => switchRole('customer')}
            className="text-amber-400 font-semibold hover:underline"
          >
            Go to Customer App &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
