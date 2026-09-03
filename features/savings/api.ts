import { apiFetch } from '@/lib/api/fetcher';

import type {
  SavingsGoal,
  SavingsRecommendationResponse,
  SavingsSummaryResponse,
  SavingsTransferRequest,
  SavingsTransferResponse,
  SavingsTrendsResponse,
} from './types';

export function getSavingsSummary(): Promise<SavingsSummaryResponse> {
  return apiFetch<SavingsSummaryResponse>('/api/v1/savings/summary');
}

export function getSavingsGoal(): Promise<SavingsGoal> {
  return apiFetch<SavingsGoal>('/api/v1/savings/goal');
}

export async function getSavingsTrends(): Promise<SavingsTrendsResponse> {
  const res = await apiFetch<unknown>('/api/v1/savings/trends');
  if (Array.isArray(res)) {
    return { trends: res };
  }
  if (res && typeof res === 'object' && Array.isArray((res as Record<string, unknown>).trends)) {
    return res as SavingsTrendsResponse;
  }
  return { trends: [] };
}

export function transferSavings(
  request: SavingsTransferRequest,
): Promise<SavingsTransferResponse> {
  return apiFetch<SavingsTransferResponse>('/api/v1/savings/transfers', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export async function getSavingsRecommendations(): Promise<SavingsRecommendationResponse> {
  const res = await apiFetch<unknown>('/api/v1/savings/recommendations');
  if (Array.isArray(res)) {
    return { recommendations: res };
  }
  if (res && typeof res === 'object' && Array.isArray((res as Record<string, unknown>).recommendations)) {
    return res as SavingsRecommendationResponse;
  }
  return { recommendations: [] };
}