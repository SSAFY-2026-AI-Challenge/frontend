'use client';

import { usePayroll } from '../hooks/usePayroll';

export default function PayrollTest() {
  const { data, isPending, isError } = usePayroll('2026-08');

  if (isPending) {
    return <p>급여 정보를 불러오는 중...</p>;
  }

  if (isError) {
    return <p>급여 정보를 불러오지 못했습니다.</p>;
  }

  return (
    <pre className="whitespace-pre-wrap">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}