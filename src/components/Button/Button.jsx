export default function Button({ children }) {
  return (
    <button className="bg-cyan-500 text-white rounded-lg px-6 py-3 hover:bg-cyan-600 transition">
      {children}
    </button>
  );
}
