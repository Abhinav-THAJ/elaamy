"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const router = useRouter();

  // Load initial wishlist
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.email) {
        fetch(`/api/wishlist?email=${encodeURIComponent(user.email)}`)
          .then(res => res.json())
          .then(data => {
            if (data.wishlist && Array.isArray(data.wishlist)) {
              setWishlist(data.wishlist);
            }
          })
          .catch(console.error);
      }
    }
  }, []);

  const syncWishlist = async (newWishlist: WishlistItem[]) => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.email) {
        try {
          await fetch("/api/wishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, wishlist: newWishlist })
          });
        } catch (e) {
          console.error("Failed to sync wishlist", e);
        }
      }
    }
  };

  const addToWishlist = (item: WishlistItem) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/auth/login?redirect=wishlist");
      return;
    }
    
    setWishlist(prev => {
      if (prev.find(p => p.id === item.id)) return prev;
      const newList = [...prev, item];
      syncWishlist(newList);
      return newList;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => {
      const newList = prev.filter(item => item.id !== id);
      syncWishlist(newList);
      return newList;
    });
  };

  const isInWishlist = (id: string) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
