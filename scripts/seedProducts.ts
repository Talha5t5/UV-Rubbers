import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const ProductSchema = new mongoose.Schema(
    {
        slug: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        tagline: { type: String },
        summary: { type: String },
        description: { type: String },
        heroImage: { type: String },
        sku: { type: String },
        price: { type: Number, required: true, default: 0 },
        stock: { type: Number, default: 0 },
        size: { type: String },
        quantityLabel: { type: String },
        barcode: { type: String },
        warranty: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const products = [
    {
        slug: "70mm-tin-roof-kit",
        name: "70 mm Tin Roof Kit",
        category: "Seal Kits",
        tagline: "Waterproof roof penetration kit for tin roofs.",
        summary: "The Elephant Roof Seal Kit by UV Rubbers is a durable, Australian-made waterproofing solution designed for air-conditioning installations on tin roofs.",
        description: "The Elephant Roof Seal Kit allows installers to run all electrical cables and piping through a single roof penetration, making the process faster and cleaner. Engineered with premium EPDM Rubber. UV Resistant, Waterproof & Weatherproof, BAL Approved and VBA Approved.",
        heroImage: "/products/uv5001.jpg",
        sku: "UV5001",
        price: 60,
        stock: 500,
        size: "70 mm",
        quantityLabel: "x 1 Kit",
        barcode: "9369998009688",
        warranty: "10 Years",
        isActive: true,
    },
    {
        slug: "70mm-tile-roof-kit",
        name: "70 mm Tile Roof Kit",
        category: "Seal Kits",
        tagline: "Waterproof roof penetration kit for tile roofs.",
        summary: "The Elephant Roof Seal Kit by UV Rubbers — 70mm tile roof configuration. A durable, Australian-made waterproofing solution for air-conditioning installations on tile roofs.",
        description: "The Elephant Roof Seal Kit allows installers to run all electrical cables and piping through a single roof penetration, making the process faster and cleaner. Engineered with premium EPDM Rubber. UV Resistant, Waterproof & Weatherproof, BAL Approved and VBA Approved.",
        heroImage: "/products/uv5002.jpg",
        sku: "UV5002",
        price: 65,
        stock: 300,
        size: "70 mm",
        quantityLabel: "x 1 Kit",
        barcode: "9369999639471",
        warranty: "10 Years",
        isActive: true,
    },
    {
        slug: "100mm-tin-roof-kit",
        name: "100 mm Tin Roof Kit",
        category: "Seal Kits",
        tagline: "High-capacity waterproof kit for 100mm tin roof penetrations.",
        summary: "The Elephant Roof Seal Kit by UV Rubbers — 100mm tin roof configuration. A durable, Australian-made waterproofing solution for air-conditioning installations on tin roofs.",
        description: "The Elephant Roof Seal Kit allows installers to run all electrical cables and piping through a single roof penetration, making the process faster and cleaner. Engineered with premium EPDM Rubber. UV Resistant, Waterproof & Weatherproof, BAL Approved and VBA Approved.",
        heroImage: "/products/uv5003.jpg",
        sku: "UV5003",
        price: 70,
        stock: 250,
        size: "100 mm",
        quantityLabel: "x 1 Kit",
        barcode: "9369999355883",
        warranty: "10 Years",
        isActive: true,
    },
    {
        slug: "100mm-tile-roof-kit",
        name: "100 mm Tile Roof Kit",
        category: "Seal Kits",
        tagline: "Heavy-duty waterproof kit for 100mm tile roof penetrations.",
        summary: "The Elephant Roof Seal Kit by UV Rubbers — 100mm tile roof configuration. A durable, Australian-made waterproofing solution for air-conditioning installations on tile roofs.",
        description: "The Elephant Roof Seal Kit allows installers to run all electrical cables and piping through a single roof penetration, making the process faster and cleaner. Engineered with premium EPDM Rubber. UV Resistant, Waterproof & Weatherproof, BAL Approved and VBA Approved.",
        heroImage: "/products/uv5004.jpg",
        sku: "UV5004",
        price: 75,
        stock: 120,
        size: "100 mm",
        quantityLabel: "x 1 Kit",
        barcode: "9369999116347",
        warranty: "10 Years",
        isActive: true,
    },
    {
        slug: "70mm-trunk-roll-10m",
        name: "70 mm Trunk In A Roll — 10 Metres",
        category: "Pipes & Cables",
        tagline: "Flexible 70mm trunk roll for longer protected cable runs.",
        summary: "UV Rubbers 70mm trunk-in-a-roll provides a clean, professional finish for exposed piping and cable runs. Supplied in a 10-metre roll.",
        description: "Premium seal-ready rolls designed for protecting exposed piping and cable runs. Made from UV-resistant materials designed for rapid application, providing a clean, bundled appearance while protecting sensitive components from the harsh Australian elements.",
        heroImage: "/products/uv5007.jpg",
        sku: "UV5007",
        price: 105,
        stock: 80,
        size: "70 mm",
        quantityLabel: "x 1 Roll (10m)",
        barcode: "9369998525614",
        warranty: "10 Years",
        isActive: true,
    },
    {
        slug: "100mm-trunk-roll-6m",
        name: "100 mm Trunk In Roll — 6 Metres",
        category: "Pipes & Cables",
        tagline: "Flexible 100mm trunk roll for larger protected cable runs.",
        summary: "UV Rubbers 100mm trunk-in-roll provides a clean, professional finish for larger exposed piping and cable bundles. Supplied in a 6-metre roll.",
        description: "Premium seal-ready rolls designed for protecting exposed piping and cable runs. Made from UV-resistant materials designed for rapid application, providing a clean, bundled appearance while protecting sensitive components from the harsh Australian elements.",
        heroImage: "/products/uv5008.jpg",
        sku: "UV5008",
        price: 90,
        stock: 60,
        size: "100 mm",
        quantityLabel: "x 1 Roll (6m)",
        barcode: "9369900061858",
        warranty: "10 Years",
        isActive: true,
    },
    {
        slug: "electrical-solar-isolators",
        name: "Electrical & Solar Isolators",
        category: "Accessories",
        tagline: "Trade-quality isolators for electrical and solar installations.",
        summary: "UV Rubbers Electrical & Solar Isolators — trade-quality isolation solutions for solar and electrical HVAC installations.",
        description: "Complete your installation with our high-performance electrical and solar isolators. Designed to complement the Elephant range, these accessories ensure your entire system meets the highest safety and longevity standards required by the Australian trade field.",
        heroImage: "/products/uv5010.png",
        sku: "UV5010",
        price: 40,
        stock: 1200,
        size: "Standard",
        quantityLabel: "x 1 Unit",
        barcode: "9369998094592",
        warranty: "10 Years",
        isActive: true,
    },
    {
        slug: "25mm-tin-kit-hw-evap",
        name: "25mm Tin Kit HW & Evap",
        category: "Seal Kits",
        tagline: "Compact 25mm kit for hot water and evaporative systems on tin roofs.",
        summary: "UV Rubbers 25mm Tin Kit for HW & Evaporative systems. A compact, professional waterproofing kit for smaller penetrations on tin roofs.",
        description: "The Elephant 25mm Tin Kit is designed for hot water and evaporative cooling installations. Allows installers to create a clean, waterproof seal around smaller 25mm penetrations on tin roofs. Engineered with premium EPDM Rubber. UV Resistant, Waterproof & Weatherproof, BAL Approved and VBA Approved.",
        heroImage: "/products/uv5012.jpg",
        sku: "UV5012",
        price: 40,
        stock: 400,
        size: "25 mm",
        quantityLabel: "x 1 Kit",
        barcode: "9369998203826",
        warranty: "10 Years",
        isActive: true,
    },
];

async function seed() {
    if (!process.env.MONGODB_URI) {
        console.error("Missing MONGODB_URI in .env.local");
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB...");

    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products.");

    await Product.insertMany(products as any);
    console.log(`🌱 Seeded ${products.length} products successfully:`);
    products.forEach((p, i) => console.log(`   ${i + 1}. ${p.name} (${p.sku}) — $${p.price}`));

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
