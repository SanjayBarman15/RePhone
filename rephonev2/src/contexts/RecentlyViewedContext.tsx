"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface RecentlyViewedItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  condition: string;
  storage: string;
  color: string;
  category?: string;
  viewedAt: Date;
}

interface RecentlyViewedContextType {
  recentlyViewedItems: RecentlyViewedItem[];
  addToRecentlyViewed: (item: Omit<RecentlyViewedItem, "viewedAt">) => void;
  clearRecentlyViewed: () => void;
  getTotalItems: () => number;
}

const RecentlyViewedContext = createContext<
  RecentlyViewedContextType | undefined
>(undefined);

const MAX_RECENTLY_VIEWED = 20;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewedItems, setRecentlyViewedItems] = useState<
    RecentlyViewedItem[]
  >([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("rephone-recently-viewed");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const itemsWithDates = parsed.map((item: any) => ({
          ...item,
          viewedAt: new Date(item.viewedAt),
        }));
        setRecentlyViewedItems(itemsWithDates);
      } catch (error) {
        console.error(
          "Error loading recently viewed from localStorage:",
          error
        );
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever it changes, but only after initial load
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(
        "rephone-recently-viewed",
        JSON.stringify(recentlyViewedItems)
      );
    }
  }, [recentlyViewedItems, isInitialized]);

  const addToRecentlyViewed = (item: Omit<RecentlyViewedItem, "viewedAt">) => {
    setRecentlyViewedItems((prev) => {
      // Remove existing item if it exists
      const filtered = prev.filter((viewedItem) => viewedItem.id !== item.id);

      // Add new item at the beginning
      const updated = [{ ...item, viewedAt: new Date() }, ...filtered];

      // Keep only the most recent items
      return updated.slice(0, MAX_RECENTLY_VIEWED);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewedItems([]);
  };

  const getTotalItems = () => {
    return recentlyViewedItems.length;
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewedItems,
        addToRecentlyViewed,
        clearRecentlyViewed,
        getTotalItems,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error(
      "useRecentlyViewed must be used within a RecentlyViewedProvider"
    );
  }
  return context;
}
