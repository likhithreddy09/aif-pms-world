export default function ContactPage() {
  return (
    <div>
      <section className="bg-ink py-16 text-cream">
        <div className="container-page">
          <p className="eyebrow text-gold">Contact</p>
          <h1 className="mt-3 font-semibold text-4xl sm:text-5xl">Speak with the team</h1>
        </div>
      </section>
      <section className="container-page grid gap-10 py-12 md:grid-cols-2">
        <div className="space-y-3 text-sm leading-7 text-ink-600">
          <p>
            This is a demonstration contact page. In production, enquiries would be routed to PMS AIF
            World specialists.
          </p>
          <p>Email: demo@pmsaifworld.test</p>
          <p>Phone: +91 22 0000 0000</p>
        </div>
        <form className="space-y-4 border border-ink/10 bg-white p-6">
          <label>
            <span className="label-field">Name</span>
            <input className="input-field" name="name" required />
          </label>
          <label>
            <span className="label-field">Email</span>
            <input className="input-field" type="email" name="email" required />
          </label>
          <label>
            <span className="label-field">Message</span>
            <textarea className="input-field min-h-28" name="message" required />
          </label>
          <button type="submit" className="h-11 bg-ink px-5 text-sm text-cream">
            Send message
          </button>
          <p className="text-xs text-ink-400">Demo form — submissions are not stored.</p>
        </form>
      </section>
    </div>
  );
}
