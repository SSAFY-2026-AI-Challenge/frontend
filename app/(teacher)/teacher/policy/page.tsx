'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTeacherStore, TeacherPolicyType } from '@/stores/useTeacherStore';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { CoinStackGraphic } from '@/components/common/FigmaGraphics';
import {
  useApplyPolicy,
  usePolicySimulation,
} from '@/features/teacher/hooks/usePolicyMutations';
import type { PolicySimulationResponse } from '@/features/teacher/types';

export default function TeacherPolicyPage() {
  const router = useRouter();
  const { selectedPolicy, setSelectedPolicy, applyPolicy } = useTeacherStore();

  const policies: {
    id: TeacherPolicyType;
    proposalId: string;
    title: string;
    description: string;
    defaultParams: Record<string, unknown>;
  }[] = [
    {
      id: 'TAX_INCREASE',
      proposalId: 'proposal_tax_increase',
      title: '세금 인상 (소득세율 12% 상향)',
      description: '소득세율 상향으로 가용 현금 수령액을 조절하고 공공 기금을 확보합니다.',
      defaultParams: { incomeTaxRate: 0.12 },
    },
    {
      id: 'CURRENCY_DECREASE',
      proposalId: 'proposal_currency_decrease',
      title: '통화량 긴축 (국채 발행 및 예치 금리 인상)',
      description: '통화량 과잉 공급을 줄이고 저축을 유도하여 시중 자금을 회수합니다.',
      defaultParams: { targetMoneySupply: 3200000 },
    },
    {
      id: 'CONSUMPTION_LIMIT',
      proposalId: 'proposal_consumption_limit',
      title: '소비 억제 이벤트 (인기 상품 구매 한도 설정)',
      description: '매점 및 인기 학용품의 1일 구매 수량을 제한하여 소비 과열을 진정시킵니다.',
      defaultParams: { dailyPurchaseLimit: 1 },
    },
  ];

  const currentPolicyObj =
    policies.find((p) => p.id === selectedPolicy) || policies[0];

  // 시뮬레이션 및 실제 적용 훅
  const simulateMutation = usePolicySimulation('cls_001');
  const applyPolicyMutation = useApplyPolicy('cls_001');

  // 시뮬레이션 결과 로컬 상태
  const [simulationResult, setSimulationResult] = useState<PolicySimulationResponse | null>(null);

  // 1. 사전 시뮬레이션 실행 (POST /classrooms/{classroomId}/policy-simulations)
  const handleSimulate = async () => {
    try {
      const result = await simulateMutation.mutateAsync({
        proposalId: currentPolicyObj.proposalId,
        parameters: currentPolicyObj.defaultParams,
      });
      setSimulationResult(result);
    } catch {
      // 서버 미응답 시 시뮬레이션 규격 폴백
      setSimulationResult({
        before: {
          moneySupply: 3500000,
          totalConsumption: 1200000,
          inflationRate: 2.3,
          consumptionGrowthRate: 5.1,
          economicStatus: 'INFLATION',
        },
        after: {
          moneySupply: 3200000,
          totalConsumption: 1100000,
          inflationRate: 1.8,
          consumptionGrowthRate: 3.2,
          economicStatus: 'STABLE',
        },
        changes: [
          '총 통화량이 약 8.5% 감소하고 물가 상승률이 2.3%에서 1.8%로 안정화되었습니다.',
          '소비 증가율이 5.1%에서 3.2%로 조절되어 과열 심리가 완화되었습니다.',
        ],
      });
    }
  };

  // 2. 정책 실제 적용 (POST /classrooms/{classroomId}/policies, Idempotency-Key 포함)
  const handleApply = async () => {
    try {
      await applyPolicyMutation.mutateAsync({
        proposalId: currentPolicyObj.proposalId,
        parameters: currentPolicyObj.defaultParams,
      });
    } catch {
      // 오프라인/스텁 처리
    }
    applyPolicy();
    router.push('/teacher/policy/result');
  };

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8">
      {/* 1. 상단 헤더 */}
      <PageHeader
        badgeText="6학년 4반"
        title="학급 경제 정책 조율"
        subtitle="교사 전용 AI 정책 시뮬레이터"
      />

      {/* 2. 거시 경제 상태 판정 배너 카드 */}
      <Card className="mb-6 p-7">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <CoinStackGraphic className="h-20 w-20 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">AI 학급 경제 진단</p>
              <div className="mb-2 flex flex-wrap items-center text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                <span>현재 인공지능 거시 경제 상태 판정:</span>
                <span className="mx-2.5 inline-flex items-center rounded-xl bg-[#EF4444] px-3.5 py-0.5 text-xl md:text-2xl font-black text-white shadow-sm">
                  인플레이션 (주의)
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                교실 내 유통되는 가상 통화량과 소비 패턴을 실시간 측정한 결과, 통화량 과잉 공급으로 물가 상승 압력이 감지되었습니다.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0 pr-4">
            <span className="rounded-lg bg-red-600 px-3.5 py-1 text-xs font-black text-white shadow-xs">
              긴급 정책 조율 요함
            </span>
            <div className="h-24 w-32 shrink-0 pointer-events-none">
              <Image
                src="/images/characters/sprout.svg"
                alt="구름 캐릭터"
                width={140}
                height={100}
                priority
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* 3. 주요 원인 & AI 분석 */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="flex flex-col justify-between p-6">
          <h3 className="text-lg font-extrabold text-gray-900 mb-4">주요 위험 원인</h3>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full border border-[#FFA4A4] bg-[#FFE5E5] px-3.5 py-1.5 text-xs font-bold text-[#FF5D5D]">
              과도한 소비 증가 (+5.1%)
            </span>
            <span className="inline-flex rounded-full border border-[#FFA4A4] bg-[#FFE5E5] px-3.5 py-1.5 text-xs font-bold text-[#FF5D5D]">
              통화량 과잉 공급 (3,500,000 미소)
            </span>
            <span className="inline-flex rounded-full border border-[#FFA4A4] bg-[#FFE5E5] px-3.5 py-1.5 text-xs font-bold text-[#FF5D5D]">
              화폐 가치 하락 우려
            </span>
          </div>
        </Card>

        <Card className="flex flex-col justify-between p-6">
          <h3 className="text-lg font-extrabold text-gray-900 mb-2">
            SEED AI의 정책 권고
          </h3>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
            최근 소비 및 통화 지표가 급격히 증가하고 있습니다.{' '}
            <strong className="text-red-600">소득세율 상향</strong> 또는{' '}
            <strong className="text-red-600">통화량 긴축 정책</strong>을 시행하여 학급 경제를 안정화하는 것을 권장합니다.
          </p>
        </Card>
      </div>

      {/* 4. 정책 제안 선택 리스트 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-extrabold text-gray-900">
            Seed가 추천하는 AI 학급 경제 정책 (택 1)
          </h3>
          <span className="text-xs text-gray-400">
            클릭하여 정책을 선택하세요
          </span>
        </div>

        <div className="flex flex-col gap-3.5">
          {policies.map((p) => {
            const isSelected = selectedPolicy === p.id;
            return (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedPolicy(p.id);
                  setSimulationResult(null); // 다른 정책 선택 시 시뮬레이션 리셋
                }}
                className={`rounded-2xl p-5 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#35C884] bg-[#E8F8F0]/50 shadow-xs'
                    : 'border border-gray-100 bg-[#F9FAFB] hover:bg-gray-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-base font-extrabold text-gray-900">
                    {p.title}
                  </h4>
                  {isSelected && (
                    <span className="rounded-full bg-[#35C884] px-2.5 py-0.5 text-[11px] font-black text-white">
                      선택됨
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. 사전 시뮬레이션 실행 및 결과 카드 */}
      <Card className="mb-8 p-7 border-2 border-dashed border-emerald-300 bg-emerald-50/20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-lg font-black text-gray-900">
              정책 적용 전 AI 사전 시뮬레이션
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              선택한 정책({currentPolicyObj.title})을 실제 적용하기 전 경제 지표 변화를 예측합니다.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleSimulate}
            disabled={simulateMutation.isPending}
            className="border-[#35C884] text-[#0B654B] hover:bg-emerald-50 px-5 py-2 text-xs font-bold cursor-pointer"
          >
            {simulateMutation.isPending ? '시뮬레이션 분석 중...' : '⚡ 사전 시뮬레이션 실행하기'}
          </Button>
        </div>

        {/* 시뮬레이션 결과 표 */}
        {simulationResult && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 적용 전 */}
              <div className="rounded-2xl bg-white p-5 border border-red-100 shadow-xs">
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                  <span className="text-xs font-black text-red-500">적용 전 (현재 상태)</span>
                  <Badge variant="danger-pill" className="text-xs font-bold">
                    {simulationResult.before.economicStatus}
                  </Badge>
                </div>
                <div className="space-y-2 text-xs text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400">총 통화량</span>
                    <span className="font-bold">{simulationResult.before.moneySupply.toLocaleString()} 미소</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">총 소비액</span>
                    <span className="font-bold">{simulationResult.before.totalConsumption.toLocaleString()} 미소</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">물가 상승률</span>
                    <span className="font-bold text-red-600">+{simulationResult.before.inflationRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">소비 증가율</span>
                    <span className="font-bold text-red-600">+{simulationResult.before.consumptionGrowthRate}%</span>
                  </div>
                </div>
              </div>

              {/* 적용 후 예상 */}
              <div className="rounded-2xl bg-white p-5 border border-emerald-200 shadow-xs">
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                  <span className="text-xs font-black text-emerald-600">적용 후 (예측 효과)</span>
                  <Badge variant="green-pill" className="text-xs font-bold">
                    {simulationResult.after.economicStatus}
                  </Badge>
                </div>
                <div className="space-y-2 text-xs text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400">총 통화량</span>
                    <span className="font-bold text-emerald-600">{simulationResult.after.moneySupply.toLocaleString()} 미소 (감소)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">총 소비액</span>
                    <span className="font-bold text-emerald-600">{simulationResult.after.totalConsumption.toLocaleString()} 미소</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">물가 상승률</span>
                    <span className="font-bold text-emerald-600">+{simulationResult.after.inflationRate}% (안정)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">소비 증가율</span>
                    <span className="font-bold text-emerald-600">+{simulationResult.after.consumptionGrowthRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 예측 변화 코멘트 */}
            <div className="rounded-xl bg-white p-4 border border-emerald-100">
              <span className="text-xs font-bold text-gray-500 block mb-1">AI 지표 변화 분석 요약:</span>
              <ul className="list-disc list-inside space-y-1 text-xs font-medium text-gray-800">
                {simulationResult.changes.map((ch, idx) => (
                  <li key={idx}>{ch}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>

      {/* 6. 하단 액션 버튼 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/teacher/dashboard" className="block w-full">
          <Button variant="outline" fullWidth className="py-4 text-base">
            대시보드로 돌아가기
          </Button>
        </Link>

        <Button
          variant="primary"
          fullWidth
          onClick={handleApply}
          disabled={applyPolicyMutation.isPending}
          className="py-4 text-base font-bold shadow-md cursor-pointer"
        >
          {applyPolicyMutation.isPending
            ? '정책 적용 및 감사 로그 기록 중...'
            : '선택한 정책 실제 적용하기 (Idempotency 보장) >'}
        </Button>
      </div>
    </div>
  );
}
