// UV Rubbers Warehouse: Thomastown, Melbourne VIC 3074
export const WAREHOUSE = {
    suburb: "Thomastown",
    state: "VIC",
    postcode: "3074",
    lat: -37.6827,
    lng: 145.0127,
};

// Australian shipping zones based on distance from Thomastown
export interface ShippingZone {
    id: string;
    name: string;
    description: string;
    estimatedDays: string;
    baseRate: number; // base cost in AUD
    perKgRate: number; // additional per kg
    color: string;
}

export const SHIPPING_ZONES: ShippingZone[] = [
    {
        id: "local",
        name: "Melbourne Metro",
        description: "Inner & Outer Melbourne suburbs",
        estimatedDays: "1-2 business days",
        baseRate: 9.95,
        perKgRate: 0,
        color: "#22c55e", // green
    },
    {
        id: "regional-vic",
        name: "Regional Victoria",
        description: "Geelong, Ballarat, Bendigo, Gippsland & more",
        estimatedDays: "2-3 business days",
        baseRate: 14.95,
        perKgRate: 1.5,
        color: "#3b82f6", // blue
    },
    {
        id: "nsw-act",
        name: "NSW & ACT",
        description: "Sydney, Canberra, Newcastle, Wollongong & regional NSW",
        estimatedDays: "3-5 business days",
        baseRate: 19.95,
        perKgRate: 2.0,
        color: "#f59e0b", // amber
    },
    {
        id: "qld",
        name: "Queensland",
        description: "Brisbane, Gold Coast, Cairns & regional QLD",
        estimatedDays: "4-6 business days",
        baseRate: 24.95,
        perKgRate: 2.5,
        color: "#ef4444", // red
    },
    {
        id: "sa",
        name: "South Australia",
        description: "Adelaide & regional SA",
        estimatedDays: "3-5 business days",
        baseRate: 19.95,
        perKgRate: 2.0,
        color: "#a855f7", // purple
    },
    {
        id: "wa",
        name: "Western Australia",
        description: "Perth & regional WA",
        estimatedDays: "5-8 business days",
        baseRate: 29.95,
        perKgRate: 3.0,
        color: "#ec4899", // pink
    },
    {
        id: "tas",
        name: "Tasmania",
        description: "Hobart, Launceston & regional TAS",
        estimatedDays: "4-6 business days",
        baseRate: 24.95,
        perKgRate: 2.5,
        color: "#14b8a6", // teal
    },
    {
        id: "nt",
        name: "Northern Territory",
        description: "Darwin, Alice Springs & regional NT",
        estimatedDays: "6-10 business days",
        baseRate: 34.95,
        perKgRate: 3.5,
        color: "#f97316", // orange
    },
];

// FREE SHIPPING THRESHOLD
export const FREE_SHIPPING_THRESHOLD = 200; // AUD

// Determine zone from Australian postcode
export function getZoneFromPostcode(postcode: string): ShippingZone | null {
    const pc = parseInt(postcode, 10);
    if (isNaN(pc)) return null;

    // Melbourne Metro (3000-3207)
    if (pc >= 3000 && pc <= 3207) return SHIPPING_ZONES.find(z => z.id === "local")!;

    // Regional VIC (3208-3999 and 8000-8999 PO Boxes)
    if ((pc >= 3208 && pc <= 3999) || (pc >= 8000 && pc <= 8999)) return SHIPPING_ZONES.find(z => z.id === "regional-vic")!;

    // NSW (2000-2599, 2619-2899, 2921-2999)
    if ((pc >= 2000 && pc <= 2599) || (pc >= 2619 && pc <= 2899) || (pc >= 2921 && pc <= 2999)) return SHIPPING_ZONES.find(z => z.id === "nsw-act")!;

    // ACT (2600-2618, 2900-2920)
    if ((pc >= 2600 && pc <= 2618) || (pc >= 2900 && pc <= 2920)) return SHIPPING_ZONES.find(z => z.id === "nsw-act")!;

    // QLD (4000-4999, 9000-9999)
    if ((pc >= 4000 && pc <= 4999) || (pc >= 9000 && pc <= 9999)) return SHIPPING_ZONES.find(z => z.id === "qld")!;

    // SA (5000-5999)
    if (pc >= 5000 && pc <= 5999) return SHIPPING_ZONES.find(z => z.id === "sa")!;

    // WA (6000-6999)
    if (pc >= 6000 && pc <= 6999) return SHIPPING_ZONES.find(z => z.id === "wa")!;

    // TAS (7000-7999)
    if (pc >= 7000 && pc <= 7999) return SHIPPING_ZONES.find(z => z.id === "tas")!;

    // NT (0800-0899)
    if (pc >= 800 && pc <= 899) return SHIPPING_ZONES.find(z => z.id === "nt")!;

    // NT extended (0900-0999)
    if (pc >= 900 && pc <= 999) return SHIPPING_ZONES.find(z => z.id === "nt")!;

    return null;
}

// Approximate distance in km from Thomastown based on zone
export function getApproxDistance(zoneId: string): number {
    const distances: Record<string, number> = {
        "local": 25,
        "regional-vic": 150,
        "nsw-act": 880,
        "qld": 1750,
        "sa": 730,
        "wa": 3400,
        "tas": 650,
        "nt": 3700,
    };
    return distances[zoneId] || 0;
}

// Calculate shipping cost
export function calculateShipping(postcode: string, weightKg: number = 2, orderTotal: number = 0): {
    zone: ShippingZone | null;
    cost: number;
    isFreeShipping: boolean;
    distanceKm: number;
} {
    const zone = getZoneFromPostcode(postcode);
    if (!zone) return { zone: null, cost: 0, isFreeShipping: false, distanceKm: 0 };

    const isFreeShipping = orderTotal >= FREE_SHIPPING_THRESHOLD;
    const cost = isFreeShipping ? 0 : zone.baseRate + (zone.perKgRate * Math.max(0, weightKg - 1));
    const distanceKm = getApproxDistance(zone.id);

    return { zone, cost, isFreeShipping, distanceKm };
}
