import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  function changekeyword(value) {
    const params = URLSearchParams(searchParams);
    params.set("keyword", value);
    setSearchParams(params);
  }

  return (
    <div className="bg-white rounded-xl px-5 py-3 flex items-center shadow">
      <Search className="text-gray-400" size={18} />

      <input
        type="text"
        placeholder="Search..."
        className="ml-3 outline-none w-full"
        onChange={(e) => changekeyword(e.currentTarget.value)}
      />
    </div>
  );
}
