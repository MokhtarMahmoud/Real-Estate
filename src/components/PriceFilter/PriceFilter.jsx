import { useAppContext } from "../../../context/context";

export default function PriceFilter() {
  const { maxPriceValue, updateParams } = useAppContext();

  function changePrice(value) {
    updateParams({ maxPrice: value });
  }

  return (
    <div>
      <h3 className="font-semibold mb-4">Price: 500, {maxPriceValue}</h3>

      <input
        type="range"
        min={500}
        max={6000}
        className="w-full"
        value={maxPriceValue}
        onChange={(e) => changePrice(e.target.value)}
      />

      <div className="flex justify-between text-sm mt-2">
        <span>$500</span>
        <span>$6000</span>
      </div>
    </div>
  );
}
