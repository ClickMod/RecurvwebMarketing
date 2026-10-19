import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical, vendor-neutral writing on debit orders, payment plans, mandate capture, and running a finance team across South Africa.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
