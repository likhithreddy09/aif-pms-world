export default function AboutPage() {
  return (
    <div>
      <section className="bg-ink py-16 text-cream">
        <div className="container-page max-w-3xl">
          <p className="eyebrow text-gold">About</p>
          <h1 className="mt-3 font-semibold text-4xl sm:text-5xl">PMS AIF World</h1>
          <p className="mt-4 text-cream/70">
            This demonstration site shows how PMS AIF World can manage asset-manager information
            from an admin dashboard and publish it to a modern public website.
          </p>
        </div>
      </section>
      <section className="container-page max-w-3xl space-y-6 py-12 text-ink-600 leading-7">
        <p>
          The original PMS AIF World website is the visual and information-architecture reference.
          This proof of concept keeps the recognisable dark-and-gold editorial feel while replacing
          the publishing workflow with a structured CMS.
        </p>
        <p>
          All asset managers, SEBI numbers and performance figures on this demo are fictional and
          created only to prove the create → publish → public profile loop.
        </p>
      </section>
    </div>
  );
}
