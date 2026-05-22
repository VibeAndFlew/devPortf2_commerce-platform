"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Star, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { vendors } from "@/lib/mock-data"
import type { Vendor } from "@/lib/mock-data"

const tierStyles: Record<string, string> = {
  platinum: "bg-purple-100 text-purple-700 border-purple-200",
  gold: "bg-amber-100 text-amber-700 border-amber-200",
  silver: "bg-gray-100 text-gray-700 border-gray-200",
  bronze: "bg-orange-100 text-orange-700 border-orange-200",
}

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  inactive: "bg-gray-100 text-gray-700 border-gray-200",
  suspended: "bg-red-100 text-red-700 border-red-200",
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3 w-3 ${i < Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function VendorsPage() {
  const [search, setSearch] = useState("")
  const [tierFilter, setTierFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = useMemo(() => {
    let result = [...vendors]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(v => v.name.toLowerCase().includes(q) || v.email.toLowerCase().includes(q) || v.contactPerson.toLowerCase().includes(q))
    }
    if (tierFilter !== "all") result = result.filter(v => v.tier === tierFilter)
    if (statusFilter !== "all") result = result.filter(v => v.status === statusFilter)
    return result
  }, [search, tierFilter, statusFilter])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vendors</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} vendors</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Add Vendor</Button>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vendors..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-9" />
            </div>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="h-9 w-32 text-xs"><SelectValue placeholder="Tier" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 w-32 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Name</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="pr-5">Since</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(v => (
                <TableRow key={v.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-xs font-semibold text-indigo-600">
                        {v.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{v.name}</p>
                        <p className="text-xs text-muted-foreground">{v.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={tierStyles[v.tier]}>{v.tier}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusStyles[v.status]}>{v.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{v.products}</TableCell>
                  <TableCell className="text-sm">{v.orders}</TableCell>
                  <TableCell className="text-sm font-medium">${v.totalSpent.toLocaleString()}</TableCell>
                  <TableCell><StarRating rating={v.rating} /></TableCell>
                  <TableCell className="pr-5 text-sm text-muted-foreground">{v.since}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
