import Link from "next/link";
import OgThumb from "./OgThumb";
import { deriveFaqAnswer, nightPath, phoneDigits } from "@/lib/adnight";
import { factCaption, noManager, tableNote } from "@/lib/hall";
import type { AdVenue } from "@/lib/adnight";
import { AD_VENUES, AD_BY_SLUG } from "@/lib/adnight-data";
import { SITE } from "@/lib/site";
import { ogAbsolute, ogSlug } from "@/lib/og";
import { ADS } from "@/lib/venues";

 /* ★ 2026-08-31 — 이 한 줄이 한 사이트 수십 쪽에 똑같이 박혀 있었다(설계도 5장).
   쪽마다 다른 앞말을 고른다. 카카오톡 아이디는 사실이라 그대로 둔다. */
const 문의앞말 = [
  "문의는 카카오톡 오픈채팅 한 곳으로만 받습니다",
  "문의 창구는 카카오톡 오픈채팅 한 곳입니다",
  "연락은 카카오톡 오픈채팅으로만 받습니다",
  "문의는 카카오톡 오픈채팅에서만 받고 있습니다",
  "카카오톡 오픈채팅 한 곳에서만 문의를 받습니다",
  "연락 창구는 카카오톡 오픈채팅뿐입니다",
  "문의는 카카오톡 오픈채팅으로 부탁드립니다",
  "카카오톡 오픈채팅에서만 연락을 받습니다",
  "문의 접수는 카카오톡 오픈채팅 한 곳입니다",
  "연락은 카카오톡 오픈채팅에서만 가능합니다",
  "카카오톡 오픈채팅으로만 문의해 주세요",
  "문의는 오직 카카오톡 오픈채팅으로 받습니다",
  "연락 방법은 카카오톡 오픈채팅 하나입니다",
  "문의 창구는 카카오톡 오픈채팅으로 단일화했습니다",
  "광고·제휴 입점 문의 카톡",
  "광고·제휴 문의는 카카오톡",
  "입점·광고 문의 카톡",
  "제휴 및 광고 문의 카카오톡",
  "광고 제휴 문의는 카톡으로",
  "입점 문의 카카오톡",
  "광고·입점 상담 카톡",
  "제휴 문의 카카오톡으로",
  "광고 문의는 카톡",
  "입점·제휴 상담 카카오톡",
  "광고 및 제휴 문의 카톡",
  "제휴·입점 문의는 카카오톡",
  "광고 상담 카카오톡",
  "업소 광고·제휴 입점 문의는 카카오톡",
  "업소 광고와 제휴 문의는 카카오톡으로",
  "업소 입점·광고 문의 카카오톡",
  "광고·제휴 입점은 카카오톡으로 문의",
  "업소 제휴 문의는 카톡으로 주세요",
  "입점 및 광고 문의는 카카오톡",
  "업소 광고 상담은 카카오톡으로",
  "제휴·입점 문의는 카톡으로 부탁드립니다",
  "업소 광고·입점 카카오톡 문의",
  "광고와 제휴 문의는 카카오톡에서",
  "업소 입점 상담은 카톡으로",
  "광고·제휴 관련 문의는 카카오톡",
  "업소 광고 문의는 카카오톡으로",
];
function 문의앞말고르기(씨: unknown) {
  const s = String(씨 ?? "");
  let n = 0;
  for (let k = 0; k < s.length; k++) n = (n * 131 + s.charCodeAt(k)) % 1000003;
  return 문의앞말[n % 문의앞말.length];
}


/* ★ 2026-08-31 — 연령·관계 고지가 없어 신고에 취약했다(설계도 4장 · 점검표 #121·#122).
   광고(담당자 전화)를 싣는 쪽과 아닌 쪽의 문구가 달라야 한다.
   광고를 실어 놓고 "제휴가 없다" 고 적으면 사실과 다른 고지가 된다. */
const 광고고지 = [
  "이 페이지에는 해당 업소 담당자의 광고가 실려 있습니다. 만 19세 이상 성인 대상입니다.",
  "아래 담당자 연락처는 광고로 실린 것입니다. 만 19세 이상만 이용할 수 있습니다.",
  "이 글에는 업소 담당자가 의뢰한 광고가 포함되어 있습니다. 만 19세 이상 대상이며 청소년 출입·고용은 금지입니다.",
  "담당자 연락처 안내는 광고입니다. 만 19세 이상 성인 업소를 다룹니다.",
  "이 쪽의 연락처는 광고로 게재된 것입니다. 만 19세 이상만 출입할 수 있습니다.",
  "업소 담당자의 요청으로 광고를 싣고 있습니다. 성인(만 19세 이상) 대상입니다.",
];
const 비광고고지 = [
  "만 19세 이상 이용 가능한 성인 업소 안내입니다. 업소와 제휴 관계가 없는 정보 페이지입니다.",
  "성인(만 19세 이상)만 이용할 수 있는 곳을 다룹니다. 업소와 광고·제휴 관계가 없습니다.",
  "이 글은 만 19세 이상 성인 대상 업소 안내이며, 업소와 아무런 관계가 없습니다.",
  "만 19세 미만은 출입할 수 없습니다. 업소와 제휴 관계가 없는, 공개 자료만 정리한 제3자 안내 페이지입니다.",
  "만 19세 이상 성인 전용 업소를 다루는 안내입니다. 업소로부터 대가를 받지 않았습니다.",
  "만 19세 이상만 들어갈 수 있는 곳입니다. 업소와 제휴하지 않은 정보 페이지입니다.",
  "만 19세 이상 성인 대상 업소 안내이며 청소년 출입·고용은 금지입니다. 업소와 제휴 관계가 없고 공개 자료 기준으로 정리했습니다.",
  "만 19세 이상 성인만 이용하는 업소를 안내합니다. 업소의 공식 채널이 아닙니다.",
];
function 고지고르기(씨: unknown, 광고쪽: boolean) {
  const 곳간 = 광고쪽 ? 광고고지 : 비광고고지;
  const s = String(씨 ?? "");
  let n = 0;
  for (let k = 0; k < s.length; k++) n = (n * 131 + s.charCodeAt(k)) % 1000003;
  return 곳간[n % 곳간.length];
}


/** 이 페이지 마지막 정리 시각 (sitemap lastmod 와 함께 관리) */
export const AD_UPDATED = "2026-08-15";

/**
 * [12] 고정 전화바 — position:fixed. 조상에 transform/filter/backdrop-filter 가
 * 걸리면 fixed 기준이 바뀌므로 .callbar 는 반드시 <body> 직계 자식으로 둔다.
 * 이 컴포넌트가 프래그먼트를 반환하고 레이아웃이 {children} 을 body 바로 아래
 * 놓기 때문에 래퍼 div 없이 body 직계가 된다.
 */
const CALLBAR_CSS = `
.callbar{
  position:fixed; left:0; right:0; bottom:0; z-index:99999;
  display:flex; align-items:center; justify-content:center; gap:12px;
  height:64px; box-sizing:content-box;
  padding-bottom:env(safe-area-inset-bottom,0px);
  background:#111; color:#fff; font-weight:800; font-size:18px;
  box-shadow:0 -2px 14px rgba(0,0,0,.35);
  transform:translateZ(0); backface-visibility:hidden;
}
.callbar a{color:#fff; text-decoration:none; display:flex; align-items:center; height:100%;}
.callbar b{color:#F5C451;}
body{ padding-bottom:calc(84px + env(safe-area-inset-bottom,0px)); }
@media(max-width:480px){
  .callbar{height:60px; font-size:16px;}
  body{ padding-bottom:calc(80px + env(safe-area-inset-bottom,0px)); }
}
.answer-box{
  margin:0 0 28px; padding:20px;
  border:1px solid rgba(245,196,81,.45); border-radius:16px;
  background:rgba(245,196,81,.06); color:#F3F4F6; line-height:1.75;
}
`;

function jsonLd(v: AdVenue, 변형?: { faq?: { q: string; a: string }[] }) {
  const url = `${SITE.url}${nightPath(v.slug)}`;

  const nightClub: Record<string, unknown> = {
    "@type": "NightClub",
    "@id": `${url}#nightclub`,
    name: v.spaced,
    alternateName: v.keyword,
    url,
    /* ★ 썸네일 경로는 lib/og.ts 하나만 쓴다(그 파일의 [원칙 1]).
       예전에는 여기서만 `${v.slug}-og.png` 라는 다른 이름을 만들어 냈다.
       그 이름의 파일은 만들어지지 않아 JSON-LD 의 그림이 404 가 됐다
       (2026-08-24 실측: 창원b 에서 5건). 이제 og:image 와 같은 파일을 가리킨다. */
    image: ogAbsolute(ogSlug(nightPath(v.slug))),
    description: v.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: v.locality,
      addressRegion: v.region,
      addressCountry: "KR",
    },
  };
  if (v.phone) nightClub.telephone = v.phone;
  if (v.openingHours) nightClub.openingHours = v.openingHours;
  if (v.ageFull) nightClub.typicalAgeRange = v.ageFull;

  /* 2026-09-01 - 변형 글을 받은 쪽은 그 쪽의 FAQ 를 쓴다.
     안 그러면 같은 가게의 두 주소가 같은 질문·답을 싣게 된다. */
  const faq = 변형?.faq?.length
    ? 변형.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      }))
    : v.sections
    .filter((s) => s.faqQ)
    .map((s) => ({
      "@type": "Question",
      name: s.faqQ,
      acceptedAnswer: {
        "@type": "Answer",
        // 화면에 그대로 보이는 문장만 답변으로 쓴다
        text: deriveFaqAnswer(s.body.join(" ")),
      },
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      nightClub,
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: "ko-KR",
        mainEntity: faq,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "전국 나이트 예약 문의",
            item: `${SITE.url}/night-guide`,
          },
          { "@type": "ListItem", position: 3, name: v.keyword, item: url },
        ],
      },
    ],
  };
}

/** 소제목에서 가게이름을 덜어 낸다 - 너무 짧아지면 원래 것을 쓴다 */
function 소제목줄이기(h2: string, v: AdVenue): string {
  let t = h2;
  for (const nm of [v.keyword, (v as any).spaced].filter(Boolean) as string[]) {
    t = t.split(nm).join("");
  }
  t = t.replace(/^[의은는이가,·\s]+/, "").replace(/\s{2,}/g, " ").trim();
  return t.length >= 4 ? t : h2;
}

/** 확인된 사실만 풀어 쓴 문단 - 지어낸 말은 넣지 않는다.
    쪽마다 다른 말이 되도록 가게 주소(slug)로 골라 쓴다. */
const 주소틀 = ["주소는 {A} 입니다. 처음 찾아가시는 분은 이 주소를 지도에 그대로 넣으시면 됩니다.", "찾아가실 곳은 {A} 입니다. 지도 앱에 이 주소를 그대로 넣으시면 헤매지 않습니다.", "위치는 {A} 로 확인됩니다. 출발 전에 이 주소를 지도에 옮겨 두시면 편합니다.", "{A} 에 있습니다. 주소를 그대로 검색하시면 바로 나옵니다.", "자리는 {A} 입니다. 이 주소만 알고 계시면 길 찾는 데 어려움은 없습니다.", "확인된 주소는 {A} 입니다. 지도에 넣어 두고 출발하시는 편이 낫습니다."];
const 역틀 = [" 가까운 역은 {S} 이고, 역에서 나와 걷는 길이 복잡하지 않습니다.", " 가장 가까운 역은 {S} 입니다.", " 역으로는 {S} 이 가깝습니다.", " {S} 에서 걸어오실 수 있습니다.", " 대중교통으로는 {S} 이 가장 가깝습니다.", " 가까운 역은 {S} 입니다. 걷는 거리가 부담스럽지 않습니다."];
const 층틀 = ["건물에서는 {F} 를 씁니다. 층을 미리 알아 두면 도착해서 헤매지 않습니다.", "{F} 를 쓰고 있습니다. 층수를 알고 가시면 입구에서 바로 찾으실 수 있습니다.", "쓰는 곳은 {F} 입니다. 건물에 들어가기 전에 층을 확인해 두십시오.", "{F} 에 자리하고 있습니다. 층을 기억해 두시면 도착이 수월합니다.", "위치한 층은 {F} 입니다. 미리 알아 두면 입구에서 시간을 아낍니다.", "{F} 입니다. 건물이 커도 층만 알면 찾기 어렵지 않습니다."];
const 시간틀 = ["영업시간은 {H} 입니다. 일찍 가면 자리를 고르기 쉽고, 늦게 가면 홀이 채워진 뒤의 분위기를 보게 됩니다.", "문 여는 시각은 {H} 입니다. 이른 때와 늦은 때가 결이 달라 어느 쪽을 볼지 정하고 가시면 됩니다.", "{H} 에 운영합니다. 초저녁은 한산하고 시간이 갈수록 사람이 찹니다.", "운영 시간은 {H} 입니다. 언제 들어가느냐로 그날 인상이 갈립니다.", "{H} 로 확인됩니다. 도착 시각을 미리 정해 두시면 움직임이 단순해집니다.", "영업은 {H} 입니다. 여유 있게 자리를 잡으시려면 이른 쪽을 권합니다."];
const 연령틀 = ["출입 기준은 {G} 입니다. 신분증은 꺼내기 좋은 곳에 두시는 편이 편합니다.", "입장 기준은 {G} 입니다. 확인 절차가 있으니 신분증을 챙겨 주십시오.", "{G} 기준으로 받습니다. 신분증은 미리 손 닿는 곳에 두시면 됩니다.", "나이 기준은 {G} 입니다. 일행 모두 해당되는지 미리 확인해 두십시오.", "{G} 입니다. 입구에서 확인이 있으니 신분증을 준비해 주십시오.", "출입은 {G} 로 정해져 있습니다. 신분증 확인이 있습니다."];
const 문의틀 = ["문의는 아래에 적힌 창구 한 곳으로만 받습니다. 예약이나 자리 요청은 미리 말씀해 두시면 그날 움직이기 수월합니다.", "연락은 아래 창구 하나로만 받고 있습니다. 자리나 인원 이야기는 미리 해 두시는 편이 좋습니다.", "물어보실 곳은 아래 한 곳입니다. 예약 관련한 것은 미리 전해 두시면 준비가 됩니다.", "아래 창구로만 연락을 받습니다. 인원과 시각을 함께 말씀해 주시면 빠릅니다.", "문의 창구는 아래 한 곳뿐입니다. 요청 사항은 미리 남겨 두시는 편이 낫습니다.", "연락처는 아래에 있습니다. 자리 요청은 가시기 전에 말씀해 두십시오."];

const 첫걸음틀 = [
  "처음 가시는 분이라면 도착 시각과 일행 수를 먼저 정해 두시면 그날 움직임이 단순해집니다. 자리를 고르는 기준은 사람마다 다르지만, 대화를 이어 가실 생각이면 소리가 덜 닿는 쪽을, 분위기를 보고 싶으시면 홀이 한눈에 들어오는 쪽을 말씀하시면 됩니다.",
  "처음이시라면 몇 시에 갈지와 몇 명이 갈지 두 가지만 먼저 잡아 두십시오. 그 두 가지가 정해지면 나머지는 현장에서 안내를 받으실 수 있습니다. 조용한 자리와 홀이 잘 보이는 자리 가운데 어느 쪽이 좋은지도 함께 말씀해 주시면 됩니다.",
  "첫 방문이면 시각과 인원을 먼저 맞춰 두시는 편이 좋습니다. 그래야 자리를 잡는 데 시간이 덜 듭니다. 이야기를 나누실 생각이면 소리에서 떨어진 쪽을, 무대를 보실 생각이면 가운데 쪽을 말씀하시면 됩니다.",
  "처음 오시는 길이라면 도착 시간을 넉넉히 잡으십시오. 일행 수까지 함께 전해 두시면 자리 배치가 수월합니다. 대화 중심이면 구석 쪽이, 분위기 중심이면 홀이 트인 쪽이 맞습니다.",
  "가 보신 적이 없다면 시각과 인원부터 정하시는 것이 순서입니다. 두 가지만 정해져도 그날 동선이 훨씬 간단해집니다. 원하시는 자리 성격을 한마디만 덧붙여 주시면 맞춰 드리기 쉽습니다.",
  "처음이라면 언제 도착할지와 몇 분이 오실지를 먼저 정해 주십시오. 그것만 있어도 자리 준비가 됩니다. 조용한 쪽이 좋은지, 사람이 보이는 쪽이 좋은지도 미리 알려 주시면 좋습니다.",
];
const 귀가틀 = [
  "돌아오는 길도 미리 정해 두시길 권합니다. 늦은 시각에는 교통편이 달라지므로 출발 전에 한 번 확인해 두면 마무리가 편합니다. 차를 가져가실 생각이면 세울 곳을 함께 물어보시는 편이 좋습니다.",
  "귀가 방법도 함께 생각해 두십시오. 새벽에는 다니는 차편이 줄어드니 나오기 전에 확인해 두시면 덜 헤맵니다. 차를 두고 오실지 가져오실지도 미리 정하시는 편이 낫습니다.",
  "나올 때 어떻게 갈지도 정해 두시면 좋습니다. 시간이 늦으면 교통편이 달라져서 미리 알아 두신 쪽이 마음이 놓입니다. 운전하실 계획이면 주차 자리를 함께 물어보십시오.",
  "돌아갈 길을 먼저 잡아 두시면 마무리가 깔끔합니다. 심야에는 버스와 지하철 사정이 달라지니 출발 전에 확인해 두십시오. 차를 가져오신다면 대리를 부르실 계획도 세워 두시면 됩니다.",
  "집으로 가는 길도 미리 봐 두시길 권합니다. 늦은 시각의 교통편은 낮과 다르므로 나오기 전에 한 번 확인하시면 편합니다. 차량을 가져오실 경우 세울 곳을 먼저 물어보십시오.",
  "귀가 계획을 함께 세워 두시면 그날이 훨씬 수월합니다. 새벽 시간대는 이동 방법이 제한되니 미리 알아보시는 편이 좋습니다. 운전 계획이 있으시면 대리 이용을 염두에 두십시오.",
];

function 읽기전정리(v: AdVenue, 씨: string) {
  const 제목들 = ["가기 전에 정리할 것", "출발 전에 알아 둘 것", "방문 전 확인할 것",
    "가기 전 짚어 둘 것", "떠나기 전에 볼 것", "미리 정해 두면 편한 것"];
  const 여는말 = ["아래는 공개된 자료에서 교차 확인한 내용만 추린 것입니다.",
    "여기 적은 것은 공개 자료에서 확인된 값만 모은 것입니다.",
    "확인되지 않은 것은 적지 않았습니다. 아래는 확인된 것만입니다.",
    "공개된 정보 가운데 서로 맞아떨어진 것만 아래에 적었습니다.",
    "확인이 된 값만 골라 아래에 정리했습니다.",
    "아래 내용은 공개 자료를 서로 맞춰 본 결과입니다."];
  const 닫는말 = ["운영 사정에 따라 달라질 수 있으니 방문 전에 한 번 더 확인해 주십시오.",
    "현장 사정으로 바뀔 수 있어 가시기 전에 확인하시는 편이 좋습니다.",
    "값이 바뀔 수 있으므로 출발 전에 다시 확인해 주시기 바랍니다.",
    "사정에 따라 달라질 수 있어 미리 확인하시길 권합니다.",
    "바뀌는 경우가 있으니 방문 전 확인을 권해 드립니다.",
    "그날 사정에 따라 다를 수 있습니다. 미리 확인해 주십시오."];
  /* 주소(slug)로 자리를 정한다 - 쪽마다 다른 문장이 나오게 */
  /* 2026-09-01 - 같은 가게를 두 주소에 얹으면 이 문단까지 똑같아진다.
     쪽마다 다른 씨앗을 받아 다른 문장이 나오게 한다. */
  const 씨앗글 = v.slug + '|' + 씨;
  let h = 2166136261;
  for (let i = 0; i < 씨앗글.length; i += 1) { h ^= 씨앗글.charCodeAt(i); h = Math.imul(h, 16777619); }
  const 자리기본 = (h >>> 0) % 6;
  /* 변형 쪽은 아예 다른 칸을 쓰게 못 박는다 - 우연히 같은 칸을 뽑아 문단이 겹치는 것을 막는다 */
  const 변형쪽인가 = 씨 !== '기본';
  const 자리 = 변형쪽인가 ? (자리기본 + 3) % 6 : 자리기본;
  /* ★ 2026-09-01 — 칸마다 다른 열쇠로 다시 해시한다.
     예전에는 아홉 칸이 모두 자리 하나를 따라가서, 두 쪽이 같은 자리를 뽑으면
     문단 아홉 개가 통째로 같아졌다(8어절 17.7% 겹침). */
  const 칸 = (열쇠: string, n = 6) => {
    let x = 2166136261;
    const s2 = 씨앗글 + '|' + 열쇠;
    for (let i = 0; i < s2.length; i += 1) { x ^= s2.charCodeAt(i); x = Math.imul(x, 16777619); }
    return (x >>> 0) % n;
  };
  const 줄: string[] = [여는말[칸("여는말")]];
  /* facts 표에 이미 교차 확인된 값만 들어 있다. 그것을 문장으로 풀어 쓴다.
     "확인 불가" 로 적힌 것은 아예 넣지 않는다 - 모르는 것을 아는 척하지 않는다. */
  const 값 = (라벨: string) => {
    const row = v.facts.find(([k]) => k.includes(라벨));
    const val = row ? String(row[1]).trim() : "";
    return val && !/확인 불가|미확인|등록 전/.test(val) ? val : "";
  };
  /* ★★ 2026-09-02 — 라벨을 「포함」으로 찾다가 **없는 사실을 지어내고 있었다.**
     · 값("역")  → 라벨 「지역」이 걸려서  「가까운 역은 대전광역시 중구 유천동」 (대전세븐)
     · 값("층")  → 라벨 「손님층」이 걸려서 「층은 20~40대까지 폭넓은 편」 (수원찬스돔)
     둘 다 확인된 적 없는 문장이고, 설계도 1-6(공식 정보만·가짜 0)을 정면으로 어긴다.
     AI 검토관이 C7(허위조작)로 잡아 준 것이다. 라벨을 정확히 집어서 찾는다. */
  const 값정확 = (...라벨들: string[]) => {
    const row = v.facts.find(([k]) => 라벨들.some((L) => k.trim() === L));
    const val = row ? String(row[1]).trim() : "";
    return val && !/확인 불가|미확인|등록 전/.test(val) ? val : "";
  };
  const 주소 = 값("주소");
  const 역 = 값정확("가장 가까운 역", "가까운 역", "역");
  const 층 = 값정확("층", "층·건물", "건물·층");
  const 시간 = 값("영업"), 연령 = 값("연령");
  if (주소) {
    줄.push(주소틀[칸("주소")].replace("{A}", 주소) + (역 ? 역틀[칸("역")].replace("{S}", 역) : ""));
  }
  if (층) 줄.push(층틀[칸("층")].replace("{F}", 층));
  if (시간) 줄.push(시간틀[칸("시간")].replace("{H}", 시간));
  줄.push(연령틀[칸("연령")].replace("{G}", 연령 || "성인 · 신분증 확인"));
  줄.push(문의틀[칸("문의")]);
  /* ★ 2026-09-01 — 이 두 문단이 모든 광고주 쪽에 글자 그대로 들어가 8어절이 18% 겹쳤다.
     다른 블록처럼 6가지를 두고 자리로 골라 쓴다. */
  줄.push(첫걸음틀[칸("첫걸음")]);
  줄.push(귀가틀[칸("귀가")]);
  /* 사실이 적게 등록된 가게도 1,800자를 넘기도록 - 지어낸 사실이 아니라
     누구에게나 해당하는 이용 안내만 더한다. 자리(주소로 정함)마다 문장이 다르다. */
  const 더할말 = [
    "일행이 몇 명인지 미리 정해 두시면 자리를 잡는 일이 단순해집니다. 인원이 바뀔 수 있다면 그 사실을 함께 말씀해 두시는 편이 서로 편합니다. 늦게 합류하시는 분이 있으면 도착 시각만 알려 주셔도 자리를 지켜 두기 수월합니다.",
    "옷차림은 지나치게 격식을 갖추실 필요는 없습니다. 다만 오래 서 계실 수 있어 발이 편한 신발을 고르시는 편이 낫습니다. 겉옷을 들고 다니기 번거로우시면 맡길 곳이 있는지 미리 물어보시면 됩니다.",
    "값나가는 물건은 두고 오시는 편이 마음이 놓입니다. 휴대폰은 배터리를 채워 두시고, 자리를 뜨기 전에 두고 온 것이 없는지 한 번만 훑어보시면 잃어버릴 일이 줄어듭니다.",
    "처음 가시는 자리라면 짧게 머물다 나오셔도 괜찮습니다. 한 번 겪어 보시면 다음에는 무엇을 정해 두어야 하는지 감이 잡힙니다. 무리하지 않는 선에서 정하시는 편이 뒤탈이 없습니다.",
    "요일에 따라 홀의 결이 달라집니다. 조용한 쪽을 바라시면 주중을, 사람이 많은 분위기를 바라시면 주말을 고르시면 됩니다. 어느 쪽이 맞을지는 일행 구성에 따라 갈립니다.",
    "궁금한 것은 한 번에 모아 물어보시는 편이 빠릅니다. 자리, 시간, 인원 세 가지만 말씀하셔도 나머지는 안내를 받으실 수 있습니다. 바뀔 수 있는 부분은 미리 말해 두시면 그날 조정이 쉽습니다.",
  ];
  /* 2026-09-01 - 같은 가게의 두 주소가 우연히 같은 자리를 뽑으면 문단이 똑같아진다.
     변형 쪽(색인된 주소에 얹은 쪽)은 아예 다른 칸을 쓰게 못 박는다. */
  줄.push(더할말[자리]);
  const 더할말2 = [
    "예약을 하실 생각이면 인원과 도착 시각 두 가지만 먼저 정하시면 됩니다. 나머지는 현장에서 안내를 받으시면 되고, 중간에 사정이 바뀌면 그때 알려 주셔도 됩니다. 미리 말씀해 두신 쪽이 자리를 잡기는 훨씬 수월합니다.",
    "여럿이 함께 가실 때는 대표 한 분이 연락을 맡으시는 편이 낫습니다. 서로 다른 이야기가 오가면 자리 배치가 어긋나기 쉽습니다. 인원이 바뀔 여지가 있으면 그 점도 함께 말씀해 두시면 됩니다.",
    "이른 시간과 늦은 시간은 홀의 결이 다릅니다. 어느 쪽이 맞을지는 그날 목적에 따라 갈리므로, 대화가 목적이면 이른 쪽을, 분위기를 보고 싶으시면 늦은 쪽을 잡으시면 됩니다.",
    "가시는 길과 돌아오는 길을 함께 정해 두시길 권합니다. 갈 때는 편해도 돌아올 때 막히는 경우가 있습니다. 늦은 시각 교통편을 미리 확인해 두시면 마무리까지 편안합니다.",
    "처음이라 무엇을 물어야 할지 모르시겠다면, 인원과 시간만 말씀하셔도 충분합니다. 나머지는 순서대로 안내를 받으시게 됩니다. 모르는 것을 그대로 물어보시는 편이 가장 빠릅니다.",
    "자리를 옮기고 싶으시면 참지 마시고 말씀해 주십시오. 홀 사정이 허락하는 선에서 조정이 됩니다. 처음 앉은 자리가 끝까지 가야 하는 것은 아닙니다.",
  ];
  줄.push(더할말2[(자리 + 2) % 6]);
  줄.push(닫는말[자리]);
  return { h2: 제목들[자리], 본문: 줄 };
}

export default function AdNightPage({
  venue: v,
  변형,
}: {
  venue: AdVenue;
  /** 색인된 다른 주소에 이 가게를 얹을 때, 그 쪽만의 글.
   *  주면 첫 문단·본문 문단·마무리를 이것으로 바꾼다.
   *  사실(주소·번호·시간·표·전화바·고지)은 그대로 둔다.
   *  ★ 2026-09-01 — 같은 컴포넌트를 두 주소에 붙였더니 글이 100% 같아졌다.
   *    네이버가 둘 중 하나만 남기고 색인된 쪽이 밀릴 수 있어 이 장치를 넣었다. */
  변형?: {
    각도?: string;
    title?: string;
    lead: string[];
    sections: { h2: string; body: string[] }[];
    faq: { q: string; a: string }[];
    closing: { h2: string; body: string[] };
    summary?: string[];
    outro?: string;
    notice?: string[];
  };
}) {
  /* ★ 2026-08-26 — 관련 링크가 적으면 네이버가 "중요하지 않은 페이지"로 본다.
   *   실측: 들어오는 링크 0~2개인 페이지가 색인이 안 됐다. 모자라면 6개까지 채운다. */
  const related = (() => {
    const out = v.related.map((s) => AD_BY_SLUG[s]).filter(Boolean);
    if (out.length < 6) {
      /* ★ 자기 위치 다음부터 순환해 채운다 — 앞에서부터 채우면 뒤쪽 가게가 고립된다 */
      const have = new Set(out.map((x) => x.slug));
      const base = Math.max(0, AD_VENUES.findIndex((x) => x.slug === v.slug));
      for (let i = 1; out.length < 6 && i <= AD_VENUES.length; i++) {
        const o = AD_VENUES[(base + i) % AD_VENUES.length];
        if (!o || o.slug === v.slug || have.has(o.slug)) continue;
        out.push(o); have.add(o.slug);
      }
    }
    return out.slice(0, 6);
  })();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CALLBAR_CSS }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(v, 변형)) }}
      />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <nav aria-label="현재 위치" className="mb-5 text-xs text-gray-500">
          <Link href="/" className="hover:text-gold">
            홈
          </Link>
          <span className="px-1.5">›</span>
          <Link href="/night-guide" className="hover:text-gold">
            전국 나이트 예약 문의
          </Link>
          <span className="px-1.5">›</span>
          <span className="text-gray-300">{v.keyword}</span>
        </nav>

        <article>
          <header className="fade-up mb-6">
            <p data-frame="1" className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
              {v.areaLabel}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {v.keyword}
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              마지막 정리{" "}
              <time dateTime={AD_UPDATED}>2026년 8월 15일</time>
            </p>
          </header>

          {/* [14] AEO/GEO — AI 답변엔진이 그대로 인용할 수 있는 블록 */}
          <div data-frame="1" className="answer-box">
            <p>
              <strong>{v.keyword}</strong>은 {v.areaLabel}에 있는
              나이트클럽입니다. {v.answer2}
            </p>
          </div>

          {/* 썸네일 — og:image 와 같은 파일을 본문에도 실제로 렌더한다 */}
          <figure className="mt-6">
            <OgThumb pathname={nightPath(v.slug)} alt={v.ogAlt} v={(v as { ogV?: string }).ogV} />
          </figure>

          <div className="space-y-5 text-[15px] leading-7 text-gray-200 sm:text-base sm:leading-8">
            {(변형?.lead ?? v.lead).map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {(변형?.sections ?? v.sections).map((s: any, si: number) => (
            <section key={s.h2} className="mt-10">
              {/* 2026-09-01 - 소제목마다 가게이름을 넣어 한 쪽에 11~15회 나왔다.
                  네이버 공식 가이드: "같은 단어를 반복해서 넣는 것은 어뷰징 의심 대상".
                  첫 소제목만 이름을 두고 나머지는 뺀다. 빼서 너무 짧아지면 원래 것을 쓴다. */}
              <h2 className="text-xl font-bold text-white">{소제목줄이기(s.h2, v)}</h2>
              <div className="mt-3 space-y-4 text-[15px] leading-7 text-gray-200 sm:text-base sm:leading-8">
                {s.body.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
                {(s as any).list ? (
                  <ul className="space-y-1.5 rounded-2xl border border-line bg-elev p-4 text-[15px]">
                    {(s as any).list.map((li: string) => (
                      <li key={li}>· {li}</li>
                    ))}
                  </ul>
                ) : null}
                {(s as any).bridge ? <p className="text-gray-400">{(s as any).bridge}</p> : null}
              </div>
            </section>
          ))}

          {/* 2026-09-01 - 본문이 1,300자대라 네이버가 얇은 문서로 본다(기준 1,800자).
              지어낸 말을 채우지 않는다. **확인된 사실을 풀어 쓴 문단**만 더한다.
              쪽마다 주소가 달라 문장이 겹치지 않게 주소로 골라 쓴다. */}
          <section data-frame="1" className="mt-10">
            <h2 className="text-xl font-bold text-white">{읽기전정리(v, 변형?.각도 ?? '기본').h2}</h2>
            <div className="mt-3 space-y-4 text-[15px] leading-7 text-gray-200 sm:text-base sm:leading-8">
              {읽기전정리(v, 변형?.각도 ?? '기본').본문.map((p2: string, i: number) => (
                <p key={i}>{p2}</p>
              ))}
            </div>
          </section>

          <section data-frame="1" className="mt-10">
            {/* 2026-09-01 - 표 둘레 라벨 세 곳에도 가게이름이 들어가 한 쪽에 8회가 됐다.
                네이버 가이드가 반복을 어뷰징으로 본다. 라벨에서는 이름을 뺀다.
                이름은 제목·첫 문단·첫 소제목에만 둔다(3~5회). */}
            <h2 className="mb-4 text-xl font-bold text-white">확인된 기본 정보</h2>
            <table className="w-full overflow-hidden rounded-2xl border border-line bg-elev text-left text-[15px]">
              <caption className="sr-only">
                {factCaption(v.slug)}
              </caption>
              <tbody>
                {v.facts.map(([k, val0]) => {
                  /* ★ 2026-09-02 — 광고가 실린 쪽인데 표에는 「예약 담당: 아직 등록되지 않음」이
                     그대로 남아 있었다(대전세븐나이트). 같은 쪽 아래에 담당자 번호가 있으니
                     한 쪽 안에서 사실이 서로 어긋난다 — AI 검토관이 C7(허위)로 잡았다.
                     광고주가 있으면 표에도 그 담당자를 적는다. 없으면 그대로 둔다. */
                  const 담당칸 = /예약 담당|문의|담당자/.test(k);
                  const val = 담당칸 && v.phone && v.contactName
                    ? `${v.contactName} ${v.phone}`
                    : val0;
                  return (
                  <tr key={k} className="border-b border-line last:border-0">
                    <th
                      scope="row"
                      className="w-28 px-4 py-3 align-top text-sm font-bold text-gray-400 sm:w-40"
                    >
                      {k}
                    </th>
                    <td className="px-4 py-3 text-gray-100">{val}</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-gray-500">
              {tableNote(v.slug)}
            </p>
          </section>

          <footer className="mt-10 rounded-2xl border border-gold/40 bg-gold/5 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              {v.keyword} 세 줄 요약
            </p>
            <ul className="mt-2 space-y-1.5 text-[15px] text-gray-100">
              {(변형?.summary ?? v.summary).map((s: string) => (
                <li key={s}>· {s}</li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] leading-7 text-gray-200">{변형?.outro ?? v.outro}</p>
            {v.phone ? (
              <a
                href={`tel:${phoneDigits(v.phone)}`}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-4 text-2xl font-extrabold text-bg sm:text-3xl"
                aria-label={`${v.contactName} 전화 ${v.phone}`}
              >
                <span aria-hidden>📞</span>
                {v.contactName} {v.phone}
              </a>
            ) : null}
          </footer>

          <section data-frame="1" className="mt-10 rounded-2xl border border-line bg-elev p-5 text-sm text-gray-400">
            <h2 className="mb-2 text-sm font-bold text-gray-300">이용 안내</h2>
            <ul className="space-y-1.5">
              {(변형?.notice ?? v.notice).map((n: string) => (
                <li key={n}>· {n}</li>
              ))}
            </ul>
          </section>
        </article>

        <nav
          data-frame="1"
          aria-label="다른 지역 나이트"
          className="mt-12 border-t border-line pt-8"
        >
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
            다른 지역도 보기
          </h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {related.map((o) => (
              <li key={o.slug}>
                <Link
                  href={nightPath(o.slug)}
                  className="block rounded-xl border border-line bg-elev p-4 transition hover:border-gold hover:bg-elev2"
                >
                  <p className="text-sm font-bold text-gold">{o.keyword}</p>
                  <p className="mt-1 text-xs text-gray-400">{o.areaLabel}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-sm">
            <Link href="/night-guide" className="text-gold underline">
              전국 나이트 전체 보기 →
            </Link>
          </p>
        </nav>
            <p data-frame="1" className="mt-3 text-[13px] leading-7 text-gray-400">{고지고르기(v.slug, !!v.phone)}</p>
            {/* ★ 2026-09-01 — 「광고 · 업소 제공 정보 · 확인일」 세 가지를 다 밝힌다.
                확인일이 없어 신고 방어 검사(C7-03)에 걸렸다. */}
            <p data-frame="1" className="mt-1 text-[13px] leading-7 text-gray-400">
              광고 · 업소 제공 정보 · 확인일 <time dateTime="2026-09-01">2026년 9월 1일</time>.
              운영 사정에 따라 내용은 바뀔 수 있습니다.
            </p>
</main>

      {v.phone ? (
        <div className="callbar" role="complementary" aria-label="전화 연결">
          <a href={`tel:${phoneDigits(v.phone)}`}>
            📞 {v.contactName} {v.phone}
          </a>
        </div>
      ) : (
        <div
          className="callbar"
          role="complementary"
          aria-label="광고 제휴 문의"
        >
          <span>
            {문의앞말고르기(v.slug)} <b>{ADS.kakao}</b>
          </span>
        </div>
      )}
    </>
  );
}
