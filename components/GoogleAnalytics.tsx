"use client";

import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Queues a gtag command. gtag.js drains Arguments objects when it loads. */
export function queueGaEvent(
  _command: string,
  _name?: string,
  _params?: Record<string, unknown>,
) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(arguments);
}

export function GoogleAnalytics({ gaId }: { gaId: string }) {
  const id = gaId.replace(/[^A-Za-z0-9_-]/g, "");
  if (!id) return null;

  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
      <Script
        id="ga-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="lazyOnload"
      />
    </>
  );
}
