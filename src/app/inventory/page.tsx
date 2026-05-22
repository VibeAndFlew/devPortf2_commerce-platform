"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Download, Filter, ArrowUpRight, ArrowDownRight, AlertTriangle, Clock, Package, Layers, AlertCircle, Gauge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { products, inventoryMovements, warehouses } from "@/lib/mock-data"

const typeStyles: Record<string, string> = {
  inbound: "bg-emerald-100 text-emerald-700 border-emerald-200",
  outbound: "bg-red-100 text-red-700 border-red-200",
  adjustment: "bg-amber-100 text-amber-700 border-amber-200",
  transfer: "bg-blue-100 text-blue-700 border-blue-200",
}

export default function InventoryPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [warehouseFilter, setWarehouseFilter] = useState("all")

  const lowStockItems = products.filter(p => p.status === 'active' && p.available <= 10)
  const overstockItems = products.filter(p => p.status === 'active' && p.stock > 200)
  const totalSKUs = products.length
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0)

  const filteredMovements = useMemo(() => {
    let result = [...inventoryMovements]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(m => m.productName.toLowerCase().includes(q) || m.reference.toLowerCase().includes(q) || m.operator.toLowerCase().includes(q))
    }
    if (typeFilter !== "all") result = result.filter(m => m.type === typeFilter)
    if (warehouseFilter !== "all") result = result.filter(m => m.warehouse === warehouseFilter)
    return result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [search, typeFilter, warehouseFilter])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time stock and movement tracking</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50"><Layers className="h-5 w-5 text-indigo-500" /></div>
            <div><p className="text-2xl font-bold">{totalSKUs}</p><p className="text-xs text-muted-foreground">Total SKUs</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50"><Package className="h-5 w-5 text-emerald-500" /></div>
            <div><p className="text-2xl font-bold">{totalStock.toLocaleString()}</p><p className="text-xs text-muted-foreground">Total Stock</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50"><AlertCircle className="h-5 w-5 text-amber-500" /></div>
            <div><p className="text-2xl font-bold text-amber-600">{lowStockItems.length}</p><p className="text-xs text-muted-foreground">Low Stock</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-50"><Gauge className="h-5 w-5 text-rose-500" /></div>
            <div><p className="text-2xl font-bold text-rose-600">{overstockItems.length}</p><p className="text-xs text-muted-foreground">Overstock Items</p></div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Stock Levels by Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {products.filter(p => p.status === 'active').slice(0, 10).map(p => {
              const maxStock = Math.max(...products.map(x => x.stock))
              const width = (p.stock / maxStock) * 100
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-xs w-36 truncate shrink-0">{p.name}</span>
                  <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        p.available <= 5 ? 'bg-red-500' : p.available <= 20 ? 'bg-amber-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium w-16 text-right">{p.stock}</span>
                  <span className="text-xs text-muted-foreground w-16 text-right">({p.available} avail)</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search movements..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-9" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="h-9 w-32 text-xs"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="inbound">Inbound</SelectItem>
            <SelectItem value="outbound">Outbound</SelectItem>
            <SelectItem value="adjustment">Adjustment</SelectItem>
            <SelectItem value="transfer">Transfer</SelectItem>
          </SelectContent>
        </Select>
        <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
          <SelectTrigger className="h-9 w-40 text-xs"><SelectValue placeholder="Warehouse" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Warehouses</SelectItem>
            {warehouses.map(w => <SelectItem key={w.id} value={w.code}>{w.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Product</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Stock Change</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead className="pr-5">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovements.map(m => (
                <TableRow key={m.id}>
                  <TableCell className="pl-5 font-medium text-sm">{m.productName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={typeStyles[m.type]}>{m.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold text-sm ${m.type === 'inbound' ? 'text-emerald-600' : m.type === 'outbound' ? 'text-red-600' : 'text-amber-600'}`}>
                      {m.quantity > 0 ? '+' : ''}{m.quantity}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{m.priorStock} → {m.newStock}</TableCell>
                  <TableCell className="text-xs">{m.warehouse}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[150px] truncate">{m.reason}</TableCell>
                  <TableCell className="text-xs">{m.operator}</TableCell>
                  <TableCell className="pr-5 text-xs text-muted-foreground">{new Date(m.timestamp).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
