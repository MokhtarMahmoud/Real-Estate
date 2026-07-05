import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const AppContext = createContext(null);

const MIN_PRICE = 500;
const DEFAULT_MAX_PRICE = 5000;
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 5;

export function AppProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  // ---------- filters/pagination derived from the URL ----------
  const bedrooms = searchParams.get("bedrooms") || "";
  const maxPrice = Number(searchParams.get("maxPrice")) || DEFAULT_MAX_PRICE;
  const page = Number(searchParams.get("page")) || DEFAULT_PAGE;
  const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;
  const keyword = searchParams.get("keyword") || "";

  // ---------- URL helpers ----------
  function updateParams(updates, { resetPage = true } = {}) {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    if (resetPage) params.set("page", String(DEFAULT_PAGE));
    setSearchParams(params);
  }

  function goToPage(nextPageNumber) {
    updateParams({ page: nextPageNumber }, { resetPage: false });
  }

  function nextPage() {
    const canAdvance = totalPages > 1 ? page < totalPages : hasNextPage;
    if (canAdvance) goToPage(page + 1);
  }

  function prevPage() {
    if (page > 1) goToPage(page - 1);
  }

  // ---------- extract total/page count from whatever shape the API returns ----------
  function extractPagination(result, itemsReturned) {
    const total =
      result.meta?.total ??
      result.meta?.totalItems ??
      result.pagination?.total ??
      result.pagination?.totalItems ??
      result.total ??
      null;

    const pages =
      result.meta?.totalPages ??
      result.meta?.last_page ??
      result.pagination?.totalPages ??
      result.pagination?.last_page ??
      result.totalPages ??
      result.last_page ??
      null;

    if (pages)
      return { totalPages: pages, totalResults: total ?? pages * limit };
    if (total)
      return { totalPages: Math.ceil(total / limit), totalResults: total };
    return { totalPages: 1, totalResults: itemsReturned };
  }

  // ---------- fetch ----------
  useEffect(() => {
    const controller = new AbortController();

    async function fetchListings() {
      setIsLoading(true);
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const params = new URLSearchParams();
        if (bedrooms) params.set("bedrooms", bedrooms);
        params.append("price[]", MIN_PRICE);
        params.append("price[]", maxPrice);
        params.set("page", page);
        params.set("limit", limit);
        if (keyword) params.set("keyword", keyword);

        const res = await fetch(
          `https://backend-dev.yozya.com/api/v1/mobile/real-estates?${params.toString()}`,
          {
            method: "GET",
            signal: controller.signal,
            headers: {
              Accept: "application/json",
              "x-api-key": apiKey,
              "Accept-Language": "en",
              platform: "web",
              "app-version": "1.1",
              "X-Currency": "EGP",
            },
          },
        );

        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const result = await res.json();
        const items = result.data ?? [];

        setData(items);
        const { totalPages: pages, totalResults: total } = extractPagination(
          result,
          items.length,
        );
        setTotalPages(pages);
        setTotalResults(total);
        setHasNextPage(items.length === limit);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching listings:", err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchListings();
    return () => controller.abort();
  }, [bedrooms, maxPrice, keyword, limit, page]);

  const value = {
    data,
    isLoading,
    totalPages,
    totalResults,
    hasNextPage,
    bedrooms,
    maxPrice,
    page,
    limit,
    keyword,
    updateParams,
    goToPage,
    nextPage,
    prevPage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
