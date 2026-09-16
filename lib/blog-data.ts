// Ported from the <article id="..."> sections of Blog.dc.html, which held
// all six posts' full content inline on one long page. Split here into a
// real index + per-post routes (app/blog/page.tsx, app/blog/[slug]/page.tsx)
// per the Phase 2B migration ask, while keeping every word of the original
// copy. The three-sentence "excerpt" fields for buying-vs-renting-halton,
// commercial-leasing-guide, and investing-vacation-property are new (the
// other three reuse the exact blurbs Homepage.dc.html already wrote for its
// "From the Blog" preview cards) - the original had no separate short-form
// summary for those three, needed for the new index page's preview cards.

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  paragraphs: string[];
  cta: { text: string; href: string };
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "milton-market-update-2026",
    category: "Market Update",
    title: "Milton Market Update: What Buyers and Sellers Should Know",
    excerpt: "A look at pricing trends, inventory, and where the Milton market is headed.",
    image: "/images/blog-milton-market.png",
    paragraphs: [
      "Milton remains one of the better-value entry points into Halton real estate, offering a meaningful discount to Oakville and Burlington without sacrificing access to the Escarpment, Milton GO, and highly-rated schools. Inventory has been steady across Old Milton, Beaty, and Scott, with well-priced homes continuing to attract multiple offers within their first few weeks on market.",
      "For sellers, presentation and pricing strategy remain the two biggest levers — homes priced realistically from day one are consistently outperforming those that require a price adjustment. For buyers, pre-approval and a responsive offer strategy are essential in Milton's more competitive pockets.",
    ],
    cta: { text: "Explore Milton real estate →", href: "/neighbourhoods/milton" },
  },
  {
    slug: "oakville-neighbourhood-guide",
    category: "Neighbourhood Guide",
    title: "A Buyer's Guide to Oakville's Most Sought-After Streets",
    excerpt: "Where to look in Oakville depending on your lifestyle and budget.",
    image: "/images/blog-oakville-guide.png",
    paragraphs: [
      "Oakville isn't one market — it's several. Old Oakville offers heritage character and mature trees within walking distance of downtown, at a significant premium. Bronte trades some of that heritage charm for direct waterfront access and a village feel. Families prioritizing schools and newer construction tend to look toward Glen Abbey, River Oaks, and West Oak Trails, where inventory turns over more predictably.",
      "Knowing which micro-market fits your budget and lifestyle before you start touring saves time — and puts you in a stronger negotiating position when the right home appears.",
    ],
    cta: { text: "Explore Oakville real estate →", href: "/neighbourhoods/oakville" },
  },
  {
    slug: "selling-in-burlington-tips",
    category: "Seller Tips",
    title: "5 Things to Fix Before Listing Your Burlington Home",
    excerpt: "Small, high-return fixes that help Burlington homes sell faster.",
    image: "/images/blog-seller-prep.png",
    paragraphs: [
      "Small, high-return fixes consistently outperform major renovations before a listing goes live. In Burlington, we typically recommend: fresh, neutral paint in high-traffic rooms; addressing any visible deferred maintenance (gutters, exterior trim, driveway cracks); decluttering to let a home's actual square footage read clearly in photos; a deep clean of windows and floors; and staging the primary living spaces to suit how today's buyers actually live.",
      "None of these require a major budget, but together they change how a home photographs and shows — which directly affects days on market and final sale price.",
    ],
    cta: { text: "Explore Burlington real estate →", href: "/neighbourhoods/burlington" },
  },
  {
    slug: "buying-vs-renting-halton",
    category: "Buyer Tips",
    title: "Buying vs. Renting in Halton: Running the Real Numbers",
    excerpt: "Running the real numbers on renting versus buying across Milton and Oakville, based on your down payment and timeline.",
    image: "/images/blog-buy-vs-rent.png",
    paragraphs: [
      "With rates fluctuating, more Milton and Oakville renters are asking whether now is the right time to buy. The honest answer depends on how long you plan to stay, your down payment, and local rent-to-price ratios — not headlines. We build a side-by-side comparison for every client so the decision is based on your numbers, not a rule of thumb.",
      "In general, a five-year-plus horizon and a stable income tend to favour buying in Halton's stronger school-catchment areas, where price appreciation has historically outpaced rent growth.",
    ],
    cta: { text: "Talk to us about buying →", href: "/buy" },
  },
  {
    slug: "commercial-leasing-guide",
    category: "Commercial",
    title: "Leasing Office or Retail Space? Read This First",
    excerpt: "What's actually negotiable in a commercial lease before you sign for office or retail space.",
    image: "/images/blog-commercial-space.png",
    paragraphs: [
      "Commercial leases carry terms most tenants never negotiate: escalation clauses, common-area cost pass-throughs, and renewal options that can lock in unfavourable rates years out. Before signing, we walk every commercial client through what's actually negotiable — and what isn't.",
      "Whether you're opening a first storefront in Milton or relocating an office in Oakville, understanding total occupancy cost — not just base rent — is the difference between a lease that works and one that quietly erodes your margins.",
    ],
    cta: { text: "Explore commercial services →", href: "/commercial" },
  },
  {
    slug: "investing-vacation-property",
    category: "International",
    title: "Buying a Vacation or Airbnb Property Abroad: What to Know",
    excerpt: "What Ontario buyers should know before purchasing a vacation or Airbnb property in Costa Rica, Dubai, or Rabat.",
    image: "/images/blog-vacation-airbnb.png",
    paragraphs: [
      "Interest in vacation and short-term rental properties in Costa Rica, Dubai, and Rabat has grown steadily among our Ontario clients. Each market has different ownership rules for foreign buyers, financing options, and rental-management realities — and getting it wrong is expensive.",
      "Through our international network, we connect clients with vetted local partners in each market so the process feels as guided as buying at home.",
    ],
    cta: { text: "Learn about our global reach →", href: "/about#international" },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
