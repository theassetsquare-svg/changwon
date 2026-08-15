"use client";

import { useState } from "react";

/** 카톡 아이디는 링크로 열 수 없어서(카카오는 ID 기반 공개 URL을 제공하지 않음)
 *  탭하면 클립보드에 복사되도록 한다. */
export default function KakaoIdCopy({
  id,
  className = "",
  label,
}: {
  id: string;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(id);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          setCopied(false);
        }
      }}
      className={className}
      aria-label={`카카오톡 아이디 ${id} 복사하기`}
    >
      {label ? <span>{label} </span> : null}
      <span className="tracking-wide">{id}</span>
      <span className="ml-1 text-[0.8em] opacity-70">
        {copied ? "복사됨 ✓" : "복사"}
      </span>
    </button>
  );
}
