import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export function GlobalLoadingBar() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isVisible = isFetching > 0 || isMutating > 0;

  return <div className={`loading-bar ${isVisible ? "is-visible" : ""}`} />;
}

