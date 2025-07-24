import { SimulationInput, FinancialResult, FinancialModel } from '../types';
import { 
  DISTANCE_PAY_TABLE,
  SERVICE_FEE,
  RESTAURANT_CONTRIBUTION_RATE,
  PLATFORM_COMMISSION_RATE,
  RESTAURANT_TOTAL_COMMISSION,
  STRIPE_FEE_PERCENT,
  STRIPE_FEE_FIXED,
  FREE_TECH_ORDERS_ANNUAL,
  TECH_FEE_PER_ORDER,
  GOOGLE_API_FREE_CREDIT_USD,
  GOOGLE_API_COST_PER_ORDER_USD,
  DUKTV_DIVIDEND_SHARE,
  BCP_COUNCIL_DIVIDEND_SHARE
} from '../constants';

const financialModel: FinancialModel = {
  calculate: (input: SimulationInput): FinancialResult => {
    const { ordersPerDay, avgOrderValue, avgDistance, leaderIncentives } = input;

    // --- Per Order Calculations ---
    // The original code had a bug here. It converted string keys like '3.0' to numbers (3)
    // and then back to strings ('3'), which didn't exist as a key in DISTANCE_PAY_TABLE,
    // leading to `targetPayPerOrder` being undefined.
    // The fix is to work with the original string keys and sort them numerically for a reliable search.
    const distanceKeys = Object.keys(DISTANCE_PAY_TABLE).sort((a, b) => parseFloat(a) - parseFloat(b));
    const applicableDistanceKey = distanceKeys.find(key => avgDistance <= parseFloat(key)) || distanceKeys[distanceKeys.length - 1];
    const targetPayPerOrder = DISTANCE_PAY_TABLE[applicableDistanceKey];
    
    const restaurantContributionPerOrder = avgOrderValue * RESTAURANT_CONTRIBUTION_RATE;
    const serviceFeePerOrder = SERVICE_FEE;
    const deliveryFeePerOrder = Math.max(0, targetPayPerOrder - restaurantContributionPerOrder - serviceFeePerOrder);
    const customerTotalPerOrder = avgOrderValue + serviceFeePerOrder + deliveryFeePerOrder;

    const restaurantReceivesPerOrder = avgOrderValue * (1 - RESTAURANT_TOTAL_COMMISSION);
    const platformReceivesPerOrder = avgOrderValue * PLATFORM_COMMISSION_RATE;

    // --- Monthly Calculations ---
    const totalOrdersMonth = ordersPerDay * 30;
    const totalRevenueMonth = totalOrdersMonth * avgOrderValue;
    const platformGrossProfitMonth = totalRevenueMonth * PLATFORM_COMMISSION_RATE;
    const totalRiderPayMonth = totalOrdersMonth * targetPayPerOrder;

    // --- Monthly Costs ---
    const stripeCostMonth = (totalRevenueMonth * STRIPE_FEE_PERCENT) + (totalOrdersMonth * STRIPE_FEE_FIXED);
    
    const totalOrdersYear = ordersPerDay * 365;
    const techCostYear = Math.max(0, totalOrdersYear - FREE_TECH_ORDERS_ANNUAL) * TECH_FEE_PER_ORDER;
    const techCostMonth = techCostYear / 12;

    const googleApiUsageMonth = totalOrdersMonth * GOOGLE_API_COST_PER_ORDER_USD;
    const googleApiNetCostMonth = Math.max(0, googleApiUsageMonth - GOOGLE_API_FREE_CREDIT_USD);
    
    const leaderIncentivesMonth = leaderIncentives;
    const totalOperatingCostMonth = stripeCostMonth + techCostMonth + googleApiNetCostMonth + leaderIncentivesMonth;

    // --- Monthly Profitability ---
    const netProfitMonth = platformGrossProfitMonth - totalOperatingCostMonth;
    const duktvDividendMonth = netProfitMonth > 0 ? netProfitMonth * DUKTV_DIVIDEND_SHARE : 0;
    const bcpCouncilDividendMonth = netProfitMonth > 0 ? netProfitMonth * BCP_COUNCIL_DIVIDEND_SHARE : 0;

    // --- Annual Projections ---
    let cumulativeProfit = 0;
    let breakEvenMonth: number | null = null;
    if (netProfitMonth > 0) {
        for (let i = 1; i <= 36; i++) {
            cumulativeProfit += netProfitMonth;
            if (cumulativeProfit > 0 && breakEvenMonth === null) {
                breakEvenMonth = i;
            }
        }
    }


    return {
      targetPayPerOrder,
      restaurantContributionPerOrder,
      serviceFeePerOrder,
      deliveryFeePerOrder,
      customerTotalPerOrder,
      totalOrdersMonth,
      totalRevenueMonth,
      platformGrossProfitMonth,
      totalRiderPayMonth,
      stripeCostMonth,
      techCostMonth,
      googleApiCostMonth: {
        usage: googleApiUsageMonth,
        netCost: googleApiNetCostMonth
      },
      leaderIncentivesMonth,
      totalOperatingCostMonth,
      netProfitMonth,
      duktvDividendMonth,
      bcpCouncilDividendMonth,
      totalOrdersYear,
      breakEvenMonth,
      annualMarketShare: 0, // Placeholder
      restaurantReceivesPerOrder,
      platformReceivesPerOrder,
    };
  }
};

export default financialModel;