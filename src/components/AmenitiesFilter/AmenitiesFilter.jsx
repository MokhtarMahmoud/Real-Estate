const items = ["24hr front desk", "Air-conditioned", "Fitness", "Pool"];

export default function AmenitiesFilter() {
  return (
    <div>
      <h3 className="font-semibold mb-4">Amenities</h3>

      {items.map((item) => (
        <label key={item} className="flex gap-2 mb-2">
          <input type="checkbox" />
          {item}
        </label>
      ))}
    </div>
  );
}
