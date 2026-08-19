import type { ReactNode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  LIVE_DASHBOARD_REFRESH_MS,
  tenantScopedDashboardKey,
  useLiveDashboardQuery,
} from "./use-live-dashboard-query";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

afterEach(() => {
  vi.useRealTimers();
  localStorage.clear();
});

describe("useLiveDashboardQuery", () => {
  it("loads immediately and refreshes active dashboard data on the shared interval", async () => {
    vi.useFakeTimers();
    const loader = vi.fn().mockResolvedValue({ count: 1 });

    const { result } = renderHook(
      () => useLiveDashboardQuery({ queryKey: ["dashboard", "calls"], queryFn: loader }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.data).toEqual({ count: 1 });
    expect(loader).toHaveBeenCalledTimes(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(LIVE_DASHBOARD_REFRESH_MS);
    });
    expect(loader).toHaveBeenCalledTimes(2);
  });

  it("deduplicates consumers that request the same tenant dashboard resource", async () => {
    const loader = vi.fn().mockResolvedValue(["one call"]);

    renderHook(
      () => {
        const first = useLiveDashboardQuery({ queryKey: ["dashboard", "calls"], queryFn: loader });
        const second = useLiveDashboardQuery({ queryKey: ["dashboard", "calls"], queryFn: loader });
        return { first, second };
      },
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(loader).toHaveBeenCalledTimes(1));
  });

  it("uses separate cache keys for different authenticated tenants", () => {
    localStorage.setItem("qc_user_id", "tenant-a");
    const tenantAKey = tenantScopedDashboardKey(["dashboard", "calls"]);
    localStorage.setItem("qc_user_id", "tenant-b");
    const tenantBKey = tenantScopedDashboardKey(["dashboard", "calls"]);

    expect(tenantAKey).toEqual(["tenant-dashboard", "tenant-a", "dashboard", "calls"]);
    expect(tenantBKey).toEqual(["tenant-dashboard", "tenant-b", "dashboard", "calls"]);
    expect(tenantBKey).not.toEqual(tenantAKey);
  });
});
