import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PAGE_META, SITE, SITE_OTHER } from "@/lib/site";
import { thumb } from "@/lib/og";

const m = PAGE_META["/photo"];

/** 이 페이지 전용 썸네일 — og:image 와 본문 <img> 가 같은 파일을 가리킨다 */
const THUMB = thumb({
  pathname: "/photo",
  alt: `${SITE.nameNoSpace} 홀 구역 안내`,
});
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/photo" },
  openGraph: {
    url: "/photo",   /* og:url — canonical 과 같게 (네이버 오픈그래프 필수) */
    title: m.title,
    description: m.description,
    images: THUMB.images,
  },
  twitter: {
    card: "summary",
    title: m.title,
    description: m.description,
    images: [THUMB.url],
  },
  other: { ...SITE_OTHER, ...THUMB.other },
};

const PHOTO_FAQ = [
  {
    q: "이 쪽에 그림이 왜 없나요?",
    a: "확인되지 않은 그림은 올리지 않기 때문입니다. 다른 가게 그림을 가져와 채우는 일은 하지 않습니다. 대신 홀 구조를 글로 자세히 적어 두었습니다.",
  },
  {
    q: "자리를 미리 알고 싶으면 어떻게 하나요?",
    a: "010-7528-4936으로 전화 주시면 입구에서 자리까지 어떤 순서인지 말로 안내해 드립니다.",
  },
  {
    q: "적힌 내용과 실제가 다른 경우 있나요?",
    a: "없도록 합니다. 확인되지 않은 항목은 적지 않고, 바뀔 수 있는 것은 바뀔 수 있다고 밝혀 둡니다.",
  },
];

export default function PhotoPage() {
  return (
    <PageShell
      title="창원룰루랄라나이트 홀 구역 안내"
      hook={m.hook}
      pathname="/photo"
      thumbAlt={THUMB.alt}
    >
      <p>
        다른 가게 그림 갖다 쓰는 데 많죠. 저희는 안 합니다. 확인되지 않은 그림은
        아예 올리지 않습니다.{" "}
        <strong className="text-white">창원 룰루랄라 나이트</strong> 의 홀이 어떻게
        나뉘는지는 아래에 글로 적어 두었습니다.
      </p>

      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        aria-label="창원 룰루랄라 나이트 홀 구역 목록"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-line bg-elev text-xs text-gray-500"
          >
            홀 구역 {i + 1}
          </div>
        ))}
      </div>

      <h2 className="pt-2 text-xl font-bold text-white">그림을 올리지 않는 이유</h2>
      <p>
        다른 가게 그림을 빌려와서 채울 수도 있었지만, 그러면 가셨을 때 "보던 것과
        다르네" 소리 듣습니다. 저희는 그런 거 안 합니다. 그래서 이 쪽에는 그림을
        올리지 않고, 입구·룸·테이블·바·VIP 자리를 손님 동선 순으로 글로만 적어
        두었습니다. 확인되지 않은 것은 적지 않습니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">미리 알고 싶으시면</h2>
      <p>
        전화로 물어보시면 말로 안내해 드립니다 —{" "}
        <a href={SITE.phoneHref} className="font-extrabold text-gold underline">전화 {SITE.phone}</a>
        . 가실 자리 미리 보고 결정하시면 도착했을 때 어색함이 훨씬 줄어듭니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">그림에 대한 우리 원칙</h2>
      <ul className="space-y-2 text-gray-300">
        <li>다른 가게 그림을 가져다 쓰지 않습니다</li>
        <li>합성·AI 로 만든 그림을 쓰지 않습니다</li>
        <li>사람이 나오는 그림은 어떤 경우에도 올리지 않습니다</li>
        <li>확인되지 않은 것은 글로도 적지 않습니다</li>
        <li>바뀔 수 있는 항목은 바뀔 수 있다고 밝혀 둡니다</li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">홀 안내 관련 자주 묻는 질문</h2>
      <div className="space-y-2">
        {PHOTO_FAQ.map((item) => (
          <details
            key={item.q}
            className="rounded-2xl border border-line bg-elev p-4 transition open:border-gold"
          >
            <summary className="pr-8 font-semibold text-white">{item.q}</summary>
            <p className="mt-3 text-gray-300">{item.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PHOTO_FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </PageShell>
  );
}
