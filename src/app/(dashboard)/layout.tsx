import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-1 flex-col md:pl-72">
        <Header />
        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
