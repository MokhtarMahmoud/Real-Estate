import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000);

  const [searchParams] = useSearchParams();
  const bedrooms = searchParams.get("bedrooms") || "";
  const minPriceValue = 500;
  const maxPriceValue = searchParams.get("Price");
  const pageNumber = searchParams.get("page") || 1;
  const limitNumber = searchParams.get("limit") || 12;
  const keyword = searchParams.get("keyword") || "";


  const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  return searchParams.toString(); 
};

  useEffect(() => {
    const queryParams = {
      page: pageNumber,
      limit: limitNumber,
      bedrooms: bedrooms,
      keyword: keyword,
      maxPrice: maxPriceValue
    };
    const queryString = buildQueryString(queryParams);
    async function fetchData() {
      setIsloading(true);
      try {
        const apikey = "base64:NnQp8jV6bp5tErWgwYoKjSY0YODOO4maVCrkqWCFgT8=";

        const res = await fetch(
          `https://backend-dev.yozya.com/api/v1/mobile/real-estates?${queryString}`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Accept-Language": "en",
            "x-api-key": apikey,
            "X-Currency": "EGP",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36"
          },
        },
        );
        if (!res.ok) {
          throw new Error("Could not fetch data");
        }
        const result = await res.json();
        setData(result.data);
      } catch (err) {
        console.log(`Error: ${err}`);
      } finally {
        setIsloading(false);
      }
    }
    fetchData();
  }, [bedrooms, maxPriceValue, pageNumber, keyword, limitNumber]);

  return (
    <AppContext.Provider
      value={{
        data,
        isLoading,
        setMaxPrice,
        maxPrice,
        bedrooms,
        maxPriceValue,
        limitNumber,
        pageNumber,
        keyword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}