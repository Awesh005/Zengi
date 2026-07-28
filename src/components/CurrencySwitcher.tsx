import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { ChevronDown } from 'lucide-react';

export const CurrencySwitcher: React.FC = () => {
  const { currency, setCurrency, exchangeRate, setExchangeRate } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [tempRate, setTempRate] = useState(exchangeRate.toString());

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(tempRate);
    if (!isNaN(parsed) && parsed > 0) {
      setExchangeRate(parsed);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 shadow-inner">
        <button
          onClick={() => setCurrency('USD')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
            currency === 'USD'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
          title="United States Dollar ($)"
        >
          <span>🇺🇸</span>
          <span>USD ($)</span>
        </button>
        <button
          onClick={() => setCurrency('INR')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
            currency === 'INR'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
          title="Indian Rupee (₹ / Rs)"
        >
          <span>🇮🇳</span>
          <span>INR (₹)</span>
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 text-gray-400 hover:text-amber-300 transition"
          title="Exchange Rate Settings"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#12111c] border border-white/15 rounded-2xl shadow-2xl p-4 text-xs z-50">
          <div className="font-bold text-white mb-2 flex items-center justify-between">
            <span>Currency Rate Settings</span>
            <span className="text-[10px] text-amber-300 font-mono">1 USD = ₹{exchangeRate}</span>
          </div>
          <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
            Specify live conversion rate (1 Dollar to Indian Rupees):
          </p>
          <form onSubmit={handleRateSubmit} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-mono text-xs">1 USD = ₹</span>
              <input
                type="number"
                step="0.01"
                value={tempRate}
                onChange={(e) => setTempRate(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold py-1 rounded-lg text-[11px] transition"
              >
                Save Rate
              </button>
              <button
                type="button"
                onClick={() => {
                  setExchangeRate(86.50);
                  setTempRate('86.50');
                  setIsOpen(false);
                }}
                className="px-2 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg text-[11px] transition"
              >
                Reset (86.50)
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
