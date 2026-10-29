import Link from "next/link";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

export const HOMEPAGE_FAQS = [
  {
    q: "What is Recurv?",
    a: "Recurv is a South African payment collection platform for organisations that collect recurring or once-off payments. It manages digital authorisation, collection scheduling, card and EFT debit-order collections, retries and reconciliation, with visibility into collection outcomes and exceptions.",
  },
  {
    q: "How do customers authorise collections?",
    a: "Customers authorise recurring or once-off collections through a digital mandate. Recurv can send an approval link by email, SMS, WhatsApp or QR code, or the organisation can embed the mandate experience on its website.",
  },
  {
    q: "What collection schedules does Recurv support?",
    a: "Recurv describes once-off collections, fixed-term instalments, ongoing collections without a set end date, ad hoc charges added to an active collection, and variable amounts that can be updated before a collection run. Ask Recurv about configuration requirements for your billing model.",
  },
  {
    q: "Which payment methods does Recurv support?",
    a: "Recurv describes card payments and EFT debit orders. The available method and collection setup depend on the organisation’s process and customer authorisation.",
  },
  {
    q: "What happens when a collection fails?",
    a: "Recurv describes retry logic and billing-cycle monitoring. Failed collections and mandate issues that need intervention are surfaced for review. The public product information does not specify a universal retry count, timing or guarantee of successful collection.",
  },
  {
    q: "How does Recurv reconcile payments?",
    a: "Recurv matches collections with payment outcomes and provides billing-cycle reporting. This helps the organisation review what was collected and focus follow-up on failed transactions or other exceptions.",
  },
  {
    q: "Can Recurv connect to our accounting or CRM system?",
    a: "Recurv describes exporting collection data for accounting or CRM systems and offers an API for real-time data synchronisation. Ask the Recurv team whether your specific system and workflow are supported.",
  },
  {
    q: "How can we learn about pricing and setup?",
    a: "Recurv invites organisations to book a demo or speak with sales to discuss pricing, integrations and a setup for their industry. Pricing and configuration details are discussed with the Recurv team.",
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
