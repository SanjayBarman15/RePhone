"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface WishlistItem {
  id: string
  name: string
  brand: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  condition: string
  storage: string
  color: string
  category?: string
  addedAt: Date
  collectionIds: string[]
}

export interface WishlistCollection {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  createdAt: Date
  itemCount: number
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  collections: WishlistCollection[]
  addToWishlist: (item: Omit<WishlistItem, "addedAt" | "collectionIds">, collectionIds?: string[]) => void
  removeFromWishlist: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
  getTotalItems: () => number
  createCollection: (collection: Omit<WishlistCollection, "id" | "createdAt" | "itemCount">) => string
  updateCollection: (id: string, updates: Partial<WishlistCollection>) => void
  deleteCollection: (id: string) => void
  addItemToCollection: (itemId: string, collectionId: string) => void
  removeItemFromCollection: (itemId: string, collectionId: string) => void
  getItemsByCollection: (collectionId: string) => WishlistItem[]
  getCollectionById: (id: string) => WishlistCollection | undefined
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const defaultCollections: WishlistCollection[] = [
  {
    id: "favorites",
    name: "Favorites",
    description: "My favorite phones",
    color: "red",
    icon: "❤️",
    createdAt: new Date(),
    itemCount: 0,
  },
  {
    id: "budget",
    name: "Budget Picks",
    description: "Great phones under budget",
    color: "green",
    icon: "💰",
    createdAt: new Date(),
    itemCount: 0,
  },
]

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [collections, setCollections] = useState<WishlistCollection[]>(defaultCollections)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("rephone-wishlist")
    const savedCollections = localStorage.getItem("rephone-wishlist-collections")

    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist)
        const itemsWithDates = parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
          collectionIds: item.collectionIds || [],
        }))
        setWishlistItems(itemsWithDates)
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error)
      }
    }

    if (savedCollections) {
      try {
        const parsed = JSON.parse(savedCollections)
        const collectionsWithDates = parsed.map((collection: any) => ({
          ...collection,
          createdAt: new Date(collection.createdAt),
        }))
        setCollections(collectionsWithDates)
      } catch (error) {
        console.error("Error loading collections from localStorage:", error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("rephone-wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  useEffect(() => {
    localStorage.setItem("rephone-wishlist-collections", JSON.stringify(collections))
  }, [collections])

  // Update collection item counts
  useEffect(() => {
    setCollections((prev) =>
      prev.map((collection) => ({
        ...collection,
        itemCount: wishlistItems.filter((item) => item.collectionIds.includes(collection.id)).length,
      })),
    )
  }, [wishlistItems])

  const addToWishlist = (item: Omit<WishlistItem, "addedAt" | "collectionIds">, collectionIds: string[] = []) => {
    setWishlistItems((prev) => {
      if (prev.find((wishlistItem) => wishlistItem.id === item.id)) {
        return prev
      }
      return [...prev, { ...item, addedAt: new Date(), collectionIds }]
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item.id === id)
  }

  const getTotalItems = () => {
    return wishlistItems.length
  }

  const createCollection = (collection: Omit<WishlistCollection, "id" | "createdAt" | "itemCount">) => {
    const id = `collection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newCollection: WishlistCollection = {
      ...collection,
      id,
      createdAt: new Date(),
      itemCount: 0,
    }
    setCollections((prev) => [...prev, newCollection])
    return id
  }

  const updateCollection = (id: string, updates: Partial<WishlistCollection>) => {
    setCollections((prev) =>
      prev.map((collection) => (collection.id === id ? { ...collection, ...updates } : collection)),
    )
  }

  const deleteCollection = (id: string) => {
    // Remove collection from all items
    setWishlistItems((prev) =>
      prev.map((item) => ({
        ...item,
        collectionIds: item.collectionIds.filter((cId) => cId !== id),
      })),
    )
    // Remove collection
    setCollections((prev) => prev.filter((collection) => collection.id !== id))
  }

  const addItemToCollection = (itemId: string, collectionId: string) => {
    setWishlistItems((prev) =>
      prev.map((item) =>
        item.id === itemId && !item.collectionIds.includes(collectionId)
          ? { ...item, collectionIds: [...item.collectionIds, collectionId] }
          : item,
      ),
    )
  }

  const removeItemFromCollection = (itemId: string, collectionId: string) => {
    setWishlistItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, collectionIds: item.collectionIds.filter((id) => id !== collectionId) } : item,
      ),
    )
  }

  const getItemsByCollection = (collectionId: string) => {
    return wishlistItems.filter((item) => item.collectionIds.includes(collectionId))
  }

  const getCollectionById = (id: string) => {
    return collections.find((collection) => collection.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        collections,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        getTotalItems,
        createCollection,
        updateCollection,
        deleteCollection,
        addItemToCollection,
        removeItemFromCollection,
        getItemsByCollection,
        getCollectionById,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
