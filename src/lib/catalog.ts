export type CollectionId = "classics" | "heritage";

export type ProductKind = "tee" | "sweatshirt" | "hat" | "case";

export type ProductColor = {
  id: string;
  name: string;
  hex: string;
  image: string;
};

export type ProductVariant = {
  id: number;
  colorId: string;
  size: string;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  line: string;
  price: number;
  collection: CollectionId;
  kind: ProductKind;
  images: string[];
  blurb: string;
  story: string;
  fabric: string;
  colors: ProductColor[];
  sizes?: string[];
  variants: ProductVariant[];
  printfulId: number;
  featured?: boolean;
  badge?: string;
  drop?: string;
};

export const collections: Record<
  CollectionId,
  { title: string; kicker: string; lede: string }
> = {
  classics: {
    title: "Classics",
    kicker: "The outline does the talking.",
    lede: "The primary mark on a tee, hoodie, hat, and case — plus the signature tee.",
  },
  heritage: {
    title: "1794",
    kicker: "Knoxville, not a license.",
    lede: "Rifleman, Blount College, Crockett. Dates and a frontier. Independent drawings.",
  },
};

export const products: Product[] = [
  {
    id: "tee-touchdown",
    slug: "touchdown-tee",
    name: "The Tee",
    line: "Bella + Canvas 3001",
    price: 1350,
    collection: "classics",
    kind: "tee",
    printfulId: 462760113,
    images: [
      "/products/tee-touchdown-silver.jpg",
      "/products/tee-touchdown-vintage-white.jpg",
      "/products/tee-touchdown-white.jpg",
    ],
    blurb: "The outline. On a staple tee.",
    story: "State shape, the word TOUCHDOWN. Bella + Canvas 3001. Independent and unlicensed on purpose.",
    fabric: "Bella + Canvas 3001",
    featured: true,
    colors: [
      { id: "silver", name: "Silver", hex: "#C5C5C5", image: "/products/tee-touchdown-silver.jpg" },
      { id: "vintage-white", name: "Vintage White", hex: "#F2EDE4", image: "/products/tee-touchdown-vintage-white.jpg" },
      { id: "white", name: "White", hex: "#FFFFFF", image: "/products/tee-touchdown-white.jpg" },
    ],
    variants: [
      { id: 5472549752, colorId: "silver", size: "S", price: 1350 },
      { id: 5472549753, colorId: "silver", size: "M", price: 1350 },
      { id: 5472549754, colorId: "silver", size: "L", price: 1350 },
      { id: 5472549755, colorId: "silver", size: "XL", price: 1350 },
      { id: 5472549756, colorId: "silver", size: "2XL", price: 1550 },
      { id: 5472549757, colorId: "vintage-white", size: "XS", price: 1350 },
      { id: 5472549758, colorId: "vintage-white", size: "S", price: 1350 },
      { id: 5472549759, colorId: "vintage-white", size: "M", price: 1350 },
      { id: 5472549760, colorId: "vintage-white", size: "L", price: 1350 },
      { id: 5472549761, colorId: "vintage-white", size: "XL", price: 1350 },
      { id: 5472549762, colorId: "vintage-white", size: "2XL", price: 1550 },
      { id: 5472549763, colorId: "white", size: "XS", price: 1350 },
      { id: 5472549764, colorId: "white", size: "S", price: 1350 },
      { id: 5472549765, colorId: "white", size: "M", price: 1350 },
      { id: 5472549766, colorId: "white", size: "L", price: 1350 },
      { id: 5472549767, colorId: "white", size: "XL", price: 1350 },
      { id: 5472549768, colorId: "white", size: "2XL", price: 1550 },
      { id: 5472549769, colorId: "white", size: "3XL", price: 1800 },
      { id: 5472549770, colorId: "white", size: "4XL", price: 2000 },
      { id: 5472549771, colorId: "white", size: "5XL", price: 2200 },
    ],
  },
  {
    id: "tee-signature",
    slug: "signature-tee",
    name: "The Signature Tee",
    line: "Bella + Canvas 3001",
    price: 1900,
    collection: "classics",
    kind: "tee",
    printfulId: 434160067,
    images: [
      "/products/tee-signature-black.jpg",
      "/products/tee-signature-white.jpg",
    ],
    blurb: "The mark, signed.",
    story: "Black or white Bella + Canvas. The outline does the talking.",
    fabric: "Bella + Canvas 3001",
    featured: true,
    colors: [
      { id: "black", name: "Black", hex: "#1A1A1A", image: "/products/tee-signature-black.jpg" },
      { id: "white", name: "White", hex: "#FFFFFF", image: "/products/tee-signature-white.jpg" },
    ],
    variants: [
      { id: 5317355060, colorId: "black", size: "XS", price: 1900 },
      { id: 5317355061, colorId: "black", size: "S", price: 1900 },
      { id: 5317355062, colorId: "black", size: "M", price: 1900 },
      { id: 5317355063, colorId: "black", size: "L", price: 1900 },
      { id: 5317355064, colorId: "black", size: "XL", price: 1900 },
      { id: 5317355065, colorId: "black", size: "2XL", price: 2200 },
      { id: 5317355066, colorId: "black", size: "3XL", price: 2550 },
      { id: 5317355067, colorId: "white", size: "XS", price: 1900 },
      { id: 5317355068, colorId: "white", size: "S", price: 1900 },
      { id: 5317355069, colorId: "white", size: "M", price: 1900 },
      { id: 5317355070, colorId: "white", size: "L", price: 1900 },
      { id: 5317355071, colorId: "white", size: "XL", price: 1900 },
      { id: 5317355072, colorId: "white", size: "2XL", price: 2200 },
      { id: 5317355073, colorId: "white", size: "3XL", price: 2550 },
    ],
  },
  {
    id: "sweat-touchdown",
    slug: "touchdown-hoodie",
    name: "The Hoodie",
    line: "SOL'S eco raglan hoodie",
    price: 4050,
    collection: "classics",
    kind: "sweatshirt",
    printfulId: 462759065,
    images: [
      "/products/sweat-touchdown-white.jpg",
    ],
    blurb: "Same mark. Heavier cloth.",
    story: "White eco raglan hoodie with the state print on the chest.",
    fabric: "SOL'S eco raglan hoodie",
    featured: true,
    colors: [
      { id: "white", name: "White", hex: "#FFFFFF", image: "/products/sweat-touchdown-white.jpg" },
    ],
    variants: [
      { id: 5472547206, colorId: "white", size: "XS", price: 4050 },
      { id: 5472547207, colorId: "white", size: "S", price: 4050 },
      { id: 5472547209, colorId: "white", size: "M", price: 4050 },
      { id: 5472547210, colorId: "white", size: "L", price: 4050 },
      { id: 5472547211, colorId: "white", size: "XL", price: 4050 },
      { id: 5472547212, colorId: "white", size: "2XL", price: 4250 },
      { id: 5472547213, colorId: "white", size: "3XL", price: 4450 },
    ],
  },
  {
    id: "hat-touchdown",
    slug: "touchdown-hat",
    name: "The Hat",
    line: "Under Armour dad hat",
    price: 4050,
    collection: "classics",
    kind: "hat",
    printfulId: 434160148,
    images: [
      "/products/hat-touchdown-black.jpg",
      "/products/hat-touchdown-navy.jpg",
      "/products/hat-touchdown-white.jpg",
    ],
    blurb: "The outline, embroidered.",
    story: "Under Armour dad hat. Orange thread on the front. One size.",
    fabric: "Under Armour dad hat",
    featured: true,
    colors: [
      { id: "black", name: "Black", hex: "#1A1A1A", image: "/products/hat-touchdown-black.jpg" },
      { id: "navy", name: "Navy", hex: "#1E3A5F", image: "/products/hat-touchdown-navy.jpg" },
      { id: "white", name: "White", hex: "#FFFFFF", image: "/products/hat-touchdown-white.jpg" },
    ],
    variants: [
      { id: 5317356289, colorId: "black", size: "One size", price: 4050 },
      { id: 5317356290, colorId: "navy", size: "One size", price: 4050 },
      { id: 5317356291, colorId: "white", size: "One size", price: 4050 },
    ],
  },
  {
    id: "case-touchdown",
    slug: "touchdown-case",
    name: "The Case",
    line: "MagSafe tough case",
    price: 2800,
    collection: "classics",
    kind: "case",
    printfulId: 434160187,
    images: [
      "/products/case-touchdown-glossy.jpg",
    ],
    blurb: "The mark, in a pocket.",
    story: "Glossy MagSafe tough case. Pick your iPhone.",
    fabric: "MagSafe tough case for iPhone. Glossy.",
    featured: true,
    colors: [
      { id: "glossy", name: "Glossy", hex: "#E8E8E8", image: "/products/case-touchdown-glossy.jpg" },
    ],
    variants: [
      { id: 5317356829, colorId: "glossy", size: "iPhone 14", price: 2800 },
      { id: 5317356830, colorId: "glossy", size: "iPhone 14 Plus", price: 2800 },
      { id: 5317356831, colorId: "glossy", size: "iPhone 14 Pro", price: 2800 },
      { id: 5317356832, colorId: "glossy", size: "iPhone 14 Pro Max", price: 2800 },
      { id: 5317356833, colorId: "glossy", size: "iPhone 15", price: 2800 },
      { id: 5317356834, colorId: "glossy", size: "iPhone 15 Plus", price: 2800 },
      { id: 5317356835, colorId: "glossy", size: "iPhone 15 Pro", price: 2800 },
      { id: 5317356836, colorId: "glossy", size: "iPhone 15 Pro Max", price: 2800 },
      { id: 5317356837, colorId: "glossy", size: "iPhone 16", price: 2800 },
      { id: 5317356838, colorId: "glossy", size: "iPhone 16 Plus", price: 2800 },
      { id: 5317356839, colorId: "glossy", size: "iPhone 16 Pro", price: 2800 },
      { id: 5317356840, colorId: "glossy", size: "iPhone 16 Pro Max", price: 2800 },
      { id: 5317356841, colorId: "glossy", size: "iPhone 17", price: 2800 },
      { id: 5317356842, colorId: "glossy", size: "iPhone 17 Air", price: 2800 },
      { id: 5317356843, colorId: "glossy", size: "iPhone 17 Pro", price: 2800 },
      { id: 5317356844, colorId: "glossy", size: "iPhone 17 Pro Max", price: 2800 },
    ],
  },
  {
    id: "tee-rifleman",
    slug: "rifleman-1794",
    name: "Rifleman 1794",
    line: "Bella + Canvas 3001",
    price: 2900,
    collection: "heritage",
    kind: "tee",
    printfulId: 434179581,
    images: [
      "/products/tee-rifleman-black-heather.jpg",
      "/products/tee-rifleman-heather-navy.jpg",
      "/products/tee-rifleman-white.jpg",
    ],
    blurb: "Frontier cloth. 1794.",
    story: "A Tennessee rifleman, not a mascot. Independent drawing on a Bella + Canvas tee.",
    fabric: "Bella + Canvas 3001",
    colors: [
      { id: "black-heather", name: "Black Heather", hex: "#3A3A3A", image: "/products/tee-rifleman-black-heather.jpg" },
      { id: "heather-navy", name: "Heather Navy", hex: "#3D4F6A", image: "/products/tee-rifleman-heather-navy.jpg" },
      { id: "white", name: "White", hex: "#FFFFFF", image: "/products/tee-rifleman-white.jpg" },
    ],
    variants: [
      { id: 5317571998, colorId: "black-heather", size: "XS", price: 2900 },
      { id: 5317571999, colorId: "black-heather", size: "S", price: 2900 },
      { id: 5317572000, colorId: "black-heather", size: "M", price: 2900 },
      { id: 5317572001, colorId: "black-heather", size: "L", price: 2900 },
      { id: 5317572002, colorId: "black-heather", size: "XL", price: 2900 },
      { id: 5317572003, colorId: "black-heather", size: "2XL", price: 3200 },
      { id: 5317572004, colorId: "black-heather", size: "3XL", price: 3500 },
      { id: 5317572005, colorId: "heather-navy", size: "XS", price: 2900 },
      { id: 5317572006, colorId: "heather-navy", size: "S", price: 2900 },
      { id: 5317572007, colorId: "heather-navy", size: "M", price: 2900 },
      { id: 5317572008, colorId: "heather-navy", size: "L", price: 2900 },
      { id: 5317572009, colorId: "heather-navy", size: "XL", price: 2900 },
      { id: 5317572010, colorId: "heather-navy", size: "2XL", price: 3200 },
      { id: 5317572011, colorId: "heather-navy", size: "3XL", price: 3500 },
      { id: 5317572012, colorId: "white", size: "XS", price: 2900 },
      { id: 5317572013, colorId: "white", size: "S", price: 2900 },
      { id: 5317572014, colorId: "white", size: "M", price: 2900 },
      { id: 5317572015, colorId: "white", size: "L", price: 2900 },
      { id: 5317572016, colorId: "white", size: "XL", price: 2900 },
      { id: 5317572017, colorId: "white", size: "2XL", price: 3200 },
      { id: 5317572018, colorId: "white", size: "3XL", price: 3500 },
    ],
  },
  {
    id: "tee-blount",
    slug: "blount-college-1794",
    name: "Class of 1794",
    line: "Bella + Canvas 3001",
    price: 2200,
    collection: "heritage",
    kind: "tee",
    printfulId: 434189214,
    images: [
      "/products/tee-blount-athletic-heather.jpg",
      "/products/tee-blount-vintage-white.jpg",
      "/products/tee-blount-white.jpg",
    ],
    blurb: "Blount College. The year, not the letters.",
    story: "Knoxville's first college, 1794. Geography and a date. Not a licensed mark.",
    fabric: "Bella + Canvas 3001",
    colors: [
      { id: "athletic-heather", name: "Athletic Heather", hex: "#9A9A9A", image: "/products/tee-blount-athletic-heather.jpg" },
      { id: "vintage-white", name: "Vintage White", hex: "#F2EDE4", image: "/products/tee-blount-vintage-white.jpg" },
      { id: "white", name: "White", hex: "#FFFFFF", image: "/products/tee-blount-white.jpg" },
    ],
    variants: [
      { id: 5317597337, colorId: "athletic-heather", size: "XS", price: 2200 },
      { id: 5317597338, colorId: "athletic-heather", size: "S", price: 2200 },
      { id: 5317597339, colorId: "athletic-heather", size: "M", price: 2200 },
      { id: 5317597340, colorId: "athletic-heather", size: "L", price: 2200 },
      { id: 5317597341, colorId: "athletic-heather", size: "XL", price: 2200 },
      { id: 5317597342, colorId: "athletic-heather", size: "2XL", price: 2550 },
      { id: 5317597343, colorId: "vintage-white", size: "XS", price: 2200 },
      { id: 5317597344, colorId: "vintage-white", size: "S", price: 2200 },
      { id: 5317597345, colorId: "vintage-white", size: "M", price: 2200 },
      { id: 5317597347, colorId: "vintage-white", size: "L", price: 2200 },
      { id: 5317597348, colorId: "vintage-white", size: "XL", price: 2200 },
      { id: 5317597349, colorId: "vintage-white", size: "2XL", price: 2550 },
      { id: 5317597350, colorId: "white", size: "XS", price: 2200 },
      { id: 5317597351, colorId: "white", size: "S", price: 2200 },
      { id: 5317597352, colorId: "white", size: "M", price: 2200 },
      { id: 5317597353, colorId: "white", size: "L", price: 2200 },
      { id: 5317597354, colorId: "white", size: "XL", price: 2200 },
      { id: 5317597355, colorId: "white", size: "2XL", price: 2550 },
    ],
  },
  {
    id: "tee-crockett",
    slug: "crockett-1794",
    name: "Crockett 1794",
    line: "Bella + Canvas 3001",
    price: 3350,
    collection: "heritage",
    kind: "tee",
    printfulId: 434192657,
    images: [
      "/products/tee-crockett-white.jpg",
    ],
    blurb: "A name from the frontier.",
    story: "Crockett as a place in the story, not a licensed portrait. Bella + Canvas 3001.",
    fabric: "Bella + Canvas 3001",
    colors: [
      { id: "white", name: "White", hex: "#FFFFFF", image: "/products/tee-crockett-white.jpg" },
    ],
    variants: [
      { id: 5317613452, colorId: "white", size: "XS", price: 3350 },
      { id: 5317613453, colorId: "white", size: "S", price: 3350 },
      { id: 5317613454, colorId: "white", size: "M", price: 3350 },
      { id: 5317613455, colorId: "white", size: "L", price: 3350 },
      { id: 5317613456, colorId: "white", size: "XL", price: 3350 },
      { id: 5317613457, colorId: "white", size: "2XL", price: 3700 },
    ],
  },
];

export const drops: {
  date: string;
  title: string;
  detail: string;
  slug: string;
  status: "live" | "upcoming";
}[] = [];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getByCollection(id: CollectionId) {
  return products.filter((p) => p.collection === id);
}

export function featuredProducts() {
  return products.filter((p) => p.featured);
}

export function relatedProducts(product: Product, n = 3) {
  const same = products.filter((p) => p.id !== product.id && p.collection === product.collection);
  const rest = products.filter((p) => p.id !== product.id && p.collection !== product.collection);
  return [...same, ...rest].slice(0, n);
}

export function sizesForColor(product: Product, colorId: string) {
  const sizes = product.variants.filter((v) => v.colorId === colorId).map((v) => v.size);
  return sizes.filter((s) => s !== "One size");
}

export function defaultSize(product: Product, colorId: string) {
  const sizes = sizesForColor(product, colorId);
  if (product.kind === "case") return sizes.find((s) => s === "iPhone 16") ?? sizes[0];
  return sizes.find((s) => s === "M") ?? sizes[0];
}

export function findVariant(product: Product, colorId: string, size?: string) {
  if (product.kind === "hat") {
    return product.variants.find((v) => v.colorId === colorId);
  }
  return product.variants.find((v) => v.colorId === colorId && v.size === size);
}

export const SHIP_FREE_AT = 7500;
export const WELCOME_CODE = "WELCOME10";

