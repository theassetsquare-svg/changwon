import { SITE } from "@/lib/site";

export default function CallButton({
  size = "md",
  label,
  pulse = false,
  block = false,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  pulse?: boolean;
  block?: boolean;
}) {
  const sizeClass =
    size === "xl"
      ? "text-2xl sm:text-3xl px-8 py-5"
      : size === "lg"
        ? "text-xl px-7 py-4"
        : size === "sm"
          ? "text-sm px-3 py-2"
          : "text-base px-5 py-3";
  return (
    <a
      href={SITE.phoneHref}
      className={`${block ? "flex w-full" : "inline-flex"} ${pulse ? "cta-pulse" : ""} items-center justify-center gap-2 rounded-full bg-gold font-extrabold text-bg shadow-lg shadow-gold/20 transition hover:brightness-110 active:scale-[0.98] ${sizeClass}`}
      aria-label={`${SITE.manager} 매니저 전화 ${SITE.phone}`}
    >
      <span aria-hidden>📞</span>
      <span>{label ?? `${SITE.manager} ${SITE.phone}`}</span>
    </a>
  );
}
