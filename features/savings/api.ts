import { apiFetch } from '@/lib/api/fetcher';

import type {
  SavingsRecommendationResponse,
  SavingsSummaryResponse,
  SavingsTransferRequest,
  SavingsTransferResponse,
  SavingsTrendsResponse,
} from './types';

export function getSavingsSummary() {
  return apiFetch<SavingsSummaryResponse>(
    '/api/v1/savings/summary',
  );
}

export function getSavingsTrends() {
  return apiFetch<SavingsTrendsResponse>(
    '/api/v1/savings/trends',
  );
}

export function transferSavings(
  request: SavingsTransferRequest,
) {
  return apiFetch<SavingsTransferResponse>(
    '/api/v1/savings/transfers',
    {
      method: 'POST',
      body: JSON.stringify(request),
    },
  );
}

export function getSavingsRecommendations() {
  return apiFetch<SavingsRecommendationResponse>(
    '/api/v1/savings/recommendations',
  );
}