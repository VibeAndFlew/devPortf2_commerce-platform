"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, ChevronUp, CreditCard, Package, Truck, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { orders } from "@/lib/mock-data"

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  processing: "bg-indigo-100 text-indigo-700 border-indigo-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  returned: "bg-gray-100 text-gray-700 border-gray-200",
}

const paymentStyles: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  refunded: "bg-blue-100 text-blue-700 border-blue-200",
  failed: "bg-red-100 text-red-700 border-red-200",
}

export default function OrdersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((acc, o) => acc + o.total, 0)
  const pendingRevenue = orders.filter(o => o.paymentStatus === 'pending').reduce((acc, o) => acc + o.total, 0)
  const orderCount = orders.length
  const shippedCount = orders.filter(o => o.status === 'shipped').length

  const filtered = useMemo(() => {
    let result = [...orders]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(o => o.orderNumber.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.email.toLowerCase().includes(q))
    }
    if (statusFilter !== "all") result = result.filter(o => o.status === statusFilter)
    if (paymentFilter !== "all") result = result.filter(o => o.paymentStatus === paymentFilter)
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [search, statusFilter, paymentFilter])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage and track customer orders</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50"><Package className="h-5 w-5 text-indigo-500" /></div>
            <div><p className="text-2xl font-bold">{orderCount}</p><p className="text-xs text-muted-foreground">Total Orders</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50"><CreditCard className="h-5 w-5 text-emerald-500" /></div>
            <div><p className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(1)}K</p><p className="text-xs text-muted-foreground">Collected Revenue</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50"><Calendar className="h-5 w-5 text-amber-500" /></div>
            <div><p className="text-2xl font-bold">${(pendingRevenue / 1000).toFixed(1)}K</p><p className="text-xs text-muted-foreground">Pending Revenue</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50"><Truck className="h-5 w-5 text-purple-500" /></div>
            <div><p className="text-2xl font-bold">{shippedCount}</p><p className="text-xs text-muted-foreground">In Transit</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-36 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
          </SelectContent>
        </Select>
        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger className="h-9 w-36 text-xs"><SelectValue placeholder="Payment" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8 pl-5"></TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead className="pr-5">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(o => (
                <>
                  <TableRow
                    key={o.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setExpandedId(expandedId === o.id ? null : o.id)}
                  >
                    <TableCell className="pl-5">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        {expandedId === o.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-xs font-mono">{o.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">{o.id}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{o.customer}</p>
                      <p className="text-xs text-muted-foreground">{o.email}</p>
                    </TableCell>
                    <TableCell className="text-sm">{o.items}</TableCell>
                    <TableCell className="text-sm font-medium">${o.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusStyles[o.status]}>{o.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={paymentStyles[o.paymentStatus]}>{o.paymentStatus}</Badge>
                    </TableCell>
                    <TableCell className="text-xs">{o.carrier || '—'}</TableCell>
                    <TableCell className="pr-5 text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                  <AnimatePresence>
                    {expandedId === o.id && (
                      <TableRow key={`${o.id}-expanded`}>
                        <TableCell colSpan={9} className="p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 bg-muted/30 border-t">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Shipping Address</p>
                                  <p className="text-sm">{o.shippingAddress}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Payment Method</p>
                                  <p className="text-sm">{o.paymentMethod}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Tracking</p>
                                  <p className="text-sm">{o.trackingNumber || 'Not assigned'}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Warehouse</p>
                                  <p className="text-sm">{o.warehouse}</p>
                                </div>
                              </div>
                              <Separator className="my-3" />
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Subtotal</p>
                                  <p className="text-sm">${o.subtotal.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Tax</p>
                                  <p className="text-sm">${o.tax.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Shipping</p>
                                  <p className="text-sm">${o.shipping.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Notes</p>
                                  <p className="text-sm">{o.notes || 'None'}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
