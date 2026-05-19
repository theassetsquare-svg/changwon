import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },

      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Googlebot-News", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "AdsBot-Google", allow: "/" },
      { userAgent: "Storebot-Google", allow: "/" },

      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "msnbot", allow: "/" },

      { userAgent: "Yeti", allow: "/" },
      { userAgent: "NaverBot", allow: "/" },
      { userAgent: "Naverbot", allow: "/" },
      { userAgent: "Daumoa", allow: "/" },

      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },

      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },

      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },

      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },

      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Cohere-ai", allow: "/" },
      { userAgent: "Diffbot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "YandexBot", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "LinkedInBot", allow: "/" },
      { userAgent: "Slackbot", allow: "/" },
      { userAgent: "TelegramBot", allow: "/" },
      { userAgent: "KakaoTalk-Scrap", allow: "/" },
    ],
    sitemap: [`${SITE.url}/sitemap.xml`, `${SITE.url}/feed.xml`],
    host: SITE.url,
  };
}
