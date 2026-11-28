// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Mail, Lock, ShoppingBag } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { getErrorMessage } from '../api/axios';

// const features = ['Product Management', 'Order Tracking', 'Customer Insights'];

// export default function Login() {
//   const { login, token, user, loading } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [error, setError] = useState('');
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

//   if (!loading && token && user?.role === 'admin') return <Navigate to="/dashboard" replace />;

//   const onSubmit = async ({ email, password }) => {
//     setError('');
//     try {
//       await login(email, password);
//       toast.success('Welcome back!');
//       navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
//     } catch (err) {
//       const msg = getErrorMessage(err);
//       setError(msg);
//       toast.error(msg);
//     }
//   };

//   const wrap = 'flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 focus-within:border-cyan-400';
//   const input = 'w-full bg-transparent text-white placeholder-slate-400 outline-none';

//   return (
//     <div className="grid min-h-screen bg-[#0B1120] text-white lg:grid-cols-2">
//       <div className="hidden flex-col justify-center bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500 p-14 lg:flex">
//         <div className="mb-10 flex items-center gap-3 text-2xl font-bold"><ShoppingBag size={32} /> Koda Commerce</div>
//         <h1 className="max-w-lg text-5xl font-extrabold leading-tight">Manage Your Store Like a Pro</h1>
//         <p className="mt-6 max-w-lg text-lg text-white/90">Control products, orders, users, carts and analytics from a modern dashboard experience.</p>
//         <ul className="mt-10 max-w-lg space-y-3">
//           {features.map((f) => <li key={f} className="rounded-2xl bg-white/15 px-5 py-4 font-medium">✓ {f}</li>)}
//         </ul>
//       </div>

//       <div className="flex items-center justify-center p-6">
//         <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-md space-y-5">
//           <img src="/logo.png" alt="Koda Store" className="mx-auto h-28 rounded bg-white" />
//           <div className="text-center">
//             <h2 className="text-3xl font-bold">Welcome Back</h2>
//             <p className="mt-2 text-slate-400">Sign in to your admin dashboard</p>
//           </div>

//           {error && <div role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>}

//           <div>
//             <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email Address</label>
//             <div className={wrap}>
//               <Mail size={20} className="text-slate-400" />
//               <input id="email" type="email" autoComplete="email" placeholder="Enter your email" className={input}
//                 {...register('email', {
//                   required: 'Enter your email address.',
//                   pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address.' },
//                 })} />
//             </div>
//             {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
//           </div>

//           <div>
//             <label htmlFor="password" className="mb-2 block text-sm font-semibold">Password</label>
//             <div className={wrap}>
//               <Lock size={20} className="text-slate-400" />
//               <input id="password" type="password" autoComplete="current-password" placeholder="Enter your password" className={input}
//                 {...register('password', {
//                   required: 'Enter your password.',
//                   minLength: { value: 6, message: 'Password must be at least 6 characters.' },
//                 })} />
//             </div>
//             {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
//           </div>

//           <button type="submit" disabled={isSubmitting}
//             className="w-full rounded-xl bg-cyan-500 py-3.5 font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
//             {isSubmitting ? 'Signing in…' : 'Sign In'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Icon from "../components/Icon";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const features = [
  "Product Management",
  "Order Tracking",
  "Customer Insights",
  "Revenue Analytics",
];

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

const Field = ({ label, htmlFor, error, children }) => (
  <div>
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-slate-700"
    >
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

const EyeIcon = ({ visible }) => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    {visible ? (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.46 12C3.73 7.94 7.52 5 12 5s8.27 2.94 9.54 7c-1.27 4.06-5.06 7-9.54 7S3.73 16.06 2.46 12z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ) : (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3l18 18M10.58 10.59a2 2 0 002.83 2.83"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.88 5.09A10.6 10.6 0 0112 4.9c4.48 0 8.27 2.94 9.54 7a10.9 10.9 0 01-3.05 4.46M6.61 6.61A11 11 0 002.46 12c1.27 4.06 5.06 7 9.54 7 1.14 0 2.23-.19 3.23-.53"
        />
      </>
    )}
  </svg>
);

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
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  // Redirect authenticated admins
  if (user?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (values) => {
    setServerError("");

    try {
      // Send login request
      const { data } = await api.post("/auth/login", {
        email: values.email.trim(),
        password: values.password,
      });

      const token = data.token;
      let loggedUser = data.user;

      // Fetch user if API doesn't return it
      if (!loggedUser) {
        const me = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        loggedUser = me.data.user || me.data;
      }

      // Admin-only access
      if (loggedUser?.role !== "admin") {
        const msg =
          "Access denied. This dashboard is for administrators only.";

        setServerError(msg);
        toast.error(msg);
        return;
      }

      // Save user and token in AuthContext
      login(loggedUser, token);

      toast.success(
        `Welcome back, ${loggedUser.username || "Admin"}!`
      );

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

  const inputOk =
    "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200";

  const inputErr =
    "border-red-400 focus:border-red-500 focus:ring-red-200";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-4 sm:p-6 lg:p-8">

      <div className="flex w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Brand Panel */}
        <aside className="relative hidden w-1/2 shrink-0 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 p-8 lg:flex lg:flex-col lg:justify-between xl:p-12">

          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative flex items-center gap-3 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <Icon
                iconName="shoppingBag"
                properties={{ classes: "h-7 w-7" }}
              />
            </div>

            <span className="text-2xl font-bold tracking-tight">
              Koda Commerce
            </span>
          </div>

          <div className="relative max-w-md text-white">

            <h1 className="text-4xl font-extrabold leading-tight xl:text-5xl">
              Manage Your Store Like a Pro
            </h1>

            <p className="mt-5 text-base leading-relaxed text-blue-100">
              Control products, orders, users, carts and analytics
              from a modern dashboard experience.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-medium"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <Icon
                      iconName="check"
                      properties={{
                        classes: "h-4 w-4",
                        strokeWidth: "3",
                      }}
                    />
                  </span>

                  {feature}
                </li>
              ))}
            </ul>

          </div>

          <p className="relative text-xs text-blue-100">
            © {new Date().getFullYear()} Koda Commerce
          </p>

        </aside>

        {/* Login Form */}
        <main className="flex w-full min-w-0 items-center justify-center px-4 py-8 sm:px-8 lg:w-1/2 lg:px-10 xl:px-12">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Icon
                  iconName="shoppingBag"
                  properties={{ classes: "h-6 w-6" }}
                />
              </div>

              <span className="text-xl font-bold text-slate-900">
                Koda Commerce
              </span>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-3xl font-bold text-slate-900">
                Welcome Back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to your admin dashboard.
              </p>

              {/* Server Error */}
              {serverError && (
                <div
                  role="alert"
                  className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {serverError}
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-7 space-y-5"
              >

                {/* Email */}
                <Field
                  label="Email Address"
                  htmlFor="email"
                  error={errors.email?.message}
                >
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@example.com"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.email}
                    className={`${inputBase} ${
                      errors.email ? inputErr : inputOk
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: EMAIL_REGEX,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                </Field>

                {/* Password */}
                <Field
                  label="Password"
                  htmlFor="password"
                  error={errors.password?.message}
                >
                  <div className="relative">

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.password}
                      className={`${inputBase} pr-11 ${
                        errors.password ? inputErr : inputOk
                      }`}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600"
                    >
                      <EyeIcon visible={showPassword} />
                    </button>

                  </div>
                </Field>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

              </form>

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
