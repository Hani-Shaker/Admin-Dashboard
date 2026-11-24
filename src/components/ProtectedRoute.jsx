import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Spinner() {
    return (
        <div role="status" aria-label="Loading" className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        </div>
    );
}

export default function ProtectedRoute({
    children,
    allowedRoles = ["admin"], // admin-only
    redirectTo = "/login",
}) {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

    // token is being verified with GET(/auth/me) on first load
    if (loading) return <Spinner />;

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        return <Navigate to={redirectTo} replace />;
    }

    return children ?? <Outlet />;
}