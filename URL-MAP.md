# URL Redirect / Routing Map — Saigal Realty

Old saigalrealty.ca URLs are preserved as the canonical slugs. Every neighbourhood
page is served from the shared `Sub-Neighbourhood` template, keyed by the legacy slug.

## Neighbourhood pages (80)

Live URL should be: `https://saigalrealty.ca/<slug>`
Renders from: `Sub-Neighbourhood.dc.html?slug=<slug>`

No redirect needed — the slug IS the old URL path.

### Milton (14)
old-milton, beaty-milton, scott-milton, ford-milton, timberlea-milton,
bronte-meadows-milton, clarke-milton, harrison-milton, coates-milton,
cobban-milton, dempsey, dorset-park-milton, walker-milton, willmott-milton

### Oakville (15)
old-oakville, glen-abbey-oakville, bronte-east-oakville, bronte-west-oakville,
river-oaks-oakville, west-oak-trails-oakville, uptown-core-oakville,
clearview-oakville, eastlake-oakville, college-park-oakville,
iroquois-ridge-north-oakville, iroquois-ridge-south-oakville,
palermo-west-oakville, rural-oakville, winston-park-oakville

### Burlington (21)
aldershot-burlington, tyandaga-burlington, shoreacres-burlington, roseland-burlington,
millcroft-burlington, headon-burlington, alton-burlington, brant-hills-burlington,
appleby-burlington, bayview-burlington, brant-burlington, freeman-burlington,
grindstone-burlington, lasalle-burlington, mountainside-burlington, orchard-burlington,
palmer-burlington, rose-burlington, rural-burlington, tansley-burlington, uptown-burlington

### Mississauga (29)
port-credit-mississauga, lorne-park-mississauga, mineola-mississauga, clarkson-mississauga,
streetsville, erin-mills-mississauga, central-erin-mills-mississauga,
churchill-meadows-mississauga, city-centre-mississauga, cooksville-mississauga,
applewood-mississauga, dixie-mississauga, east-credit-mississauga, erindale-mississauga,
creditview-mississauga, gateway-mississauga, hurontario-mississauga, lakeview-mississauga,
lisgar-mississauga, malton-mississauga, mavis-erindale-mississauga, meadwovale-mississauga,
meadowvale-village-mississauga, mississauga-valleys-mississauga, northeast-mississauga,
rathwood-mississauga, sheridan-mississauga, sheridan-park, southdown-mississauga

Note: `meadwovale-mississauga` retains the typo from the legacy sitemap to preserve
its ranking. Consider a 301 to a corrected `meadowvale-mississauga` later, but only
after confirming which URL holds the backlinks.

### Kitchener (1)
kitchener-east

## Core pages

| Old URL | New page |
|---|---|
| / | Homepage |
| /our-team | About |
| /contact | Contact |
| /careers | Careers |
| /blog | Blog |
| /client-reviews | Homepage (testimonials section) |
| /real-estate-services | Buy / Sell / Commercial |
| /commercial-listings | Commercial |
| /listings | Search |
| /rentals | Search (status = For Rent) |
| /free-home-evaluation | Sell |
| /sitemap | Neighbourhoods |

## Still to build (in the old sitemap, not yet rebuilt)

City landing pages: /milton-homes-for-sale, /oakville, /burlington, /mississauga,
/cambridge, /kitchener, /toronto, /ontario

Service pages: /pre-construction, /pre-construction-real-estate,
/international-real-estate, /rent-your-property, /mortgage-calculator,
/listing-alerts, /area-alert, /1percent, /preconstruction-barrie

City rental pages: /milton-rentals, /oakville-rentals, /burlington-rentals,
/mississauga-rentals, /cambridge-rentals, /kitchener-rentals, /toronto-rentals

Blog posts: ~30 legacy articles (see sitemap). These need their original copy
migrated — I have titles/slugs only, not the post bodies.
