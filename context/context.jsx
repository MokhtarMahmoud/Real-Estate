import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [searchParams] = useSearchParams();
  const bedrooms = searchParams.get("bedrooms") || "";
  const minPriceValue = 500;
  const maxPriceValue = searchParams.get("Price") || 6000;
  useEffect(() => {
    async function fetchData() {
      setIsloading(true);
      try {
        const res = await fetch(
          `https://backend-dev.yozya.com/api/v1/mobile/real-estates?bedrooms=${bedrooms}&price[]=${minPriceValue}&price[]=${maxPriceValue}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "x-api-key":
                "base64:NnQp8jV6bp5tErWgwYoKjSY0YODOO4maVCrkqWCFgT8=",
              "Accept-Language": "en",
              platform: "web",
              "app-version": "1.1",
              "X-Currency": "EGP",
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
  }, [bedrooms, maxPriceValue]);

  return (
    <AppContext.Provider
      value={{
        data,
        isLoading,
        setMaxPrice,
        maxPrice,
        bedrooms,
        maxPriceValue,
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
