export type ClassroomKpis = {
  moneySupply: number;
  averageBalance: number;
  totalConsumption: number;
  totalSavings: number;
  inflationRate: number;
  consumptionGrowthRate: number;
};

export type ClassroomStudentEconomy = {
  studentId: string;
  name: string;
  jobName: string;
  balance: number;
  creditGrade: string | number;
};

export type ClassroomEconomyDashboardResponse = {
  economicStatus: 'STABLE' | 'INFLATION' | 'DEFLATION' | string;
  severity: 'NORMAL' | 'WARNING' | 'CRITICAL' | string;
  kpis: ClassroomKpis;
  trends?: {
    moneySupply?: unknown[];
    transactionVolume?: unknown[];
  };
  students: ClassroomStudentEconomy[];
};

export type ClassroomIndicatorsResponse = {
  moneySupply: number;
  averageBalance: number;
  totalConsumption: number;
  totalSavings: number;
  inflationRate: number;
  consumptionGrowthRate: number;
  trends?: {
    moneySupply?: { period: string; amount: number }[];
    transactionVolume?: { period: string; count: number }[];
  };
};

export type EconomicAnalysisResponse = {
  analysisId?: string;
  status: 'STABLE' | 'INFLATION' | 'DEFLATION' | string;
  severity: 'NORMAL' | 'WARNING' | 'CRITICAL' | string;
  summary: string;
  causes: string[];
  recommendations: string[];
  analyzedAt: string;
};

export type PolicyProposal = {
  proposalId: string;
  title: string;
  description: string;
  category: 'TAX' | 'CURRENCY' | 'CONSUMPTION' | string;
  defaultParameters?: Record<string, unknown>;
  expectedEffect?: string;
};

export type PolicySimulationRequest = {
  proposalId: string;
  parameters?: Record<string, unknown>;
};

export type PolicyStateSnapshot = {
  moneySupply: number;
  totalConsumption: number;
  inflationRate: number;
  consumptionGrowthRate: number;
  economicStatus: string;
};

export type PolicySimulationResponse = {
  before: PolicyStateSnapshot;
  after: PolicyStateSnapshot;
  changes: string[];
};

export type ApplyPolicyRequest = {
  proposalId: string;
  parameters?: Record<string, unknown>;
};

export type ApplyPolicyResponse = {
  policyId: string;
  appliedAt: string;
  status: string;
  result?: PolicySimulationResponse;
};
