'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTeacherStore } from '@/stores/useTeacherStore';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { CoinStackGraphic } from '@/components/common/FigmaGraphics';

export default function PolicyResultPage() {
  const { selectedPolicy, resetPolicy } = useTeacherStore();

  const policyTitleMap: Record<string, { title: string; desc: string }> = {
    TAX_INCREASE: {
      title: '세금 인상 (소득세율 12% 상향)',
      desc: '소득세율 상향 조치를 통해 가용 현금 수령액을 조절하고 학급 공공 기금을 확보했습니다.',
    },
    CURRENCY_DECREASE: {
      title: '통화량 긴축 (국채 발행 및 예치 금리 인상)',
      desc: '시중 통화량을 긴축 흡수하고 저축을 유도하여 시중 자금 과잉을 해소했습니다.',
    },
    CONSUMPTION_LIMIT: {
      title: '소비 억제 이벤트 (인기 상품 구매 한도 설정)',
      desc: '학급 내 인기 상품 구매 수량을 조절하여 소비 과열 심리를 진정시켰습니다.',
    },
  };

  const currentInfo = policyTitleMap[selectedPolicy] || policyTitleMap.TAX_INCREASE;

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8">
      {/* 1. 상단 헤더 */}
      <PageHeader
        badgeText="6학년 4반"
        title="학급 경제 대시보드"
        subtitle="교사 정책 적용 결과"
      />

      {/* 2. 정책 적용 결과 배너 */}
      <Card className="mb-6 p-7 border-emerald-200 bg-gradient-to-r from-emerald-50/40 via-teal-50/30 to-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <CoinStackGraphic className="h-20 w-20 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">학급 정책 적용 완료</p>
              <div className="mb-2 flex flex-wrap items-center text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                <span>성공적으로 적용된 정책:</span>
                <span className="mx-2.5 inline-flex items-center rounded-xl bg-[#35C884] px-4 py-1 text-xl md:text-2xl font-black text-white shadow-sm">
                  {currentInfo.title}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-xl">
                {currentInfo.desc}
              </p>
            </div>
          </div>

          {/* 우측 적용 완료 배지 & 마스코트 */}
          <div className="flex flex-col items-end gap-2 shrink-0 pr-4">
            <span className="rounded-lg bg-[#0B654B] px-3.5 py-1 text-xs font-black text-white shadow-xs">
              감사 로그 기록 완료
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

      {/* 3. 적용 전 vs 적용 후 비교 (2열 카드) */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 적용 전 */}
        <Card className="p-6 border-red-100">
          <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
            <h3 className="text-lg font-extrabold text-gray-900">적용 전 (위기)</h3>
            <Badge variant="danger-pill" className="font-bold">
              인플레이션
            </Badge>
          </div>
          <div className="flex flex-col divide-y divide-gray-50">
            <div className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                <span className="text-gray-700 font-medium">총 통화량</span>
              </div>
              <Badge variant="green-pill" className="font-bold min-w-[84px] text-center">
                3,500,000 미소
              </Badge>
            </div>

            <div className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                <span className="text-gray-700 font-medium">총 소비액</span>
              </div>
              <Badge variant="green-pill" className="font-bold min-w-[84px] text-center">
                1,200,000 미소
              </Badge>
            </div>

            <div className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                <span className="text-gray-700 font-medium">물가 상승률</span>
              </div>
              <Badge variant="danger-pill" className="font-bold min-w-[84px] text-center">
                +2.3% (위험)
              </Badge>
            </div>

            <div className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                <span className="text-gray-700 font-medium">소비 증가율</span>
              </div>
              <Badge variant="danger-pill" className="font-bold min-w-[84px] text-center">
                +5.1% (과열)
              </Badge>
            </div>
          </div>
        </Card>

        {/* 적용 후 */}
        <Card className="p-6 border-emerald-200">
          <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
            <h3 className="text-lg font-extrabold text-gray-900">적용 후 (안정화)</h3>
            <Badge variant="green-pill" className="font-bold">
              안정 (STABLE)
            </Badge>
          </div>
          <div className="flex flex-col divide-y divide-gray-50">
            <div className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-gray-700 font-medium">총 통화량</span>
              </div>
              <Badge variant="green-pill" className="font-bold min-w-[84px] text-center">
                3,200,000 미소 (↓)
              </Badge>
            </div>

            <div className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-gray-700 font-medium">총 소비액</span>
              </div>
              <Badge variant="green-pill" className="font-bold min-w-[84px] text-center">
                1,100,000 미소 (↓)
              </Badge>
            </div>

            <div className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-gray-700 font-medium">물가 상승률</span>
              </div>
              <Badge variant="green-pill" className="font-bold min-w-[84px] text-center">
                +1.8% (안정)
              </Badge>
            </div>

            <div className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-gray-700 font-medium">소비 증가율</span>
              </div>
              <Badge variant="green-pill" className="font-bold min-w-[84px] text-center">
                +3.2% (진정)
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* 4. 경제 상황 변화 배너 */}
      <Card className="mb-6 p-7">
        <div className="flex flex-wrap items-center text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
          <span>학급 경제 상황이</span>
          <span className="mx-2.5 inline-flex items-center rounded-xl bg-red-100 text-red-600 px-4 py-1 text-lg md:text-xl font-black shadow-xs">
            인플레이션
          </span>
          <span>에서</span>
          <span className="mx-2.5 inline-flex items-center rounded-xl bg-[#35C884] px-4 py-1 text-lg md:text-xl font-black text-white shadow-xs">
            정상 안정
          </span>
          <span>으로 개선되었습니다 🎉</span>
        </div>
      </Card>

      {/* 5. AI 신용평가의 주요 변화 요약 카드 */}
      <Card className="mb-8 p-6">
        <h3 className="text-lg font-extrabold text-gray-900 mb-4">
          AI 거시 경제 지표 분석 요약
        </h3>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex rounded-full border border-[#35C884] bg-[#E8F8F0] px-4 py-2 text-xs font-bold text-[#0B654B]">
            ✓ 공공 기금 확보 효과로 학급 자율 예산 증대
          </span>
          <span className="inline-flex rounded-full border border-[#35C884] bg-[#E8F8F0] px-4 py-2 text-xs font-bold text-[#0B654B]">
            ✓ 소비 증가율 5.1% ➔ 3.2%로 과열 심리 진정
          </span>
          <span className="inline-flex rounded-full border border-[#35C884] bg-[#E8F8F0] px-4 py-2 text-xs font-bold text-[#0B654B]">
            ✓ 총 통화량 약 8.5% 긴축 및 물가 상승률 안정화
          </span>
        </div>
      </Card>

      {/* 6. 하단 네비게이션 버튼 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="outline"
          fullWidth
          onClick={resetPolicy}
          className="py-4 text-base"
        >
          정책 롤백 / 재시뮬레이션
        </Button>

        <Link href="/teacher/dashboard" className="block w-full">
          <Button variant="primary" fullWidth className="py-4 text-base font-bold shadow-md">
            학급 경제 대시보드로 복귀 &gt;
          </Button>
        </Link>
      </div>
    </div>
  );
}
