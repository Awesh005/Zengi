import React, { createContext, useContext, useState } from 'react';

export type Currency = 'USD' | 'INR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  exchangeRate: number; // e.g. 86.50 INR per USD
  setExchangeRate: (rate: number) => void;
  formatCurrency: (amountInUSD: number, options?: { compact?: boolean; precision?: number }) => string;
  formatPrice: (priceInUSD: number, options?: { precision?: number }) => string;
  convertAmount: (amountInUSD: number) => number;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(86.50); // Default: 1 USD = 86.50 INR

  const symbol = currency === 'INR' ? '₹' : '$';

  const convertAmount = (amountInUSD: number) => {
    return currency === 'INR' ? amountInUSD * exchangeRate : amountInUSD;
  };

  const formatCurrency = (amountInUSD: number, options?: { compact?: boolean; precision?: number }) => {
    const rate = currency === 'INR' ? exchangeRate : 1;
    const value = amountInUSD * rate;

    if (options?.compact) {
      if (currency === 'INR') {
        if (value >= 10000000) { // 1 Crore = 10,000,000
          return `${symbol}${(value / 10000000).toFixed(options.precision ?? 2)} Cr`;
        }
        if (value >= 100000) { // 1 Lakh = 100,000
          return `${symbol}${(value / 100000).toFixed(options.precision ?? 1)} L`;
        }
        if (value >= 1000) {
          return `${symbol}${(value / 1000).toFixed(options.precision ?? 1)}k`;
        }
        return `${symbol}${value.toFixed(options.precision ?? 0)}`;
      } else {
        if (value >= 1000000000) {
          return `${symbol}${(value / 1000000000).toFixed(options.precision ?? 1)}B`;
        }
        if (value >= 1000000) {
          return `${symbol}${(value / 1000000).toFixed(options.precision ?? 1)}M`;
        }
        if (value >= 1000) {
          return `${symbol}${(value / 1000).toFixed(options.precision ?? 0)}k`;
        }
        return `${symbol}${value.toFixed(options.precision ?? 0)}`;
      }
    }

    const locale = currency === 'INR' ? 'en-IN' : 'en-US';
    const precision = options?.precision ?? (currency === 'INR' ? 0 : 2);
    
    return `${symbol}${value.toLocaleString(locale, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    })}`;
  };

  const formatPrice = (priceInUSD: number, options?: { precision?: number }) => {
    const rate = currency === 'INR' ? exchangeRate : 1;
    const value = priceInUSD * rate;
    const locale = currency === 'INR' ? 'en-IN' : 'en-US';
    const precision = options?.precision ?? 2;

    return `${symbol}${value.toLocaleString(locale, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      exchangeRate,
      setExchangeRate,
      formatCurrency,
      formatPrice,
      convertAmount,
      symbol
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
};
