import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../../../context/context";

export default function PriceFilter() {
  const { maxPrice, setMaxPrice } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();

  function changePrice(maxValue) {
    setMaxPrice(maxValue);
    const params = new URLSearchParams(searchParams);
    params.set("price", maxValue);
    setSearchParams(params);
  }

  return (
    <div>
      <h3 className="font-semibold mb-4">Price: 500, {maxPrice}</h3>

      <input
        type="range"
        min={500}
        max={6000}
        className="w-full"
        value={maxPrice}
        onChange={(e) => changePrice(e.target.value)}
      />

      <div className="flex justify-between text-sm mt-2">
        <span>$500</span>
        <span>$6000</span>
      </div>
    </div>
  );
}
