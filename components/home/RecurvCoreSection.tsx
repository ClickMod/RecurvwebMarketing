import { FileCheck, GitMerge, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { SiteIcon } from "@/components/ui/SiteIcon";
import { theme as t, iconSize } from "@/components/theme";

const FEATURES = [
  { num: "01", icon: FileCheck, title: "Reduce manual collection work", desc: "Customers authorise payments digitally, and your team can set collection schedules for once-off, fixed-term, ongoing or variable amounts. Recurv brings these steps into a payment collection workflow with reporting and reconciliation." },
  { num: "02", icon: Wallet, title: "Collect and monitor", desc: "Recurv handles payment processing, status updates, configured retries and reconciliation. Your team can review collection outcomes and focus on exceptions that need attention." },
  { num: "03", icon: GitMerge, title: "Reconcile and resolve", desc: "Recurv matches collections with payment outcomes and provides billing-cycle reporting, helping your back-office team prioritise failed payments and other exceptions." },
  { num: "04", icon: ShieldCheck, title: "Digital payment authorisation", desc: "Customers can authorise recurring or once-off collections through a digital mandate. Send an approval link by email, SMS, WhatsApp or QR code, or embed the mandate experience on your website." },
  { num: "05", icon: TrendingUp, title: "See collection outcomes", desc: "Review billing-cycle results, collection statuses and failed payments that need follow-up. Recurv’s reporting helps your team understand what was collected and what requires attention." },
] as const;

export function RecurvCoreSection() {
  return (
    <section className="pb-16 md:pb-20 lg:pb-24">
      <Container>
        <div style={{ borderTop: `1px solid ${t.line}` }} className="pt-12 lg:pt-16">
          {/* Section header */}
          <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:mb-16">
            <Reveal>
              <div className="mono mb-5" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
                RECURV CORE
              </div>
              <h2 style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-lg)",
                lineHeight: 1.0,
                letterSpacing: "-0.035em",
                margin: 0,
              }}>
                Payment collection for{" "}
                <span style={{ color: t.primary }}>South African organisations.</span>
              </h2>
            </Reveal>
            <Reveal delay={STAGGER}>
              <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
                Recurv helps South African organisations—including golf clubs, schools, sports clubs and property managers—manage payments from digital authorisation through collection and reconciliation. Your team can configure collection schedules, monitor outcomes, and focus follow-up on failed transactions or mandate issues. Recurv also provides reporting and an audit trail for back-office visibility.
              </p>
            </Reveal>
          </div>

          {/* Feature grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
            style={{ borderTop: `1px solid ${t.line}` }}
          >
            {FEATURES.map((f, i) => (
              <Reveal key={f.num} delay={i * STAGGER}>
                <div
                  className="flex flex-col gap-4 p-7 md:p-8 h-full transition-[background-color] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--surface-alt)]"
                  style={{
                    borderBottom: `1px solid ${t.line}`,
                    borderRight: `1px solid ${t.line}`,
                  }}
                >
                  <SiteIcon icon={f.icon} color={t.primary} size={iconSize.card} />
                  <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>{f.num}</div>
                  <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: 13.5, color: t.inkSoft, lineHeight: 1.55 }}>{f.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
