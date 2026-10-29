import { SiteCtaTrio } from "@/components/SiteCtaTrio";
import { CarbonHeroDiagram } from "@/components/CarbonHeroDiagram";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

export function HeroSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 items-center">
          {/* Copy */}
          <div className="min-w-0">
            <Reveal>
              <div
                className="mono mb-7"
                style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
              >
                PAYMENT COLLECTIONS · ZA
              </div>
              <h1
                style={{
                  fontFamily: t.fontDisplay,
                  fontWeight: 500,
                  fontSize: "var(--fs-hero)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.04em",
                  margin: 0,
                }}
              >
                Stop chasing payments.<br />
                <span style={{ color: t.primary }}>Start running your business.</span>
              </h1>
            </Reveal>
            <Reveal delay={STAGGER}>
              <p
                className="mt-8 max-w-[560px]"
                style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft }}
              >
                Recurv is a South African payment collection platform for organisations that collect recurring or once-off payments. It manages digital authorisation, collection schedules, card and EFT debit-order collections, retries and reconciliation—so your team can see outcomes and focus on payments that need attention.
              </p>
            </Reveal>
            <Reveal delay={STAGGER * 2}>
              <div className="mt-9">
                <SiteCtaTrio />
              </div>
            </Reveal>
            <Reveal delay={STAGGER * 3}>
              <div
                className="mono mt-12 flex flex-wrap gap-4 md:gap-6"
                style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}
              >
                <span>PCI DSS L1</span><span>·</span><span>SARB COMPLIANT</span>
              </div>
              <div
                className="mono mt-4 pt-4 flex flex-wrap gap-4"
                style={{
                  borderTop: `1px solid ${t.line}`,
                  fontSize: 11,
                  color: t.primary,
                  letterSpacing: 1.5,
                }}
              >
                <span>AUTHORISE</span>
                <span style={{ color: t.inkSoft }}>·</span>
                <span>SCHEDULE</span>
                <span style={{ color: t.inkSoft }}>·</span>
                <span>COLLECT</span>
                <span style={{ color: t.inkSoft }}>·</span>
                <span>RECONCILE</span>
              </div>
            </Reveal>
          </div>

          {/* Diagram */}
          <Reveal delay={STAGGER} className="w-full aspect-square">
            <CarbonHeroDiagram accent={t.primary} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
