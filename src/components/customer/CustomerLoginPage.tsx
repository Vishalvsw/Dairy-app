import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const CustomerLoginPage: React.FC = () => {
  const { loginCustomer, switchRole, navigate } = useApp();
  const [email, setEmail] = useState('rahul@example.com');
  const [otp, setOtp] = useState('123456');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginCustomer(email, otp);
    if (!success) {
      setError('Invalid demo credentials. Use rahul@example.com and OTP: 123456');
    }
  };

  const handleQuickFill = () => {
    setEmail('rahul@example.com');
    setOtp('123456');
    setError('');
  };

  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 shadow-md p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
            Customer Portal
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
            Welcome to DairyFlow
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Login with email and one-time password to manage bulk pre-orders.
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="mb-6 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <div>
            <div className="font-semibold">Demo Credentials:</div>
            <div className="text-[11px] text-amber-800 font-mono">
              rahul@example.com · OTP: 123456
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 font-semibold text-[11px] rounded transition-colors"
          >
            Auto-Fill
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                placeholder="rahul@example.com"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">One-Time Password (OTP)</label>
            <div className="relative">
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-lg font-mono focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                placeholder="123456"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Log In to Customer Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>Are you business staff?</span>
          <button
            onClick={() => switchRole('admin')}
            className="text-blue-700 font-semibold hover:underline"
          >
            Switch to Admin Portal &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
