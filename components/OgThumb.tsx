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
}: {
  pathname: string;
  alt: string;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={ogFile(ogSlug(pathname))}
      alt={alt}
      width={OG_WIDTH}
      height={OG_HEIGHT}
      style={{ maxWidth: "100%", height: "auto" }}
      loading="eager"
      decoding="async"
    />
  );
}
