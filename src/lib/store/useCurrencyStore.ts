// lib/store/useCurrencyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrencyState = {
  currency: string;
  setCurrency: (value: string) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: 'usd',
      setCurrency: (value) => set({ currency: value }),
    }),
    {
      name: 'currency-preference', // localStorage key
    }
  )
);