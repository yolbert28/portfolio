export function SectionBadge({
  inView,
  number,
}: {
  inView: boolean;
  number: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-xs font-mono tracking-widest transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <span className="text-purple-500 select-none">//</span>
      <span className="text-purple-400 font-bold">{number}</span>
    </div>
  );
}
