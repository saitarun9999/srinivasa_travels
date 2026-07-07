import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "airport-transfer",
    title: "Airport Taxi in Hyderabad — RGIA Transfers",
    menuLabel: "Airport Transfer",
    tagline: "Flight-tracked pickups at Rajiv Gandhi International Airport",
    description:
      "Fixed-fare chauffeur pickups and drops between anywhere in Hyderabad and RGIA Shamshabad. We track your flight, so a delayed landing never means a missed cab.",
    longDescription: [
      "Rajiv Gandhi International Airport sits 30–45 km from most of Hyderabad, and the difference between a good and a bad transfer is entirely in the details: does the driver track your flight, is the fare fixed before you ride, and is the car waiting when you walk out of arrivals? We built our airport service around exactly those three things.",
      "Every airport booking is confirmed with the chauffeur's name, photo and vehicle number on WhatsApp before pickup. For arrivals, we monitor your flight status and adjust the pickup time automatically — you pay nothing extra if your flight is late. Airport parking and toll are itemised transparently in the fare.",
      "We serve every corridor — Gachibowli and the Financial District, HITEC City, Banjara Hills, Secunderabad, Kompally, Uppal and beyond — at any hour. Red-eye departure at 3 AM? That is a normal booking for us, not a special request.",
    ],
    highlights: [
      {
        title: "Flight tracking included",
        detail: "Delayed arrival? Your chauffeur adjusts automatically — no waiting charges for flight delays.",
      },
      {
        title: "Fixed fares, no surge",
        detail: "The fare quoted at booking is the fare you pay. Tolls and parking itemised up front.",
      },
      {
        title: "24×7, every day",
        detail: "Early departures and late-night arrivals covered — the desk answers around the clock.",
      },
      {
        title: "Meet & greet on request",
        detail: "Chauffeur waits at arrivals with a name board — ideal for parents, first-time visitors and guests.",
      },
    ],
    keywords: [
      "airport taxi Hyderabad",
      "Hyderabad airport cab",
      "RGIA airport transfer",
      "Shamshabad airport taxi",
    ],
    recommendedVehicleSlugs: ["swift-dzire", "innova-crysta", "innova-hycross"],
    faqs: [
      {
        question: "How early should I book an airport pickup in Hyderabad?",
        answer:
          "A few hours' notice is usually enough, but for early-morning departures (4–7 AM) we recommend booking the previous evening so we can assign a chauffeur near your area.",
      },
      {
        question: "What happens if my flight is delayed?",
        answer:
          "Nothing you need to do — we track the flight number you share at booking and reschedule the pickup automatically. There are no waiting charges for flight delays.",
      },
      {
        question: "Is airport parking included in the fare?",
        answer:
          "The quote you receive itemises the base fare, toll and airport entry/parking separately, so there are no surprises at drop-off.",
      },
    ],
  },
  {
    slug: "local-rental",
    title: "Local Car Rental in Hyderabad — Hourly Packages",
    menuLabel: "Local Rental",
    tagline: "A chauffeur-driven car at your disposal, by the hour",
    description:
      "8hr/80km and 12hr/120km chauffeur-driven packages for shopping days, guest city tours, medical visits and business meetings across Hyderabad.",
    longDescription: [
      "Some days need a car that simply stays with you — a relative's wedding shopping across three markets, a guest who wants to see Charminar, Golconda and Hussain Sagar in one sweep, or a day of back-to-back business meetings from Gachibowli to Begumpet. Our local packages keep one chauffeur and one car with you for the day.",
      "Packages start at 8 hours / 80 km, with transparent per-km and per-hour rates beyond the package — displayed before you book, not discovered after. Your chauffeur knows the city's parking realities and temple-street shortcuts, which quietly saves more time than any app estimate shows.",
    ],
    highlights: [
      {
        title: "8hr/80km & 12hr/120km",
        detail: "Simple packages that cover a full Hyderabad day; extra hours and kilometres at published rates.",
      },
      {
        title: "One chauffeur all day",
        detail: "The same driver stays with you across every stop — no rebooking, no waiting for a new cab.",
      },
      {
        title: "City-fluent drivers",
        detail: "Chauffeurs who know Old City lanes, tech-corridor traffic and where to park at Laad Bazaar.",
      },
    ],
    keywords: [
      "car rental Hyderabad",
      "local taxi package Hyderabad",
      "8hr 80km cab Hyderabad",
      "full day cab Hyderabad",
    ],
    recommendedVehicleSlugs: ["swift-dzire", "maruti-ertiga", "kia-carens"],
    faqs: [
      {
        question: "What does the 8hr/80km package include?",
        answer:
          "A chauffeur-driven car with you for 8 hours or 80 km, whichever is consumed first. Beyond that, extra kilometres and hours are billed at the published rate for your vehicle — shown on the pricing page and in your quote.",
      },
      {
        question: "Can the local package cover Ramoji Film City?",
        answer:
          "Yes — Ramoji is about 35 km from the city centre, so a 12hr/120km package fits a full-day visit comfortably. Tell us at booking so we assign it correctly.",
      },
    ],
  },
  {
    slug: "outstation-cab",
    title: "Outstation Cabs from Hyderabad",
    menuLabel: "Outstation Cab",
    tagline: "Round trips and one-ways to every major city and temple town",
    description:
      "Chauffeur-driven outstation taxis from Hyderabad to Tirupati, Vijayawada, Bangalore, Srisailam and beyond — transparent per-km fares, tolls and permits itemised.",
    longDescription: [
      "The outstation trip is where a good operator earns trust: a chauffeur who has driven the route a hundred times, a vehicle serviced for the highway rather than merely the city, and a fare sheet that itemises kilometres, driver allowance, tolls and permits before you commit.",
      "We run daily departures to the classic circuits — Tirupati darshan trips, Vijayawada and Amaravati, the Bangalore corridor, Srisailam's ghats — plus custom multi-city itineraries. One-way drops are available on select routes so you don't pay for the return you won't use.",
      "Every quote shows the per-km rate, minimum billable kilometres, and driver allowance in plain numbers. Night driving on ghat sections is assigned only to our senior drivers.",
    ],
    highlights: [
      {
        title: "Route-experienced chauffeurs",
        detail: "Drivers assigned by route familiarity — ghat roads and night highways go to senior hands.",
      },
      {
        title: "Itemised fares",
        detail: "Per-km rate, driver allowance, tolls and permits — every line visible before you book.",
      },
      {
        title: "One-way drops",
        detail: "Select corridors offer one-way pricing so you pay only for the distance you travel.",
      },
      {
        title: "Multi-day itineraries",
        detail: "Temple circuits and multi-city plans arranged with a single vehicle and driver throughout.",
      },
    ],
    keywords: [
      "outstation cab Hyderabad",
      "Hyderabad to Tirupati taxi",
      "outstation taxi rental Hyderabad",
      "one way cab from Hyderabad",
    ],
    recommendedVehicleSlugs: ["innova-crysta", "maruti-ertiga", "tempo-traveller-12"],
    faqs: [
      {
        question: "How is an outstation fare calculated?",
        answer:
          "Total kilometres (minimum 300 km per calendar day) × the vehicle's per-km rate, plus a fixed driver allowance per day. Tolls, state permits and parking are itemised at actuals in your quote.",
      },
      {
        question: "Do you provide one-way cabs from Hyderabad?",
        answer:
          "Yes, on high-frequency corridors such as Vijayawada and Bangalore. One-way fares are quoted as a fixed amount rather than per-km — ask on WhatsApp with your date for the current rate.",
      },
    ],
  },
  {
    slug: "corporate-rental",
    title: "Corporate Car Rental in Hyderabad",
    menuLabel: "Corporate Rental",
    tagline: "Reliable employee and guest transport, monthly billing",
    description:
      "Dedicated chauffeur-driven cars for companies in HITEC City, Gachibowli and the Financial District — airport transfers for visiting leadership, daily employee movement, and event logistics on a single monthly invoice.",
    longDescription: [
      "Corporate travel fails at the edges — the 6 AM pickup that doesn't show, the visiting director kept waiting at arrivals, the expense report with twelve cab receipts. We run corporate accounts to remove exactly those failures: a dedicated coordinator, drivers vetted for professional conduct, and one consolidated GST invoice at month end.",
      "Engagements range from ad-hoc guest transfers to dedicated monthly cars with a fixed chauffeur. Reporting includes trip logs with timestamps, so your admin team reconciles in minutes rather than days.",
    ],
    highlights: [
      {
        title: "Single monthly GST invoice",
        detail: "All trips consolidated with trip logs — no receipt-chasing across your team.",
      },
      {
        title: "Dedicated coordinator",
        detail: "One phone number that owns every booking, change and escalation for your account.",
      },
      {
        title: "Vetted, uniformed chauffeurs",
        detail: "Background-verified drivers briefed on client-facing conduct and punctuality standards.",
      },
    ],
    keywords: [
      "corporate car rental Hyderabad",
      "employee transportation Hyderabad",
      "corporate cab services HITEC City",
    ],
    recommendedVehicleSlugs: ["kia-carens", "innova-hycross", "innova-crysta"],
    faqs: [
      {
        question: "Do you offer monthly dedicated cars for companies?",
        answer:
          "Yes — a fixed vehicle and chauffeur reserved for your office, billed monthly with unlimited-within-agreement usage. Share your expected duty hours and we will quote a monthly rate.",
      },
      {
        question: "Can you handle event transport for offsites?",
        answer:
          "Yes. For offsites and conferences we run multiple vehicles on a coordinated schedule with a single point of contact managing all movements on the day.",
      },
    ],
  },
  {
    slug: "wedding-rental",
    title: "Wedding Car Rental in Hyderabad",
    menuLabel: "Wedding Rental",
    tagline: "Decorated cars and guest fleets for the big day",
    description:
      "Premium decorated cars for the couple and coordinated fleets for guests — Fortuners, Innovas and Tempo Travellers managed on a single wedding-day schedule.",
    longDescription: [
      "A wedding is a logistics event wearing beautiful clothes. Beyond the decorated car at the mandapam, someone has to move grandparents between venues, shuttle guests from hotels, and have a vehicle standing by when the muhurtham runs late. We plan wedding transport as one coordinated schedule, not a pile of separate bookings.",
      "The couple's car — typically a white Fortuner or HyCross, decorated to your taste — is confirmed with photos beforehand. Guest movements run on a shared plan with your wedding coordinator, with drivers briefed on venues, gates and timings.",
    ],
    highlights: [
      {
        title: "Decorated couple's car",
        detail: "Floral decoration arranged and photographed for your approval before the day.",
      },
      {
        title: "Guest fleet coordination",
        detail: "Sedans to 17-seaters on one schedule, with a single coordinator on call all day.",
      },
      {
        title: "Standby flexibility",
        detail: "Muhurtham running late is normal — vehicles hold without drama or renegotiation.",
      },
    ],
    keywords: [
      "wedding car rental Hyderabad",
      "decorated car for wedding Hyderabad",
      "marriage car hire Hyderabad",
    ],
    recommendedVehicleSlugs: ["toyota-fortuner", "innova-hycross", "tempo-traveller-17"],
    faqs: [
      {
        question: "How far in advance should wedding cars be booked?",
        answer:
          "For peak muhurtham dates, 3–4 weeks ahead secures your preferred vehicles and colours. Off-season weddings can usually be arranged within a week.",
      },
      {
        question: "Is decoration included in the wedding car fare?",
        answer:
          "Decoration is quoted separately at actuals based on the style you choose — we share options and photos, and the decorated car is photographed for your approval before the event.",
      },
    ],
  },
];
