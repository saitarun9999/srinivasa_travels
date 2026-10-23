import type { Vehicle } from "@/types";

export const vehicles: Vehicle[] = [
  {
    slug: "swift-dzire",
    name: "Maruti Suzuki Dzire",
    category: "Sedan",
    seats: 4,
    luggage: 2,
    fuel: "Petrol",
    transmission: "Manual",
    minKmPerDay: 300,
    image: "/images/fleet/swift-dzire.jpg",
    gallery: ["/images/fleet/swift-dzire.jpg"],
    imageCredit: {
      author: "Sant1207ug",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Suzuki_Dzire_2024_ZXI%2B.jpg",
    },
    tagline: "The dependable city sedan",
    description:
      "The Dzire is the workhorse of Hyderabad's roads for a reason — compact enough for Ameerpet traffic, comfortable enough for a Vijayawada run. Ideal for solo travellers, couples and airport transfers where you want a clean, air-conditioned sedan without paying for space you won't use.",
    features: [
      "Air conditioning",
      "Music system with Bluetooth",
      "Phone charging points",
      "Bottled water on request",
      "Sanitised before every trip",
    ],
    idealFor: ["Airport transfers", "City travel", "Solo and couple trips"],
    featured: true,
    faqs: [
      {
        question: "How many passengers can travel comfortably in the Dzire?",
        answer:
          "Four passengers plus the chauffeur. For four adults with more than two suitcases, we recommend an Ertiga or Innova Crysta instead.",
      },
      {
        question: "Is the Dzire suitable for outstation trips?",
        answer:
          "Yes — it is a popular choice for routes up to around 300 km each way, such as Hyderabad to Srisailam or Vijayawada. For longer journeys like Tirupati or Bangalore, most guests prefer the extra room of an MUV.",
      },
    ],
  },
  {
    slug: "maruti-ertiga",
    name: "Maruti Suzuki Ertiga",
    category: "MUV",
    seats: 6,
    luggage: 3,
    fuel: "CNG",
    transmission: "Manual",
    minKmPerDay: 300,
    image: "/images/fleet/maruti-ertiga.jpg",
    gallery: ["/images/fleet/maruti-ertiga.jpg"],
    imageCredit: {
      author: "Ramakrishna Mission Vidyapith",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:2022_Maruti_Suzuki_Ertiga_LXi.jpg",
    },
    tagline: "Six seats, family-trip favourite",
    description:
      "The Ertiga gives a small family genuine three-row seating at a sedan-like fare. It is the value pick for temple circuits and weekend getaways where five or six travellers want to stay in one vehicle rather than split across two cabs.",
    features: [
      "Three-row seating for 6",
      "Air conditioning for all rows",
      "Music system with Bluetooth",
      "Phone charging points",
      "Sanitised before every trip",
    ],
    idealFor: ["Family weekends", "Temple circuits", "Group airport pickups"],
    featured: false,
    faqs: [
      {
        question: "Can six adults with luggage travel in the Ertiga?",
        answer:
          "Six adults fit, but with all seats occupied the boot takes roughly two cabin bags. For six adults with full suitcases, choose a Tempo Traveller or pair of sedans.",
      },
    ],
  },
  {
    slug: "kia-carens",
    name: "Kia Carens",
    category: "MUV",
    seats: 6,
    luggage: 3,
    fuel: "Diesel",
    transmission: "Automatic",
    minKmPerDay: 300,
    image: "/images/fleet/kia-carens.jpg",
    gallery: ["/images/fleet/kia-carens.jpg"],
    imageCredit: {
      author: "Ganesh Mohan T",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Kia_Carens_2024_Model.jpg",
    },
    tagline: "The modern family mover",
    description:
      "A newer, quieter alternative in the six-seat class — the Carens pairs a smooth diesel automatic with a genuinely usable third row. Guests who ride in it once tend to ask for it by name on their next booking.",
    features: [
      "Captain-style second row",
      "Automatic transmission",
      "Rear AC vents in all rows",
      "USB-C charging points",
      "Sanitised before every trip",
    ],
    idealFor: ["Family outstation trips", "Corporate travel", "Airport transfers"],
    featured: false,
    faqs: [
      {
        question: "How does the Carens compare with the Innova Crysta?",
        answer:
          "The Carens is newer and slightly more compact; the Crysta has more luggage room and a longer highway pedigree. For 4–5 travellers either works — for 6 plus luggage, take the Crysta or a Tempo Traveller.",
      },
    ],
  },
  {
    slug: "innova-crysta",
    name: "Toyota Innova Crysta",
    category: "SUV",
    seats: 7,
    luggage: 4,
    fuel: "Diesel",
    transmission: "Manual",
    minKmPerDay: 300,
    image: "/images/fleet/innova-crysta.jpg",
    gallery: ["/images/fleet/innova-crysta.jpg"],
    imageCredit: {
      author: "Premnath Kudva",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Toyota_Innova_Crysta_2.4_Z_front_right.jpg",
    },
    tagline: "India's highway benchmark",
    description:
      "There is a reason every seasoned traveller asks for a Crysta: three genuinely comfortable rows, a boot that swallows a family's luggage, and a ride that stays composed through ghat roads at four in the morning. It is our most requested vehicle for Tirupati and Bangalore, and the default for corporate guests.",
    features: [
      "Captain seats in second row",
      "Climate control for all rows",
      "Generous luggage space",
      "Reading lights and armrests",
      "Bottled water on request",
      "Sanitised before every trip",
    ],
    idealFor: ["Tirupati and long outstation trips", "Corporate travel", "Family of 6–7"],
    featured: true,
    faqs: [
      {
        question: "Why is the Innova Crysta priced higher than other MUVs?",
        answer:
          "You are paying for space, ride quality and reliability on long highway runs — plus experienced chauffeurs who know these routes. On a 1,100 km Tirupati round trip, the difference is felt in how fresh you arrive.",
      },
      {
        question: "Can I book the Crysta for a one-day Tirupati darshan trip?",
        answer:
          "Yes. The overnight Crysta trip — leave Hyderabad around 8 PM, darshan in the morning, return by next midnight — is our single most booked package.",
      },
    ],
  },
  {
    slug: "innova-hycross",
    name: "Toyota Innova HyCross",
    category: "SUV",
    seats: 7,
    luggage: 4,
    fuel: "Hybrid",
    transmission: "Automatic",
    minKmPerDay: 300,
    image: "/images/fleet/innova-hycross.jpg",
    gallery: ["/images/fleet/innova-hycross.jpg"],
    imageCredit: {
      author: "Ethan Llamas",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Toyota_Zenix_MAGH10_2.0_Q_HEV_Platinum_White_Pearl_Mica_03.jpg",
    },
    tagline: "The hybrid flagship MUV",
    description:
      "The HyCross is the quietest way to cover a long distance in this class — a hybrid drivetrain, an automatic gearbox, and a cabin that feels a segment above. Pick it when the journey itself should feel premium: senior guests, overseas visitors, or a long anniversary trip.",
    features: [
      "Hybrid — near-silent city running",
      "Automatic transmission",
      "Ventilated front seats",
      "Rear sunshades",
      "Panoramic feel with large glass area",
      "Sanitised before every trip",
    ],
    idealFor: ["Premium airport transfers", "VIP guest travel", "Long comfortable hauls"],
    featured: true,
    faqs: [
      {
        question: "Is the HyCross worth the premium over the Crysta?",
        answer:
          "If your priority is cabin quietness and an automatic's smoothness — yes, especially for guests sensitive to long-drive fatigue. If maximum luggage space matters more, the Crysta still edges it.",
      },
    ],
  },
  {
    slug: "toyota-fortuner",
    name: "Toyota Fortuner",
    category: "Luxury",
    seats: 6,
    luggage: 4,
    fuel: "Diesel",
    transmission: "Automatic",
    minKmPerDay: 300,
    image: "/images/fleet/toyota-fortuner.jpg",
    gallery: ["/images/fleet/toyota-fortuner.jpg"],
    imageCredit: {
      author: "Captainmorlypogi1959",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Toyota_Fortuner_4x4_LTD_2-Tone_White_Pearl-Black_(cropped).jpg",
    },
    tagline: "Commanding presence, any road",
    description:
      "For weddings, VIP movements and occasions where the vehicle at the porch matters, the Fortuner delivers presence with genuine long-distance ability. Uniformed chauffeur, spotless white or black exterior, and a cabin high enough to make every arrival an event.",
    features: [
      "Uniformed chauffeur",
      "Automatic transmission",
      "Leather upholstery",
      "Powerful highway cruiser",
      "Choice of white or black exterior (subject to availability)",
    ],
    idealFor: ["Weddings and receptions", "VIP guest movement", "Executive travel"],
    featured: false,
    faqs: [
      {
        question: "Can the Fortuner be decorated for a wedding?",
        answer:
          "Yes — simple floral decoration is arranged on request at actuals. Tell us the date and venue when you enquire and we will confirm availability and options.",
      },
    ],
  },
  {
    slug: "tempo-traveller-12",
    name: "Tempo Traveller (12-seater)",
    category: "Tempo Traveller",
    seats: 12,
    luggage: 10,
    fuel: "Diesel",
    transmission: "Manual",
    minKmPerDay: 300,
    image: "/images/fleet/tempo-traveller-12.jpg",
    gallery: ["/images/fleet/tempo-traveller-12.jpg"],
    imageCredit: {
      author: "वंपायर, edited by Mr.choppers",
      license: "CC BY-SA 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Force_Traveller_Luxury.jpg",
    },
    tagline: "One vehicle, the whole group",
    description:
      "When the extended family travels together, the 12-seater keeps everyone in one conversation — pushback seats, a high roof you can walk through, and space under the last row for the group's luggage. The staple for Srisailam, Yadadri and multi-day temple circuits.",
    features: [
      "12 pushback seats",
      "High roof — easy walk-through",
      "Individual reading lights",
      "Large luggage bay",
      "Sanitised before every trip",
    ],
    idealFor: ["Group pilgrimages", "Family functions", "Corporate outings"],
    featured: false,
    faqs: [
      {
        question: "Is there space for luggage for all 12 passengers?",
        answer:
          "Yes — the rear bay takes around 10 medium bags. For 12 passengers with heavy luggage (wedding trips, for example), mention it while booking and we will assign a carrier-equipped vehicle.",
      },
    ],
  },
  {
    slug: "tempo-traveller-17",
    name: "Tempo Traveller (17-seater)",
    category: "Tempo Traveller",
    seats: 17,
    luggage: 14,
    fuel: "Diesel",
    transmission: "Manual",
    minKmPerDay: 300,
    image: "/images/fleet/tempo-traveller-17.jpg",
    gallery: ["/images/fleet/tempo-traveller-17.jpg"],
    imageCredit: {
      author: "Biswarup Ganguly",
      license: "CC BY 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Force_Motors_-_Traveller_26_-_Agra_2014-05-14_4222.JPG",
    },
    tagline: "Built for the big group",
    description:
      "Our largest vehicle — seventeen pushback seats for wedding parties, office teams and large pilgrim groups. Experienced drivers who handle ghat sections and city pickups with equal calm, and enough luggage room that nobody has to hold a bag on their lap.",
    features: [
      "17 pushback seats",
      "High roof — easy walk-through",
      "Powerful AC for the full cabin",
      "Large luggage bay",
      "Sanitised before every trip",
    ],
    idealFor: ["Wedding parties", "Office team outings", "Large pilgrim groups"],
    featured: false,
    faqs: [
      {
        question: "Do you provide the 17-seater for multi-day trips?",
        answer:
          "Yes — multi-day outstation is its most common use. Driver allowance and any state permits are shown in the quote up front, so the fare you approve is the fare you pay.",
      },
    ],
  },
];
