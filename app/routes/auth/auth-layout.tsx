import { Outlet } from "react-router";
export default function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12 bg-gray-900">
      <div className="w-full max-w-md space-y-6">
        <Outlet />
      </div>
    </main>
  );
}
