import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export function GlobalLoadingBar() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isVisible = isFetching > 0 || isMutating > 0;

  return (
    <div
      className={cn(
        "sticky top-4 z-20 mb-6 h-1.5 overflow-hidden rounded-full transition-colors",
        isVisible ? "bg-border/80" : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "h-full w-1/3 rounded-full bg-gradient-to-r from-accent via-primary to-accent transition-opacity",
          isVisible ? "opacity-100 animate-[progress-slide_1.15s_ease-in-out_infinite]" : "opacity-0",
        )}
      />
    </div>
  );
}
