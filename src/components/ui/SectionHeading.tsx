export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  onDark = false,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  onDark?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <p
        className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${
          onDark ? "text-accent" : "text-primary"
        }`}
      >
        {eyebrow}
      </p>
      <span
        className={`pinstripe ${centered ? "pinstripe--center" : ""}`}
        aria-hidden
      />
      <h2
        className={`mt-4 text-3xl font-semibold sm:text-4xl ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            onDark ? "text-white/70" : "text-ink-soft"
          }`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
