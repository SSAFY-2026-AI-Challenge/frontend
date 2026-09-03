import StudentSidebar from '@/components/layout/StudentSidebar';

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <StudentSidebar />

      <main className="min-w-0 flex-1 min-h-screen bg-dashboard">
        {children}
      </main>
    </div>
  );
}