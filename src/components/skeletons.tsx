import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <Skeleton className="h-48 w-full rounded-none" />
      <CardHeader>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-1/3" />
        <div className="flex gap-2 mt-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </CardContent>
    </Card>
  )
}

export function SkeletonTable({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-4">
          {Array.from({ length: cols }).map((_, colIdx) => (
            <Skeleton key={colIdx} className={cn("h-4 flex-1", colIdx === 0 && "w-1/4 flex-[2]")} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonChart({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <Skeleton className="h-4 w-1/3" />
      <div className="flex items-end gap-2 h-40">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="flex-1" style={{ height: `${Math.random() * 60 + 20}%` }} />
        ))}
      </div>
    </div>
  )
}

export function SkeletonList({ items = 4 }: { items?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  )
}
