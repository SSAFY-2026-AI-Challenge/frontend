import { useQuery } from '@tanstack/react-query';

import { getTransactions } from '../api';

type UseTransactionsParams = {
  page?: number;
  size?: number;
};

export function useTransactions(params: UseTransactionsParams = {}) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => getTransactions(params),
  });
}