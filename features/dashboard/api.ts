import { apiFetch } from '@/lib/api/fetcher';

import type { StudentDashboardResponse } from './types';

export function getStudentDashboard() {
  return apiFetch<StudentDashboardResponse>(
    '/api/v1/student/dashboard',
  );
}