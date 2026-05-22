"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Package, Users, DollarSign, ShoppingCart, TrendingUp, Warehouse, AlertTriangle, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { products, vendors, orders, inventoryMovements, warehouses } from "@/lib/mock-data"

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

const kpis = [
  {
    title: "Total Products",
    value: products.filter(p => p.status === 'active').length,
    change: "+12%",
    positive: true,
    icon: Package,
    color: "text-indigo-500",
    bg: "bg-indigo-50"
  },
  {
    title: "Active Vendors",
    value: vendors.filter(v => v.status === 'active').length,
    change: "+2",
    positive: true,
    icon: Users,
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    title: "Inventory Value",
    value: `$${(products.reduce((acc, p) => acc + p.cost * p.stock, 0) / 1000000).toFixed(1)}M`,
    change: "+8.3%",
    positive: true,
    icon: DollarSign,
    color: "text-violet-500",
    bg: "bg-violet-50"
  },
  {
    title: "Pending Orders",
    value: orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length,
    change: "+5",
    positive: false,
    icon: ShoppingCart,
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    title: "Monthly Revenue",
    value: `$${(orders.filter(o => o.paymentStatus === 'paid').reduce((acc, o) => acc + o.total, 0) / 1000).toFixed(0)}K`,
    change: "+18.5%",
    positive: true,
    icon: TrendingUp,
    color: "text-rose-500",
    bg: "bg-rose-50"
  },
  {
    title: "Warehouse Capacity",
    value: `${Math.round(warehouses.reduce((acc, w) => acc + w.utilization, 0) / warehouses.length)}%`,
    change: "+2.1%",
    positive: true,
    icon: Warehouse,
    color: "text-cyan-500",
    bg: "bg-cyan-50"
  },
]

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  processing: "bg-indigo-100 text-indigo-700 border-indigo-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  returned: "bg-gray-100 text-gray-700 border-gray-200",
}

function KPICard({ kpi, index }: { kpi: typeof kpis[0]; index: number }) {
  const Icon = kpi.icon
  return (
    <motion.div variants={item} className="col-span-1">
      <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className={`p-2 rounded-lg ${kpi.bg}`}>
              <Icon className={`h-5 w-5 ${kpi.color}`} />
            </div>
            <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${kpi.positive ? 'text-emerald-600' : 'text-red-600'}`}>
              {kpi.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {kpi.change}
            </span>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{kpi.title}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function LowStockAlerts() {
  const lowStock = products.filter(p => p.status === 'active' && p.available <= 10)
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <CardTitle className="text-base">Low Stock Alerts</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {lowStock.length === 0 ? (
          <p className="text-sm text-muted-foreground">All products are well-stocked</p>
        ) : (
          <div className="space-y-2">
            {lowStock.slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">{p.name.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-red-600">{p.available} left</p>
                  <p className="text-xs text-muted-foreground">{p.reserved} reserved</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function RecentOrders() {
  const recent = orders.slice(0, 5)
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5">Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-5">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.map(o => (
              <TableRow key={o.id}>
                <TableCell className="pl-5 font-medium text-xs">{o.orderNumber}</TableCell>
                <TableCell className="text-sm">{o.customer}</TableCell>
                <TableCell>{o.items}</TableCell>
                <TableCell>${o.total.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[o.status] || ""}>{o.status}</Badge>
                </TableCell>
                <TableCell className="pr-5 text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function TopVendorsChart() {
  const topVendors = useMemo(() => {
    const vendorMap = new Map<string, number>()
    orders.filter(o => o.paymentStatus === 'paid').forEach(o => {
      const v = vendors.find(v => v.name === o.customer)
      if (v) {
        vendorMap.set(v.name, (vendorMap.get(v.name) || 0) + o.total)
      } else {
        vendorMap.set(o.customer, (vendorMap.get(o.customer) || 0) + o.total)
      }
    })
    return Array.from(vendorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
  }, [])

  const maxRevenue = Math.max(...topVendors.map(([, v]) => v), 1)

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Top Vendors by Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topVendors.map(([name, revenue]) => (
            <div key={name} className="flex items-center gap-3">
              <span className="text-sm w-32 truncate shrink-0">{name}</span>
              <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(revenue / maxRevenue) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600"
                />
              </div>
              <span className="text-sm font-medium w-20 text-right">${revenue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function InventoryTimeline() {
  const recentMovements = inventoryMovements.slice(0, 6)
  const typeIcons: Record<string, React.ReactNode> = {
    inbound: <ArrowUpRight className="h-3 w-3 text-emerald-500" />,
    outbound: <ArrowDownRight className="h-3 w-3 text-red-500" />,
    adjustment: <AlertTriangle className="h-3 w-3 text-amber-500" />,
    transfer: <Clock className="h-3 w-3 text-blue-500" />,
  }
  const typeColors: Record<string, string> = {
    inbound: "bg-emerald-100 border-emerald-300",
    outbound: "bg-red-100 border-red-300",
    adjustment: "bg-amber-100 border-amber-300",
    transfer: "bg-blue-100 border-blue-300",
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Inventory Movements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {recentMovements.map((m, i) => (
            <div key={m.id} className="flex gap-3 pb-4 relative">
              {i < recentMovements.length - 1 && <div className="absolute left-[13px] top-8 bottom-0 w-px bg-border" />}
              <div className={`flex items-center justify-center w-7 h-7 rounded-full border-2 shrink-0 ${typeColors[m.type]} z-10`}>
                {typeIcons[m.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{m.productName}</p>
                  <span className="text-xs text-muted-foreground shrink-0">{new Date(m.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 capitalize">{m.type} · {m.warehouse} · {m.reason}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-semibold ${m.type === 'inbound' ? 'text-emerald-600' : m.type === 'outbound' ? 'text-red-600' : 'text-amber-600'}`}>
                    {m.quantity > 0 ? '+' : ''}{m.quantity}
                  </span>
                  <span className="text-xs text-muted-foreground">({m.priorStock} → {m.newStock})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Good morning, Vibhanshu</h1>
        <p className="text-muted-foreground text-sm mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => <KPICard key={kpi.title} kpi={kpi} index={i} />)}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <LowStockAlerts />
        </div>
        <div className="lg:col-span-3">
          <RecentOrders />
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopVendorsChart />
        <InventoryTimeline />
      </motion.div>
    </motion.div>
  )
}
