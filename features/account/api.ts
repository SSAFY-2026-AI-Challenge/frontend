import { apiFetch } from '@/lib/api/fetcher';

import type { AccountResponse } from './types';

export function getAccounts() {
  return apiFetch<AccountResponse[]>('/api/v1/accounts');
}