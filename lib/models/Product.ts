import mongoose from "mongoose";

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
        salePrice: { type: Number, default: null },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
