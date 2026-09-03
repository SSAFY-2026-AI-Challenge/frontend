import { apiFetch } from '@/lib/api/fetcher';

import type { TransactionPageResponse } from './types';

type GetTransactionsParams = {
  page?: number;
  size?: number;
};

export function getTransactions({
  page = 0,
  size = 20,
}: GetTransactionsParams = {}) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  return apiFetch<TransactionPageResponse>(
    `/api/v1/transactions?${params.toString()}`,
  );
}

// page, size 쿼리 파라미터 없으면
// export function getTransactions() {
//   return apiFetch<TransactionPageResponse>('/api/v1/transactions');
// }