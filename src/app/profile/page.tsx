"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Calendar, Package, ShoppingCart, TrendingUp, Award, Edit3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { orders, products } from "@/lib/mock-data"

export default function ProfilePage() {
  const recentActivity = [
    { action: "Created procurement request", target: "MacBook Pro 16\" M3 Max (15 units)", time: "2 hours ago", icon: Package },
    { action: "Approved vendor invoice", target: "INV-2025-0501 - $46,200.00", time: "5 hours ago", icon: ShoppingCart },
    { action: "Updated stock levels", target: "Samsung 990 Pro 2TB NVMe (+100 units)", time: "1 day ago", icon: TrendingUp },
    { action: "Completed warehouse audit", target: "Northeast Distribution Center", time: "3 days ago", icon: Award },
    { action: "Added new product", target: "Meridian Logo Cap", time: "5 days ago", icon: Package },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 lg:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-2xl">VB</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mt-4">Vibhanshu Buldeo</h2>
              <p className="text-sm text-muted-foreground">CEO & Founder</p>
              <Badge variant="outline" className="mt-2 bg-emerald-100 text-emerald-700">Active</Badge>
              <Separator className="my-4" />
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>v.buldeo@meridian-commerce.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined January 2025</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4"><Edit3 className="h-4 w-4" /> Edit Profile</Button>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Actions This Month</span>
                <span className="font-bold">147</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Orders Processed</span>
                <span className="font-bold">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Procurement Approved</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Inventory Audits</span>
                <span className="font-bold">4</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uptime Score</span>
                <span className="text-sm font-bold text-emerald-600">99.9%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {recentActivity.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex gap-3 pb-4 relative">
                      {i < recentActivity.length - 1 && (
                        <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
                      )}
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 border-2 border-indigo-100 z-10">
                        <Icon className="h-4 w-4 text-indigo-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{item.action}</p>
                        <p className="text-sm text-muted-foreground">{item.target}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Preferences</CardTitle>
                <Button variant="outline" size="sm" className="h-7 text-xs">Manage</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-muted/30">
                  <p className="text-sm font-medium">Dashboard Layout</p>
                  <p className="text-xs text-muted-foreground mt-1">Compact view with KPIs</p>
                </div>
                <div className="p-4 rounded-lg border bg-muted/30">
                  <p className="text-sm font-medium">Notification Delivery</p>
                  <p className="text-xs text-muted-foreground mt-1">Email + In-app</p>
                </div>
                <div className="p-4 rounded-lg border bg-muted/30">
                  <p className="text-sm font-medium">Default Warehouse</p>
                  <p className="text-xs text-muted-foreground mt-1">Northeast Distribution Center</p>
                </div>
                <div className="p-4 rounded-lg border bg-muted/30">
                  <p className="text-sm font-medium">Report Format</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF (Monthly)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">Create Purchase Order</Button>
                <Button size="sm" variant="outline">Run Inventory Report</Button>
                <Button size="sm" variant="outline">View Audit Log</Button>
                <Button size="sm" variant="outline">Export Data</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
