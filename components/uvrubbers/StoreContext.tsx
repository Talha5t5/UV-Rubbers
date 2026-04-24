"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  productSlug: string;
  productName: string;
  variantId: string;
  variantName: string;
  sku: string;
  price: number;
  image: string;
  quantity: number;
};

type AddCartItem = Omit<CartItem, "id" | "quantity"> & { quantity?: number };

type StoreContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: AddCartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "uvrubbers-cart";
const StoreContext = createContext<StoreContextValue | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as CartItem[];
      setItems(parsed);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<StoreContextValue>(() => {
    const addItem = (item: AddCartItem) => {
      setItems((current) => {
        const existing = current.find((entry) => entry.variantId === item.variantId);
        if (existing) {
          return current.map((entry) =>
            entry.variantId === item.variantId
              ? { ...entry, quantity: entry.quantity + (item.quantity ?? 1) }
              : entry,
          );
        }

        return [
          ...current,
          {
            ...item,
            id: item.variantId,
            quantity: item.quantity ?? 1,
          },
        ];
      });
    };

    const updateQuantity = (id: string, quantity: number) => {
      setItems((current) =>
        current
          .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
          .filter((item) => item.quantity > 0),
      );
    };

    const removeItem = (id: string) => {
      setItems((current) => current.filter((item) => item.id !== id));
    };

    const clearCart = () => setItems([]);

    return {
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [items]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }

  return context;
};
