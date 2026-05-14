export default function Button({ children }) {
  return (
    <button className="bg-primary text-white px-6 py-3 rounded-xl hover:scale-105 transition duration-300 shadow-soft">
      {children}
    </button>
  );
}
