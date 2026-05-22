"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, Grid3X3, List, ChevronDown, ChevronLeft, ChevronRight, Package, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { products } from "@/lib/mock-data"
import type { Product } from "@/lib/mock-data"
import { SkeletonCard } from "@/components/skeletons"

const categories = Array.from(new Set(products.map(p => p.category)))
const statuses = Array.from(new Set(products.map(p => p.status)))
const vendorNames = Array.from(new Set(products.map(p => p.vendor)))

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  draft: "bg-gray-100 text-gray-700 border-gray-200",
  discontinued: "bg-red-100 text-red-700 border-red-200",
  out_of_stock: "bg-amber-100 text-amber-700 border-amber-200",
}

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group overflow-hidden border-border/50 hover:shadow-md transition-all cursor-pointer">
        <div className="aspect-[4/3] bg-gradient-to-br from-indigo-50 to-violet-50 relative flex items-center justify-center">
          <Package className="h-12 w-12 text-indigo-200 group-hover:text-indigo-300 transition-colors" />
          <Badge variant="outline" className={`absolute top-2 right-2 ${statusStyles[product.status]}`}>
            {product.status.replace('_', ' ')}
          </Badge>
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
          <h3 className="font-semibold text-sm mt-1 leading-tight line-clamp-2">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.category}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground">
              <span className={product.available <= 5 ? "text-red-600 font-semibold" : ""}>{product.available}</span> in stock
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground">Cost: ${product.cost.toFixed(2)}</span>
            <span className="text-xs font-medium text-emerald-600">
              +{((product.price - product.cost) / product.cost * 100).toFixed(0)}%
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function CatalogsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")
  const [vendor, setVendor] = useState("all")
  const [sort, setSort] = useState("name")
  const [page, setPage] = useState(1)
  const perPage = 12

  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.vendor.toLowerCase().includes(q))
    }
    if (category !== "all") result = result.filter(p => p.category === category)
    if (status !== "all") result = result.filter(p => p.status === status)
    if (vendor !== "all") result = result.filter(p => p.vendor === vendor)

    result.sort((a, b) => {
      switch (sort) {
        case "name": return a.name.localeCompare(b.name)
        case "price_asc": return a.price - b.price
        case "price_desc": return b.price - a.price
        case "stock": return b.stock - a.stock
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default: return 0
      }
    })

    return result
  }, [search, category, status, vendor, sort])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  const [loading, setLoading] = useState(false)

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Catalog</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} products</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Add Product</Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-56 shrink-0 space-y-4">
          <Card className="border-border/50">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </div>
              <Separator />
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Category</label>
                <Select value={category} onValueChange={v => { setCategory(v); setPage(1) }}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <Select value={status} onValueChange={v => { setStatus(v); setPage(1) }}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {statuses.map(s => <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Vendor</label>
                <Select value={vendor} onValueChange={v => { setVendor(v); setPage(1) }}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vendors</SelectItem>
                    {vendorNames.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} className="pl-8 h-9" />
            </div>
            <div className="flex items-center gap-2">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-9 w-36 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-9 w-9"><Grid3X3 className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="h-9 w-9"><List className="h-4 w-4" /></Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20">
              <Package className="h-12 w-12 mx-auto text-muted-foreground/40" />
              <p className="mt-4 text-muted-foreground">No products match your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginated.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button key={i} variant={page === i + 1 ? "default" : "outline"} size="sm" className="w-8" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </Button>
                ))}
                <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
