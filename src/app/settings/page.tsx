"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Shield, CreditCard, Users, Globe, Save, Mail, Phone, MapPin, Lock, Smartphone, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

function GeneralTab() {
  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Store Information</CardTitle>
          <CardDescription>Manage your business details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" defaultValue="Meridian Commerce" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / VAT Number</Label>
              <Input id="taxId" defaultValue="TX-98765-4321" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" defaultValue="hello@meridian-commerce.com" className="pl-8" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="phone" defaultValue="+1 (555) 123-4567" className="pl-8" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="address" defaultValue="100 Commerce Drive, Suite 400, San Francisco, CA 94105" className="pl-8" />
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Input id="currency" defaultValue="USD - US Dollar" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" defaultValue="America/Los_Angeles (PST/PDT)" />
          </div>
          <Button className="mt-2"><Save className="h-4 w-4" /> Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationsTab() {
  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Email Notifications</CardTitle>
          <CardDescription>Configure which emails you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "New order placed", desc: "When a customer places a new order" },
            { label: "Low stock alerts", desc: "When product stock falls below threshold" },
            { label: "Payment received", desc: "When a payment is successfully processed" },
            { label: "Payment failed", desc: "When a payment attempt fails" },
            { label: "Vendor invoice due", desc: "When a vendor invoice is approaching due date" },
            { label: "Procurement approval needed", desc: "When a procurement request needs your approval" },
            { label: "Weekly report summary", desc: "Weekly digest of platform activity" },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <Switch defaultChecked={!n.label.includes('Weekly')} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function TeamTab() {
  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Team Members</CardTitle>
              <CardDescription>Manage user access and roles</CardDescription>
            </div>
            <Button size="sm">Invite Member</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Vibhanshu Buldeo", email: "v.buldeo@meridian-commerce.com", role: "CEO & Founder", initials: "VB" },
              { name: "Sarah Chen", email: "sarah@meridian.com", role: "Procurement Manager", initials: "SC" },
              { name: "Mike Rodriguez", email: "mike@meridian.com", role: "Inventory Specialist", initials: "MR" },
              { name: "Lisa Wang", email: "lisa@meridian.com", role: "Finance", initials: "LW" },
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-xs font-semibold text-indigo-600">
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-muted px-2 py-1 rounded-md">{member.role}</span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SecurityTab() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Password</CardTitle>
          <CardDescription>Change your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="currentPassword" type="password" className="pl-8" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="newPassword" type={showPassword ? "text" : "password"} className="pl-8 pr-8" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button><Save className="h-4 w-4" /> Update Password</Button>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Authenticator App</p>
              <p className="text-xs text-muted-foreground">Use Google Authenticator or Authy</p>
            </div>
            <Switch />
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">SMS Verification</p>
              <p className="text-xs text-muted-foreground">Receive codes via text message</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Active Sessions</CardTitle>
          <CardDescription>Manage your logged-in devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { device: "Chrome on Windows", ip: "192.168.1.100", lastActive: "Now", current: true },
            { device: "Safari on iPhone", ip: "192.168.1.102", lastActive: "2 hours ago", current: false },
            { device: "Firefox on macOS", ip: "203.0.113.50", lastActive: "3 days ago", current: false },
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{session.device} {session.current && <span className="text-xs text-emerald-600 font-medium">(current)</span>}</p>
                  <p className="text-xs text-muted-foreground">IP: {session.ip} · {session.lastActive}</p>
                </div>
              </div>
              {!session.current && <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive">Revoke</Button>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function BillingSettingsTab() {
  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm font-medium">Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2027</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-emerald-100 text-emerald-700">Default</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm font-medium">Amex ending in 1234</p>
                <p className="text-xs text-muted-foreground">Expires 08/2026</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-7 text-xs">Set Default</Button>
          </div>
          <Button variant="outline" size="sm" className="mt-2"><CreditCard className="h-4 w-4" /> Add Payment Method</Button>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Billing Address</CardTitle>
          <CardDescription>Your billing contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="billingEmail">Billing Email</Label>
            <Input id="billingEmail" type="email" defaultValue="billing@meridian-commerce.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billingAddress">Address</Label>
            <Input id="billingAddress" defaultValue="100 Commerce Drive, Suite 400, San Francisco, CA 94105" />
          </div>
          <Button><Save className="h-4 w-4" /> Save</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your platform configuration</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-1.5"><Globe className="h-4 w-4" /> General</TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1.5"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-1.5"><Users className="h-4 w-4" /> Team</TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1.5"><Shield className="h-4 w-4" /> Security</TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-1.5"><CreditCard className="h-4 w-4" /> Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="general"><GeneralTab /></TabsContent>
        <TabsContent value="notifications"><NotificationsTab /></TabsContent>
        <TabsContent value="team"><TeamTab /></TabsContent>
        <TabsContent value="security"><SecurityTab /></TabsContent>
        <TabsContent value="billing"><BillingSettingsTab /></TabsContent>
      </Tabs>
    </motion.div>
  )
}
