"use client";

import { queueGaEvent } from "@/components/GoogleAnalytics";

export type DemoEventName =
  | "demo_started"
  | "demo_video_selected"
  | "demo_video_completed"
  | "demo_completed"
  | "feature_video_opened"
  | "create_account_clicked"
  | "book_demo_clicked";

export function trackDemoEvent(
  name: DemoEventName,
  params?: Record<string, string | number>,
) {
  try {
    queueGaEvent("event", name, params ?? {});
  } catch {
    // GA is optional; a missing measurement ID should not break the page.
  }
}
