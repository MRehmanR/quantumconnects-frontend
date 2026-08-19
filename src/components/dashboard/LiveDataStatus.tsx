import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type LiveDataStatusProps = {
  dataUpdatedAt: number;
  isRefreshing: boolean;
  onRefresh: () => void;
};

export default function LiveDataStatus({ dataUpdatedAt, isRefreshing, onRefresh }: LiveDataStatusProps) {
  const updatedLabel = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "Waiting for data";

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground" aria-live="polite">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        Live
      </span>
      <span className="hidden sm:inline">{isRefreshing ? "Updating…" : `Updated ${updatedLabel}`}</span>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="h-8 px-2 text-xs"
        onClick={onRefresh}
        disabled={isRefreshing}
        aria-label="Refresh live dashboard data"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
        <span className="ml-1 hidden sm:inline">Refresh</span>
      </Button>
    </div>
  );
}
