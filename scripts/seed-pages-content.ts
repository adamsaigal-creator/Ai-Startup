// Structured content for the `pages` table, extracted section-by-section
// from each route's current hardcoded JSX (app/**/page.tsx) - same words,
// same copy, just lifted out of markup into typed JSON sections so the
// admin (Phase 6) can edit them without touching code.
//
// Section shape conventions used throughout:
//   hero:      { eyebrow, headline, subhead?, image? }
//   steps:     { eyebrow, headline, items: [{ number, title, body }] }
//   faq:       { eyebrow, headline, items: [{ question, answer, links? }] }
//   stats:     { items: [{ value, label }] }
//   checklist: { items: string[] }
//   cta:       { headline, body, buttonLabel, buttonHref }

export type PageSeed = {
  slug: string;
  title: string;
  seo_title: string;
  seo_description: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  content: Record<string, unknown>;
};

export const PAGES_CONTENT: PageSeed[] = [
  // ==========================================================================
  {
    slug: "homepage",
    title: "Homepage",
    seo_title: "Saigal Realty Inc., Brokerage — Milton, Oakville, Burlington Real Estate",
    seo_description:
      "A boutique brokerage built on honest counsel and quiet precision — guiding discerning buyers and sellers across Halton's most sought-after communities.",
    content: {
      hero: {
        eyebrow: "Milton · Oakville · Burlington",
        headline: "Navigating Your Next Move, Together",
        subhead:
          "A boutique brokerage built on honest counsel and quiet precision — guiding discerning buyers and sellers across Halton's most sought-after communities.",
        image: "/images/hero-estate-blue-hour.png",
        ctaPrimary: { label: "Search Listings", href: "/search" },
        ctaSecondary: { label: "Book a Consultation", href: "#contact" },
      },
      philosophy: {
        eyebrow: "Our Philosophy",
        headline: "Real estate, practiced with passion, integrity, and transparency.",
        body: "We built Saigal Realty because we believe our clients deserve more than a transaction — they deserve a trusted advisor. Every recommendation we make is grounded in honest counsel, careful research, and a genuine investment in your outcome, not ours. Whether you are buying your first home in Milton, selling a family property in Oakville, or building a portfolio across Burlington, we bring the same quiet rigor and care to every relationship.",
        image: "/images/philosophy-lounge.png",
      },
      pillars: {
        items: [
          { number: "01", title: "Passion", body: "We treat every home as if it were our own — because your milestones matter to us as much as they matter to you." },
          { number: "02", title: "Integrity", body: "Straightforward advice, even when it isn't what you hoped to hear. Your trust is earned, never assumed." },
          { number: "03", title: "Transparency", body: "Clear numbers, clear timelines, clear next steps — so you always know exactly where you stand." },
        ],
      },
      featuredCities: {
        eyebrow: "Where We Work",
        headline: "Featured Cities",
        viewAllLabel: "View all neighbourhoods →",
        viewAllHref: "#all-neighbourhoods",
        items: [
          { name: "Milton", slug: "milton", image: "/images/city-milton.png", tagline: "Explore Milton real estate →" },
          { name: "Oakville", slug: "oakville", image: "/images/city-oakville.png", tagline: "Explore Oakville real estate →" },
          { name: "Burlington", slug: "burlington", image: "/images/city-burlington.png", tagline: "Explore Burlington real estate →" },
        ],
      },
      services: {
        eyebrow: "How We Help",
        headline: "Buy. Sell. Invest.",
        items: [
          { id: "buy", title: "Buying", image: "/images/service-buying.png", body: "From your first search to closing day, we help you understand true value, negotiate with confidence, and secure financing — so your biggest investment starts on solid ground.", ctaLabel: "Start your search →", ctaHref: "#contact" },
          { id: "sell", title: "Selling", image: "/images/service-selling.png", body: "A precise market analysis, considered presentation, and a marketing plan built for today's buyer — priced right, positioned well, and negotiated firmly on your behalf.", ctaLabel: "Get a home evaluation →", ctaHref: "#contact" },
          { id: "invest", title: "Investing", image: "/images/service-investing.png", body: "Building or refining a portfolio across the GTA and Halton region takes local knowledge and a clear-eyed read of the numbers — we bring both to every opportunity we bring you.", ctaLabel: "Discuss your goals →", ctaHref: "#contact" },
          { id: "commercial", title: "Commercial", image: "/images/service-commercial.png", body: "Office, retail, and industrial leasing and sales across Milton, Oakville, and Burlington — backed by the same careful, transparent approach we bring to every residential client.", ctaLabel: "Talk commercial →", ctaHref: "#contact" },
        ],
      },
      team: {
        eyebrow: "Meet The Team",
        headline: "The People Behind Saigal Realty",
        ctaLabel: "Meet the Team",
        ctaHref: "/about",
      },
      testimonials: {
        eyebrow: "Client Stories",
        headline: "What Our Clients Say",
        items: [
          { quote: "Nomi not only understood our must-haves but also found us a dream house in Oakville at an ideal location. His professionalism and commitment to client satisfaction truly set him apart.", author: "Mahrukh A, Google review" },
          { quote: "I was a first time home buyer and Nomi was incredible and so trustworthy throughout the process! He took away all the stress and uncertainty of buying a place for the first time.", author: "Sana Wain, Google review" },
          { quote: "He was open and honest which made me feel at ease when making decisions. He got me what I wanted and made the whole process very easy for me.", author: "Yeraldyn Valencia, Google review" },
          { quote: "Nomi & Kamran did a spectacular job helping me sell my house then finding me the perfect apartment, always top of their game with the right locations.", author: "Scrib Ler, Google review" },
          { quote: "Nomi worked diligently to get us the best possible price for our home and finding us the perfect new forever home. We highly recommend Team Saigal for all your real estate needs.", author: "Ramnik S, Google review" },
          { quote: "He always had my best interests in mind and worked hard to get me a great deal on the home. He is never hesitant and is always positive. Highly recommend!", author: "Arun K, Google review" },
        ],
      },
      allNeighbourhoods: {
        eyebrow: "Serving Southern Ontario",
        headline: "All Neighbourhoods",
        body: "We cover 50+ neighbourhoods across Halton and the GTA — a few highlights below, or browse the complete directory.",
        ctaLabel: "Browse the Full Neighbourhood Directory",
        ctaHref: "/neighbourhoods",
        columns: [
          { heading: "Milton", overviewHref: "/neighbourhoods/milton", links: [{ label: "Milton Overview", href: "/neighbourhoods/milton" }, { label: "Old Milton", href: "/old-milton" }, { label: "Beaty", href: "/beaty-milton" }, { label: "Scott", href: "/scott-milton" }], viewAllLabel: "View all Milton areas →", viewAllHref: "/neighbourhoods#milton" },
          { heading: "Oakville", overviewHref: "/neighbourhoods/oakville", links: [{ label: "Oakville Overview", href: "/neighbourhoods/oakville" }, { label: "Old Oakville", href: "/old-oakville" }, { label: "Glen Abbey", href: "/glen-abbey-oakville" }, { label: "Bronte", href: "/bronte-west-oakville" }], viewAllLabel: "View all Oakville areas →", viewAllHref: "/neighbourhoods#oakville" },
          { heading: "Burlington", overviewHref: "/neighbourhoods/burlington", links: [{ label: "Burlington Overview", href: "/neighbourhoods/burlington" }, { label: "Aldershot", href: "/aldershot-burlington" }, { label: "Tyandaga", href: "/tyandaga-burlington" }, { label: "Shoreacres", href: "/shoreacres-burlington" }], viewAllLabel: "View all Burlington areas →", viewAllHref: "/neighbourhoods#burlington" },
          { heading: "Also Serving", links: [{ label: "Cambridge", href: "/neighbourhoods/cambridge" }, { label: "Kitchener", href: "/neighbourhoods/kitchener" }, { label: "Toronto", href: "/neighbourhoods/toronto" }, { label: "Mississauga", href: "/neighbourhoods/mississauga" }, { label: "York Region", href: "/neighbourhoods/york" }] },
        ],
      },
      blogPreview: {
        eyebrow: "Insights",
        headline: "From the Blog",
        ctaLabel: "View all articles →",
        ctaHref: "/blog",
        slugs: ["milton-market-update-2026", "oakville-neighbourhood-guide", "selling-in-burlington-tips"],
      },
      faqPreview: {
        eyebrow: "Common Questions",
        headline: "Frequently Asked Questions",
        ctaLabel: "View all FAQs →",
        ctaHref: "/faq",
        items: [
          { question: "Which areas does Saigal Realty serve?", answer: "We focus on Milton, Oakville, and Burlington, with additional coverage across Cambridge, Kitchener, Toronto, Mississauga, and York Region." },
          { question: "How is Saigal Realty different from a large national brokerage?", answer: "As a boutique brokerage, every client works directly with a small, senior team — not a call centre. We prioritize honest counsel and transparent numbers over transaction volume." },
          { question: "Do you offer a free home evaluation?", answer: "Yes — we provide a complimentary comparative market analysis for anyone considering selling in Milton, Oakville, or Burlington." },
          { question: "Can Saigal Realty help with commercial real estate?", answer: "Yes — we handle office, retail, and industrial leasing and sales across Milton, Oakville, and Burlington in addition to residential buying and selling." },
          { question: "How do I start searching for homes for sale?", answer: "Use the search bar at the top of this page to filter by location, price, and bedrooms, or book a consultation and we'll set up custom alerts for you." },
        ],
      },
      internationalReach: {
        eyebrow: "Global Reach",
        headline: "International Exposure",
        body: "Beyond Halton and the GTA, our network extends across five international markets — giving clients and referral partners a genuine global reach for cross-border buyers, sellers, and investors. In Rabat, Dubai, and Costa Rica, we also help clients purchase Airbnb and vacation-home properties.",
        offices: [
          { city: "Dallas, Texas", country: "United States" },
          { city: "Rabat", country: "Morocco" },
          { city: "Dubai", country: "United Arab Emirates" },
          { city: "Karachi", country: "Pakistan" },
          { city: "Costa Rica", country: "Vacation & Airbnb homes" },
        ],
      },
      finalCta: {
        headline: "Ready to make your next move?",
        body: "Let's talk about your goals — no pressure, just an honest conversation.",
      },
    },
  },
  // ==========================================================================
  {
    slug: "buy",
    title: "Buy a Home",
    seo_title: "Buy a Home — Saigal Realty Inc., Brokerage",
    seo_description: "Honest guidance from search to closing across Milton, Oakville, and Burlington.",
    content: {
      hero: { eyebrow: "Milton · Oakville · Burlington", headline: "Buying a Home", subhead: "Honest guidance from search to closing — so your biggest investment starts on solid ground.", image: "/images/buy-hero.png" },
      searchWidget: { locations: ["Milton", "Oakville", "Burlington"], priceRanges: ["Any", "$500K–$800K", "$800K–$1.2M", "$1.2M–$2M", "$2M+"], buttonLabel: "Search Listings", caption: "IDX feed placeholder — connect Proptx" },
      steps: {
        eyebrow: "How It Works", headline: "Your Path to a New Home",
        items: [
          { number: "01", title: "Get Pre-Approved", body: "We connect you with trusted mortgage contacts so you know your real budget before you shop." },
          { number: "02", title: "Search & Tour", body: "Custom alerts and private showings across Milton, Oakville, and Burlington neighbourhoods." },
          { number: "03", title: "Offer & Negotiate", body: "Sharp local comps and firm negotiation to protect your interests, even in competitive markets." },
          { number: "04", title: "Close With Confidence", body: "Inspection, financing, and closing coordination handled — clear steps, no surprises." },
        ],
      },
      representation: {
        eyebrow: "Buyer Representation", headline: "Someone in your corner, not the seller's.",
        body: ["A listing agent works for the seller. As your buyer's representative, we work exclusively for you — surfacing red flags, pushing back on price, and making sure conditions protect your interests.", "Our fee is typically covered through the transaction, so working with a dedicated buyer's agent usually costs you nothing extra."],
        checklist: ["Off-market and pre-listing access through our local network", "Street-level pricing knowledge across 50+ Halton neighbourhoods", "Trusted referrals for inspectors, lenders, and lawyers"],
      },
      faq: {
        eyebrow: "Common Questions", headline: "Buying FAQ",
        items: [
          { question: "Do I need to be pre-approved before viewing homes?", answer: "We recommend it — it clarifies your budget and makes your offer stronger once you find the right home." },
          { question: "Which Milton, Oakville, or Burlington neighbourhood is right for me?", answer: "It depends on budget, school priorities, and commute — visit our Neighbourhoods directory or book a call and we'll narrow it down together.", links: [{ text: "Neighbourhoods directory", href: "/neighbourhoods" }] },
          { question: "How competitive is the current market?", answer: "Conditions vary street by street across Halton — we'll walk you through current comps for any specific area you're considering." },
          { question: "Does it cost anything to work with a buyer's agent?", answer: "In most transactions, our fee is covered by the seller's side of the deal — so dedicated representation typically costs you nothing extra." },
          { question: "Can you help me find off-market listings?", answer: "Yes — our local network often surfaces homes before they're publicly listed, giving you a head start in competitive pockets." },
        ],
      },
      cta: { headline: "Ready to start your search?", body: "Let's talk about what you're looking for.", buttonLabel: "Book a Consultation", buttonHref: "/contact" },
    },
  },
  // ==========================================================================
  {
    slug: "sell",
    title: "Sell Your Home",
    seo_title: "Sell Your Home — Saigal Realty Inc., Brokerage",
    seo_description: "A precise market analysis and a marketing plan built for today's buyer.",
    content: {
      hero: { eyebrow: "Milton · Oakville · Burlington", headline: "Selling Your Home", subhead: "Precise pricing, considered presentation, and firm negotiation — priced right, positioned well.", image: "/images/sell-hero.png" },
      valuationCta: { headline: "What's Your Home Worth?", body: "Get a complimentary comparative market analysis — no obligation.", buttonLabel: "Request a Free Home Evaluation", buttonHref: "/contact" },
      steps: {
        eyebrow: "How It Works", headline: "Selling With Confidence",
        items: [
          { number: "01", title: "Pricing Strategy", body: "A precise comparative market analysis grounded in real, recent local sales — not guesswork." },
          { number: "02", title: "Presentation", body: "Staging guidance and professional photography that show your home at its best." },
          { number: "03", title: "Marketing", body: "A listing strategy built for today's buyer, reaching qualified prospects and agent networks." },
          { number: "04", title: "Negotiate & Close", body: "Firm negotiation on your behalf, and clear coordination through to closing day." },
        ],
      },
      difference: {
        eyebrow: "The Difference", headline: "Why Sellers Choose Saigal Realty",
        stats: [
          { value: "1:7", label: "Client-to-agent ratio kept low so every listing gets senior-level attention" },
          { value: "50+", label: "Neighbourhoods of hands-on pricing knowledge across Halton" },
          { value: "0%", label: "Pressure — honest advice even when it isn't what you hoped to hear" },
        ],
      },
      faq: {
        eyebrow: "Common Questions", headline: "Selling FAQ",
        items: [
          { question: "Do you offer a free home evaluation?", answer: "Yes — a complimentary comparative market analysis for anyone considering selling in Milton, Oakville, or Burlington." },
          { question: "How long does it typically take to sell a home?", answer: "Well-priced homes in desirable neighbourhoods commonly sell within a few weeks; condition and pricing strategy are the biggest factors." },
          { question: "Should I make repairs before listing?", answer: "Small, high-return fixes often pay off — we'll walk your home with you and point out what's worth doing before photos." },
          { question: "What are your commission rates?", answer: "Commission is negotiable and discussed transparently at your listing consultation — no surprises, no pressure." },
          { question: "How do you market my listing?", answer: "Professional photography, a considered listing narrative, MLS/Proptx syndication, and direct outreach to our buyer and agent network." },
        ],
      },
      cta: { headline: "Thinking about selling?", body: "Let's talk about your timeline and goals.", buttonLabel: "Book a Consultation", buttonHref: "/contact" },
    },
  },
  // ==========================================================================
  {
    slug: "luxury",
    title: "Luxury Real Estate",
    seo_title: "Luxury Real Estate — Saigal Realty Inc., Brokerage",
    seo_description: "Discreet, considered representation for the region's finest properties.",
    content: {
      hero: { eyebrow: "Milton · Oakville · Burlington", headline: "Luxury Real Estate", subhead: "Discreet, senior-level representation for Halton's most significant estates, waterfront properties, and legacy homes.", image: "/images/luxury-hero.png" },
      intro: { body: "Luxury real estate is a different discipline. Pricing depends less on square footage and more on lot size, privacy, waterfront or Escarpment access, and the quality of finishes and craftsmanship. Marketing depends less on volume and more on precision — the right buyer, found quietly, at the right time. Our team brings senior-level experience to every high-value engagement, from private previews to closing, in Oakville's Old Oakville and Bronte waterfront, Burlington's Shoreacres and Tyandaga, and Milton's Escarpment-adjacent estate properties." },
      imageGrid: { images: [{ src: "/images/luxury-estate.png", alt: "Estate property" }, { src: "/images/luxury-waterfront.png", alt: "Waterfront property" }, { src: "/images/luxury-interior.png", alt: "Custom build interior" }] },
      stats: { items: [{ value: "1:7", label: "Client-to-agent ratio" }, { value: "5", label: "International markets for cross-border buyers" }, { value: "100%", label: "Senior-agent involvement, every file" }] },
      pockets: {
        eyebrow: "Where We Focus", headline: "Halton's Luxury Pockets",
        items: [
          { title: "Old Oakville & Bronte", body: "Heritage estates and Lake Ontario waterfront lots, many held within families for generations. Discretion matters as much as marketing here." },
          { title: "Shoreacres & Tyandaga", body: "Burlington's premier addresses combine mature tree cover, larger lots, and easy Escarpment and waterfront access." },
          { title: "Escarpment Estates, Milton", body: "Larger acreage properties bordering the Niagara Escarpment offer privacy and scale increasingly rare closer to Toronto." },
        ],
      },
      program: {
        eyebrow: "Our Approach", headline: "The Signature Marketing Program",
        items: [
          { number: "01", title: "Private Strategy Session", body: "A confidential walkthrough of pricing, timing, and positioning before anything goes public." },
          { number: "02", title: "Professional Presentation", body: "Architectural photography, staging guidance, and a listing narrative built around the property's story." },
          { number: "03", title: "Targeted Outreach", body: "Direct introductions to qualified buyers and top agents across our local and international network." },
          { number: "04", title: "Discreet Negotiation", body: "Senior-level negotiation that protects your privacy and your position through to closing." },
        ],
      },
      faq: {
        eyebrow: "Common Questions", headline: "Luxury Real Estate FAQ",
        items: [
          { question: "What makes luxury real estate in Ontario unique?", answer: "Luxury in Milton, Oakville, and Burlington isn't just square footage — it's lot size, waterfront and Escarpment proximity, top school catchments, and finishes that hold their value." },
          { question: "Why choose Saigal Realty for a luxury purchase or sale?", answer: "As a boutique brokerage, our senior team personally handles every high-value transaction — from private showings to negotiation — with the discretion and attention a significant purchase deserves." },
          { question: "Which areas are best for luxury homes near Milton, Oakville, and Burlington?", answer: "Old Oakville and the Bronte waterfront, Burlington's Shoreacres and Tyandaga, and Milton's Escarpment-adjacent estate lots are consistently the strongest performers for luxury buyers in Halton." },
          { question: "What should I know before buying a luxury home?", answer: "Review zoning and severance restrictions, well/septic or heritage designations where applicable, and get a clear read on comparable sales — luxury inventory is thin." },
          { question: "How do you ensure a luxury home sells at the best price?", answer: "We pair a precise pricing strategy with targeted marketing — professional photography, a considered listing narrative, and direct outreach to qualified buyers and agent networks." },
          { question: "What should I know about maintaining a luxury property?", answer: "Larger lots, pools, and premium finishes carry higher upkeep and insurance costs — we help clients budget realistically for maintenance." },
        ],
      },
      globalNetwork: { eyebrow: "Beyond Halton", headline: "A Global Network for Global Clients", body: "Many of our luxury clients also hold or seek property abroad. Through our offices and partners in Texas, Dubai, Rabat, Karachi, and Costa Rica, we connect Halton buyers and sellers to vetted opportunities — and vice versa — across borders.", linkLabel: "Learn about our international reach →", linkHref: "/about" },
      cta: { headline: "Considering a luxury purchase or sale?", body: "A discreet, senior-level conversation — no pressure.", buttonLabel: "Book a Consultation", buttonHref: "/contact" },
    },
  },
  // ==========================================================================
  {
    slug: "commercial",
    title: "Commercial Real Estate",
    seo_title: "Commercial Real Estate — Saigal Realty Inc., Brokerage",
    seo_description: "Office, retail, and industrial leasing and sales across Milton, Oakville, and Burlington.",
    content: {
      hero: { eyebrow: "Milton · Oakville · Burlington", headline: "Commercial Real Estate", subhead: "Office, retail, and industrial leasing and sales — backed by the same careful, transparent approach we bring to every residential client.", image: "/images/commercial-hero.png" },
      sectors: {
        eyebrow: "What We Handle", headline: "Sectors We Serve",
        items: [
          { title: "Office", image: "/images/commercial-office.png", body: "Leasing and sales for professional office space across Milton, Oakville, and Burlington's business corridors." },
          { title: "Retail", image: "/images/commercial-retail.png", body: "Storefront and plaza opportunities in high-traffic locations, matched to your customer base." },
          { title: "Industrial", image: "/images/commercial-industrial.png", body: "Warehouse and flex-space transactions supporting Halton's growing logistics and manufacturing base." },
        ],
      },
      whyUs: {
        eyebrow: "Why Us", headline: "Commercial deals need residential-grade attention to detail.",
        body: ["Small business owners and investors are often underserved by commercial brokers focused on volume. We bring the same boutique, senior-level attention to a 1,500 sq ft storefront lease that we do to a multi-million dollar estate sale.", "That means real answers on zoning, permitted use, and lease structure — not a generic template pushed through quickly."],
        checklist: ["Local zoning and permitted-use knowledge across Milton, Oakville, and Burlington", "Lease-term negotiation covering escalations, CAM charges, and renewal options", "Direct connections to lenders, contractors, and commercial legal counsel"],
      },
      process: {
        eyebrow: "How We Work", headline: "Our Commercial Process",
        items: [
          { number: "01", title: "Needs Assessment", body: "We define space, budget, timeline, and zoning requirements upfront." },
          { number: "02", title: "Market Search", body: "We identify available and off-market opportunities that fit your criteria." },
          { number: "03", title: "Negotiation", body: "We negotiate rent, terms, and total occupancy cost — not just the headline rate." },
          { number: "04", title: "Closing", body: "We coordinate legal, financing, and due diligence through to possession." },
        ],
      },
      faq: {
        eyebrow: "Common Questions", headline: "Commercial FAQ",
        items: [
          { question: "Do you handle both leasing and sales?", answer: "Yes — we represent landlords, tenants, buyers, and sellers across office, retail, and industrial commercial real estate." },
          { question: "Which areas do you cover for commercial?", answer: "Our core focus is Milton, Oakville, and Burlington, with additional reach across the wider GTA and Halton region." },
          { question: "Can you help with investment properties?", answer: "Yes — from single retail units to multi-tenant industrial buildings, we help investors evaluate and acquire commercial assets." },
          { question: "What should I know about total occupancy cost?", answer: "Base rent is only part of the cost — common area charges, utilities, taxes, and insurance pass-throughs can add significantly to your total spend. We break this down before you sign anything." },
          { question: "Do you represent landlords as well as tenants?", answer: "Yes — we represent both sides of commercial transactions, always disclosing our role clearly to protect your interests." },
        ],
      },
      recentWork: {
        eyebrow: "Recent Work", headline: "The Kind of Deals We Handle",
        items: [
          { tag: "Retail Lease", body: "Secured a 5-year lease with a capped renewal option for a growing Milton retailer, saving roughly 12% in projected occupancy cost over the term." },
          { tag: "Office Sale", body: "Represented the seller of a professional office building in Oakville, coordinating tenant estoppels and closing in under 60 days." },
          { tag: "Industrial Acquisition", body: "Guided an investor through zoning due diligence on a Burlington flex-space property ahead of a successful acquisition." },
        ],
      },
      cta: { headline: "Have a commercial need?", body: "Let's talk about your space or investment goals.", buttonLabel: "Book a Consultation", buttonHref: "/contact" },
    },
  },
  // ==========================================================================
  {
    slug: "about",
    title: "About Saigal Realty",
    seo_title: "About Saigal Realty — Saigal Realty Inc., Brokerage",
    seo_description: "A boutique brokerage built on honest counsel and quiet precision.",
    content: {
      hero: { eyebrow: "About Us", headline: "Saigal Realty Inc., Brokerage", image: "/images/philosophy-lounge.png" },
      philosophy: { eyebrow: "Our Philosophy", headline: "Real estate, practiced with passion, integrity, and transparency.", body: "We built Saigal Realty because we believe our clients deserve more than a transaction — they deserve a trusted advisor. Every recommendation we make is grounded in honest counsel, careful research, and a genuine investment in your outcome, not ours. Whether you are buying your first home in Milton, selling a family property in Oakville, or building a portfolio across Burlington, we bring the same quiet rigor and care to every relationship." },
      stats: { items: [{ value: "7", label: "Agents" }, { value: "50+", label: "Neighbourhoods Served" }, { value: "5", label: "Languages Spoken" }, { value: "5", label: "International Markets" }] },
      boutique: { eyebrow: "Why Boutique", headline: "Small enough to know your name. Sharp enough to win your negotiation.", body: ["Large franchise offices measure success in transaction volume. We measure it in outcomes for the seven families we're working with this month — because that's how many we can serve without cutting corners.", "Every listing gets the Broker of Record's direct attention. Every offer is reviewed by someone who has walked the street it's on. That's the boutique advantage, and it's the reason our clients become referrals."], image: "/images/about-advisory.png" },
      pillars: {
        items: [
          { number: "01", title: "Passion", body: "We treat every home as if it were our own — because your milestones matter to us as much as they matter to you." },
          { number: "02", title: "Integrity", body: "Straightforward advice, even when it isn't what you hoped to hear. Your trust is earned, never assumed." },
          { number: "03", title: "Transparency", body: "Clear numbers, clear timelines, clear next steps — so you always know exactly where you stand." },
        ],
      },
      // Phase 4G: the member roster moved to the team_members table (see
      // scripts/seed-team-content.ts) so admin edits and photo changes
      // apply everywhere the roster is shown. This section now only
      // carries this page's own section heading.
      team: {
        eyebrow: "Meet The Team", headline: "The People Behind Saigal Realty",
      },
      internationalReach: {
        eyebrow: "Global Reach", headline: "International Exposure",
        body: "Beyond Halton and the GTA, our network extends across five international markets — giving clients and referral partners a genuine global reach for cross-border buyers, sellers, and investors. In Rabat, Dubai, and Costa Rica, we also help clients purchase Airbnb and vacation-home properties.",
        offices: [
          { city: "Dallas, Texas", country: "United States" },
          { city: "Rabat", country: "Morocco" },
          { city: "Dubai", country: "United Arab Emirates" },
          { city: "Karachi", country: "Pakistan" },
          { city: "Costa Rica", country: "Vacation & Airbnb homes" },
        ],
      },
      careersCta: { eyebrow: "Careers", headline: "Interested in Joining Our Team?", body: "We're always looking for agents who share our commitment to honest, client-first service.", buttonLabel: "View Careers", buttonHref: "/careers" },
      cta: { headline: "Let's work together.", body: "A conversation costs nothing — reach out any time.", buttonLabel: "Book a Consultation", buttonHref: "/contact" },
    },
  },
  // ==========================================================================
  {
    slug: "contact",
    title: "Contact Saigal Realty",
    seo_title: "Contact Saigal Realty — Saigal Realty Inc., Brokerage",
    seo_description: "Book a consultation with the Saigal Realty team.",
    content: {
      hero: { eyebrow: "Get In Touch", headline: "Let's Talk About Your Next Move", image: "/images/contact-hero.png" },
      form: { reasonOptions: ["I'm looking to buy", "I'm looking to sell", "I'm interested in commercial", "I'm interested in luxury real estate", "Other"], buttonLabel: "Send Message" },
      infoPanel: { servingArea: "Milton, Oakville, Burlington, Cambridge, Kitchener, Toronto, Mississauga" },
      officeHours: { items: [{ label: "Monday – Friday", value: "9:00 AM – 7:00 PM" }, { label: "Saturday", value: "10:00 AM – 5:00 PM" }, { label: "Sunday", value: "By appointment" }] },
      whatHappensNext: { items: [{ number: "01", body: "We respond within one business day, usually sooner." }, { number: "02", body: "A short call to understand your goals and timeline." }, { number: "03", body: "We match you with the right agent on our team." }] },
    },
  },
  // ==========================================================================
  {
    slug: "neighbourhoods",
    title: "Neighbourhoods We Serve",
    seo_title: "Neighbourhoods We Serve — Saigal Realty Inc., Brokerage",
    seo_description: "Explore 50+ neighbourhoods across Milton, Oakville, Burlington, Mississauga, and beyond.",
    content: {
      hero: { eyebrow: "Directory", headline: "Neighbourhoods We Serve", body: "Eighty neighbourhood guides across Milton, Oakville, Burlington, Mississauga, and Waterloo Region — each with local schools, parks, and commute detail.", image: "/images/neighbourhoods-hero.png" },
      quickNav: [{ label: "Milton", href: "#milton" }, { label: "Oakville", href: "#oakville" }, { label: "Burlington", href: "#burlington" }, { label: "Mississauga", href: "#mississauga" }, { label: "Kitchener", href: "#kitchener" }],
      cityGroups: [
        { city: "Milton", anchor: "milton", overviewHref: "/neighbourhoods/milton", overviewLabel: "Milton overview →", body: "One of the GTA's fastest-growing towns, offering stronger value than Oakville or Burlington with easy access to the Escarpment, GO transit, and top schools." },
        { city: "Oakville", anchor: "oakville", overviewHref: "/neighbourhoods/oakville", overviewLabel: "Oakville overview →", body: "Heritage streets, Lake Ontario waterfront, and some of the GTA's most sought-after schools — spanning starter condos to significant estates." },
        { city: "Burlington", anchor: "burlington", overviewHref: "/neighbourhoods/burlington", overviewLabel: "Burlington overview →", body: "Where the Niagara Escarpment meets Lake Ontario — waterfront living, hiking trails, and a walkable downtown at a discount to Oakville." },
        { city: "Mississauga", anchor: "mississauga", body: "From Port Credit's lakeside village to Lorne Park's estates and City Centre's condo towers — Canada's sixth-largest city spans nearly every price point and property type." },
        { city: "Kitchener", anchor: "kitchener", heading: "Kitchener & Waterloo Region", body: "Accessible pricing, strong rental demand, and continued transit and tech-sector investment make Waterloo Region a frequent focus for our investor clients." },
      ],
      whyHalton: {
        items: [
          { title: "Why We Focus on Halton", body: "Depth beats breadth. Knowing which streets hold value street-by-street is only possible by staying close to our core markets." },
          { title: "Local Comparables", body: "We track recent sales at the neighbourhood level, so pricing advice reflects what's actually happening on your street, not a citywide average." },
          { title: "Not Sure Where to Start?", body: "Tell us your budget and priorities and we'll recommend the neighbourhoods worth touring first.", linkLabel: "Get in touch →", linkHref: "/contact" },
        ],
      },
    },
  },
  // ==========================================================================
  {
    slug: "faq",
    title: "Frequently Asked Questions",
    seo_title: "Frequently Asked Questions — Saigal Realty Inc., Brokerage",
    seo_description: "Answers to common questions about buying, selling, and working with Saigal Realty.",
    content: {
      hero: { eyebrow: "Answers", headline: "Frequently Asked Questions", image: "/uploads/sraa.png" },
      categoryNav: [{ label: "Milton Real Estate FAQs", href: "#milton" }, { label: "Buyer FAQs", href: "#buyers" }, { label: "Seller FAQs", href: "#sellers" }, { label: "Working with Our Team FAQs", href: "#team" }, { label: "General Market & Investment FAQs", href: "#market" }, { label: "Luxury Real Estate FAQs", href: "#luxury" }],
      categories: [
        { anchor: "milton", heading: "Milton Real Estate", items: [
          { question: "Is Milton a good place to buy a home right now?", answer: "Milton continues to offer stronger value than Oakville or Burlington while providing comparable access to the Escarpment, GO transit, and top schools." },
          { question: "What are the best neighbourhoods in Milton for families?", answer: "Beaty, Scott, and the Ford neighbourhoods are popular for newer builds and school proximity, while Old Milton offers mature streets closer to downtown." },
          { question: "What is the average home price in Milton?", answer: "Pricing varies significantly by neighbourhood and property type — request a free comparative market analysis and we'll give you current, street-level numbers rather than a citywide average." },
          { question: "Is Milton well connected to Toronto for commuters?", answer: "Milton GO offers direct service to Union Station, and the 401/407 corridor makes driving commutes to Mississauga and the west GTA straightforward." },
        ] },
        { anchor: "buyers", heading: "Buyer FAQs", items: [
          { question: "How do I start searching for homes for sale?", answer: "Use the search tool on our homepage to filter by location, price, and bedrooms, or book a consultation and we'll set up custom alerts." },
          { question: "Do I need to be pre-approved before viewing homes?", answer: "We recommend it — it clarifies your budget and makes your offer stronger once you find the right home. We can connect you with trusted mortgage contacts." },
          { question: "What costs should I budget for beyond the purchase price?", answer: "Land transfer tax, legal fees, home inspection, and moving costs typically add 2-4% of the purchase price — we'll walk you through the exact numbers for your situation." },
          { question: "Can you help me buy and sell at the same time?", answer: "Yes — we coordinate closing dates, bridge financing conversations, and offer conditions so your sale and purchase move in step." },
        ] },
        { anchor: "sellers", heading: "Seller FAQs", items: [
          { question: "Do you offer a free home evaluation?", answer: "Yes — we provide a complimentary comparative market analysis for anyone considering selling in Milton, Oakville, or Burlington." },
          { question: "How long does it typically take to sell a home?", answer: "Well-priced homes in desirable neighbourhoods commonly sell within a few weeks; condition, presentation, and pricing strategy are the biggest factors." },
          { question: "Should I renovate before selling?", answer: "Rarely for major projects — most renovations don't return their full cost at sale. We'll advise on the small, high-return fixes worth making before your listing goes live." },
          { question: "What are your commission rates?", answer: "Commission is negotiable and discussed transparently at your listing consultation — no surprises, no pressure." },
        ] },
        { anchor: "team", heading: "Working with Our Team", items: [
          { question: "How is Saigal Realty different from a large national brokerage?", answer: "As a boutique brokerage, every client works directly with a small, senior team — not a call centre. We prioritize honest counsel over transaction volume." },
          { question: "Which languages does your team speak?", answer: "Between our agents we speak English, Urdu, Hindi, Punjabi, and Arabic." },
        ] },
        { anchor: "market", heading: "General Market & Investment", items: [
          { question: "Which areas does Saigal Realty serve?", answer: "We focus on Milton, Oakville, and Burlington, with additional coverage across Cambridge, Kitchener, Toronto, Mississauga, and York Region." },
          { question: "Can Saigal Realty help with commercial real estate?", answer: "Yes — we handle office, retail, and industrial leasing and sales across Milton, Oakville, and Burlington in addition to residential buying and selling." },
        ] },
        { anchor: "luxury", heading: "Luxury Real Estate", items: [
          { question: "What makes luxury real estate in Ontario unique?", answer: "Luxury in Milton, Oakville, and Burlington is defined by lot size, waterfront and Escarpment proximity, top school catchments, and finishes that hold their value." },
          { question: "Which areas are best for luxury homes?", answer: "Old Oakville and the Bronte waterfront, Burlington's Shoreacres and Tyandaga, and Milton's Escarpment-adjacent estate lots.", links: [{ text: "Luxury page", href: "/luxury" }] },
        ] },
      ],
    },
  },
  // ==========================================================================
  {
    slug: "careers",
    title: "Careers",
    seo_title: "Careers — Saigal Realty Inc., Brokerage",
    seo_description: "Join the Saigal Realty team serving Milton, Oakville, and Burlington.",
    content: {
      hero: { eyebrow: "Careers", headline: "Join Our Team", image: "/uploads/sraa.png" },
      intro: { body: "We're a small brokerage by design — big enough to give you real support, small enough that you're never just a number. If you believe in honest counsel over volume sales, and want to build a career serving Milton, Oakville, and Burlington with a team that stands behind its name, we'd like to hear from you." },
      benefits: { items: [
        { title: "Mentorship", body: "Direct, hands-on guidance from our Broker of Record and senior agents — not a generic training video." },
        { title: "Local Reputation", body: "Decades of trust built in Halton means warmer leads and a name that opens doors in Milton, Oakville, and Burlington." },
        { title: "Room to Grow", body: "Residential, commercial, and pre-construction opportunities — build the practice that fits how you want to work." },
      ] },
      process: {
        eyebrow: "How It Works", headline: "Our Hiring Process",
        items: [
          { number: "01", title: "Apply", body: "Send us your background and goals below." },
          { number: "02", title: "Conversation", body: "A no-pressure chat with our Broker of Record." },
          { number: "03", title: "Shadow a Deal", body: "See how we work before you commit." },
          { number: "04", title: "Onboard", body: "Get set up with tools, leads, and a mentor." },
        ],
      },
      openRoles: {
        eyebrow: "Open Roles", headline: "Currently Hiring",
        items: [
          { title: "Residential Sales Agent", location: "Milton / Oakville" },
          { title: "Commercial Leasing Associate", location: "Burlington" },
          { title: "Licensed Assistant / Coordinator", location: "Head Office" },
        ],
        footnote: "Don't see your fit? Apply anyway — we're always open to the right person.",
      },
      applyForm: { eyebrow: "Apply", headline: "Tell Us About Yourself", buttonLabel: "Submit Application" },
    },
  },
  // ==========================================================================
  {
    slug: "search",
    title: "Property Search",
    seo_title: "Property Search — Saigal Realty Inc., Brokerage",
    seo_description: "Search active listings across Halton by location, price, property type, and more.",
    content: {
      hero: { eyebrow: "Milton · Oakville · Burlington", headline: "Property Search", body: "Search active listings across Halton by location, price, property type, and more." },
      filters: {
        locations: ["Milton", "Oakville", "Burlington", "Cambridge", "Kitchener", "Toronto", "Mississauga", "York Region"],
        statuses: ["For Sale", "For Rent"],
        propertyTypes: ["Residential", "Townhomes", "Condos", "Multi-Family", "Commercial", "Land", "Co-op", "Other"],
        bedOptions: ["Any", "Studio", "1", "2", "3", "4+"],
        caption: "Live IDX results will populate here once connected to Proptx.",
      },
    },
  },
  // ==========================================================================
  {
    slug: "blog",
    title: "The Saigal Realty Blog",
    seo_title: "The Saigal Realty Blog — Saigal Realty Inc., Brokerage",
    seo_description: "Market updates, neighbourhood guides, and advice for buyers and sellers across Milton, Oakville, and Burlington.",
    content: {
      hero: { eyebrow: "Insights", headline: "The Saigal Realty Blog" },
    },
  },
  // ==========================================================================
  {
    slug: "neighbourhoods-milton",
    title: "Milton Real Estate",
    seo_title: "Milton Real Estate — Saigal Realty Inc., Brokerage",
    seo_description: "Milton real estate — homes for sale, market stats, schools, parks, and commute.",
    content: {
      hero: { eyebrow: "Halton Region", headline: "Milton Real Estate", image: "/uploads/Milton's Mill Pond at Golden Hour.png", ctaHref: "/#contact" },
      intro: { body: ["Milton has grown from a quiet Halton crossroads into one of the GTA's fastest-growing communities — and one of its most livable. Families are drawn to the town's mix of established neighbourhoods like Old Milton and newer master-planned communities near the Escarpment, all within easy reach of the Milton GO station and Highway 401. Whether you're searching for a starter townhome, a family home near top-rated schools, or a custom build backing onto the Niagara Escarpment, Milton offers a range few other Halton communities can match — often at a better value than neighbouring Oakville or Burlington.", "We've represented buyers and sellers across Milton's core neighbourhoods for years, and we bring that street-level knowledge — school catchments, upcoming developments, which streets hold value — to every conversation."] },
      stats: { items: [{ value: "$965K", label: "Avg. Sale Price (sample)" }, { value: "18", label: "Avg. Days on Market (sample)" }, { value: "140K+", label: "Population (sample)" }] },
      lifestyle: {
        eyebrow: "Living in Milton", headline: "Schools, Parks & Commute",
        items: [
          { title: "Schools", body: "Milton is served by strong public and Catholic school boards, with several highly-rated elementary and secondary schools concentrated in the newer north-end communities." },
          { title: "Parks & Recreation", body: "The Niagara Escarpment, Kelso Conservation Area, and an extensive trail network give Milton some of the best outdoor access in the GTA." },
          { title: "Commute", body: "Milton GO connects downtown in under an hour, and Highway 401 access makes commuting to Mississauga and the western GTA straightforward." },
        ],
      },
      featuredListingsCity: "Milton",
      faq: {
        eyebrow: "Common Questions", headline: "Milton Real Estate FAQ",
        items: [
          { question: "Is Milton a good place to buy a home right now?", answer: "Milton continues to offer stronger value than Oakville or Burlington while providing comparable access to the Escarpment, GO transit, and top schools — making it attractive to both first-time buyers and move-up families." },
          { question: "What are the best neighbourhoods in Milton for families?", answer: "Beaty, Scott, and the Ford neighbourhoods are popular for their newer builds, parks, and school proximity, while Old Milton offers mature streets and larger lots closer to downtown." },
          { question: "How long does it typically take to sell a home in Milton?", answer: "Well-priced homes in desirable Milton neighbourhoods commonly sell within a few weeks; condition, presentation, and pricing strategy remain the biggest factors in a faster sale." },
        ],
      },
      nearby: { items: [{ label: "Oakville", href: "/neighbourhoods/oakville" }, { label: "Burlington", href: "/neighbourhoods/burlington" }] },
      cta: { headline: "Thinking about Milton?", body: "Let's talk about what's happening on your street.", buttonLabel: "Book a Consultation", buttonHref: "/#contact" },
    },
  },
  // ==========================================================================
  {
    slug: "neighbourhoods-oakville",
    title: "Oakville Real Estate",
    seo_title: "Oakville Real Estate — Saigal Realty Inc., Brokerage",
    seo_description: "Oakville real estate — homes for sale, market stats, schools, waterfront, and commute.",
    content: {
      hero: { eyebrow: "Halton Region", headline: "Oakville Real Estate", image: "/uploads/Oakville Harbour and Historic Lighthouse.png", ctaHref: "/contact" },
      intro: { body: ["Oakville pairs small-town character with some of the most sought-after real estate in the GTA. From the tree-lined heritage streets of Old Oakville and the Lake Ontario shoreline at Bronte, to family-friendly newer developments in Glen Abbey and West Oak Trails, the town offers a range that spans starter condos to significant waterfront estates. Excellent schools, a walkable downtown, and GO and QEW access make it a consistent draw for families and professionals commuting into Toronto or Mississauga.", "We work across Oakville's core neighbourhoods regularly, and bring detailed knowledge of pricing by street, school catchments, and where value remains to every buyer and seller conversation."] },
      stats: { items: [{ value: "$1.38M", label: "Avg. Sale Price (sample)" }, { value: "21", label: "Avg. Days on Market (sample)" }, { value: "220K+", label: "Population (sample)" }] },
      lifestyle: {
        eyebrow: "Living in Oakville", headline: "Schools, Waterfront & Commute",
        items: [
          { title: "Schools", body: "Oakville is home to some of Halton's highest-ranked public and independent schools, a major factor driving demand in neighbourhoods like Glen Abbey and River Oaks." },
          { title: "Waterfront & Parks", body: "The Lake Ontario waterfront trail, Bronte Harbour, and Coronation Park give Oakville a lifestyle few GTA communities can match." },
          { title: "Commute", body: "Oakville GO offers a direct line to downtown Toronto, and QEW access makes commuting to Mississauga and the western GTA straightforward." },
        ],
      },
      featuredListingsCity: "Oakville",
      faq: {
        eyebrow: "Common Questions", headline: "Oakville Real Estate FAQ",
        items: [
          { question: "Is Oakville a good place to buy a home right now?", answer: "Oakville consistently ranks among the GTA's most desirable communities for schools, waterfront access, and long-term value retention, though it commands a premium over Milton and Burlington." },
          { question: "What are the best neighbourhoods in Oakville for families?", answer: "Glen Abbey, River Oaks, and West Oak Trails offer newer builds close to top schools, while Old Oakville and Bronte suit buyers prioritizing heritage character or waterfront living." },
          { question: "How competitive is the Oakville market for buyers?", answer: "Well-located, well-priced homes still move quickly, particularly in top school catchments — a clear pre-approval and a responsive strategy matter more here than in most surrounding markets." },
        ],
      },
      nearby: { items: [{ label: "Milton", href: "/neighbourhoods/milton" }, { label: "Burlington", href: "/neighbourhoods/burlington" }, { label: "Mississauga", href: "/neighbourhoods/mississauga" }, { label: "Luxury Homes", href: "/luxury" }] },
      cta: { headline: "Thinking about Oakville?", body: "Let's talk about what's happening on your street.", buttonLabel: "Book a Consultation", buttonHref: "/contact" },
    },
  },
  // ==========================================================================
  {
    slug: "neighbourhoods-burlington",
    title: "Burlington Real Estate",
    seo_title: "Burlington Real Estate — Saigal Realty Inc., Brokerage",
    seo_description: "Burlington real estate — homes for sale, market stats, schools, waterfront, and commute.",
    content: {
      hero: { eyebrow: "Halton Region", headline: "Burlington Real Estate", image: "/uploads/Golden Hour Over Burlington's Brant Street Pier.png", ctaHref: "/contact" },
      intro: { body: ["Burlington sits where the Niagara Escarpment meets Lake Ontario, giving it a rare combination of waterfront living, hiking trails, and a walkable downtown — all within commuting distance of Toronto and Hamilton. Established neighbourhoods like Aldershot and Shoreacres offer mature lots close to the lake, while Tyandaga and the city's north end appeal to families seeking newer builds and top-rated schools at a comparative discount to Oakville.", "Our team tracks Burlington's neighbourhood-level trends closely, from waterfront premiums to which streets near the Escarpment are seeing the strongest demand."] },
      stats: { items: [{ value: "$1.09M", label: "Avg. Sale Price (sample)" }, { value: "19", label: "Avg. Days on Market (sample)" }, { value: "190K+", label: "Population (sample)" }] },
      lifestyle: {
        eyebrow: "Living in Burlington", headline: "Schools, Waterfront & Commute",
        items: [
          { title: "Schools", body: "Burlington offers strong public and Catholic school options across the city, with several highly-rated schools in the Tyandaga and Millcroft areas." },
          { title: "Waterfront & Escarpment", body: "The Beachway waterfront trail, Spencer Smith Park, and Escarpment hiking access give Burlington an outdoor lifestyle unmatched by most Halton communities." },
          { title: "Commute", body: "Burlington GO and easy QEW/403 access make commuting to Toronto, Hamilton, and Oakville straightforward." },
        ],
      },
      featuredListingsCity: "Burlington",
      faq: {
        eyebrow: "Common Questions", headline: "Burlington Real Estate FAQ",
        items: [
          { question: "Is Burlington a good place to buy a home right now?", answer: "Burlington offers waterfront and Escarpment access at a meaningful discount to Oakville, making it attractive to buyers who want the lifestyle without the top-tier price tag." },
          { question: "What are the best neighbourhoods in Burlington for families?", answer: "Tyandaga and Millcroft are popular for newer builds and school access, while Aldershot and Shoreacres appeal to buyers prioritizing proximity to the lake." },
          { question: "How long does it typically take to sell a home in Burlington?", answer: "Well-priced homes in strong Burlington neighbourhoods commonly sell within a few weeks; waterfront-adjacent listings often move even faster with the right marketing." },
        ],
      },
      nearby: { items: [{ label: "Oakville", href: "/neighbourhoods/oakville" }, { label: "Milton", href: "/neighbourhoods/milton" }, { label: "Luxury Homes", href: "/luxury" }] },
      cta: { headline: "Thinking about Burlington?", body: "Let's talk about what's happening on your street.", buttonLabel: "Book a Consultation", buttonHref: "/contact" },
    },
  },
];
