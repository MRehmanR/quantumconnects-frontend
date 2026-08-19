import { useQuery, type QueryKey, type UseQueryOptions } from "@tanstack/react-query";

export const LIVE_DASHBOARD_REFRESH_MS = 10_000;

export const getDashboardTenantScope = () => {
  if (typeof window === "undefined") {
    return "anonymous";
  }
  return localStorage.getItem("qc_user_id")
    || localStorage.getItem("qc_user_email")
    || "anonymous";
};

export const tenantScopedDashboardKey = (queryKey: QueryKey): QueryKey => [
  "tenant-dashboard",
  getDashboardTenantScope(),
  ...queryKey,
];

type LiveDashboardQueryOptions<TData> = Omit<
  UseQueryOptions<TData, Error, TData>,
  "refetchInterval" | "refetchIntervalInBackground" | "refetchOnReconnect" | "refetchOnWindowFocus"
>;

export function useLiveDashboardQuery<TData>(options: LiveDashboardQueryOptions<TData>) {
  return useQuery({
    ...options,
    queryKey: tenantScopedDashboardKey(options.queryKey),
    refetchInterval: LIVE_DASHBOARD_REFRESH_MS,
    refetchIntervalInBackground: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: "always",
    staleTime: 0,
  });
}
