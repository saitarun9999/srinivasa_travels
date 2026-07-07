import type { RouteInfo } from "@/types";

export const routes: RouteInfo[] = [
  {
    slug: "hyderabad-to-tirupati-cab",
    from: "Hyderabad",
    to: "Tirupati",
    distanceKm: 558,
    duration: "9–10 hours",
    description:
      "The most travelled pilgrimage route from Hyderabad — overnight departures, darshan-timed arrivals, and chauffeurs who know the Tirumala ghat road by heart.",
    longDescription: [
      "The Hyderabad–Tirupati corridor runs via Kurnool and Kadapa on largely four-laned highway, covering about 558 km in 9–10 hours of driving. Most of our guests take the classic overnight pattern: depart Hyderabad between 8 and 10 PM, rest through the highway stretch, and arrive at Tirupati by early morning in time to freshen up before darshan.",
      "Our Tirupati drivers make this run weekly — they know the reliable midnight dhabas near Kurnool, the fuel stops that stay open, and the timing needed at the Alipiri check post. For senior citizens we plan an extra rest halt and can arrange wheelchairs at Tirumala on request.",
      "A typical round trip is billed for two days at the vehicle's per-km rate with driver allowance; the exact quote — including tolls and the Andhra Pradesh permit — is itemised on WhatsApp before you confirm.",
    ],
    oneWayFareFrom: 7500,
    roundTripFareFrom: 13900,
    attractions: [
      { name: "Sri Venkateswara Temple, Tirumala", note: "The destination itself — plan darshan slots before travel" },
      { name: "Sri Padmavathi Ammavari Temple", note: "In Tiruchanur, 5 km from Tirupati — customarily visited after Tirumala" },
      { name: "Kapila Theertham", note: "Waterfall shrine at the foot of the Tirumala hills" },
      { name: "Sri Kalahasti Temple", note: "36 km away — often combined as a same-trip detour" },
      { name: "Talakona Waterfalls", note: "Andhra's tallest waterfall, inside Sri Venkateswara National Park" },
    ],
    recommendedVehicleSlugs: ["innova-crysta", "maruti-ertiga", "tempo-traveller-12"],
    faqs: [
      {
        question: "How much does a Hyderabad to Tirupati cab cost?",
        answer:
          "A round trip starts at around ₹13,900 in a sedan and ₹17,000–₹20,000 in an Innova Crysta, depending on days and total kilometres. The quote itemises per-km fare, driver allowance, tolls and the AP permit before you book.",
      },
      {
        question: "What is the best time to leave Hyderabad for Tirupati darshan?",
        answer:
          "For a morning darshan, depart Hyderabad between 8 and 10 PM. You reach Tirupati by 6–7 AM, with time to freshen up before heading up to Tirumala.",
      },
      {
        question: "Does the cab take us up the ghat road to Tirumala?",
        answer:
          "Yes — the same vehicle takes you up to Tirumala and waits during darshan. Ghat driving is assigned to our senior drivers as standard practice.",
      },
    ],
  },
  {
    slug: "hyderabad-to-vijayawada-cab",
    from: "Hyderabad",
    to: "Vijayawada",
    distanceKm: 275,
    duration: "5–6 hours",
    description:
      "A smooth expressway run to the Krishna river city — day-return friendly, with Kanaka Durga temple, Amaravati and Undavalli on the same corridor.",
    longDescription: [
      "Hyderabad to Vijayawada is one of the easiest outstation drives in the region — about 275 km on NH-65, most of it four-laned, done comfortably in 5 to 6 hours with one break. It is genuinely day-return feasible: leave at 6 AM, finish a darshan or business meeting, and be home for a late dinner.",
      "The corridor rewards small detours: the Undavalli rock-cut caves, the Amaravati stupa, and Kondapalli fort all sit within a short reach of the highway. Tell your chauffeur what interests you and the day plans itself.",
    ],
    oneWayFareFrom: 4200,
    roundTripFareFrom: 7300,
    attractions: [
      { name: "Kanaka Durga Temple", note: "Vijayawada's presiding deity, on Indrakeeladri hill above the Krishna" },
      { name: "Undavalli Caves", note: "4th-century rock-cut caves just across the river" },
      { name: "Amaravati", note: "Ancient Buddhist stupa and the new capital region, 35 km west" },
      { name: "Kondapalli Fort", note: "14th-century hill fort, home of the famous wooden toys" },
      { name: "Prakasam Barrage", note: "Evening views over the Krishna river" },
    ],
    recommendedVehicleSlugs: ["swift-dzire", "kia-carens", "innova-crysta"],
    faqs: [
      {
        question: "Can Hyderabad to Vijayawada be done as a day trip by cab?",
        answer:
          "Yes — with a 6 AM start you get 5–6 usable hours in Vijayawada and return by 10–11 PM. A round trip in a sedan starts around ₹7,300 including driver allowance.",
      },
      {
        question: "Is a one-way cab available on this route?",
        answer:
          "Yes, Vijayawada is one of our fixed-fare one-way corridors — from around ₹4,200 in a sedan. Share your date on WhatsApp for the current rate.",
      },
    ],
  },
  {
    slug: "hyderabad-to-bangalore-cab",
    from: "Hyderabad",
    to: "Bangalore",
    distanceKm: 575,
    duration: "8–9 hours",
    description:
      "The tech corridor — 575 km on NH-44 through Kurnool and Anantapur, with chauffeurs who run it every week for relocations, business trips and family moves.",
    longDescription: [
      "Hyderabad to Bangalore on NH-44 is one of India's better long-distance drives: 575 km of largely excellent four-to-six-lane highway via Jadcherla, Kurnool and Anantapur, done in 8–9 hours with breaks. It is a popular choice over flying when you are moving with family, luggage or a schedule that airlines don't respect.",
      "One-way drops are common on this corridor — you pay a fixed fare rather than round-trip kilometres. For overnight runs we assign two-driver setups on request for non-stop travel.",
    ],
    oneWayFareFrom: 8500,
    roundTripFareFrom: 14500,
    attractions: [
      { name: "Kurnool — Konda Reddy Fort", note: "A natural midpoint break with history attached" },
      { name: "Anantapur ISKCON", note: "A calm, modern temple stop on the second half" },
      { name: "Lepakshi", note: "The hanging pillar and monolithic Nandi — a classic 15 km detour near the border" },
      { name: "Nandi Hills", note: "Sunrise viewpoint 60 km before Bangalore — early arrivals love it" },
    ],
    recommendedVehicleSlugs: ["innova-crysta", "innova-hycross", "swift-dzire"],
    faqs: [
      {
        question: "How long does a cab from Hyderabad to Bangalore take?",
        answer:
          "8–9 hours of driving plus breaks — most guests plan 10 hours door to door. Overnight departures around 9 PM arrive in Bangalore by early morning.",
      },
      {
        question: "What does a one-way Hyderabad to Bangalore cab cost?",
        answer:
          "Fixed one-way fares start around ₹8,500 in a sedan and ₹12,500 in an Innova, including tolls quoted up front. Round trips are billed per-km across the days of travel.",
      },
    ],
  },
  {
    slug: "hyderabad-to-srisailam-cab",
    from: "Hyderabad",
    to: "Srisailam",
    distanceKm: 213,
    duration: "4.5–5 hours",
    description:
      "Through the Nallamala forest to the Jyotirlinga on the Krishna gorge — a drive where the road itself is half the pilgrimage.",
    longDescription: [
      "The Srisailam run is the most scenic short pilgrimage from Hyderabad: 213 km that end with a winding descent through the Nallamala forest and tiger reserve to the Krishna river gorge. The forest check gates operate on fixed timings, so departure planning matters more here than on any other route — our drivers time it so you neither race the gate nor wait an hour at it.",
      "Mallikarjuna Jyotirlinga draws the devout year-round, but the dam viewpoints, the ropeway to Pathala Ganga and the sheer drive make it worthwhile even for the non-religious. Weekends around festivals get crowded; a weekday trip is a different, calmer experience.",
    ],
    oneWayFareFrom: 3800,
    roundTripFareFrom: 6500,
    attractions: [
      { name: "Mallikarjuna Swamy Temple", note: "One of the twelve Jyotirlingas, on the banks of the Krishna" },
      { name: "Srisailam Dam", note: "Massive gravity dam across the Krishna gorge — best after good monsoons" },
      { name: "Pathala Ganga ropeway", note: "Cable descent to the river's edge" },
      { name: "Akkamahadevi Caves", note: "Boat ride through the reservoir to ancient meditation caves" },
      { name: "Nallamala forest drive", note: "The ghat section through the tiger reserve is the route's real highlight" },
    ],
    recommendedVehicleSlugs: ["swift-dzire", "maruti-ertiga", "tempo-traveller-12"],
    faqs: [
      {
        question: "What are the forest gate timings on the Srisailam route?",
        answer:
          "The Nallamala forest check gates generally allow traffic from early morning to around 9 PM. Our drivers plan departures so you clear the forest section within gate hours in both directions.",
      },
      {
        question: "Is Srisailam doable as a one-day trip from Hyderabad?",
        answer:
          "Yes — depart by 5 AM, reach by 10 AM, and you have a full afternoon for darshan and the dam before returning by late night. Many guests prefer one overnight stay to include the ropeway and boat ride.",
      },
    ],
  },
];
