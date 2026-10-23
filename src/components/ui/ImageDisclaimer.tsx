/** Overlay for car photos: the vehicle sent may differ in colour or variant. */
export default function ImageDisclaimer({ large = false }: { large?: boolean }) {
  const size = large
    ? "bottom-4 right-4 px-3 py-1.5 text-xs"
    : "bottom-3 right-3 px-2.5 py-1 text-[10px]";
  return (
    <span
      className={`pointer-events-none absolute rounded-full bg-primary-night/60 font-medium leading-none text-white/90 backdrop-blur ${size}`}
    >
      Representative image · colour &amp; model may vary
    </span>
  );
}
