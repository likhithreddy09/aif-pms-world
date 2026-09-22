import { PageHero } from "@/components/lux/editorial";
import { BookCallForm } from "@/components/lux/widgets";
import { OFFICES, SITE } from "@/data/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="bg-ink text-cream">
      <PageHero
        eyebrow="Connect"
        title="Speak with a specialist"
        lead="Delhi, Mumbai, Bengaluru. A thirty-minute diagnostic of the book you already have — then a shortlist, not a catalogue."
      />
      <section className="container-page grid gap-12 py-16 lg:grid-cols-2">
        <div className="space-y-8">
          <p className="text-lg text-cream/70">
            {SITE.email}
            <br />
            {SITE.phone}
          </p>
          <div className="grid gap-6">
            {OFFICES.map((o) => (
              <div key={o.city} className="widget-card p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{o.city}</p>
                <p className="mt-2 text-sm text-cream/70">{o.address}</p>
              </div>
            ))}
          </div>
        </div>
        <BookCallForm />
      </section>
    </div>
  );
}
