"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useWishlist } from "@/contexts/WishlistContext"

const collectionIcons = [
  { icon: "❤️", label: "Heart" },
  { icon: "⭐", label: "Star" },
  { icon: "💰", label: "Money" },
  { icon: "🎯", label: "Target" },
  { icon: "⚡", label: "Lightning" },
  { icon: "🎁", label: "Gift" },
  { icon: "📱", label: "Phone" },
  { icon: "🔥", label: "Fire" },
  { icon: "💎", label: "Diamond" },
  { icon: "🚀", label: "Rocket" },
]

const collectionColors = [
  { color: "red", class: "bg-red-100 text-red-800 border-red-200" },
  { color: "blue", class: "bg-blue-100 text-blue-800 border-blue-200" },
  { color: "green", class: "bg-green-100 text-green-800 border-green-200" },
  { color: "purple", class: "bg-purple-100 text-purple-800 border-purple-200" },
  { color: "yellow", class: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { color: "pink", class: "bg-pink-100 text-pink-800 border-pink-200" },
  { color: "indigo", class: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  { color: "gray", class: "bg-gray-100 text-gray-800 border-gray-200" },
]

interface CollectionManagerProps {
  selectedCollections?: string[]
  onCollectionChange?: (collectionIds: string[]) => void
  mode?: "select" | "manage"
}

export default function CollectionManager({
  selectedCollections = [],
  onCollectionChange,
  mode = "manage",
}: CollectionManagerProps) {
  const { collections, createCollection, updateCollection, deleteCollection } = useWishlist()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "blue",
    icon: "❤️",
  })

  const handleCreateCollection = () => {
    if (formData.name.trim()) {
      createCollection(formData)
      setFormData({ name: "", description: "", color: "blue", icon: "❤️" })
      setIsCreateDialogOpen(false)
    }
  }

  const handleUpdateCollection = (id: string) => {
    if (formData.name.trim()) {
      updateCollection(id, formData)
      setEditingCollection(null)
      setFormData({ name: "", description: "", color: "blue", icon: "❤️" })
    }
  }

  const handleEditClick = (collection: any) => {
    setFormData({
      name: collection.name,
      description: collection.description || "",
      color: collection.color,
      icon: collection.icon,
    })
    setEditingCollection(collection.id)
  }

  const handleCollectionToggle = (collectionId: string) => {
    if (!onCollectionChange) return

    const isSelected = selectedCollections.includes(collectionId)
    if (isSelected) {
      onCollectionChange(selectedCollections.filter((id) => id !== collectionId))
    } else {
      onCollectionChange([...selectedCollections, collectionId])
    }
  }

  const getColorClass = (color: string) => {
    return collectionColors.find((c) => c.color === color)?.class || "bg-gray-100 text-gray-800 border-gray-200"
  }

  if (mode === "select") {
    return (
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-900">Add to Collections</Label>
        <div className="grid grid-cols-2 gap-3">
          {collections.map((collection) => (
            <motion.button
              key={collection.id}
              onClick={() => handleCollectionToggle(collection.id)}
              className={`p-3 rounded-xl border-2 transition-all text-left ${
                selectedCollections.includes(collection.id)
                  ? getColorClass(collection.color)
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{collection.icon}</span>
                <span className="font-medium text-sm">{collection.name}</span>
                {selectedCollections.includes(collection.id) && <Check className="h-4 w-4 ml-auto" />}
              </div>
              <div className="text-xs opacity-75">{collection.itemCount} items</div>
            </motion.button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">My Collections</h3>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Collection</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Collection Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Dream Phones"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your collection..."
                  rows={2}
                />
              </div>
              <div>
                <Label>Choose Icon</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {collectionIcons.map((iconOption) => (
                    <button
                      key={iconOption.icon}
                      onClick={() => setFormData((prev) => ({ ...prev, icon: iconOption.icon }))}
                      className={`p-2 rounded-lg border-2 transition-all ${
                        formData.icon === iconOption.icon
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-lg">{iconOption.icon}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Choose Color</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {collectionColors.map((colorOption) => (
                    <button
                      key={colorOption.color}
                      onClick={() => setFormData((prev) => ({ ...prev, color: colorOption.color }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.color === colorOption.color
                          ? "border-gray-800"
                          : "border-gray-200 hover:border-gray-300"
                      } ${colorOption.class}`}
                    >
                      <div className="text-xs font-medium capitalize">{colorOption.color}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateCollection} className="flex-1">
                  Create Collection
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <motion.div
            key={collection.id}
            className={`p-4 rounded-xl border-2 ${getColorClass(collection.color)}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {editingCollection === collection.id ? (
              <div className="space-y-3">
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="text-sm"
                />
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="text-sm"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleUpdateCollection(collection.id)}>
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingCollection(null)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{collection.icon}</span>
                    <div>
                      <h4 className="font-semibold text-sm">{collection.name}</h4>
                      {collection.description && <p className="text-xs opacity-75 mt-1">{collection.description}</p>}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditClick(collection)}
                      className="h-6 w-6 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    {!["favorites", "budget"].includes(collection.id) && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteCollection(collection.id)}
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {collection.itemCount} items
                  </Badge>
                  <span className="text-xs opacity-75">{new Date(collection.createdAt).toLocaleDateString()}</span>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
