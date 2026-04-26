import { NextResponse } from "next/server";
import { calculateShipping, SHIPPING_ZONES, FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const postcode = searchParams.get("postcode");
    const weight = parseFloat(searchParams.get("weight") || "2");
    const orderTotal = parseFloat(searchParams.get("orderTotal") || "0");

    if (!postcode) {
        return NextResponse.json({
            zones: SHIPPING_ZONES,
            freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        });
    }

    const result = calculateShipping(postcode, weight, orderTotal);

    if (!result.zone) {
        return NextResponse.json(
            { error: "Invalid Australian postcode. Please enter a valid 4-digit postcode." },
            { status: 400 }
        );
    }

    return NextResponse.json({
        postcode,
        zone: result.zone,
        shippingCost: result.cost,
        isFreeShipping: result.isFreeShipping,
        distanceKm: result.distanceKm,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        estimatedWeight: weight,
    });
}
