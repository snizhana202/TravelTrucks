import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { CamperFilters } from "../types/camper";

const fetchCampers = async ({
  pageParam = 1,
  filters,
}: {
  pageParam?: number;
  filters: CamperFilters;
}) => {
  const activeFilters = Object.entries(filters).reduce(
    (acc, [key, value]) => {
      if (value) acc[key as keyof CamperFilters] = value.toString();
      return acc;
    },
    {} as Record<string, string>,
  );

  const queryParams = new URLSearchParams({
    page: pageParam!.toString(),
    limit: "4",
    ...activeFilters,
  }).toString();

  try {
    const response = await api.get(`/campers?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return { campers: [], page: 1, totalPages: 0 };
  }
};

export const useCampers = (filters: CamperFilters) => {
  return useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) => fetchCampers({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
  });
};
