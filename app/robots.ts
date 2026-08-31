import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * robots.txt — 2026-09-01 정리.
 *
 * 규칙: 각 회사 **공식 문서에서 이름을 확인한 크롤러만** 적는다(설계도 8장).
 * 확인 못 한 이름(Claude-Web·anthropic-ai·Bytespider·Cohere-ai·Diffbot 등)은 뺐다.
 * 어차피 맨 위 `User-agent: *  Allow: /` 가 모두를 허용하므로, 이름을 빼도 막히지 않는다.
 *
 * 확인한 공식 문서
 *   Yeti                                   searchadvisor.naver.com/guide/seo-basic-robots
 *   Googlebot · Google-Extended            developers.google.com/crawling (common crawlers)
 *   bingbot                                bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0
 *   GPTBot · OAI-SearchBot · ChatGPT-User  developers.openai.com/api/docs/bots
 *   ClaudeBot · Claude-SearchBot · Claude-User  support.claude.com/en/articles/8896518
 *   PerplexityBot · Perplexity-User        docs.perplexity.ai/guides/bots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },

      { userAgent: "Yeti", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "bingbot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
    ],
    sitemap: [`${SITE.url}/sitemap.xml`],
    host: SITE.url,
  };
}
