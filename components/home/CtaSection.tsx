import { SiteCtaTrio } from "@/components/SiteCtaTrio";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

export function CtaSection() {
  return (
    <section className="py-24 md:py-32 lg:py-48">
      <Container>
        <div className="grid grid-cols-1 gap-10 items-end lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <h2 style={{
              fontFamily: t.fontDisplay,
              fontWeight: 500,
              fontSize: "var(--fs-hero)",
              lineHeight: 0.94,
              letterSpacing: "-0.045em",
              margin: 0,
            }}>
              More revenue.<br /><span style={{ color: t.primary }}>Less admin.</span>
            </h2>
            <p className="mt-6 max-w-[540px]" style={{ fontSize: 19, color: t.inkSoft, lineHeight: 1.55 }}>
              See how Recurv could fit your collection process. Book a live demo or speak with our team about pricing, integrations, and setup for your industry.
            </p>
          </Reveal>
          <Reveal delay={STAGGER}>
            <SiteCtaTrio layout="stack" />
            <div className="mt-3" style={{ fontSize: 13, color: t.inkSoft }}>
              Or email <span style={{ color: t.ink, fontWeight: 600 }}>sales@recurv.tech</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
