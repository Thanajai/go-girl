import { cn } from "../../lib/utils";

export default function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("bg-elevated rounded-xl skeleton-shimmer", className)}
      {...props}
    />
  );
}
