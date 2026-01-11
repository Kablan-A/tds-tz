import { Outlet } from "react-router";
import { Navbar } from "~/components/layout/navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b">
        <Navbar />
      </div>
      <main className="flex-1 max-w-6xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
