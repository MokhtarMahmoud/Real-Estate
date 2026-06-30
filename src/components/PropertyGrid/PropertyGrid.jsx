import PropertyCard from "../PropertyCard/PropertyCard";

export default function PropertyGrid() {
  return (
    <>
      <div className="grid grid-cols-2 gap-6 mt-8">
        <PropertyCard />
      </div>
    </>
  );
}
