import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="bg-white rounded-xl px-5 py-3 flex items-center shadow">
      <Search className="text-gray-400" size={18} />

      <input
        type="text"
        placeholder="Search..."
        className="ml-3 outline-none w-full"
      />
    </div>
  );
}
