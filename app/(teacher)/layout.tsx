import TeacherSidebar from '@/components/layout/TeacherSidebar';

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />

      <main className="min-w-0 flex-1 min-h-screen bg-dashboard">
        {children}
      </main>
    </div>
  );
}
