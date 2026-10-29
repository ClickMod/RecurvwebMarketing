import { Calendar, CreditCard, FileCheck, Repeat, TrendingUp, Wallet, Zap } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { SiteIcon } from "@/components/ui/SiteIcon";
import { theme as t, iconSize } from "@/components/theme";

const COLLECTION_TYPES = [
  { icon: Zap, title: "Single payment", desc: "Collect one payment and close the instruction. Suitable for deposits, registration fees or other single charges.", use: "Deposit · registration fee" },
  { icon: Calendar, title: "Fixed term collections", desc: "Choose the number of collections, such as 10 monthly instalments. Recurv stops collections automatically when the term ends.", use: "10 monthly instalments" },
  { icon: Repeat, title: "Ongoing collections", desc: "Set it once and collections continue on schedule until cancelled. There is no end date, so you do not need to recreate payment plans or manage renewals manually.", use: "Memberships · Rent" },
  { icon: Wallet, title: "Additional charges", desc: "Add a single charge to an active collection, such as a callout fee, admin fee or event ticket. It is collected once without changing the schedule.", use: "Admin fee · event fee" },
  { icon: TrendingUp, title: "Variable amounts", desc: "Set a variable amount and update it before each collection run. Useful for usage based billing and levy adjustments.", use: "Levy adjustments · utilities" },
] as const;

export function CollectionTypesSection() {
  return (
    <section
      id="collection-types"
      className="py-16 md:py-20 lg:py-24"
      style={{ borderTop: `1px solid ${t.line}` }}
    >
      <Container>
        {/* Section header */}
        <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:mb-14">
          <Reveal>
            <div className="mono mb-5" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
              FULLY CONFIGURABLE
            </div>
            <h2 style={{
              fontFamily: t.fontDisplay,
              fontWeight: 500,
              fontSize: "var(--fs-h2-lg)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              margin: 0,
            }}>
              Your billing model.<br /><span style={{ color: t.primary }}>Your rules.</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
            Recurv supports several ways to collect payments for South African organisations. Choose single payments, fixed term instalments, ongoing collections, additional charges or amounts that change over time. Review outcomes and exceptions in the platform. Contact our team to discuss the setup for your process.
            </p>
          </Reveal>
        </div>

        {/* Collection type list */}
        <div style={{ borderTop: `1px solid ${t.lineStrong}` }}>
          {COLLECTION_TYPES.map((c, i) => (
            <Reveal key={c.title} delay={i * STAGGER}>
              <div
                className="group grid grid-cols-1 gap-4 px-2 py-6 md:grid-cols-[auto_1fr] md:gap-6 lg:grid-cols-[64px_1.1fr_2fr_1fr] lg:gap-8 items-start transition-colors duration-200 hover:bg-[rgba(79,51,217,0.05)] cursor-default"
                style={{ borderBottom: `1px solid ${t.line}` }}
              >
                <div className="mono hidden lg:block transition-colors duration-200 group-hover:text-[#4F33D9]" style={{ fontSize: 13, color: t.primary, letterSpacing: 1, paddingTop: 6 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex items-center gap-4">
                  <div className="transition-transform duration-200 group-hover:scale-110">
                    <SiteIcon icon={c.icon} color={t.primary} size={iconSize.card} />
                  </div>
                  <div style={{ fontFamily: t.fontDisplay, fontSize: "var(--fs-h3)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
                    {c.title}
                  </div>
                </div>
                <div style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6 }}>{c.desc}</div>
                <div>
                  <span
                    className="mono inline-block transition-colors duration-200 group-hover:bg-[rgba(79,51,217,0.14)]"
                    style={{
                      fontSize: 11,
                      color: t.primary,
                      letterSpacing: 1,
                      padding: "6px 12px",
                      borderRadius: 999,
                      border: `1px solid ${t.line}`,
                      background: t.softTint,
                      lineHeight: 1.4,
                    }}
                  >
                    {c.use.toUpperCase()}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Two payment rails */}
        <Reveal>
        <div
          className="mt-12 md:mt-16 grid grid-cols-1 gap-10 rounded-2xl p-8 md:p-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 items-center"
          style={{ background: t.surfaceDeep, color: t.inkOnDeep }}
        >
          <div>
            <div className="mono mb-5" style={{ fontSize: 11, color: "#A89BF0", letterSpacing: 1.5 }}>
              TWO PAYMENT RAILS
            </div>
            <h2 style={{
              fontFamily: t.fontDisplay,
              fontWeight: 500,
              fontSize: "var(--fs-h2-md)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              margin: 0,
            }}>
              Card and EFT debit<br />
              <span style={{ color: "#A89BF0" }}>order collections.</span>
            </h2>
            <p className="mt-6 max-w-[480px]" style={{ fontSize: 16, color: t.inkOnDeepSoft, lineHeight: 1.6 }}>
              Customers can authorise collections by card or EFT debit order, depending on your organisation’s collection process. Payment outcomes depend on each instruction.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([
              { icon: CreditCard, title: "Card payments", desc: "Customers can authorise collections by card. Recurv can retry unsuccessful collections according to the rules set for your account." },
              { icon: FileCheck, title: "EFT debit orders", desc: "Collect payments by EFT debit order. Retry behaviour depends on your account settings." },
            ] as const).map((r) => (
              <div
                key={r.title}
                className="flex flex-col gap-3.5 p-6 rounded-xl"
                style={{
                  background: "rgba(246,245,240,0.05)",
                  border: "1px solid rgba(246,245,240,0.14)",
                }}
              >
                <SiteIcon icon={r.icon} color="#A89BF0" size={iconSize.card} />
                <div style={{ fontFamily: t.fontDisplay, fontSize: 19, fontWeight: 500, letterSpacing: "-0.02em" }}>
                  {r.title}
                </div>
                <div style={{ fontSize: 13.5, color: t.inkOnDeepSoft, lineHeight: 1.55 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
