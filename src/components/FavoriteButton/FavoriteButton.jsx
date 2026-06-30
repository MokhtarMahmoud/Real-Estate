import { Heart } from "lucide-react";

export default function FavoriteButton() {
  return (
    <button className="border rounded-full p-2 hover:bg-cyan-500 hover:text-white transition">
      <Heart size={18} />
    </button>
  );
}
