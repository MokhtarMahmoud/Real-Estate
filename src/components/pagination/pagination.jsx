import { useAppContext } from "../../../context/context";

export default function Pagination() {
  const { pageNumber, totalPages, goToPage, nextPage, prevPage } =
    useAppContext();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 justify-center mt-6">
      <button
        onClick={prevPage}
        disabled={pageNumber === 1}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={`px-3 py-1 border rounded ${
            p === pageNumber ? "bg-black text-white" : ""
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={nextPage}
        disabled={pageNumber === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
