import LoginForm from '@/features/auth/components/LoginForm';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-sm">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md border font-bold">
            ₩
          </div>

          <h1 className="text-2xl font-bold">금배금배</h1>

          <p className="mt-2 text-sm text-gray-500">
            학급 단위 가상 화폐를 통해 배우는 초등 경제 교육 플랫폼
          </p>
        </header>

        <LoginForm />

        <footer className="mt-8 text-center text-xs text-gray-400">
          © 2026 우리반 경제생활 MVP. All Rights Reserved.
        </footer>
      </section>
    </main>
  );
}