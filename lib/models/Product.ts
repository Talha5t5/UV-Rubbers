import mongoose from "mongoose";

const ProductVariantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: String, required: true },
    roofType: { type: String },
    length: { type: String },
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    quantityLabel: { type: String, required: true },
    barcode: { type: String },
    warranty: { type: String },
    image: { type: String, required: true },
    blurb: { type: String },
    stock: { type: Number, default: 0 },
});

const ProductSchema = new mongoose.Schema(
    {
        slug: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        tagline: { type: String },
        summary: { type: String },
        description: { type: String },
        heroImage: { type: String },
        variants: [ProductVariantSchema],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
