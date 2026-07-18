export type ProjectImage = {
  src: string;
  w: number;
  h: number;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  cover: ProjectImage;
  images: ProjectImage[];
};

function img(slug: string, file: string, w: number, h: number): ProjectImage {
  return { src: `/work/${slug}/${file}`, w, h };
}

export const projects: Project[] = [
  {
    slug: "album-cover",
    number: "01",
    title: "Without My People",
    category: "Album Cover",
    description:
      "Album cover design for a music producer. The client wanted something that represented the spacey, unique feel of the track, as well as the cover having a representation of himself on it.",
    cover: img("album-cover", "01.jpg", 849, 1093),
    images: [
      img("album-cover", "01.jpg", 849, 1093),
      img("album-cover", "02.jpg", 1600, 1132),
      img("album-cover", "03.jpg", 1435, 916),
      img("album-cover", "04.jpg", 1313, 1152),
    ],
  },
  {
    slug: "bread-and-butter",
    number: "02",
    title: "Bread & Butter",
    category: "Branding",
    description:
      "Logo design and branding for an East London vintage clothes store and event space. The client wanted an aged, vintage-looking font with an edgy, modern twist. The design had to work embroidered onto clothes, stamped onto bags and advertising different parts of the business.",
    cover: img("bread-and-butter", "03.jpg", 1477, 1145),
    images: [
      img("bread-and-butter", "01.jpg", 840, 1181),
      img("bread-and-butter", "02.jpg", 1176, 550),
      img("bread-and-butter", "03.jpg", 1477, 1145),
      img("bread-and-butter", "04.jpg", 1600, 941),
      img("bread-and-butter", "05.jpg", 1116, 1116),
    ],
  },
  {
    slug: "emmies-wonder-wardrobe",
    number: "03",
    title: "Emmie's Wonder Wardrobe",
    category: "Branding & Character Design",
    description:
      "Full branding for a new spin-off show called Emmie's Wonder Wardrobe. The design needed to represent the core creative values of the brand, which are “glitter & sparkle”, “more is more” and “5 year old energy”, while appealing to the show's target audience (3 to 5 year olds). The project included logo design, full brand guidelines, character elements and props, social posts and album covers, collaborating with multiple teams across the company as well as an external animation studio.",
    cover: img("emmies-wonder-wardrobe", "02.jpg", 917, 1146),
    images: [
      img("emmies-wonder-wardrobe", "01.jpg", 830, 1001),
      img("emmies-wonder-wardrobe", "02.jpg", 917, 1146),
      img("emmies-wonder-wardrobe", "03.jpg", 1600, 1132),
      img("emmies-wonder-wardrobe", "04.jpg", 1600, 1129),
    ],
  },
  {
    slug: "silkweaver",
    number: "04",
    title: "Silkweaver",
    category: "Branding",
    description:
      "Logo design and branding for a new East London hotel bar. The client wanted an interesting and upscale font that emphasised the unique and historic name of the bar. The client was presented with a number of options and, once one was selected, the rest of the branding was developed for roll out.",
    cover: img("silkweaver", "01.jpg", 840, 1122),
    images: [
      img("silkweaver", "01.jpg", 840, 1122),
      img("silkweaver", "02.jpg", 1494, 901),
      img("silkweaver", "03.jpg", 1600, 984),
      img("silkweaver", "04.jpg", 1468, 1109),
      img("silkweaver", "05.jpg", 1600, 1088),
      img("silkweaver", "06.jpg", 1292, 1091),
    ],
  },
  {
    slug: "happiee",
    number: "05",
    title: "Happiee",
    category: "Social Campaign",
    description:
      "This pitch-winning idea involved social media mock-ups for the UK launch of plant-based food brand HAPPIEE. It also included marketing ideas such as a pop-up stall at Spitalfields Market and the tag line ‘The happie meal for adults’, targeting the brand's main client base in London: working adults.",
    cover: img("happiee", "02.jpg", 1444, 1032),
    images: [
      img("happiee", "01.jpg", 732, 1241),
      img("happiee", "02.jpg", 1444, 1032),
      img("happiee", "03.jpg", 1600, 1133),
      img("happiee", "04.jpg", 1600, 1135),
    ],
  },
  {
    slug: "moonbug",
    number: "06",
    title: "Moonbug",
    category: "Album Artwork",
    description:
      "Album artwork design for all Moonbug IPs such as CoComelon, Blippi, Little Angel, The Oddbods and more. These albums also include collaborations with brands such as Sesame Street and The Wiggles.",
    cover: img("moonbug", "02.jpg", 1600, 1132),
    images: [
      img("moonbug", "01.jpg", 615, 942),
      img("moonbug", "02.jpg", 1600, 1132),
    ],
  },
  {
    slug: "pokket",
    number: "07",
    title: "Pokket Film Festival",
    category: "Branding",
    description:
      "Logo design and branding for London-based short film festival, Pokket. The festival's aim is to give people an opportunity to ‘create without reason, using something most people have in their pocket (a smartphone)’. The client wanted the design to reflect the fun, lighthearted tone of the festival while still looking well thought out and professional.",
    cover: img("pokket", "02.jpg", 1600, 945),
    images: [
      img("pokket", "01.jpg", 958, 1236),
      img("pokket", "02.jpg", 1600, 945),
      img("pokket", "03.jpg", 1417, 1064),
      img("pokket", "04.jpg", 1499, 954),
    ],
  },
  {
    slug: "pictorum",
    number: "08",
    title: "Pictorum Art Group",
    category: "Logo Design",
    description:
      "Logo design for a London art group and gallery. The client already had other brands within the art group and wanted the logo to be cohesive with them, incorporating brush strokes and monochromatic colours. The client was presented with 3 different options.",
    cover: img("pictorum", "03.jpg", 1600, 1011),
    images: [
      img("pictorum", "01.jpg", 693, 1000),
      img("pictorum", "02.jpg", 963, 651),
      img("pictorum", "03.jpg", 1600, 1011),
      img("pictorum", "04.jpg", 1455, 976),
    ],
  },
  {
    slug: "my-first",
    number: "09",
    title: "My First",
    category: "Album Artwork",
    description:
      "‘My First’ is an album collection pitched to Universal Music Group. Its aim was to create soothing lullaby albums for children that parents love too. The artwork needed to convey that these were children's lullaby albums, while still leaning into each artist's individual style and branding, and being visually appealing to parents.",
    cover: img("my-first", "01.jpg", 940, 1141),
    images: [
      img("my-first", "01.jpg", 940, 1141),
      img("my-first", "02.jpg", 1497, 745),
      img("my-first", "03.jpg", 1497, 745),
      img("my-first", "04.jpg", 1497, 745),
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string): { next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  return { next: projects[(i + 1) % projects.length] };
}
