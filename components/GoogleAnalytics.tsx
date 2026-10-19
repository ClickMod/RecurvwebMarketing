"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

let gaStarted = false;

/** Queues a gtag command. gtag.js drains Arguments objects when it loads. */
export function queueGaEvent(
  _command: string,
  _name?: string,
  _params?: Record<string, unknown>,
) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(arguments);
}

function loadGoogleAnalytics(id: string) {
  if (gaStarted || document.getElementById("ga-loader")) return;
  gaStarted = true;

  const queued = window.dataLayer?.slice() ?? [];
  window.dataLayer = [];

  function gtag(
    _command: string,
    _name?: unknown,
    _params?: Record<string, unknown>,
  ) {
    window.dataLayer?.push(arguments);
  }

  gtag("js", new Date());
  gtag("config", id);
  for (const command of queued) window.dataLayer.push(command);

  const script = document.createElement("script");
  script.id = "ga-loader";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
}

export function GoogleAnalytics({ gaId }: { gaId: string }) {
  const id = gaId.replace(/[^A-Za-z0-9_-]/g, "");

  useEffect(() => {
    if (!id) return;

    let idleId = 0;
    let waitId = 0;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      idleId = window.requestIdleCallback(() => {
        if (!cancelled) loadGoogleAnalytics(id);
      }, { timeout: 2500 });
    };

    const onInteract = () => {
      window.clearTimeout(waitId);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      run();
    };

    // gtag.js is ~175KB and most of it never runs on this page. Keep it off
    // the first load so a phone can paint and hydrate first. Any tap or key
    // still records the session; quiet readers are picked up after a pause.
    window.addEventListener("pointerdown", onInteract, { passive: true });
    window.addEventListener("keydown", onInteract);
    waitId = window.setTimeout(onInteract, 12000);

    return () => {
      cancelled = true;
      window.clearTimeout(waitId);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
    };
  }, [id]);

  if (!id) return null;
  return null;
}
