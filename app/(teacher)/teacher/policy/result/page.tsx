'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import PageHeader from '@/components/layout/PageHeader';
import { CoinStackGraphic } from '@/components/common/FigmaGraphics';
import { useTeacherStore } from '@/stores/useTeacherStore';

const statusName: Record<string, string> = {
  CONTRACTION: '경기 위축',
  EXPANSION: '경기 활성',
  STABLE: '정상',
  INFLATION: '인플레이션',
  DEFLATION: '디플레이션',
};

export default function PolicyResultPage() {
  const { selectedProposal, simulation, resetPolicy } = useTeacherStore();
  if (!selectedProposal || !simulation)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-sm text-gray-500">
        <p>표시할 정책 시뮬레이션 결과가 없습니다.</p>
        <Link href="/teacher/policy">
          <Button>정책 선택으로 이동</Button>
        </Link>
      </div>
    );
  return (
    <div className="mx-auto max-w-6xl p-5 md:p-8">
      <PageHeader badgeText="6학년 4반" title="대시보드" subtitle="교사" />
      <Card className="mb-3 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <CoinStackGraphic className="h-24 w-24" />
            <div>
              <p className="text-xs text-gray-500">
                정책 적용 전 시뮬레이션 결과
              </p>
              <h1 className="mt-2 text-xl font-extrabold">
                선택한 정책은
                <br />
                <span className="mt-2 inline-block rounded-lg bg-emerald-500 px-3 py-1 text-base text-white">
                  {selectedProposal.title}
                </span>{' '}
                입니다
              </h1>
              <p className="mt-3 text-xs text-gray-500">
                {selectedProposal.description}
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="rounded-lg bg-gray-700 px-3 py-1 text-xs font-bold text-white">
              시뮬레이션 완료
            </span>
            <Image
              src="/images/characters/sprout.svg"
              alt="SEED 캐릭터"
              width={120}
              height={90}
              className="mt-2 h-20 w-28 object-contain"
            />
          </div>
        </div>
      </Card>
      <div className="mb-3 grid gap-3 md:grid-cols-2">
        <Snapshot title="적용 전" data={simulation.before} />
        <Snapshot title="적용 후" data={simulation.after} />
      </div>
      <Card className="mb-3 p-5">
        <h2 className="font-extrabold">경제 상황이</h2>
        <p className="mt-3 text-lg font-bold">
          <Badge variant="danger-pill">
            {statusName[simulation.before.economicStatus] ??
              simulation.before.economicStatus}
          </Badge>
          <span className="mx-2">에서</span>
          <Badge variant="green-pill">
            {statusName[simulation.after.economicStatus] ??
              simulation.after.economicStatus}
          </Badge>
          <span className="ml-2">으로 변화할 것으로 예측됩니다.</span>
        </p>
      </Card>
      <Card className="mb-4 p-5">
        <h2 className="mb-4 font-extrabold">
          AI 시뮬레이션 주요 변화 요약입니다
        </h2>
        <div className="flex flex-wrap gap-2">
          {simulation.changes.map((change) => (
            <span
              key={change}
              className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
            >
              {change}
            </span>
          ))}
        </div>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/teacher/policy" onClick={resetPolicy}>
          <Button variant="outline" fullWidth>
            다른 정책 비교
          </Button>
        </Link>
        <Link href="/teacher/dashboard">
          <Button fullWidth>학급 경제 대시보드로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}

function Snapshot({
  title,
  data,
}: {
  title: string;
  data: {
    moneySupply: number;
    totalConsumption: number;
    inflationRate: number;
    consumptionGrowthRate: number;
    economicStatus: string;
  };
}) {
  const rows = [
    ['총 통화량', `${data.moneySupply.toLocaleString()} 미소`],
    ['총 소비액', `${data.totalConsumption.toLocaleString()} 미소`],
    ['물가 상승률', `${data.inflationRate}%`],
    ['소비 증가율', `${data.consumptionGrowthRate}%`],
  ];
  return (
    <Card className="p-5">
      <h2 className="mb-3 font-extrabold">{title}</h2>
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex justify-between border-b border-gray-100 py-2.5 text-sm"
        >
          <span className="text-gray-500">• {label}</span>
          <Badge variant="green-pill">{value}</Badge>
        </div>
      ))}
    </Card>
  );
}
