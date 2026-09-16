// site_settings (singleton) and listings seed data, extracted from the
// contact info repeated across every page's footer/contact panel, and the
// "Featured Listings" placeholder cards on the three city overview pages
// (the only listings with enough real detail - address aside, which no
// source page ever had - to be worth a row; the fully generic "Sample
// Listing" cards on Buy/Search have no distinguishing data of their own,
// so those pages query this same table for their preview cards instead).

export const SITE_SETTINGS = {
  brokerage_name: "Saigal Realty Inc., Brokerage",
  phone: "(905) 876-4126",
  email: "info@saigalrealty.ca",
  address_line1: "585 Ontario St S #204",
  address_line2: "Milton, ON L9T 2N2",
  social_instagram: null as string | null,
  social_facebook: null as string | null,
  social_linkedin: null as string | null,
  footer_tagline:
    "Saigal Realty Inc., Brokerage — serving Milton, Oakville, Burlington and the wider Halton and GTA region with honest, considered representation.",
  copyright_text: "© 2026 Saigal Realty Inc., Brokerage. Independently Owned and Operated.",
  contact_form_destination_email: "info@saigalrealty.ca",
  logo_url: "/uploads/saigal-logo-cropped.png",
  favicon_url: null as string | null,
};

export type ListingSeed = {
  address: string;
  city: string;
  neighbourhood: string;
  price: number;
  beds: number;
  baths: number;
  property_type: string;
  description: string | null;
  image: string;
  listing_url: string | null;
  featured: boolean;
};

export const LISTINGS: ListingSeed[] = [
  { address: "Address available upon request", city: "Milton", neighbourhood: "Old Milton", price: 899000, beds: 3, baths: 2, property_type: "Residential", description: null, image: "/images/listing-old-milton.png", listing_url: null, featured: true },
  { address: "Address available upon request", city: "Milton", neighbourhood: "Scott", price: 1150000, beds: 4, baths: 3, property_type: "Residential", description: null, image: "/images/listing-scott.png", listing_url: null, featured: true },
  { address: "Address available upon request", city: "Milton", neighbourhood: "Beaty", price: 749900, beds: 2, baths: 2, property_type: "Residential", description: null, image: "/images/listing-beaty.png", listing_url: null, featured: true },
  { address: "Address available upon request", city: "Oakville", neighbourhood: "Glen Abbey", price: 1295000, beds: 4, baths: 3, property_type: "Residential", description: null, image: "/images/listing-glen-abbey.png", listing_url: null, featured: true },
  { address: "Address available upon request", city: "Oakville", neighbourhood: "Old Oakville", price: 2450000, beds: 5, baths: 4, property_type: "Residential", description: null, image: "/images/luxury-estate.png", listing_url: null, featured: true },
  { address: "Address available upon request", city: "Oakville", neighbourhood: "River Oaks", price: 989000, beds: 3, baths: 2, property_type: "Residential", description: null, image: "/images/listing-old-milton.png", listing_url: null, featured: true },
  { address: "Address available upon request", city: "Burlington", neighbourhood: "Tyandaga", price: 949000, beds: 3, baths: 2, property_type: "Residential", description: null, image: "/images/listing-scott.png", listing_url: null, featured: true },
  { address: "Address available upon request", city: "Burlington", neighbourhood: "Shoreacres", price: 1725000, beds: 4, baths: 3, property_type: "Residential", description: null, image: "/images/luxury-waterfront.png", listing_url: null, featured: true },
  { address: "Address available upon request", city: "Burlington", neighbourhood: "Aldershot", price: 815000, beds: 3, baths: 2, property_type: "Residential", description: null, image: "/images/listing-beaty.png", listing_url: null, featured: true },
];
