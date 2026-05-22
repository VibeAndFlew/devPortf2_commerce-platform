"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Download, DollarSign, Clock, AlertTriangle, Ban, CheckCircle2, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { billingInvoices } from "@/lib/mock-data"

const statusStyles: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  overdue: "bg-red-100 text-red-700 border-red-200",
  cancelled: "bg-gray-100 text-gray-700 border-gray-200",
  disputed: "bg-purple-100 text-purple-700 border-purple-200",
}

export default function BillingPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const totalOutstanding = billingInvoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((acc, i) => acc + i.total, 0)
  const totalOverdue = billingInvoices.filter(i => i.status === 'overdue').reduce((acc, i) => acc + i.total, 0)
  const totalPaid = billingInvoices.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.total, 0)
  const overdueCount = billingInvoices.filter(i => i.status === 'overdue').length

  const filtered = useMemo(() => {
    let result = [...billingInvoices]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(i => i.invoiceNumber.toLowerCase().includes(q) || i.vendor.toLowerCase().includes(q) || i.poNumber.toLowerCase().includes(q))
    }
    if (statusFilter !== "all") result = result.filter(i => i.status === statusFilter)
    return result
  }, [search, statusFilter])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing & Invoices</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage vendor invoices and payments</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4" /> Export Report</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50"><CheckCircle2 className="h-5 w-5 text-emerald-500" /></div>
            <div><p className="text-2xl font-bold">${totalPaid.toLocaleString()}</p><p className="text-xs text-muted-foreground">Total Paid</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50"><DollarSign className="h-5 w-5 text-amber-500" /></div>
            <div><p className="text-2xl font-bold">${totalOutstanding.toLocaleString()}</p><p className="text-xs text-muted-foreground">Outstanding</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-50"><AlertTriangle className="h-5 w-5 text-red-500" /></div>
            <div><p className="text-2xl font-bold text-red-600">${totalOverdue.toLocaleString()}</p><p className="text-xs text-muted-foreground">Overdue ({overdueCount})</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50"><FileText className="h-5 w-5 text-indigo-500" /></div>
            <div><p className="text-2xl font-bold">{billingInvoices.length}</p><p className="text-xs text-muted-foreground">Total Invoices</p></div>
          </CardContent>
        </Card>
      </div>

      {/* Aging Summary */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base"><Clock className="h-4 w-4 inline mr-1" /> Aging Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-emerald-50">
              <p className="text-xs text-muted-foreground">Current (0-30 days)</p>
              <p className="text-xl font-bold text-emerald-600">
                ${billingInvoices.filter(i => i.status === 'pending').reduce((a, i) => a + i.total, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-amber-50">
              <p className="text-xs text-muted-foreground">Aging (31-60 days)</p>
              <p className="text-xl font-bold text-amber-600">
                ${billingInvoices.filter(i => i.status === 'overdue').reduce((a, i) => a + i.total, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-red-50">
              <p className="text-xs text-muted-foreground">Disputed</p>
              <p className="text-xl font-bold text-red-600">
                ${billingInvoices.filter(i => i.status === 'disputed').reduce((a, i) => a + i.total, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search invoices..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-36 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="disputed">Disputed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Invoice</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>PO Number</TableHead>
                <TableHead className="pr-5">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(inv => (
                <TableRow key={inv.id}>
                  <TableCell className="pl-5">
                    <p className="font-medium text-xs font-mono">{inv.invoiceNumber}</p>
                    <p className="text-xs text-muted-foreground">{inv.id}</p>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{inv.vendor}</TableCell>
                  <TableCell className="text-sm">${inv.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-sm">${inv.tax.toLocaleString()}</TableCell>
                  <TableCell className="text-sm font-semibold">${inv.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusStyles[inv.status]}>{inv.status}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{inv.issuedDate}</TableCell>
                  <TableCell className="text-xs">
                    <span className={inv.status === 'overdue' ? 'text-red-600 font-semibold' : 'text-muted-foreground'}>
                      {inv.dueDate}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs font-mono">{inv.poNumber}</TableCell>
                  <TableCell className="pr-5">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
                      {inv.status === 'pending' && <Button variant="outline" size="sm" className="h-7 text-xs">Pay</Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
