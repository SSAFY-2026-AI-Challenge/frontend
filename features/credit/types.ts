export type CreditReportFactor = {
  type: string;
  label: string;
  impact: string;
};

export type BehaviorMetric = {
  key: string;
  label: string;
  value: number;
};

export type CreditReportResponse = {
  yearMonth: string;
  score: number;
  maxScore: number;
  grade: string;
  factors: CreditReportFactor[];
  behaviorMetrics: BehaviorMetric[];
  summary: string;
};

export type CreditScoreResponse = {
  score: number;
  grade: string;
};