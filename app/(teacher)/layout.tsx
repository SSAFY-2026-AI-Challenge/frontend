import TeacherSidebar from '@/components/layout/TeacherSidebar';

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#F7F9F5]">
      <TeacherSidebar />

      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}
