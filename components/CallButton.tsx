import { SITE } from "@/lib/site";

export default function CallButton({
  size = "md",
  label,
}: {
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  const sizeClass =
    size === "lg"
      ? "text-2xl px-8 py-5"
      : size === "sm"
        ? "text-sm px-3 py-1.5"
        : "text-base px-5 py-3";
  return (
    <a
      href={SITE.phoneHref}
      className={`inline-flex items-center gap-2 rounded-lg bg-gold font-bold text-ink hover:brightness-110 ${sizeClass}`}
      aria-label={`${SITE.manager} 매니저 전화 ${SITE.phone}`}
    >
      <span>📞</span>
      <span>{label ?? `${SITE.manager} ${SITE.phone}`}</span>
    </a>
  );
}
