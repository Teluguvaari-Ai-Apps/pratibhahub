export type CategoryId =
  | "voice"
  | "screen"
  | "visual"
  | "stage"
  | "sound"
  | "tech"
  | "design";

export type Talent = {
  id: string;
  name: string;
  handle: string;
  role: string;
  category: CategoryId;
  city: string;
  country: string;
  photo: string;
  cover: string;
  bio: string;
  skills: string[];
  languages: string[];
  rate: string;
  available: boolean;
  featured: boolean;
  years: number;
  rating: number;
  reviewCount: number;
  lookingFor: string;
  credits: { title: string; year: string; note: string }[];
  reviews: { name: string; role: string; quote: string }[];
};

export type Gig = {
  id: string;
  title: string;
  company: string;
  category: CategoryId;
  cover: string;
  city: string;
  locationType: "On site" | "Remote" | "Hybrid";
  paid: boolean;
  rate: string;
  posted: string;
  deadline: string;
  summary: string;
  description: string;
  requirements: string[];
};

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  blurb: string;
  cover: string;
}[] = [
  {
    id: "voice",
    label: "Voice",
    blurb: "Singers, vocalists, voice artists",
    cover: "/covers/voice.jpg",
  },
  {
    id: "screen",
    label: "Screen",
    blurb: "Directors, actors, cinematographers",
    cover: "/covers/screen.jpg",
  },
  {
    id: "visual",
    label: "Visual",
    blurb: "Artists, photographers, fashion",
    cover: "/covers/visual.jpg",
  },
  {
    id: "stage",
    label: "Stage",
    blurb: "Dancers, choreographers, performers",
    cover: "/covers/stage.jpg",
  },
  {
    id: "sound",
    label: "Sound",
    blurb: "Composers, producers, mixers",
    cover: "/covers/sound.jpg",
  },
  {
    id: "tech",
    label: "Tech",
    blurb: "Engineers, games, creative tech",
    cover: "/covers/tech.jpg",
  },
  {
    id: "design",
    label: "Design",
    blurb: "Product, spatial, architecture",
    cover: "/covers/visual.jpg",
  },
];

export const TALENTS: Talent[] = [
  {
    id: "mira-sen",
    name: "Mira Sen",
    handle: "mirasen",
    role: "Playback singer",
    category: "voice",
    city: "Mumbai",
    country: "India",
    photo: "/talent/mira-sen.jpg",
    cover: "/covers/voice.jpg",
    bio: "A playback singer with a low, unhurried timbre. Mira works across Hindi, Bengali, and English sessions — film cues, independent records, and the occasional live chamber set. She treats a vocal booth like a small stage: still, exact, and a little dangerous.",
    skills: ["Playback", "Hindustani", "Session vocals", "Live", "Harmony stacks"],
    languages: ["Hindi", "Bengali", "English"],
    rate: "From $1,200 / day",
    available: true,
    featured: true,
    years: 9,
    rating: 4.9,
    reviewCount: 42,
    lookingFor: "Film cues, collaborative EPs, live residencies",
    credits: [
      { title: "Salt Line", year: "2025", note: "Title track, North Window Films" },
      { title: "River Hours", year: "2024", note: "Six-song EP, Sable Records" },
      { title: "Night Market", year: "2023", note: "Live residency, Prithvi" },
    ],
    reviews: [
      {
        name: "Ankit Rao",
        role: "Music director",
        quote: "She finds the quiet in a melody and then refuses to oversing it. Rare.",
      },
      {
        name: "Leah Voss",
        role: "Producer",
        quote: "First take was usable. Third take was the record. That's Mira.",
      },
    ],
  },
  {
    id: "arjun-voss",
    name: "Arjun Voss",
    handle: "arjunvoss",
    role: "Film director",
    category: "screen",
    city: "Mumbai",
    country: "India",
    photo: "/talent/arjun-voss.jpg",
    cover: "/covers/screen.jpg",
    bio: "Directs intimate, location-heavy films that sit between documentary and fiction. Arjun came up in commercials, then left for features that run on faces, weather, and long takes. He is known for letting actors find the scene before he covers it.",
    skills: ["Features", "Commercials", "Casting", "Long take", "Hindi / English sets"],
    languages: ["Hindi", "English", "Marathi"],
    rate: "By project",
    available: true,
    featured: true,
    years: 14,
    rating: 4.8,
    reviewCount: 31,
    lookingFor: "A contained feature, a brand film with room to breathe",
    credits: [
      { title: "The Inland Sea", year: "2025", note: "Feature, Berlinale Forum" },
      { title: "House of Salt", year: "2023", note: "Feature, MAMI" },
      { title: "Khadi, three spots", year: "2022", note: "Brand, Forme Studio" },
    ],
    reviews: [
      {
        name: "Sana Merchant",
        role: "Producer",
        quote: "He protects the actors and the schedule. That combination is not common.",
      },
      {
        name: "Mateo Silva",
        role: "Cinematographer",
        quote: "Arjun talks in light, not coverage. The set stays quiet.",
      },
    ],
  },
  {
    id: "lila-okonkwo",
    name: "Lila Okonkwo",
    handle: "lilaokonkwo",
    role: "Visual artist",
    category: "visual",
    city: "Lagos",
    country: "Nigeria",
    photo: "/talent/lila-okonkwo.jpg",
    cover: "/covers/visual.jpg",
    bio: "Large-scale paintings and site works in earth, ivory, and iron oxide. Lila's studio practice sits between West African textile memory and a very contemporary quiet. She takes commissions for lobbies, residencies, and private collections — never decoration for its own sake.",
    skills: ["Painting", "Murals", "Site-specific", "Textile", "Commissions"],
    languages: ["English", "Yoruba"],
    rate: "From $8,000 / work",
    available: true,
    featured: true,
    years: 11,
    rating: 5,
    reviewCount: 18,
    lookingFor: "Architectural commissions, a six-month residency",
    credits: [
      { title: "Red Clay Hours", year: "2025", note: "Solo, Kó Gallery" },
      { title: "Atrium, Four Thorns Hotel", year: "2024", note: "Site mural, 11m" },
      { title: "Cloth Memory", year: "2022", note: "Group, Zeitz MOCAA" },
    ],
    reviews: [
      {
        name: "Ife Adebayo",
        role: "Curator",
        quote: "The work holds a room without shouting. Collectors notice that first.",
      },
    ],
  },
  {
    id: "kai-nakamura",
    name: "Kai Nakamura",
    handle: "kainakamura",
    role: "Creative technologist",
    category: "tech",
    city: "Tokyo",
    country: "Japan",
    photo: "/talent/kai-nakamura.jpg",
    cover: "/covers/tech.jpg",
    bio: "Builds installations that behave like instruments: light, sensors, and spare software. Kai works with museums, fashion houses, and the occasional game studio that wants a physical front-of-house. Code is a material, not the point.",
    skills: ["Installations", "Shaders", "Sensors", "WebGL", "Prototyping"],
    languages: ["Japanese", "English"],
    rate: "From $1,400 / day",
    available: true,
    featured: true,
    years: 8,
    rating: 4.9,
    reviewCount: 27,
    lookingFor: "Museum work, fashion show systems, a small team",
    credits: [
      { title: "Iris Field", year: "2025", note: "Installation, 21_21 DESIGN SIGHT" },
      { title: "Runway OS", year: "2024", note: "Show control, Maison Verse" },
      { title: "Quiet Net", year: "2023", note: "Interactive, Lumen Labs" },
    ],
    reviews: [
      {
        name: "Hana Mori",
        role: "Creative director",
        quote: "He ships the feeling, not a demo reel of tricks. The hardware just works.",
      },
    ],
  },
  {
    id: "sofia-reyes",
    name: "Sofia Reyes",
    handle: "sofiareyes",
    role: "Photographer",
    category: "visual",
    city: "Mexico City",
    country: "Mexico",
    photo: "/talent/sofia-reyes.jpg",
    cover: "/covers/visual.jpg",
    bio: "Still work for fashion, music, and architecture. Sofia shoots like she is documenting a city that happens to be wearing clothes — rooftops, late light, film grain. Available for lookbooks, editorial, and album campaigns.",
    skills: ["Editorial", "Lookbooks", "Music", "35mm", "Location"],
    languages: ["Spanish", "English"],
    rate: "From $2,200 / day",
    available: true,
    featured: false,
    years: 7,
    rating: 4.8,
    reviewCount: 36,
    lookingFor: "A record campaign, an architecture monograph",
    credits: [
      { title: "Cloth & Hour SS26", year: "2026", note: "Lookbook, London / CDMX" },
      { title: "Sable, River Hours", year: "2024", note: "Album stills" },
      { title: "Azotea", year: "2023", note: "Solo, Galería Hilario Galguera" },
    ],
    reviews: [
      {
        name: "Zara Malik",
        role: "Designer",
        quote: "She makes garments look like they have a life after the studio.",
      },
    ],
  },
  {
    id: "rohan-iyer",
    name: "Rohan Iyer",
    handle: "rohaniyer",
    role: "Actor",
    category: "screen",
    city: "Delhi",
    country: "India",
    photo: "/talent/rohan-iyer.jpg",
    cover: "/covers/screen.jpg",
    bio: "Stage-trained, camera-quiet. Rohan plays men who are thinking two sentences ahead of the room. Recent work spans Hindi features, a London play, and a tightly directed streaming limited series.",
    skills: ["Film", "Stage", "Hindi / English", "Movement", "Improvisation"],
    languages: ["Hindi", "English", "Tamil"],
    rate: "By project",
    available: true,
    featured: false,
    years: 12,
    rating: 4.7,
    reviewCount: 22,
    lookingFor: "A contained lead, a play with a long run",
    credits: [
      { title: "House of Salt", year: "2023", note: "Supporting, dir. Arjun Voss" },
      { title: "The Inland Sea", year: "2025", note: "Lead" },
      { title: "Night Watch", year: "2024", note: "Stage, National, Delhi" },
    ],
    reviews: [
      {
        name: "Arjun Voss",
        role: "Director",
        quote: "He listens on camera. The cut loves him for it.",
      },
    ],
  },
  {
    id: "amara-diallo",
    name: "Amara Diallo",
    handle: "amaradiallo",
    role: "Choreographer",
    category: "stage",
    city: "Paris",
    country: "France",
    photo: "/talent/amara-diallo.jpg",
    cover: "/covers/stage.jpg",
    bio: "Choreography for music videos, fashion, and contemporary stage. Amara's phrases are architectural — long lines, sudden stillness — drawn from West African and European floor work. She builds casts fast and keeps them kind.",
    skills: ["Choreography", "Music video", "Fashion", "Company work", "Casting"],
    languages: ["French", "English", "Wolof"],
    rate: "From $1,100 / day",
    available: true,
    featured: false,
    years: 6,
    rating: 4.9,
    reviewCount: 19,
    lookingFor: "A video with a real rehearsal window, a season with a company",
    credits: [
      { title: "Verse, Autumn 25", year: "2025", note: "Show movement, Maison Verse" },
      { title: "Salt Line, video", year: "2025", note: "Choreography, Mira Sen" },
      { title: "Floor, three", year: "2024", note: "Work, Chaillot" },
    ],
    reviews: [
      {
        name: "Camille Ort",
        role: "Movement director",
        quote: "She can teach a room a language in a morning. The camera feels it.",
      },
    ],
  },
  {
    id: "elena-kovacs",
    name: "Elena Kovács",
    handle: "elenakovacs",
    role: "Product designer",
    category: "design",
    city: "Berlin",
    country: "Germany",
    photo: "/talent/elena-kovacs.jpg",
    cover: "/covers/visual.jpg",
    bio: "Product and spatial designer for tools used by other makers — studios, galleries, small operating systems. Elena prefers fewer screens, better type, and hardware that does not apologize. She leads design from research through shipping.",
    skills: ["Product", "Spatial", "Design systems", "Research", "Hardware UI"],
    languages: ["German", "Hungarian", "English"],
    rate: "From $1,250 / day",
    available: false,
    featured: false,
    years: 10,
    rating: 4.8,
    reviewCount: 29,
    lookingFor: "A principal role on a small, serious product",
    credits: [
      { title: "Forme OS", year: "2025", note: "Lead product, Forme Studio" },
      { title: "Lumen console", year: "2023", note: "Hardware UI, Lumen Labs" },
      { title: "Katalog", year: "2022", note: "Museum tool, Berlin" },
    ],
    reviews: [
      {
        name: "Jonas Berg",
        role: "Founder, Forme",
        quote: "She cut half the product and it became the product. That's the job.",
      },
    ],
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    handle: "priyanair",
    role: "Composer",
    category: "sound",
    city: "Chennai",
    country: "India",
    photo: "/talent/priya-nair.jpg",
    cover: "/covers/sound.jpg",
    bio: "Scores for documentary, dance, and the occasional feature. Priya writes from piano and Carnatic phrasing, then lets electronics sit underneath like weather. She prefers directors who talk about rooms, not temp tracks.",
    skills: ["Score", "Piano", "Carnatic", "Documentary", "Sound design"],
    languages: ["Tamil", "English", "Malayalam"],
    rate: "By project",
    available: true,
    featured: false,
    years: 13,
    rating: 5,
    reviewCount: 16,
    lookingFor: "A documentary with a long edit, a dance work",
    credits: [
      { title: "The Inland Sea", year: "2025", note: "Score, dir. Arjun Voss" },
      { title: "Floor, three", year: "2024", note: "Dance score, Amara Diallo" },
      { title: "Harbour", year: "2022", note: "Doc, River & Clay" },
    ],
    reviews: [
      {
        name: "Arjun Voss",
        role: "Director",
        quote: "The score never explains the picture. It stands beside it.",
      },
    ],
  },
  {
    id: "theo-brandt",
    name: "Theo Brandt",
    handle: "theobrandt",
    role: "Game developer",
    category: "tech",
    city: "Stockholm",
    country: "Sweden",
    photo: "/talent/theo-brandt.jpg",
    cover: "/covers/tech.jpg",
    bio: "Independent game director and systems programmer. Theo ships small, tactile games with a strong sense of place — rain, kitchens, night buses — and writes most of the engine glue himself. Open to a studio chapter if the world is specific.",
    skills: ["Gameplay", "Systems", "C++", "Narrative", "Solo shipping"],
    languages: ["Swedish", "English"],
    rate: "From $950 / day",
    available: true,
    featured: false,
    years: 9,
    rating: 4.7,
    reviewCount: 21,
    lookingFor: "A two-year world, or a short experimental title",
    credits: [
      { title: "Night Bus", year: "2025", note: "Lead, Brine Interactive" },
      { title: "Kitchen Light", year: "2023", note: "Solo, IGF nominee" },
      { title: "Harbour (interactive)", year: "2022", note: "Systems, River & Clay" },
    ],
    reviews: [
      {
        name: "Ingrid Holm",
        role: "Producer",
        quote: "He treats code like set dressing. Players feel the care without seeing it.",
      },
    ],
  },
  {
    id: "zara-malik",
    name: "Zara Malik",
    handle: "zaramalik",
    role: "Fashion designer",
    category: "visual",
    city: "London",
    country: "United Kingdom",
    photo: "/talent/zara-malik.jpg",
    cover: "/covers/visual.jpg",
    bio: "Cloth & Hour, a small house for clothes that last a decade. Zara cuts in muslin, dyes in small batches, and collaborates with photographers and movement directors rather than traditional runway machinery. Open to capsule collaborations and costume.",
    skills: ["Womenswear", "Costume", "Textiles", "Atelier", "Creative direction"],
    languages: ["English", "Urdu"],
    rate: "By project",
    available: true,
    featured: false,
    years: 11,
    rating: 4.9,
    reviewCount: 24,
    lookingFor: "Costume for a film, a capsule with a musician",
    credits: [
      { title: "Cloth & Hour SS26", year: "2026", note: "Collection" },
      { title: "House of Salt", year: "2023", note: "Costume, three principals" },
      { title: "Verse guest", year: "2024", note: "Four looks, Maison Verse" },
    ],
    reviews: [
      {
        name: "Sofia Reyes",
        role: "Photographer",
        quote: "The clothes photograph like they already have a memory.",
      },
    ],
  },
  {
    id: "mateo-silva",
    name: "Mateo Silva",
    handle: "mateosilva",
    role: "Cinematographer",
    category: "screen",
    city: "São Paulo",
    country: "Brazil",
    photo: "/talent/mateo-silva.jpg",
    cover: "/covers/screen.jpg",
    bio: "Naturalistic, available-light cinematography for features, brand films, and the odd music video. Mateo likes dusk, sodium, and faces that are not over-covered. He operates himself and keeps a small, fast crew.",
    skills: ["Features", "Available light", "Operating", "Brand", "Music video"],
    languages: ["Portuguese", "Spanish", "English"],
    rate: "From $2,800 / day",
    available: true,
    featured: false,
    years: 16,
    rating: 4.8,
    reviewCount: 33,
    lookingFor: "A feature that can be lit with the city",
    credits: [
      { title: "The Inland Sea", year: "2025", note: "DP, dir. Arjun Voss" },
      { title: "Casa Norte, three", year: "2024", note: "Brand film" },
      { title: "Salt Line, video", year: "2025", note: "DP, Mira Sen" },
    ],
    reviews: [
      {
        name: "Arjun Voss",
        role: "Director",
        quote: "He waits for the light instead of manufacturing it. The film is better for it.",
      },
    ],
  },
];

export const GIGS: Gig[] = [
  {
    id: "sable-session",
    title: "Session vocal, six-song EP",
    company: "Sable Records",
    category: "voice",
    cover: "/covers/voice.jpg",
    city: "Mumbai",
    locationType: "On site",
    paid: true,
    rate: "$1,000–1,400 / day",
    posted: "2d ago",
    deadline: "18 Sep",
    summary: "Lead and stacked harmonies for a small independent record. Three studio days, one live tracking evening.",
    description:
      "Sable is finishing River Hours II. We need a singer comfortable in Hindi and English, able to work with a live rhythm section, and happy to stack their own doubles. The booth is in Bandra. Reference: analog, unhurried, no belting for its own sake.",
    requirements: [
      "A short reel with dry vocals",
      "Available 22–24 Sep",
      "Comfortable tracking live with a band",
    ],
  },
  {
    id: "north-window-lead",
    title: "Lead, contained feature",
    company: "North Window Films",
    category: "screen",
    cover: "/covers/screen.jpg",
    city: "Delhi",
    locationType: "On site",
    paid: true,
    rate: "By project",
    posted: "1d ago",
    deadline: "30 Sep",
    summary: "A 28-day shoot for a two-hander set in a closed hotel. Hindi and English. Age 28–40.",
    description:
      "A man waits in a hotel that has stopped taking guests. We are casting the lead opposite a locked co-star. Rehearsal in Delhi, shoot in a single location outside Jaipur. Naturalistic, long takes, no star machinery.",
    requirements: [
      "Self-tape, two scenes (sides on request)",
      "Stage or film close-up experience",
      "Passport ready for a possible festival run",
    ],
  },
  {
    id: "four-thorns-mural",
    title: "Atrium mural, hotel commission",
    company: "Four Thorns",
    category: "visual",
    cover: "/covers/visual.jpg",
    city: "Lagos",
    locationType: "On site",
    paid: true,
    rate: "$18,000–28,000",
    posted: "4d ago",
    deadline: "12 Oct",
    summary: "A 11-metre atrium wall in a new hotel. Earth palette, no logo, a work that can hold the room.",
    description:
      "We want a site-specific painting, not a wallpaper. The atrium gets north light. Guests pass it every morning. Propose a sketch, a material list, and a three-week install window in November.",
    requirements: [
      "Portfolio of large-scale work",
      "On-site for install",
      "Insurance and a small crew",
    ],
  },
  {
    id: "lumen-install",
    title: "Show-control system, fashion week",
    company: "Lumen Labs",
    category: "tech",
    cover: "/covers/tech.jpg",
    city: "Tokyo",
    locationType: "Hybrid",
    paid: true,
    rate: "$1,200 / day",
    posted: "3d ago",
    deadline: "5 Oct",
    summary: "Lights, sensors, and a quiet interface for a 14-minute runway. Must not fail in front of 400 people.",
    description:
      "Maison Verse needs a show OS: lighting cues, a kinetic set piece, and a backup that a stage manager can run. Prototype in Tokyo, dress rehearsal in Paris. We value boring reliability over spectacle.",
    requirements: [
      "Prior live-show or museum install",
      "Able to travel mid-October",
      "Documented failovers",
    ],
  },
  {
    id: "verse-movement",
    title: "Choreographer, lookbook film",
    company: "Maison Verse",
    category: "stage",
    cover: "/covers/stage.jpg",
    city: "Paris",
    locationType: "On site",
    paid: true,
    rate: "$1,000 / day",
    posted: "6d ago",
    deadline: "20 Sep",
    summary: "Four days to build movement for eight looks. Studio, then a courtyard at dusk.",
    description:
      "Not a dance film — clothes in motion. We need a choreographer who can work with non-dancers and two company dancers, and who will protect the fabric. Camera is handheld, natural light.",
    requirements: [
      "A reel with fashion or music-video work",
      "Casting suggestions welcome",
      "Available first week of October",
    ],
  },
  {
    id: "harbour-score",
    title: "Score, 72-minute documentary",
    company: "River & Clay",
    category: "sound",
    cover: "/covers/sound.jpg",
    city: "Chennai",
    locationType: "Remote",
    paid: true,
    rate: "By project",
    posted: "5d ago",
    deadline: "8 Oct",
    summary: "A quiet film about a harbour that is being filled in. Piano, field recordings, no temp-track mimicry.",
    description:
      "We have picture lock in six weeks. Looking for a composer who can sit with the cut, not decorate it. Some remote spotting, two days in Chennai with the editor. World music cues are not the brief.",
    requirements: [
      "A score reel, documentary preferred",
      "Stems delivery",
      "Comfortable with a long spotting call",
    ],
  },
  {
    id: "forme-principal",
    title: "Principal product designer",
    company: "Forme Studio",
    category: "design",
    cover: "/covers/visual.jpg",
    city: "Berlin",
    locationType: "Hybrid",
    paid: true,
    rate: "$140k–165k",
    posted: "1d ago",
    deadline: "15 Oct",
    summary: "Lead the next version of a tool used by small architecture practices. Type, space, almost no chrome.",
    description:
      "Forme OS is used by studios that still draw. We need a principal who can throw away screens, write, and sit with users in their rooms. Team of seven. Berlin or remote-in-Europe.",
    requirements: [
      "Shipped a tool other designers use",
      "Writing samples (crits, not decks)",
      "Three-month trial, then hire",
    ],
  },
  {
    id: "casa-norte-dp",
    title: "DP, three-spot brand film",
    company: "Casa Norte",
    category: "screen",
    cover: "/covers/screen.jpg",
    city: "São Paulo",
    locationType: "On site",
    paid: true,
    rate: "$2,400 / day",
    posted: "8d ago",
    deadline: "22 Sep",
    summary: "Dusk exteriors and one kitchen. Available light, small crew, five shoot days.",
    description:
      "A furniture house that does not want a commercial. Three short films, no product hero shots. We want a cinematographer who will wait for the weather and keep the crew under eight.",
    requirements: [
      "A reel with available-light interiors",
      "Own a compact cinema body or equivalent",
      "Based in or able to work in São Paulo",
    ],
  },
  {
    id: "brine-engineer",
    title: "Gameplay engineer, small title",
    company: "Brine Interactive",
    category: "tech",
    cover: "/covers/tech.jpg",
    city: "Stockholm",
    locationType: "Remote",
    paid: true,
    rate: "$900–1,100 / day",
    posted: "3d ago",
    deadline: "1 Oct",
    summary: "Six-month contract on a narrative game about night work. C++, systems, no live-service.",
    description:
      "Kitchen Light's follow-up. We need someone who likes character controllers, save systems, and the unglamorous glue. Team of five. Remote, overlap a Swedish morning.",
    requirements: [
      "Shipped a game, any size",
      "C++ or equivalent systems work",
      "A short note on a system you are proud of",
    ],
  },
  {
    id: "cloth-lookbook",
    title: "Photographer, SS26 lookbook",
    company: "Cloth & Hour",
    category: "visual",
    cover: "/covers/visual.jpg",
    city: "London",
    locationType: "On site",
    paid: true,
    rate: "$2,000 / day",
    posted: "7d ago",
    deadline: "16 Sep",
    summary: "Two days on location, film and digital. Clothes that should look worn-in, not launched.",
    description:
      "A small collection shot as if it already belongs to someone. Rooftop, interior, one street. We develop the film. Looking for a photographer who will not over-style the frame.",
    requirements: [
      "Lookbook or editorial reel",
      "Comfortable with 35mm",
      "London, 24–25 Sep",
    ],
  },
];

export function categoryOf(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)!;
}

export function talentById(id: string) {
  return TALENTS.find((t) => t.id === id);
}

export function gigById(id: string) {
  return GIGS.find((g) => g.id === id);
}

export function talentsIn(category: CategoryId | "all") {
  if (category === "all") return TALENTS;
  return TALENTS.filter((t) => t.category === category);
}

export function gigsIn(category: CategoryId | "all") {
  if (category === "all") return GIGS;
  return GIGS.filter((g) => g.category === category);
}
