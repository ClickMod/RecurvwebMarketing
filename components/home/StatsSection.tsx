import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

const STATS: [string, string][] = [
  ["Once-off", "Collect a single payment for a one-time charge"],
  ["Fixed-term", "Schedule a defined number of collections"],
  ["Ongoing", "Continue collections without a predefined end date"],
  ["Variable amount", "Update the collection amount before a run"],
];

export function StatsSection() {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ background: t.surface, borderBottom: `1px solid ${t.line}` }}
    >
      <Container>
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden"
          style={{ background: t.line, border: `1px solid ${t.line}` }}
        >
          {STATS.map(([v, l], i) => (
            <Reveal key={l} delay={i * STAGGER}>
              <div className="p-6 md:p-10 h-full" style={{ background: t.surface }}>
                <div style={{
                  fontFamily: t.fontDisplay,
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}>
                  {v}
                </div>
                <div className="mt-3 max-w-[220px]" style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.45 }}>{l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
