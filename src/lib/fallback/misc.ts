import type { BlogPost, SiteFAQ, Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    name: "Ramesh Kondapalli",
    location: "Gachibowli, Hyderabad",
    rating: 5,
    review:
      "Booked an Innova for our Tirupati trip with my parents. Driver Anjaiah garu drove the night stretch so smoothly my father actually slept — that has never happened in a cab. Fare matched the WhatsApp quote to the rupee.",
    trip: "Hyderabad → Tirupati round trip",
  },
  {
    name: "Priya Deshmukh",
    location: "Banjara Hills, Hyderabad",
    rating: 5,
    review:
      "My flight landed 2 hours late at midnight and the driver was still there, no extra charge, no phone calls needed. This is why I stopped using app cabs for airport runs.",
    trip: "RGIA airport pickup",
  },
  {
    name: "Sandeep & Kavya",
    location: "Kukatpally, Hyderabad",
    rating: 5,
    review:
      "They handled all the guest cars for our wedding — 2 Innovas, a Fortuner for us, and a Tempo for relatives from Warangal. One coordinator managed everything on the day. Not a single delayed pickup.",
    trip: "Wedding fleet, 3 days",
  },
  {
    name: "Mohammed Irfan",
    location: "Tolichowki, Hyderabad",
    rating: 4,
    review:
      "Regular monthly account for our office guest transfers. Invoicing is clean, drivers are professional, and the coordinator responds even on Sunday evenings. Would like online payment links, otherwise flawless.",
    trip: "Corporate account, HITEC City",
  },
  {
    name: "Lakshmi Narayanan",
    location: "Secunderabad",
    rating: 5,
    review:
      "Took the 12-seater Tempo to Srisailam with the extended family. Driver knew the forest gate timings exactly and planned our stops around them. Vehicle was spotless and the pushback seats saved the elders.",
    trip: "Hyderabad → Srisailam group trip",
  },
  {
    name: "Ananya Rao",
    location: "Madhapur, Hyderabad",
    rating: 5,
    review:
      "Hired the 8-hour local package for my in-laws' city darshan day — Birla Mandir, Charminar, Salar Jung. The driver doubled as an unofficial guide and knew exactly where to park at each stop.",
    trip: "Local 8hr/80km package",
  },
];

export const faqs: SiteFAQ[] = [
  {
    category: "Booking",
    question: "How do I book a cab with Srinivasa Travels?",
    answer:
      "Send us your trip details on WhatsApp or through the enquiry form — pickup point, destination, date and preferred vehicle. We reply with an itemised quote, and your booking is confirmed once you approve it. No advance payment is required for most trips.",
  },
  {
    category: "Booking",
    question: "How far in advance should I book?",
    answer:
      "Airport transfers can usually be arranged within a few hours. For outstation trips we recommend 1–2 days' notice, and for wedding fleets or festival-season Tirupati trips, book 2–4 weeks ahead.",
  },
  {
    category: "Pricing",
    question: "Are there any hidden charges?",
    answer:
      "No. Every quote itemises the fare, driver allowance, tolls, parking and state permits before you confirm. The amount you approve is the amount you pay.",
  },
  {
    category: "Pricing",
    question: "What is the minimum billing for outstation trips?",
    answer:
      "Outstation trips are billed at a minimum of 300 km per calendar day at the vehicle's per-km rate, plus a fixed driver allowance per day. Tolls and permits are at actuals.",
  },
  {
    category: "Trips",
    question: "Do your drivers speak Telugu, Hindi and English?",
    answer:
      "All our chauffeurs speak Telugu and Hindi; many are comfortable in basic English. If you need an English-fluent driver for overseas guests, mention it while booking.",
  },
  {
    category: "Trips",
    question: "Can I plan a multi-city trip with one vehicle?",
    answer:
      "Yes — multi-day, multi-city itineraries keep the same vehicle and chauffeur throughout. Share your rough plan and we will suggest a realistic day-wise schedule with a single itemised quote.",
  },
  {
    category: "Safety",
    question: "Are your drivers verified?",
    answer:
      "Every chauffeur is police-verified with a minimum of 5 years of commercial driving experience. Night ghat sections are assigned only to senior drivers, and all vehicles carry valid permits and insurance.",
  },
  {
    category: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "Cash, UPI (Google Pay / PhonePe / Paytm) and bank transfer. Corporate accounts are billed monthly with a consolidated GST invoice.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "hyderabad-to-tirupati-by-road-complete-guide",
    title: "Hyderabad to Tirupati by Road: The Complete 2026 Guide",
    excerpt:
      "Overnight or early morning? Which route, where to stop, and how to time your darshan — everything we've learned from a decade of weekly Tirupati runs.",
    date: "2026-05-14",
    author: "Srinivasa Travels Desk",
    readMinutes: 8,
    tags: ["Tirupati", "Route Guide", "Pilgrimage"],
    content: [
      "Every week, our vehicles make the 558 km run from Hyderabad to Tirupati more times than we count. This guide condenses what our senior drivers and thousands of guests have taught us about doing the road journey right.",
      "The route itself is straightforward: NH-44 south through Jadcherla and Kurnool, then east via Kadapa to Tirupati. The road surface is good four-lane for the great majority of the distance, and driving time is 9–10 hours plus breaks.",
      "The single biggest decision is departure time. The overnight pattern — leaving Hyderabad between 8 and 10 PM — remains the most popular for a reason: you trade a hotel night for highway hours, arrive by dawn, and walk into darshan while day-trippers are still on the road. If you prefer daytime driving, a 5 AM start puts you in Tirupati by mid-afternoon with time to rest before an early-morning Tirumala visit the next day.",
      "Plan your darshan before you plan your car. Special entry (₹300) slots open in advance on the TTD portal and anchor the whole itinerary; free darshan queues vary wildly with season. Match your departure to your slot, not the other way around.",
      "On stops: the Kurnool bypass area has the most dependable late-night food options, and our drivers favour a final freshen-up halt before Kadapa. With senior citizens, we add a second rest stop and stretch the schedule by an hour — fatigue arrives quietly on night highways.",
      "Budget-wise, a sedan round trip starts around ₹13,900 all-inclusive, and an Innova Crysta — the vehicle most guests choose for this route — typically lands between ₹17,000 and ₹20,000 depending on days and detours like Sri Kalahasti or Talakona.",
      "One final, honest tip: the trip is far more pleasant Tuesday to Thursday. Weekends compress everything — the ghat road, the queues, the return traffic — and festival windows more so. If your dates are flexible, midweek is the connoisseur's darshan.",
    ],
  },
  {
    slug: "rgia-airport-transfer-tips",
    title: "Getting to RGIA On Time: An Insider's Guide to Hyderabad Airport Runs",
    excerpt:
      "How early to leave from each part of the city, what the P7 pickup change means for arrivals, and why flight-tracking matters more than departure buffer.",
    date: "2026-04-02",
    author: "Srinivasa Travels Desk",
    readMinutes: 6,
    tags: ["Airport", "Hyderabad", "Travel Tips"],
    content: [
      "Rajiv Gandhi International sits a genuine distance from the city — 30 km from Banjara Hills, 40+ from Secunderabad — and the Outer Ring Road's speed hides how much the first few kilometres from your home can vary. Here is how we plan it.",
      "Our working buffers, refined over thousands of runs: from Gachibowli or the Financial District, 45–55 minutes to the terminal at most hours. From Banjara Hills or Jubilee Hills, about an hour. From Secunderabad, Uppal or Kompally, 75–90 minutes — the stretch to reach the ORR is the variable, not the ORR itself.",
      "For domestic departures, be at the terminal 90 minutes before; for international, 3 hours. Add your corridor time and you have your pickup hour. Evening departures between 5 and 8 PM deserve an extra 20-minute cushion — the tech-corridor exodus is real.",
      "For arrivals, the detail that matters is flight tracking. A cab booked for the scheduled landing time is a cab that charges waiting fees or gives up when your flight is early or late. We track the flight number and move the pickup automatically — it is the single feature guests thank us for most.",
      "Small things that smooth the run: keep your terminal entry gate in mind (departures ramp vs. arrivals level), have the driver's number saved before you land and message on WhatsApp as you clear the belt, and if you are landing after midnight, confirm the pickup the previous evening so assignment is locked before the desk's night shift.",
    ],
  },
  {
    slug: "choosing-the-right-vehicle-for-group-trips",
    title: "Ertiga, Innova or Tempo Traveller? Choosing the Right Vehicle for a Group Trip",
    excerpt:
      "The honest trade-offs between the three group-travel workhorses — by headcount, luggage, route and budget — from the people who run all three daily.",
    date: "2026-02-18",
    author: "Srinivasa Travels Desk",
    readMinutes: 7,
    tags: ["Fleet", "Travel Tips", "Group Travel"],
    content: [
      "The most common question on our WhatsApp is some version of: 'We are seven people going to Srisailam — which vehicle?' The honest answer depends on four things: true headcount, luggage, route terrain, and how long you'll be seated at a stretch.",
      "The Ertiga is the value pick for up to five adults plus a child. Six adults fit, but the third row is best for shorter trips, and with all seats up the boot takes only a couple of cabin bags. For a day trip to Yadadri or a light-luggage Vijayawada run, it is unbeatable per rupee.",
      "The Innova Crysta is the default for a reason. Seven seats where even the third row is habitable for adults, a boot that still takes real luggage with all rows up, and highway composure that matters at hour eight of a Tirupati run. If your group is 5–7 with overnight bags, stop deliberating and take the Crysta.",
      "The Tempo Traveller changes the trip's character, not just its capacity. Nine-plus people in one vehicle means one conversation, one music queue, one chai stop — the journey becomes part of the function. The 12-seater suits extended families; the 17-seater is for wedding parties and office outings. Note that Tempos are speed-governed and sit lower on ghat-road agility, so add 10–15% to journey time estimates.",
      "Rules of thumb we give on the phone: under 5 people — sedan or Ertiga. 5–7 — Crysta, no debate. 8–9 — either a Crysta plus sedan, or step up to the 12-seater and enjoy the extra room. 10 and above — Tempo Traveller, and the group will thank you.",
      "Whatever you choose, count luggage honestly. The vehicle that fits your people but not your bags fits nobody.",
    ],
  },
];
