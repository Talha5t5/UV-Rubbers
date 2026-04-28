import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema(
    {
        // Singleton key — always "global"
        key: { type: String, default: "global", unique: true },
        globalSaleActive: { type: Boolean, default: false },
        globalSalePercent: { type: Number, default: 0, min: 0, max: 100 },
        globalSaleLabel: { type: String, default: "" }, // e.g. "Winter Sale"
    },
    { timestamps: true }
);

export default mongoose.models.SiteSettings ||
    mongoose.model("SiteSettings", SiteSettingsSchema);
