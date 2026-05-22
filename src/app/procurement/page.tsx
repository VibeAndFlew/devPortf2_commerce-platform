"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Plus, CheckCircle2, Clock, AlertTriangle, Ban, FileText, Send, Eye, PackageCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { procurementRequests } from "@/lib/mock-data"

const urgencyStyles: Record<string, string> = {
  low: "bg-gray-100 text-gray-700 border-gray-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
  high: "bg-amber-100 text-amber-700 border-amber-200",
  critical: "bg-red-100 text-red-700 border-red-200",
}

const statusStyles: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700 border-gray-200",
  pending_approval: "bg-amber-100 text-amber-700 border-amber-200",
  approved: "bg-indigo-100 text-indigo-700 border-indigo-200",
  ordered: "bg-blue-100 text-blue-700 border-blue-200",
  received: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
}

const pipelineStages = [
  { key: 'draft', label: 'Drafts', icon: FileText, count: procurementRequests.filter(r => r.status === 'draft').length },
  { key: 'pending_approval', label: 'Pending Approval', icon: Send, count: procurementRequests.filter(r => r.status === 'pending_approval').length },
  { key: 'approved', label: 'Approved', icon: CheckCircle2, count: procurementRequests.filter(r => r.status === 'approved').length },
  { key: 'ordered', label: 'Ordered', icon: PackageCheck, count: procurementRequests.filter(r => r.status === 'ordered').length },
  { key: 'received', label: 'Received', icon: Eye, count: procurementRequests.filter(r => r.status === 'received').length },
]

const totalBudget = procurementRequests.reduce((acc, r) => acc + r.totalCost, 0)
const spentBudget = procurementRequests.filter(r => r.status === 'received' || r.status === 'ordered').reduce((acc, r) => acc + r.totalCost, 0)

export default function ProcurementPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")

  const filtered = useMemo(() => {
    let result = [...procurementRequests]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(r => r.productName.toLowerCase().includes(q) || r.vendor.toLowerCase().includes(q) || r.requestedBy.toLowerCase().includes(q))
    }
    if (statusFilter !== "all") result = result.filter(r => r.status === statusFilter)
    if (urgencyFilter !== "all") result = result.filter(r => r.urgency === urgencyFilter)
    return result
  }, [search, statusFilter, urgencyFilter])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Procurement</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage purchase requests and approvals</p>
        </div>
        <Button><Plus className="h-4 w-4" /> New Request</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50 col-span-1 md:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3">
              {pipelineStages.map(stage => {
                const Icon = stage.icon
                return (
                  <div key={stage.key} className="text-center p-3 rounded-lg bg-muted/50 border border-border/50">
                    <Icon className="h-5 w-5 mx-auto text-muted-foreground" />
                    <p className="text-2xl font-bold mt-1">{stage.count}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stage.label}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${spentBudget.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">of ${totalBudget.toLocaleString()} total</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(spentBudget / totalBudget) * 100}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{Math.round((spentBudget / totalBudget) * 100)}% utilized</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search requests..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-36 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending_approval">Pending Approval</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="ordered">Ordered</SelectItem>
            <SelectItem value="received">Received</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
          <SelectTrigger className="h-9 w-32 text-xs"><SelectValue placeholder="Urgency" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Urgency</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Product</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead className="pr-5">Expected</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(r => (
                <TableRow key={r.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="pl-5">
                    <p className="font-medium text-sm">{r.productName}</p>
                    <p className="text-xs text-muted-foreground">{r.id}</p>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{r.quantity}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={urgencyStyles[r.urgency]}>{r.urgency}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusStyles[r.status]}>{r.status.replace('_', ' ')}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{r.vendor}</TableCell>
                  <TableCell className="text-sm font-medium">${r.totalCost.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{r.department}</TableCell>
                  <TableCell className="text-sm">{r.requestedBy}</TableCell>
                  <TableCell className="pr-5 text-xs text-muted-foreground">{r.expectedDelivery}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
