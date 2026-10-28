import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import api from "../api/axios";
import { useAuth } from "../context/useAuth";
import Icon from "../components/Icon";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Spinner = () => (
  <svg
    className="h-5 w-5 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const EyeIcon = ({ off }) =>
  off ? (
    <Icon iconName="openEye" properties={
      { classes: "h-5 w-5" }
    } />
  ) : (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.46 12C3.73 7.94 7.52 5 12 5s8.27 2.94 9.54 7c-1.27 4.06-5.06 7-9.54 7S3.73 16.06 2.46 12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

const Field = ({ label, htmlFor, error, children }) => (
  <div>
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">
      {label}
    </label>
    {children}
    {error && (
      <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
        {error}
      </p>
    )}
  </div>
);

/* ---------- Page ---------- */

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  if (user?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (values) => {
    setServerError("");

    try {
      const { data } = await api.post("/auth/login", {
        email: values.email.trim(),
        password: values.password,
      });

      const token = data.token;
      let loggedUser = data.user;

      // If the API doesn't return the user in the login response, fetch it
      if (!loggedUser) {
        const me = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        loggedUser = me.data.user || me.data;
      }

      // dashboard is admin-only: reject customers without storing anything
      if (loggedUser?.role !== "admin") {
        const msg = "Access denied. This dashboard is for administrators only.";
        setServerError(msg);
        toast.error(msg);
        return;
      }

      login(loggedUser, token); // AuthContext saves token + user (localStorage)
      toast.success(`Welcome back, ${loggedUser.username || "Admin"}!`);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.response?.status === 401
          ? "Invalid email or password."
          : err.request
            ? "Cannot reach the server. Please check your connection."
            : "Something went wrong. Please try again.");
      setServerError(msg);
      toast.error(msg);
    }
  };

  const inputBase =
    "block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100";
  const inputOk = "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200";
  const inputErr = "border-red-400 focus:border-red-500 focus:ring-red-200";

  return (
    <div className="min-h-screen w-full bg-blue-200 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-2xl bg-blue-50 shadow-xl">
        {/* ---------- Brand panel (desktop only) ---------- */}
        <aside className="relative hidden w-1/2 shrink-0 overflow-hidden bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-700 lg:flex lg:flex-col lg:justify-between lg:p-8 xl:p-12">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />

          <div className="relative flex items-center gap-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2.3 2.3a1 1 0 00.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">SEF Store Admin</span>
          </div>

          <div className="relative max-w-md text-white">
            <h2 className="text-4xl font-bold leading-tight">
              Run your store from one place.
            </h2>
            <p className="mt-4 text-indigo-100">
              Manage products, track orders, and keep an eye on revenue and
              customers with a real-time dashboard.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-indigo-50">
              {[
                "Products & image management",
                "Order tracking & status updates",
                "Customer and admin user control",
                "Revenue analytics & charts",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 border-2 border-white/20 rounded-lg bg-blue-300/50 px-3 py-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                    <Icon iconName="check" properties={{ classes: "h-3 w-3", strokeWidth: "3" }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* <p className="relative text-xs text-indigo-200">
            © {new Date().getFullYear()} SEF Academy — Frontend Training Program
          </p> */}
        </aside>

        {/* ---------- Form panel ---------- */}
        <main className="flex w-full min-w-0 items-center justify-center px-4 py-8 sm:px-8 sm:py-10 lg:w-1/2 lg:px-8 xl:px-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2.3 2.3a1 1 0 00.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-slate-900">SEF Store Admin</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
              <p className="mt-1.5 text-sm text-slate-500">
                Enter your admin credentials to access the dashboard.
              </p>

              {/* Server error banner */}
              {serverError && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
                >
                  <svg className="mt-0.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6a1 1 0 112 0v4a1 1 0 11-2 0V6zm1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-5">
                <Field label="Email address" htmlFor="email" error={errors.email?.message}>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@example.com"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.email}
                    className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: EMAIL_REGEX, message: "Enter a valid email address" },
                    })}
                  />
                </Field>

                <Field label="Password" htmlFor="password" error={errors.password?.message}>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.password}
                      className={`${inputBase} pr-11 ${errors.password ? inputErr : inputOk}`}
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600"
                    >
                      <EyeIcon off={showPassword} />
                    </button>
                  </div>
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>

                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-500">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = `${api.defaults.baseURL}/auth/google`;
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <FcGoogle className="h-5 w-5" />
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = `${api.defaults.baseURL}/auth/github`;
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <FaGithub className="h-5 w-5" />
                  <span>GitHub</span>
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
              Restricted area — authorized administrators only.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}