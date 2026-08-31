import { OG_HEIGHT, OG_WIDTH, ogFile, ogSlug } from "@/lib/og";

/**
 * 본문 썸네일 — 직답 박스(없으면 h1) 바로 아래에 들어간다.
 *
 * [왜 본문에도 넣나] 네이버는 og:image 만 보고 썸네일을 띄우지 않는 경우가 많다.
 * 본문에 실제로 렌더되는 <img> 가 있어야 수집 대상이 된다.
 * og:image 와 반드시 같은 파일이어야 하므로 경로는 lib/og.ts 의 ogSlug() 를 쓴다.
 *
 * [주의] next/image 를 쓰지 않는다. 정적 export 라 최적화 파이프라인이 없고,
 * 네이버 수집기에는 원본 경로가 그대로 보이는 편이 확실하다.
 */
export default function OgThumb({
  pathname,
  alt,
  v,
}: {
  pathname: string;
  alt: string;
  /** ★ 2026-08-31 — 그림을 바꿀 때 붙이는 판 번호(ogV).
   *  이걸 안 받아서 og:image 는 -v2 를, 본문 <img> 는 판 번호 없는 파일을 가리켰다.
   *  같은 파일이어야 한다는 원칙이 깨져 있었다(4쪽). */
  v?: string;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={ogFile(ogSlug(pathname) + (v ?? ""))}
      alt={alt}
      width={OG_WIDTH}
      height={OG_HEIGHT}
      style={{ maxWidth: "100%", height: "auto" }}
      loading="eager"
      decoding="async"
    />
  );
}
