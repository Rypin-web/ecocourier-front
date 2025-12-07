import { cn } from "@/shared/utils/cn"

function Skeleton({ className, children = '', ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-xs", className)}
      {...props}
    >{children}</div>
  )
}

export { Skeleton }
