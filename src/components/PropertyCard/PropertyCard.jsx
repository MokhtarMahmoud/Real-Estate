import PropertyInfo from "../PropertyInfo/PropertyInfo";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useAppContext } from "../../../context/context";

export default function PropertyCard() {
  const { data } = useAppContext();
  console.log(data);
  return (
    <>
      {data?.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl overflow-hidden shadow hover:cursor-pointer hover:-translate-y-1 duration-200"
        >
          <img
            src={item.icon}
            alt={item.description}
            className="h-52 w-full object-cover"
          />

          <div className="p-5">
            <div className="flex justify-between">
              <h3 className="text-cyan-500 font-bold">
                {item.weekend_amount}$ /weekend
              </h3>

              <FavoriteButton />
            </div>

            <h2 className="font-bold text-xl mt-2">{item.name}</h2>

            <p className="text-gray-500 mt-2">{item.address}</p>

            <PropertyInfo
              bathrooms={item.bathrooms}
              bedrooms={item.bedrooms}
              size={item.size}
            />
          </div>
        </div>
      ))}
    </>
  );
}
