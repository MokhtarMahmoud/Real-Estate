const ratings = ["0", "1", "2", "3", "4"];

export default function RatingFilter() {
  return (
    <div>
      <h3 className="font-semibold mb-3">Rating</h3>

      <div className="flex gap-2 flex-wrap">
        {ratings.map((rating) => (
          <button
            key={rating}
            className="border rounded-lg px-3 py-1 hover:bg-cyan-500 hover:text-white"
          >
            {rating}+
          </button>
        ))}
      </div>
    </div>
  );
}
