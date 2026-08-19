import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const LIVE_DASHBOARD_REFRESH_MS = 15_000;

type LiveDashboardQueryOptions<TData> = Omit<
  UseQueryOptions<TData, Error, TData>,
  "refetchInterval" | "refetchIntervalInBackground" | "refetchOnReconnect" | "refetchOnWindowFocus"
>;

export function useLiveDashboardQuery<TData>(options: LiveDashboardQueryOptions<TData>) {
  return useQuery({
    ...options,
    refetchInterval: LIVE_DASHBOARD_REFRESH_MS,
    refetchIntervalInBackground: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    staleTime: 5_000,
  });
}
