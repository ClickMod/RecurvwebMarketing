import Link from "next/link";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

export const HOMEPAGE_FAQS = [
  {
    q: "What is Recurv?",
    a: "Recurv is a South African payment collection platform for organisations that collect recurring or single payments. It manages digital authorisation, collection schedules, card and EFT debit order collections, retries and reconciliation. Your team can see collection outcomes and focus on exceptions."
  },
  {
    q: "How do customers authorise collections?",
    a: "Customers authorise recurring or single payments through a digital mandate. Recurv can send an approval link by email, SMS, WhatsApp or QR code, or your organisation can embed the mandate experience on its website."
  },
  {
    q: "What collection schedules does Recurv support?",
    a: "Recurv supports single payments, fixed term instalments, ongoing collections with no set end date, additional charges to an active collection, and amounts that can change before a collection run. Set the schedule to fit your billing model."
  },
  {
    q: "Which payment methods does Recurv support?",
    a: "Recurv supports card payments and EFT debit orders. Customers can authorise collections using either method."
  },
  {
    q: "What happens when a collection fails?",
    a: "Recurv retries unsuccessful collections and monitors each billing cycle. Your team can review failed collections and mandate issues that need attention."
  },
  {
    q: "How does Recurv reconcile payments?",
    a: "Recurv matches collections with payment outcomes and provides reports for each billing cycle. Your team can see what was collected and focus follow up on failed transactions or other exceptions."
  },
  {
    q: "Can Recurv connect to our accounting or CRM system?",
    a: "Yes. Export collection data to your accounting or CRM system, or connect through Recurv’s API for real time data synchronisation. Contact our team to confirm support for your system and workflow."
  },
  {
    q: "How can we learn about pricing and setup?",
    a: "Book a demo or speak with our team about pricing, integrations and a setup for your industry. Our team can explain the available options."
  },
];

export function HomepageFaqSection() {
  return (
    <section className="pb-16 md:pb-20 lg:pb-32">
      <Container>
        <div className="pt-12 lg:pt-16" style={{ borderTop: `1px solid ${t.line}` }}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div>
              <div className="mono mb-5 uppercase" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
                PAYMENT COLLECTION FAQs
              </div>
              <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: "var(--fs-h2-md)", lineHeight: 1, letterSpacing: "-0.035em", margin: 0 }}>
                Questions about <span style={{ color: t.primary }}>Recurv.</span>
              </h2>
              <p className="mt-5 max-w-[360px]" style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6 }}>
                Clear answers about authorisation, collection schedules, payment methods and reconciliation. Need to discuss your billing model?{" "}
                <Link href="/demo" style={{ color: t.primary, textDecoration: "underline", textUnderlineOffset: 2 }}>View the online demo</Link> or{" "}
                <Link href="/contactus" style={{ color: t.primary, textDecoration: "underline", textUnderlineOffset: 2 }}>speak with our team</Link>.
              </p>
            </div>
            <div>
              {HOMEPAGE_FAQS.map(({ q, a }) => (
                <details key={q} style={{ borderTop: `1px solid ${t.line}` }}>
                  <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: 15, fontWeight: 500, color: t.ink, lineHeight: 1.4 }}>
                    {q}
                  </summary>
                  <p className="pb-6 max-w-[680px]" style={{ margin: 0, fontSize: 14, color: t.inkSoft, lineHeight: 1.65 }}>
                    {a}
                  </p>
                </details>
              ))}
              <div style={{ borderTop: `1px solid ${t.line}` }} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
