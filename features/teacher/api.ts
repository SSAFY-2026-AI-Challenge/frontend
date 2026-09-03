import { apiFetch } from '@/lib/api/fetcher';
import type {
  ApplyPolicyRequest,
  ApplyPolicyResponse,
  ClassroomEconomyDashboardResponse,
  ClassroomIndicatorsResponse,
  ClassroomStudentEconomy,
  EconomicAnalysisResponse,
  PolicyProposal,
  PolicySimulationRequest,
  PolicySimulationResponse,
} from './types';

const DEFAULT_CLASSROOM_ID = 'cls_001';

// 1. 학급 경제 현황 및 학생 현황 대시보드
export function getClassroomDashboard(
  classroomId: string = DEFAULT_CLASSROOM_ID
): Promise<ClassroomEconomyDashboardResponse> {
  return apiFetch<ClassroomEconomyDashboardResponse>(
    `/api/v1/classrooms/${classroomId}/economy/dashboard`
  );
}

// 2. 통화량·소비·저축·물가·추이 지표 조회
export function getClassroomIndicators(
  classroomId: string = DEFAULT_CLASSROOM_ID
): Promise<ClassroomIndicatorsResponse> {
  return apiFetch<ClassroomIndicatorsResponse>(
    `/api/v1/classrooms/${classroomId}/economy/indicators`
  );
}

// 3. 학생별 경제활동 목록
export function getClassroomStudentsEconomy(
  classroomId: string = DEFAULT_CLASSROOM_ID
): Promise<ClassroomStudentEconomy[]> {
  return apiFetch<ClassroomStudentEconomy[]>(
    `/api/v1/classrooms/${classroomId}/students/economy`
  );
}

// 4. AI 학급 경제 분석 생성
export function createEconomicAnalysis(
  classroomId: string = DEFAULT_CLASSROOM_ID
): Promise<EconomicAnalysisResponse> {
  return apiFetch<EconomicAnalysisResponse>(
    `/api/v1/classrooms/${classroomId}/economic-analyses`,
    {
      method: 'POST',
    }
  );
}

// 5. 최신 AI 분석 조회
export function getLatestEconomicAnalysis(
  classroomId: string = DEFAULT_CLASSROOM_ID
): Promise<EconomicAnalysisResponse> {
  return apiFetch<EconomicAnalysisResponse>(
    `/api/v1/classrooms/${classroomId}/economic-analyses/latest`
  );
}

// 6. AI 정책 제안 목록
export function getPolicyProposals(
  classroomId: string = DEFAULT_CLASSROOM_ID
): Promise<PolicyProposal[]> {
  return apiFetch<PolicyProposal[]>(
    `/api/v1/classrooms/${classroomId}/policy-proposals`
  );
}

// 7. 정책 적용 전 시뮬레이션
export function simulatePolicy(
  classroomId: string = DEFAULT_CLASSROOM_ID,
  request: PolicySimulationRequest
): Promise<PolicySimulationResponse> {
  return apiFetch<PolicySimulationResponse>(
    `/api/v1/classrooms/${classroomId}/policy-simulations`,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );
}

// 8. 선택 정책 실제 적용 (Idempotency-Key 필수)
export function applyPolicy(
  classroomId: string = DEFAULT_CLASSROOM_ID,
  request: ApplyPolicyRequest
): Promise<ApplyPolicyResponse> {
  const idempotencyKey =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  return apiFetch<ApplyPolicyResponse>(
    `/api/v1/classrooms/${classroomId}/policies`,
    {
      method: 'POST',
      headers: {
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(request),
    }
  );
}

// 9. 정책 적용 결과 조회
export function getPolicyResult(
  classroomId: string = DEFAULT_CLASSROOM_ID,
  policyId: string
): Promise<ApplyPolicyResponse> {
  return apiFetch<ApplyPolicyResponse>(
    `/api/v1/classrooms/${classroomId}/policies/${policyId}`
  );
}
