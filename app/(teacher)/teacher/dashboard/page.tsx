'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTeacherStore } from '@/stores/useTeacherStore';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { BottomGardenGraphic } from '@/components/common/FigmaGraphics';
import { useClassroomDashboard } from '@/features/teacher/hooks/useClassroomDashboard';

export default function TeacherDashboardPage() {
  const { status, toggleStatus } = useTeacherStore();
  const { data: classroomData } = useClassroomDashboard('cls_001');

  // 백엔드 severity / economicStatus 연동
  const isNormal = classroomData?.severity
    ? classroomData.severity === 'NORMAL'
    : classroomData?.economicStatus
    ? classroomData.economicStatus === 'STABLE'
    : status === 'NORMAL';

  const statusLabel =
    classroomData?.economicStatus === 'INFLATION'
      ? '인플레이션'
      : classroomData?.economicStatus === 'DEFLATION'
      ? '디플레이션'
      : isNormal
      ? '정상'
      : '비정상';

  // KPIs 실데이터 매핑
  const moneySupply = classroomData?.kpis?.moneySupply ?? 3500000;
  const averageBalance = classroomData?.kpis?.averageBalance ?? 28000;
  const totalConsumption = classroomData?.kpis?.totalConsumption ?? 1200000;
  const totalSavings = classroomData?.kpis?.totalSavings ?? 800000;
  const inflationRate = classroomData?.kpis?.inflationRate ?? 2.3;
  const consumptionGrowthRate = classroomData?.kpis?.consumptionGrowthRate ?? 5.1;

  // 학생별 경제활동 데이터 매핑
  const fallbackStudents = [
    {
      studentId: 'usr_001',
      name: '홍길동',
      jobName: '칠판 관리인',
      balance: 20500,
      creditGrade: 2,
    },
    {
      studentId: 'usr_002',
      name: '황건우',
      jobName: '정리 반장',
      balance: 2392,
      creditGrade: '보통',
    },
    {
      studentId: 'usr_003',
      name: '김영희',
      jobName: '학급 기자',
      balance: 14200,
      creditGrade: 1,
    },
    {
      studentId: 'usr_004',
      name: '이철수',
      jobName: '급식 도우미',
      balance: 11000,
      creditGrade: 3,
    },
  ];

  const students =
    classroomData?.students && classroomData.students.length > 0
      ? classroomData.students
      : fallbackStudents;

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8">
      {/* 1. 상단 헤더 & 상태 토글 컨트롤 */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <PageHeader
          badgeText="6학년 4반"
          title="학급 경제 대시보드"
          subtitle="교사 전용"
        />

        {/* 상태 시안 전환 버튼 */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleStatus}
            className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3.5 py-1.5 text-xs font-bold text-gray-700 shadow-xs hover:bg-gray-50 transition-all cursor-pointer"
          >
            <span>상태 시뮬레이션:</span>
            <span
              className={`font-black ${
                isNormal ? 'text-[#0B654B]' : 'text-red-500'
              }`}
            >
              {isNormal ? '정상 모드' : '위기 모드'}
            </span>
          </button>
        </div>
      </div>

      {/* 2. 학급 경제 대시보드 배너 (정상 / 비정상 모드) */}
      <div
        className={`relative mb-6 overflow-hidden rounded-3xl p-7 text-white shadow-sm transition-all duration-300 ${
          isNormal
            ? 'bg-gradient-to-r from-[#44D58C] via-[#35C884] to-[#6EE7B7]'
            : 'bg-gradient-to-r from-[#FF7A66] via-[#FF8F77] to-[#FFAA95]'
        }`}
      >
        <div className="relative z-10 max-w-xl">
          <p className="mb-2 text-sm font-medium text-white/90">학급 경제 현황</p>
          <div className="mb-4 flex flex-wrap items-center text-2xl md:text-3xl font-extrabold tracking-tight">
            <span>현재 우리반 경제상황은</span>
            <span
              className={`mx-2.5 inline-flex items-center rounded-xl bg-white px-3.5 py-0.5 text-xl md:text-2xl font-black shadow-sm ${
                isNormal ? 'text-[#0B654B]' : 'text-[#EF4444]'
              }`}
            >
              {statusLabel}
            </span>
            <span>입니다</span>
          </div>
          <p className="text-sm font-normal leading-relaxed text-white/95">
            우리 교실 내 가상 화폐 &apos;미소&apos;의 유통 통화량과 소비·저축 지표를 실시간 모니터링하고,
            <br />
            AI 분석을 통해 학급 경제 정책을 시뮬레이션하고 조율할 수 있습니다.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="/teacher/policy">
              <Button className="bg-white text-emerald-800 hover:bg-white/90 font-bold text-xs py-2 px-4 shadow-sm">
                AI 학급 경제 분석 & 정책 조율 바로가기 &gt;
              </Button>
            </Link>
          </div>
        </div>

        {/* 우측 상단 상태 뱃지 & 구름 캐릭터 */}
        <div className="absolute right-6 top-6 flex flex-col items-end gap-2">
          <div
            className={`rounded-xl bg-white px-4 py-1.5 text-xs font-black shadow-xs ${
              isNormal ? 'text-[#0B654B]' : 'text-[#EF4444]'
            }`}
          >
            {isNormal ? '상태 안정' : '주의 요함'}
          </div>

          <div className="mt-1 h-28 w-36 md:h-32 md:w-44 shrink-0 pointer-events-none">
            <Image
              src="/images/characters/sprout.svg"
              alt="구름 캐릭터"
              width={180}
              height={130}
              priority
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* 3. 총 통화량 대형 카드 */}
      <Card className="mb-6 flex flex-col md:flex-row items-center justify-between gap-6 p-7">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-lg font-extrabold text-gray-900">학급 총 통화량 (M2)</h3>
            <span className="text-xs font-bold text-[#35C884]">↑ 4.2%</span>
          </div>
          <div className="inline-flex rounded-xl bg-[#35C884] px-5 py-2.5 text-base md:text-lg font-extrabold text-white shadow-xs">
            {moneySupply.toLocaleString()} 미소
          </div>
          <p className="mt-2 text-xs text-gray-400">
            학생 1인당 평균 잔액: <strong className="text-gray-700">{averageBalance.toLocaleString()} 미소</strong>
          </p>
        </div>

        <div className="w-full md:w-1/2 overflow-hidden opacity-90">
          <BottomGardenGraphic className="h-20 w-full" />
        </div>
      </Card>

      {/* 4. 6대 거시지표 그리드 (3x2) */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* 총 소비액 */}
        <Card className="flex flex-col justify-between p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-800">총 소비액</span>
            <span className="text-xs font-bold text-red-500">↓ 1.8%</span>
          </div>
          <Badge variant="green-pill" className="w-fit text-sm px-3.5 py-1 font-bold">
            {totalConsumption.toLocaleString()} 미소
          </Badge>
        </Card>

        {/* 총 저축액 */}
        <Card className="flex flex-col justify-between p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-800">총 저축액</span>
            <span className="text-xs font-bold text-[#35C884]">↑ 8.0%</span>
          </div>
          <Badge variant="green-pill" className="w-fit text-sm px-3.5 py-1 font-bold">
            {totalSavings.toLocaleString()} 미소
          </Badge>
        </Card>

        {/* 물가 상승률 */}
        <Card className="flex flex-col justify-between p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-800">물가 상승률</span>
            <span className="text-xs font-bold text-[#35C884]">↑ 0.4%</span>
          </div>
          <Badge variant="green-pill" className="w-fit text-sm px-3.5 py-1 font-bold">
            +{inflationRate}%
          </Badge>
        </Card>

        {/* 소비 증가율 */}
        <Card className="flex flex-col justify-between p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-800">소비 증가율</span>
            <span className="text-xs font-bold text-[#35C884]">↑ 0.2%</span>
          </div>
          <Badge variant="green-pill" className="w-fit text-sm px-3.5 py-1 font-bold">
            +{consumptionGrowthRate}%
          </Badge>
        </Card>

        {/* 학생 평균 잔액 */}
        <Card className="flex flex-col justify-between p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-800">1인 평균 잔액</span>
            <span className="text-xs font-bold text-gray-400">안정적</span>
          </div>
          <Badge variant="green-pill" className="w-fit text-sm px-3.5 py-1 font-bold">
            {averageBalance.toLocaleString()} 미소
          </Badge>
        </Card>

        {/* 거시 경제 상태 판정 */}
        <Card className="flex flex-col justify-between p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-800">경제 상태 판정</span>
            <span className="text-xs font-bold text-emerald-600">AI 판정</span>
          </div>
          <Badge
            variant={isNormal ? 'green-pill' : 'danger-pill'}
            className="w-fit text-sm px-3.5 py-1 font-bold"
          >
            {statusLabel}
          </Badge>
        </Card>
      </div>

      {/* 5. 학생 경제 현황 요약 카드 (GET /classrooms/{classroomId}/students/economy 연동) */}
      <Card className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-gray-900">학생별 경제활동 현황</h3>
          <span className="text-xs text-gray-400">
            총 {students.length}명 참여 중
          </span>
        </div>

        <div className="flex flex-col divide-y divide-gray-100">
          {students.map((st, idx) => {
            const gradeDisplay =
              typeof st.creditGrade === 'number'
                ? `${st.creditGrade}등급`
                : String(st.creditGrade || '2등급');

            return (
              <div
                key={st.studentId || idx}
                className="flex flex-wrap items-center justify-between gap-3 py-3.5 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="font-bold text-gray-900">{st.name}</span>
                  <span className="rounded-lg bg-[#E0F2FE] px-2.5 py-0.5 text-xs font-semibold text-[#0284C7]">
                    {st.jobName}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500 font-semibold bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                    신용 {gradeDisplay}
                  </span>
                  <Badge variant="green-pill" className="font-bold min-w-[90px] text-center">
                    {st.balance.toLocaleString()} 미소
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
