import { useQuery } from '@tanstack/react-query';

import { getPayroll } from '../api';

export function usePayroll(yearMonth: string) {
  return useQuery({
    queryKey: ['payroll', yearMonth],
    queryFn: () => getPayroll(yearMonth),
    enabled: Boolean(yearMonth),
  });
}