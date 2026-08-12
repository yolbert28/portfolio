export function Divider({ inView }: { inView: boolean }) {
  return (
    <div className="relative h-px w-full my-6 overflow-hidden">
      <div className="absolute inset-0 bg-white/10" />
      <div
        className="absolute inset-y-0 left-0 bg-linear-to-r from-transparent via-purple-400 to-transparent"
        style={{
          width: inView ? "100%" : "0%",
          transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: "300ms",
          opacity: 0.7,
        }}
      />
    </div>
  );
}
