
export interface SimulationInput {
  ordersPerDay: number;
  avgOrderValue: number;
  avgDistance: number;
  leaderIncentives: number;
}

export interface FinancialResult {
  // Per Order
  targetPayPerOrder: number;
  restaurantContributionPerOrder: number;
  serviceFeePerOrder: number;
  deliveryFeePerOrder: number;
  customerTotalPerOrder: number;

  // Monthly
  totalOrdersMonth: number;
  totalRevenueMonth: number;
  platformGrossProfitMonth: number;
  totalRiderPayMonth: number;

  // Costs Monthly
  stripeCostMonth: number;
  techCostMonth: number;
  googleApiCostMonth: {
    usage: number;
    netCost: number;
  };
  leaderIncentivesMonth: number;
  totalOperatingCostMonth: number;

  // Profitability Monthly
  netProfitMonth: number;
  duktvDividendMonth: number;
  bcpCouncilDividendMonth: number;
  
  // Annual
  totalOrdersYear: number;
  breakEvenMonth: number | null;
  annualMarketShare: number; // Placeholder for now
  
  // For Display
  restaurantReceivesPerOrder: number;
  platformReceivesPerOrder: number;
}

export interface FinancialModel {
  calculate: (input: SimulationInput) => FinancialResult;
}
