import type { Payroll } from './types';
import { mockPayroll } from './mock';

export async function getPayroll(
  yearMonth: string,
): Promise<Payroll> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    ...mockPayroll,
    yearMonth,
  };
}

// 백엔드 서버 올리면 아래 코드로 변경
// import { apiFetch } from '@/lib/api/fetcher';

// import type { Payroll } from './types';

// export function getPayroll(yearMonth: string) {
//   return apiFetch<Payroll>(
//     `/api/v1/payrolls/${yearMonth}`,
//   );
// }