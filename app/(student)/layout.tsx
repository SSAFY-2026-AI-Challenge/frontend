import StudentSidebar from '@/components/layout/StudentSidebar';

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#F7F9F5]">
      <StudentSidebar />

      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}