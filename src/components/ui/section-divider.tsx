import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div className={cn("relative flex items-center justify-center py-8", className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <div className="relative bg-background px-4">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
      </div>
    </div>
  );
}