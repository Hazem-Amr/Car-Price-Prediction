export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-4xl font-bold mb-3">{title}</h2>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
}
