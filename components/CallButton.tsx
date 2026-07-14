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
      href={SITE.kakaoHref}
      className={`${block ? "flex w-full" : "inline-flex"} ${pulse ? "cta-pulse" : ""} items-center justify-center gap-2 rounded-full bg-[#FEE500] font-extrabold text-[#3C1E1E] shadow-lg shadow-yellow-400/20 transition hover:brightness-105 active:scale-[0.98] ${sizeClass}`}
      aria-label="카카오톡 광고문의 besta12"
    >
      <span aria-hidden>💬</span>
      <span>{label ?? `카카오톡 ${SITE.kakao}`}</span>
    </a>
  );
}
