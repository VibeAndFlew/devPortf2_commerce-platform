"use client"

import { motion } from "framer-motion"
import { MapPin, Users, Package, Activity, Shield, Calendar, CheckCircle2, Wrench, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { warehouses } from "@/lib/mock-data"

const statusStyles: Record<string, { badge: string; icon: React.ReactNode }> = {
  active: { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 className="h-3 w-3 text-emerald-600" /> },
  maintenance: { badge: "bg-amber-100 text-amber-700 border-amber-200", icon: <Wrench className="h-3 w-3 text-amber-600" /> },
  closed: { badge: "bg-red-100 text-red-700 border-red-200", icon: <XCircle className="h-3 w-3 text-red-600" /> },
}

const utilizationColor = (pct: number) => {
  if (pct >= 85) return "text-red-600"
  if (pct >= 65) return "text-amber-600"
  return "text-emerald-600"
}

const progressColor = (pct: number) => {
  if (pct >= 85) return "bg-red-500"
  if (pct >= 65) return "bg-amber-500"
  return "bg-emerald-500"
}

export default function WarehousesPage() {
  const totalCapacity = warehouses.reduce((acc, w) => acc + w.capacity, 0)
  const avgUtilization = Math.round(warehouses.reduce((acc, w) => acc + w.utilization, 0) / warehouses.length)
  const totalStaff = warehouses.reduce((acc, w) => acc + w.staff, 0)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Warehouses</h1>
        <p className="text-sm text-muted-foreground mt-1">{warehouses.length} facilities · {totalCapacity.toLocaleString()} units capacity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50"><Package className="h-5 w-5 text-indigo-500" /></div>
            <div><p className="text-2xl font-bold">{totalCapacity.toLocaleString()}</p><p className="text-xs text-muted-foreground">Total Capacity (sq ft)</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50"><Activity className="h-5 w-5 text-emerald-500" /></div>
            <div><p className={`text-2xl font-bold ${utilizationColor(avgUtilization)}`}>{avgUtilization}%</p><p className="text-xs text-muted-foreground">Avg Utilization</p></div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50"><Users className="h-5 w-5 text-amber-500" /></div>
            <div><p className="text-2xl font-bold">{totalStaff}</p><p className="text-xs text-muted-foreground">Total Staff</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {warehouses.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="border-border/50 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-base">{w.name}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{w.code} · {w.location}</p>
                  </div>
                  <Badge variant="outline" className={statusStyles[w.status].badge}>
                    <span className="flex items-center gap-1">
                      {statusStyles[w.status].icon}
                      {w.status}
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Capacity Utilization</span>
                    <span className={`font-semibold ${utilizationColor(w.utilization)}`}>{w.utilization}%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${progressColor(w.utilization)}`}
                      style={{ width: `${w.utilization}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">{w.capacity.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Capacity</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">{w.activeOrders}</p>
                    <p className="text-xs text-muted-foreground">Active Orders</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">{w.staff}</p>
                    <p className="text-xs text-muted-foreground">Staff</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Zone: <strong>{w.zone}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Manager: <strong>{w.managedBy}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Last Audit: <strong>{w.lastAudit}</strong></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
