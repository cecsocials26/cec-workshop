import type { User } from "@supabase/supabase-js";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function AppShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar user={user} />
        <main className="flex-1 overflow-y-auto bg-brand-green px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
