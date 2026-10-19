"use client";

import { UTM_KEYS, type UtmParams } from "@/components/campaign/constants";
import { queueGaEvent } from "@/components/GoogleAnalytics";

const STORAGE_KEY = "recurv_campaign_utms";

export function readAndStoreUtms(): UtmParams {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }

  let stored: UtmParams = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as UtmParams;
  } catch {
    stored = {};
  }

  const merged = { ...stored, ...fromUrl };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

export function appendUtms(href: string, utms: UtmParams): string {
  if (!href || typeof window === "undefined") return href;
  const hasUtm = UTM_KEYS.some((key) => Boolean(utms[key]));
  if (!hasUtm) return href;
  const url = new URL(href, window.location.origin);
  for (const key of UTM_KEYS) {
    const value = utms[key];
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  if (href.startsWith("http://") || href.startsWith("https://")) return url.toString();
  return `${url.pathname}${url.search}${url.hash}`;
}

export function trackCampaignEvent(name: string, utms: UtmParams) {
  try {
    queueGaEvent("event", name, utms);
  } catch {
    // GA is optional; missing NEXT_PUBLIC_GA_ID should not break the page.
  }
}
