"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Trash2, Share2, Folder } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useWishlist } from "@/contexts/WishlistContext"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CollectionManager from "@/components/CollectionManager"

export default function WishlistPage() {
  const {
    wishlistItems,
    collections,
    removeFromWishlist,
    clearWishlist,
    getItemsByCollection,
    addItemToCollection,
  } = useWishlist()
  const { addToCart } = useCart()
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")
  const [selectedCollection, setSelectedCollection] = useState("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showCollectionDialog, setShowCollectionDialog] = useState(false)

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
  }

  const handleMoveAllToCart = () => {
    const itemsToAdd = selectedCollection === "all" ? wishlistItems : getItemsByCollection(selectedCollection)

    itemsToAdd.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      })
    })
    clearWishlist()
  }

  const handleAddToCollection = (collectionIds: string[]) => {
    selectedItems.forEach((itemId) => {
      collectionIds.forEach((collectionId) => {
        addItemToCollection(itemId, collectionId)
      })
    })
    setSelectedItems([])
    setShowCollectionDialog(false)
  }

  // Get items based on selected collection
  const getFilteredItems = () => {
    let items = selectedCollection === "all" ? wishlistItems : getItemsByCollection(selectedCollection)

    // Apply brand filter
    if (filterBy !== "all") {
      items = items.filter((item) => item.brand.toLowerCase() === filterBy.toLowerCase())
    }

    // Apply sorting
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
        case "oldest":
          return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })
  }

  const filteredItems = getFilteredItems()
  const brands = Array.from(new Set(wishlistItems.map((item) => item.brand)))

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: "bg-red-100 text-red-800 border-red-200",
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      pink: "bg-pink-100 text-pink-800 border-pink-200",
      indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
      gray: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colorMap[color] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-6">
        <div className="container-custom">
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
              <Heart className="h-12 w-12 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
            <p className="text-gray-600 mb-8">
              Save items you love to your wishlist and organize them into collections
            </p>
            <Link href="/categories">
              <Button className="btn-primary">Start Shopping</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
              <p className="text-gray-600">
                {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
                {selectedCollection !== "all" && ` in ${collections.find((c) => c.id === selectedCollection)?.name}`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {selectedItems.length > 0 && (
                <Dialog open={showCollectionDialog} onOpenChange={setShowCollectionDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Folder className="h-4 w-4 mr-2" />
                      Add to Collection ({selectedItems.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add to Collections</DialogTitle>
                    </DialogHeader>
                    <CollectionManager mode="select" onCollectionChange={handleAddToCollection} />
                  </DialogContent>
                </Dialog>
              )}

              {wishlistItems.length > 0 && (
                <>
                  <Button onClick={handleMoveAllToCart} variant="outline">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add All to Cart
                  </Button>
                  <Button onClick={clearWishlist} variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="items" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="items">Wishlist Items</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="space-y-6">
            {/* Collection Tabs */}
            <motion.div
              className="bg-white rounded-2xl p-4 card-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setSelectedCollection("all")}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                    selectedCollection === "all"
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Items ({wishlistItems.length})
                </button>
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => setSelectedCollection(collection.id)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all border-2 ${
                      selectedCollection === collection.id
                        ? getColorClass(collection.color)
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="mr-2">{collection.icon}</span>
                    {collection.name} ({collection.itemCount})
                  </button>
                ))}
              </div>

              {/* Filters and Sort */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="text-gray-600">Showing {filteredItems.length} items</div>

                <div className="flex items-center gap-4">
                  {/* Brand Filter */}
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand.toLowerCase()}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Sort Dropdown */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Wishlist Items */}
            <div className="grid gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 card-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Checkbox */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems((prev) => [...prev, item.id])
                          } else {
                            setSelectedItems((prev) => prev.filter((id) => id !== item.id))
                          }
                        }}
                        className="mt-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </div>

                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Link href={`/product/${item.id}`}>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-full md:w-48 h-48 object-contain rounded-xl hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{item.brand}</Badge>
                          <Badge
                            variant="outline"
                            className={
                              item.condition === "Excellent"
                                ? "border-green-200 text-green-800"
                                : item.condition === "Very Good"
                                  ? "border-blue-200 text-blue-800"
                                  : "border-yellow-200 text-yellow-800"
                            }
                          >
                            {item.condition}
                          </Badge>
                          {/* Collection badges */}
                          {item.collectionIds.map((collectionId) => {
                            const collection = collections.find((c) => c.id === collectionId)
                            if (!collection) return null
                            return (
                              <Badge key={collectionId} className={`text-xs ${getColorClass(collection.color)}`}>
                                {collection.icon} {collection.name}
                              </Badge>
                            )
                          })}
                        </div>
                        <Link href={`/product/${item.id}`}>
                          <h3 className="text-xl font-bold text-gray-900 hover:text-blue-900 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600">
                          {item.storage} • {item.color}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.rating) ? "bg-yellow-400" : "bg-gray-200"
                              } rounded-sm mr-1`}
                            />
                          ))}
                          <span className="text-sm font-medium text-gray-700 ml-1">{item.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                        <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                        <Badge className="bg-red-100 text-red-800">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>

                      <div className="text-sm text-gray-500">Added {new Date(item.addedAt).toLocaleDateString()}</div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3">
                        <Button onClick={() => handleAddToCart(item)} className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => removeFromWishlist(item.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                          Remove
                        </Button>

                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No filtered results */}
            {filteredItems.length === 0 && wishlistItems.length > 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No items match your filter</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filter criteria</p>
                <Button
                  onClick={() => {
                    setFilterBy("all")
                    setSelectedCollection("all")
                  }}
                  variant="outline"
                >
                  Show All Items
                </Button>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="collections">
            <CollectionManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
