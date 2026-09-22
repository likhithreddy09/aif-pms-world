/** Parse "Heading | Body" lines into sections */
export function sectionsFromText(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [heading, ...rest] = line.split("|");
      return {
        heading: (heading ?? "").trim() || "Section",
        body: rest.join("|").trim() || "",
      };
    });
}

export function sectionsToText(sections: { heading: string; body: string }[]) {
  return sections.map((s) => `${s.heading} | ${s.body}`).join("\n");
}

export function faqsFromText(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [q, ...rest] = line.split("|");
      return { q: (q ?? "").trim(), a: rest.join("|").trim() };
    })
    .filter((f) => f.q);
}

export function faqsToText(faqs: { q: string; a: string }[]) {
  return faqs.map((f) => `${f.q} | ${f.a}`).join("\n");
}
