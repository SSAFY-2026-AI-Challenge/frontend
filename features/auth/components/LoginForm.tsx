'use client';

import { FormEvent, useState } from 'react';

export default function LoginForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: 로그인 API 명세 확정 후 연결
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border p-5">
      <div className="mb-5 flex h-24 items-center justify-center bg-gray-50">
        <span className="text-sm text-gray-400">
          학생 캐릭터 일러스트
        </span>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold">시작</h2>

        <p className="mt-1 text-sm text-gray-500">
          직업을 얻고 월급을 받아 소득을 관리해요.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={id}
          onChange={(event) => setId(event.target.value)}
          placeholder="아이디"
          className="rounded-md border px-3 py-2"
        />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호"
          className="rounded-md border px-3 py-2"
        />

        <button
          type="submit"
          className="mt-2 rounded-md bg-gray-900 px-4 py-2 font-medium text-white"
        >
          로그인
        </button>
      </div>
    </form>
  );
}