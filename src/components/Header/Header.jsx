import Button from "../Button/Button";
import Tabs from "../Tabs/Tabs";

export default function Header() {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <Tabs />

      <div className="grid grid-cols-4 gap-6 mt-5">
        <div>
          <p className="text-gray-400 text-sm">Community</p>
          <h3 className="font-semibold">North Coast, Egypt</h3>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Unit type</p>
          <h3 className="font-semibold">Chalet, Apartment</h3>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Staying date</p>
          <h3 className="font-semibold">1 Jun - 15 Oct</h3>
        </div>

        <Button>Browse Properties</Button>
      </div>
    </div>
  );
}
