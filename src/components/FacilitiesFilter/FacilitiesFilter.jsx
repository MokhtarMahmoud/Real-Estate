import { useSearchParams } from "react-router-dom";

export default function FacilitiesFilter() {
  const items = new Set([1, 2, 3, 4]);
  const [searchParams, setSearchParams] = useSearchParams();

  function changeBedrooms(value) {
    const params = new URLSearchParams(searchParams);
    params.set("bedrooms", value);
    setSearchParams(params);
  }

  return (
    <div>
      <h3 className="font-semibold mb-4">Bedrooms</h3>
      {[...items]?.map((item, index) => (
        <label key={index} className="flex gap-2 mb-2">
          <input
            type="radio"
            checked={searchParams.get("bedrooms") === String(item)}
            onChange={() => changeBedrooms(item)}
          />
          {item}
        </label>
      ))}
    </div>
  );
}
