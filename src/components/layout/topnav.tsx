"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, Search, Bell, ChevronDown, LayoutDashboard, Package, Users, Warehouse, ClipboardList, ShoppingCart, Building2, CreditCard, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/catalogs", label: "Catalogs", icon: Package },
  { href: "/vendors", label: "Vendors", icon: Users },
  { href: "/inventory", label: "Inventory", icon: Warehouse },
  { href: "/procurement", label: "Procurement", icon: ClipboardList },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/warehouses", label: "Warehouses", icon: Building2 },
  { href: "/billing", label: "Billing", icon: CreditCard },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4 lg:px-6 gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <ShoppingBag className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-primary">MERIDIAN</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex-1" />

        <div className="hidden md:flex relative max-w-xs w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products, orders..."
            className="pl-8 h-9 bg-muted/50 border-none"
          />
          <kbd className="absolute right-2.5 top-2 hidden lg:inline-flex h-5 items-center gap-1 rounded border bg-background px-1.5 text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">3</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">VB</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start text-left">
                <span className="text-sm font-medium leading-none">Vibhanshu Buldeo</span>
                <span className="text-xs text-muted-foreground leading-none mt-1">CEO & Founder</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>Vibhanshu Buldeo</span>
                <span className="text-xs font-normal text-muted-foreground">v.buldeo@meridian-commerce.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer"><User className="mr-2 h-4 w-4" /> Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer"><Settings className="mr-2 h-4 w-4" /> Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
