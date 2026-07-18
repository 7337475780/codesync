import * as React from "react"
import { cn } from "../../utils/cn"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border border-border bg-surface text-text-primary shadow", className)} {...props} />
))
Card.displayName = "Card"

const GlassCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg glass-medium", className)} {...props} />
))
GlassCard.displayName = "GlassCard"

export { Card, GlassCard }
