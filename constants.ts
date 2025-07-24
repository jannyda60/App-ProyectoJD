
export const DISTANCE_PAY_TABLE: { [key: string]: number } = {
    '0.5': 3.18,
    '1.0': 3.40,
    '1.5': 3.70,
    '2.0': 4.00,
    '2.5': 4.30,
    '3.0': 4.60,
    '3.5': 5.00,
    '4.0': 5.40,
    '4.5': 5.80,
    '5.0': 6.25,
};

export const SERVICE_FEE = 0.75;
export const RESTAURANT_CONTRIBUTION_RATE = 0.02;
export const PLATFORM_COMMISSION_RATE = 0.10;
export const RESTAURANT_TOTAL_COMMISSION = 0.12;

export const STRIPE_FEE_PERCENT = 0.015;
export const STRIPE_FEE_FIXED = 0.20;

export const FREE_TECH_ORDERS_ANNUAL = 80000;
export const TECH_FEE_PER_ORDER = 0.20;

export const GOOGLE_API_FREE_CREDIT_USD = 200;
// Estimated cost: 2 calls per order (route + geocode) at ~$5/1000 calls each = $0.01 per order
export const GOOGLE_API_COST_PER_ORDER_USD = 0.01;

export const DUKTV_DIVIDEND_SHARE = 0.60;
export const BCP_COUNCIL_DIVIDEND_SHARE = 0.40;
