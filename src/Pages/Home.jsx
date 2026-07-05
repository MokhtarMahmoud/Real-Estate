import Header from "../components/Header/Header";
import Sidebar from "../components/SideBar/SideBar";
import SearchBar from "../components/SearchBar/SearchBar";
import PropertyGrid from "../components/PropertyGrid/PropertyGrid";
import { useAppContext } from "../../context/context";
import { Loader } from "lucide-react";
import Pagination from "../components/pagination/pagination";

export default function Home() {
  const { isLoading } = useAppContext();

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-8">
        <Header />

        <div className="grid grid-cols-12 gap-8 mt-8">
          <Sidebar />

          <div className="col-span-9">
            <SearchBar />
            {isLoading ? (
              <Loader
                className="flex justify-center items-center w-full mt-24"
                size={40}
              />
            ) : (
              <PropertyGrid />
            )}
            <Pagination />
          </div>
        </div>
      </div>
    </main>
  );
}
