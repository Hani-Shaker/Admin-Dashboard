import { Outlet , useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  products: "Products",
  orders: "Orders",
  users: "Users",
};

export default function DashboardLayout({
  user = { name: "Admin", avatar: "" },
  children,
}) {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  // Support /products and /dashboard/products
  const key =
    segments[0] === "dashboard" && segments[1]
      ? segments[1]
      : segments[0];

  const pageTitle = PAGE_TITLES[key] ?? "Dashboard";
  const initial = (user.name || "?").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64 flex min-h-screen min-w-0 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
          <h1 className="text-xl font-semibold text-slate-900">
            {pageTitle}
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">
              {user.name}
            </span>

            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
                {initial}
              </div>
            )}
          </div>
        </header>

        <main className="min-w-0 flex-1 p-6">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
