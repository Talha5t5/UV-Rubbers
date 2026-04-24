// Images now served from /products/

export type ProductVariant = {
  id: string;
  name: string;
  size: string;
  roofType?: string;
  length?: string;
  sku: string;
  price: number;
  quantityLabel: string;
  barcode: string;
  warranty: string;
  image: string;
  blurb: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  description: string;
  heroImage: string;
  variants: ProductVariant[];
};

export const productCatalog: Product[] = [
  {
    slug: "elephant-roof-seal-kit",
    name: "The Elephant Roof Seal Kit",
    category: "Seal Kits",
    tagline: "Waterproof roof penetration kits for air-conditioning installers.",
    summary:
      "Australia's leading waterproof sealing solution for professional air conditioning installations.",
    description:
      "The Elephant Roof Seal Kit is designed to provide a clean, professional, and 100% waterproof finish for all roof penetrations. Engineered with premium EPDM rubber, it enables you to run all electrics and piping through a single hole, ensuring a faster installation and a result that lasts. VBA and BAL approved for total peace of mind.",
    heroImage: "/products/uv5001.jpg",
    variants: [
      {
        id: "uv5001",
        name: "70 mm Tin Roof Kit",
        size: "70 mm",
        roofType: "Tin roof",
        sku: "UV5001",
        price: 60,
        quantityLabel: "x 1 kit",
        barcode: "9369998009688",
        warranty: "10 years",
        image: "/products/uv5001.jpg",
        blurb: "The professional choice for standard 70mm tin roof installations.",
      },
      {
        id: "uv5002",
        name: "70 mm Tile Roof Kit",
        size: "70 mm",
        roofType: "Tile roof",
        sku: "UV5002",
        price: 65,
        quantityLabel: "x 1 kit",
        barcode: "9369999639471",
        warranty: "10 years",
        image: "/products/uv5002.jpg",
        blurb: "Tailored tile-roof configuration for a seamless 70mm waterproof finish.",
      },
      {
        id: "uv5003",
        name: "100 mm Tin Roof Kit",
        size: "100 mm",
        roofType: "Tin roof",
        sku: "UV5003",
        price: 70,
        quantityLabel: "x 1 kit",
        barcode: "9369999355883",
        warranty: "10 years",
        image: "/products/uv5003.jpg",
        blurb: "High-capacity 100mm kit for larger commercial tin-roof penetrations.",
      },
      {
        id: "uv5004",
        name: "100 mm Tile Roof Kit",
        size: "100 mm",
        roofType: "Tile roof",
        sku: "UV5004",
        price: 75,
        quantityLabel: "x 1 kit",
        barcode: "9369999116347",
        warranty: "10 years",
        image: "/products/uv5004.jpg",
        blurb: "Heavy-duty 100mm tile-roof kit for complex system installations.",
      },
    ],
  },
  {
    slug: "pipe-cable-seal-roll",
    name: "Elephant Pipe & Cable Pro-Finish",
    category: "Pipes & Cables",
    tagline: "Flexible roll options for longer protected runs.",
    summary:
      "Premium seal-ready rolls designed for protecting exposed piping and cable runs.",
    description:
      "Our Pro-Finish Seal Rolls are the trade standard for extending the life and aesthetics of exposed installations. Made from UV-resistant materials and designed for rapid application, they provide a clean, bundled appearance while protecting sensitive components from the harsh Australian elements.",
    heroImage: "/products/uv5007.jpg",
    variants: [
      {
        id: "uv5007",
        name: "70 mm Pro-Finish Roll",
        size: "70 mm",
        length: "10 meters",
        sku: "UV5007",
        price: 105,
        quantityLabel: "x 1 roll (10m)",
        barcode: "9369998525614",
        warranty: "10 years",
        image: "/products/uv5007.jpg",
        blurb: "Professional 70mm roll format provided in a versatile 10-meter length.",
      },
      {
        id: "uv5008",
        name: "100 mm Pro-Finish Roll",
        size: "100 mm",
        length: "6 meters",
        sku: "UV5008",
        price: 90,
        quantityLabel: "x 1 roll (6m)",
        barcode: "9369900061858",
        warranty: "10 years",
        image: "/products/uv5008.jpg",
        blurb: "Wider 100mm format for large bundles, supplied in a standard 6-meter roll.",
      },
    ],
  },
  {
    slug: "electrical-solar-isolators",
    name: "Electrical & Solar Isolators",
    category: "Accessories",
    tagline: "Accessory product for electrical and solar installations.",
    summary:
      "Trade-quality isolation solutions for solar and electrical HVAC installations.",
    description:
      "Complete your installation with our range of high-performance electrical and solar isolators. Designed to complement the Elephant range, these accessories ensure your entire system meets the highest safety and longevity standards required by the Australian trade field.",
    heroImage: "/products/uv5010.png",
    variants: [
      {
        id: "uv5010",
        name: "Professional Solar Isolator",
        size: "Standard",
        sku: "UV5010",
        price: 40,
        quantityLabel: "x 1 unit",
        barcode: "9369998094592",
        warranty: "10 years",
        image: "/products/uv5010.png",
        blurb: "Durable accessory product specifically suited to solar and electrical workflows.",
      },
    ],
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
