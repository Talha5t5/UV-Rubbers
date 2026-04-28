// Images now served from /products/

export type Product = {
  id?: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  description: string;
  heroImage: string;
  sku?: string;
  price: number;
  salePrice?: number | null;
  stock?: number;
  size?: string;
  quantityLabel?: string;
  barcode?: string;
  warranty?: string;
  isActive?: boolean;
};

export const productCatalog: Product[] = [
  {
    slug: "70mm-tin-roof-kit",
    name: "70 mm Tin Roof Kit",
    category: "Seal Kits",
    tagline: "Waterproof roof penetration kit for tin roofs.",
    summary: "Professional waterproofing solution designed for air-conditioning installations on tin roofs.",
    description: "The Elephant Roof Seal Kit allows installers to run all electrical cables and piping through a single roof penetration. Engineered with premium EPDM Rubber.",
    heroImage: "/products/uv5001.jpg",
    sku: "UV5001",
    price: 60,
    size: "70 mm",
    quantityLabel: "x 1 Kit",
    barcode: "9369998009688",
    warranty: "10 Years",
  },
  {
    slug: "70mm-tile-roof-kit",
    name: "70 mm Tile Roof Kit",
    category: "Seal Kits",
    tagline: "Waterproof roof penetration kit for tile roofs.",
    summary: "Professional waterproofing solution for air-conditioning installations on tile roofs.",
    description: "The Elephant Roof Seal Kit allows installers to run all electrical cables and piping through a single roof penetration. Engineered with premium EPDM Rubber.",
    heroImage: "/products/uv5002.jpg",
    sku: "UV5002",
    price: 65,
    size: "70 mm",
    quantityLabel: "x 1 Kit",
    barcode: "9369999639471",
    warranty: "10 Years",
  },
  {
    slug: "100mm-tin-roof-kit",
    name: "100 mm Tin Roof Kit",
    category: "Seal Kits",
    tagline: "High-capacity waterproof kit for 100mm tin roof penetrations.",
    summary: "Large-format waterproofing solution for air-conditioning installations on tin roofs.",
    description: "The Elephant Roof Seal Kit allows installers to run all electrical cables and piping through a single roof penetration. Engineered with premium EPDM Rubber.",
    heroImage: "/products/uv5003.jpg",
    sku: "UV5003",
    price: 70,
    size: "100 mm",
    quantityLabel: "x 1 Kit",
    barcode: "9369999355883",
    warranty: "10 Years",
  },
  {
    slug: "100mm-tile-roof-kit",
    name: "100 mm Tile Roof Kit",
    category: "Seal Kits",
    tagline: "Heavy-duty waterproof kit for 100mm tile roof penetrations.",
    summary: "Large-format waterproofing solution for air-conditioning installations on tile roofs.",
    description: "The Elephant Roof Seal Kit allows installers to run all electrical cables and piping through a single roof penetration. Engineered with premium EPDM Rubber.",
    heroImage: "/products/uv5004.jpg",
    sku: "UV5004",
    price: 75,
    size: "100 mm",
    quantityLabel: "x 1 Kit",
    barcode: "9369999116347",
    warranty: "10 Years",
  },
  {
    slug: "70mm-trunk-roll-10m",
    name: "70 mm Trunk In A Roll — 10 Metres",
    category: "Pipes & Cables",
    tagline: "Flexible 70mm trunk roll for longer protected cable runs.",
    summary: "Clean, professional finish for exposed piping and cable runs. Supplied in a 10-metre roll.",
    description: "Premium seal-ready rolls designed for protecting exposed piping and cable runs. UV-resistant materials.",
    heroImage: "/products/uv5007.jpg",
    sku: "UV5007",
    price: 105,
    size: "70 mm",
    quantityLabel: "x 1 Roll (10m)",
    barcode: "9369998525614",
    warranty: "10 Years",
  },
  {
    slug: "100mm-trunk-roll-6m",
    name: "100 mm Trunk In Roll — 6 Metres",
    category: "Pipes & Cables",
    tagline: "Flexible 100mm trunk roll for larger protected cable runs.",
    summary: "Clean, professional finish for larger exposed piping and cable bundles. Supplied in a 6-metre roll.",
    description: "Premium seal-ready rolls designed for protecting exposed piping and cable runs. UV-resistant materials.",
    heroImage: "/products/uv5008.jpg",
    sku: "UV5008",
    price: 90,
    size: "100 mm",
    quantityLabel: "x 1 Roll (6m)",
    barcode: "9369900061858",
    warranty: "10 Years",
  },
  {
    slug: "electrical-solar-isolators",
    name: "Electrical & Solar Isolators",
    category: "Accessories",
    tagline: "Trade-quality isolators for electrical and solar installations.",
    summary: "High-performance electrical and solar isolators for HVAC installations.",
    description: "Designed to complement the Elephant range, these accessories ensure safety and longevity.",
    heroImage: "/products/uv5010.png",
    sku: "UV5010",
    price: 40,
    size: "Standard",
    quantityLabel: "x 1 Unit",
    barcode: "9369998094592",
    warranty: "10 Years",
  },
  {
    slug: "25mm-tin-kit-hw-evap",
    name: "25mm Tin Kit HW & Evap",
    category: "Seal Kits",
    tagline: "Compact 25mm kit for hot water and evaporative systems on tin roofs.",
    summary: "Compact, professional waterproofing kit for smaller penetrations on tin roofs.",
    description: "The Elephant 25mm Tin Kit is designed for hot water and evaporative cooling installations.",
    heroImage: "/products/uv5012.jpg",
    sku: "UV5012",
    price: 40,
    size: "25 mm",
    quantityLabel: "x 1 Kit",
    barcode: "9369998203826",
    warranty: "10 Years",
  },
];

export const featuredProducts = productCatalog;

export const formatCurrency = (price: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(price);

export const getProductBySlug = (slug?: string) => productCatalog.find((product) => product.slug === slug);
