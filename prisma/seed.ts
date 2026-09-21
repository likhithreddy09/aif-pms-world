import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

function logoSvg(initials: string, accent = "#c4a35a") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <rect width="240" height="240" rx="8" fill="#120e0a"/>
  <rect x="12" y="12" width="216" height="216" rx="4" fill="none" stroke="${accent}" stroke-width="1.5"/>
  <text x="120" y="132" text-anchor="middle" font-family="Georgia, serif" font-size="64" fill="${accent}">${initials}</text>
</svg>`;
}

function writeLogo(filename: string, initials: string) {
  const dir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, filename);
  fs.writeFileSync(filePath, logoSvg(initials));
  return `/uploads/${filename}`;
}

const categoryNames = [
  "Large Cap",
  "Mid Cap",
  "Small Cap",
  "Multi Cap",
  "Thematic",
  "Long Only",
  "Long Short",
  "Multi Asset",
];

async function main() {
  await prisma.assetManagerCategory.deleteMany();
  await prisma.assetManager.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();

  const password = process.env.ADMIN_PASSWORD || "DemoAdmin@2026";
  const email = (process.env.ADMIN_EMAIL || "admin@pmsaifworld.com").toLowerCase();

  await prisma.adminUser.create({
    data: {
      email,
      name: "PMS AIF World Admin",
      passwordHash: await bcrypt.hash(password, 10),
    },
  });

  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.create({
        data: {
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
        },
      })
    )
  );

  const byName = Object.fromEntries(categories.map((c) => [c.name, c.id]));

  const managers = [
    {
      name: "Alpha Capital",
      displayName: "Alpha Capital PMS",
      type: "PMS",
      status: "published",
      featured: true,
      categories: ["Multi Cap", "Long Only"],
      logo: writeLogo("alpha-capital.svg", "AC"),
      description:
        "Alpha Capital is a demonstration portfolio manager focused on multi-cap Indian equities. This listing is fictional and prepared only for the PMS AIF World publishing demo.",
      websiteUrl: "https://example.com/alpha-capital",
      contactPerson: "Rhea Menon",
      contactEmail: "research@alphacapital-demo.test",
      contactPhone: "+91 22 4000 1101",
      address: "Bandra Kurla Complex, Mumbai 400051",
      sebiRegistrationNumber: "INP0000DEMO1",
      registrationType: "Portfolio Manager",
      licenseValidity: new Date("2028-03-31"),
      strategyName: "Alpha Multi Cap",
      investmentPhilosophy:
        "Concentrate in high-quality businesses where the market underappreciates earnings durability.",
      investmentApproach:
        "Bottom-up stock selection across market caps, with a 20–30 stock portfolio and a three-to-five year holding period.",
      riskProfile: "High",
      minimumInvestment: "₹50 lakh",
      lockInPeriod: "None",
      inceptionDate: new Date("2016-04-01"),
      aum: "₹2,140 Cr",
      clientCount: 186,
      oneYearReturn: 18.2,
      threeYearReturn: 22.4,
      fiveYearReturn: 19.8,
      sinceInceptionReturn: 17.9,
    },
    {
      name: "Zenith Wealth",
      displayName: "Zenith Wealth Advisors",
      type: "PMS",
      status: "draft",
      featured: false,
      categories: ["Large Cap"],
      logo: writeLogo("zenith-wealth.svg", "ZW"),
      description:
        "Zenith Wealth is a draft demonstration listing for large-cap quality compounding. It will not appear on the public website until published.",
      websiteUrl: "https://example.com/zenith-wealth",
      contactPerson: "Amit Kulkarni",
      contactEmail: "ir@zenithwealth-demo.test",
      contactPhone: "+91 22 4000 2202",
      address: "Nariman Point, Mumbai 400021",
      sebiRegistrationNumber: "INP0000DEMO2",
      registrationType: "Portfolio Manager",
      licenseValidity: new Date("2027-12-31"),
      strategyName: "Zenith Quality Large Cap",
      investmentPhilosophy:
        "Own market leaders with clean balance sheets and predictable free cash flow.",
      investmentApproach:
        "Low-turnover large-cap portfolio with a quality and capital-allocation overlay.",
      riskProfile: "Moderate",
      minimumInvestment: "₹50 lakh",
      lockInPeriod: "None",
      inceptionDate: new Date("2014-01-15"),
      aum: "₹3,080 Cr",
      clientCount: 240,
      oneYearReturn: 14.1,
      threeYearReturn: 16.8,
      fiveYearReturn: 15.4,
      sinceInceptionReturn: 14.9,
    },
    {
      name: "Nova Alternative Fund",
      displayName: "Nova Alternatives",
      type: "AIF",
      status: "published",
      featured: true,
      categories: ["Long Short"],
      logo: writeLogo("nova-alternatives.svg", "NV"),
      description:
        "Nova Alternative Fund is a fictional Category III long-short strategy created for the PMS AIF World demo. Figures are illustrative only.",
      websiteUrl: "https://example.com/nova-alternatives",
      contactPerson: "Sana Qureshi",
      contactEmail: "investors@nova-demo.test",
      contactPhone: "+91 22 4000 3303",
      address: "Worli, Mumbai 400018",
      sebiRegistrationNumber: "IN/AIF3/DEMO/03",
      registrationType: "AIF Category III",
      licenseValidity: new Date("2029-06-30"),
      strategyName: "Nova Market Neutral / Long Short",
      investmentPhilosophy:
        "Generate uncorrelated returns by pairing high-conviction longs with index and single-stock hedges.",
      investmentApproach:
        "Fundamental long book with a tactical short overlay; net exposure typically 20–60%.",
      riskProfile: "High",
      minimumInvestment: "₹1 crore",
      lockInPeriod: "12 months",
      inceptionDate: new Date("2019-07-01"),
      aum: "₹860 Cr",
      clientCount: 74,
      oneYearReturn: 12.6,
      threeYearReturn: 15.2,
      fiveYearReturn: 13.4,
      sinceInceptionReturn: 12.8,
    },
    {
      name: "GrowthEdge Capital",
      displayName: "GrowthEdge Capital PMS",
      type: "PMS",
      status: "published",
      featured: true,
      categories: ["Small Cap", "Thematic"],
      logo: writeLogo("growthedge-capital.svg", "GE"),
      description:
        "GrowthEdge Capital is a fictional small-cap specialist used to demonstrate manager profiles, track records and publishing workflow.",
      websiteUrl: "https://example.com/growthedge",
      contactPerson: "Vikram Shah",
      contactEmail: "research@growthedge-demo.test",
      contactPhone: "+91 80 4000 4404",
      address: "UB City, Bengaluru 560001",
      sebiRegistrationNumber: "INP0000DEMO4",
      registrationType: "Portfolio Manager",
      licenseValidity: new Date("2028-09-30"),
      strategyName: "GrowthEdge Emerging Leaders",
      investmentPhilosophy:
        "Identify early compounders before they graduate into the mid-cap universe.",
      investmentApproach:
        "Concentrated 18–25 stock small-cap portfolio with a three-year investment horizon.",
      riskProfile: "Very High",
      minimumInvestment: "₹50 lakh",
      lockInPeriod: "None",
      inceptionDate: new Date("2018-02-01"),
      aum: "₹720 Cr",
      clientCount: 98,
      oneYearReturn: 24.7,
      threeYearReturn: 28.1,
      fiveYearReturn: 21.3,
      sinceInceptionReturn: 20.4,
    },
    {
      name: "Horizon Alternatives",
      displayName: "Horizon Multi Asset AIF",
      type: "AIF",
      status: "published",
      featured: true,
      categories: ["Multi Asset"],
      logo: writeLogo("horizon-alternatives.svg", "HA"),
      description:
        "Horizon Alternatives is a fictional multi-asset AIF created for demonstration. Allocation mix and returns are sample data, not live performance.",
      websiteUrl: "https://example.com/horizon-alternatives",
      contactPerson: "Neha Iyer",
      contactEmail: "client@horizon-demo.test",
      contactPhone: "+91 22 4000 5505",
      address: "Cuffe Parade, Mumbai 400005",
      sebiRegistrationNumber: "IN/AIF2/DEMO/05",
      registrationType: "AIF Category II",
      licenseValidity: new Date("2027-11-15"),
      strategyName: "Horizon Multi Asset Income",
      investmentPhilosophy:
        "Blend listed equity, credit and gold to pursue smoother wealth creation across cycles.",
      investmentApproach:
        "Dynamic allocation with a quality equity core, investment-grade credit sleeve and a gold overlay.",
      riskProfile: "Moderate",
      minimumInvestment: "₹1 crore",
      lockInPeriod: "24 months",
      inceptionDate: new Date("2017-10-01"),
      aum: "₹1,150 Cr",
      clientCount: 61,
      oneYearReturn: 11.4,
      threeYearReturn: 13.9,
      fiveYearReturn: 12.1,
      sinceInceptionReturn: 11.8,
    },
  ];

  for (const manager of managers) {
    const { categories: cats, logo, ...rest } = manager;
    await prisma.assetManager.create({
      data: {
        ...rest,
        slug: manager.name.toLowerCase().replace(/\s+/g, "-"),
        logoUrl: logo,
        categories: {
          create: cats.map((name) => ({ categoryId: byName[name] })),
        },
      },
    });
  }

  console.log("Seed complete.");
  console.log(`Admin login: ${email} / ${password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
