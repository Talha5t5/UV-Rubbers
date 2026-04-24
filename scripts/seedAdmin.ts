import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, default: "admin" },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seed() {
    if (!process.env.MONGODB_URI) {
        console.error("Missing MONGODB_URI");
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    const exists = await User.findOne({ email: "admin@uvrubbers.com.au" });
    if (exists) {
        console.log("Admin user already exists. Email: admin@uvrubbers.com.au");
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
        email: "admin@uvrubbers.com.au",
        password: hashedPassword,
        name: "Admin User",
        role: "admin",
    });

    console.log("Created admin user:\nEmail: admin@uvrubbers.com.au\nPassword: admin123");
    process.exit(0);
}

seed();
