import PriceFilter from "../PriceFilter/PriceFilter";
import RatingFilter from "../RatingFilter/RatingFilter";
import FacilitiesFilter from "../FacilitiesFilter/FacilitiesFilter";
import AmenitiesFilter from "../AmenitiesFilter/AmenitiesFilter";

export default function Sidebar() {
  return (
    <aside className="col-span-3 bg-white rounded-xl shadow p-6 space-y-8 h-fit">
      <h2 className="font-bold text-xl">Filters</h2>

      <PriceFilter />

      <RatingFilter />

      <FacilitiesFilter />

      <AmenitiesFilter />
    </aside>
  );
}
