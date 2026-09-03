import { useForm } from "react-hook-form";
import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  mutedText,
  linkClass,
  loadingClass,
} from "../styles/common";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Lock, Mail, Sparkles, UserCheck, ShieldCheck, PenTool } from "lucide-react";

function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const login = useAuth((state) => state.login);
  const currentUser = useAuth((state) => state.currentUser);
  const loading = useAuth((state) => state.loading);
  const error = useAuth((state) => state.error);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const onUserLogin = (userCredObj) => {
    login(userCredObj);
  };

  useEffect(() => {
    if (isAuthenticated === true && currentUser) {
      if (currentUser.role === "USER") {
        toast.success("Welcome back! Redirecting to User Profile", { duration: 2000 });
        navigate("/user-profile");
      } else if (currentUser.role === "AUTHOR") {
        toast.success("Welcome back! Redirecting to Author Profile", { duration: 2000 });
        navigate("/author-profile");
      } else if (currentUser.role === "ADMIN") {
        toast.success("Welcome back! Redirecting to Admin Dashboard", { duration: 2000 });
        navigate("/admin-profile");
      }
    }
  }, [isAuthenticated, currentUser]);

  const fillQuickDemo = (email, password) => {
    setValue("email", email);
    setValue("password", password);
  };

  return (
    <div className="flex justify-center py-12 px-4 sm:px-6">
      <div className={formCard}>
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 mb-4">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className={formTitle}>Welcome Back</h2>
          <p className="text-sm text-slate-400 -mt-6">Sign in to manage your articles, comments, and profile.</p>
        </div>

        {error && <div className={errorClass}>{error}</div>}

        <form onSubmit={handleSubmit(onUserLogin)}>
          {/* Email */}
          <div className={formGroup}>
            <label className={labelClass}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4 pointer-events-none" />
              <input
                type="email"
                placeholder="you@example.com"
                className={`${inputClass} pl-11`}
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => value.trim().length > 0 || "Email cannot be empty",
                })}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className={formGroup}>
            <div className="flex items-center justify-between mb-2">
              <label className={labelClass}>Password</label>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4 pointer-events-none" />
              <input
                type="password"
                placeholder="••••••••"
                className={`${inputClass} pl-11`}
                {...register("password", {
                  required: "Password is required",
                  validate: (value) => value.trim().length > 0 || "Password cannot be empty",
                })}
              />
            </div>
            {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className={submitBtn}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Quick Demo Test Accounts Panel */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
            Quick Fill Demo Credentials
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillQuickDemo("user@gmail.com", "user1234")}
              className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 text-xs font-medium text-slate-300 hover:text-white transition"
            >
              <UserCheck size={14} className="text-cyan-400" />
              <span>User</span>
            </button>
            <button
              type="button"
              onClick={() => fillQuickDemo("author@gmail.com", "author123")}
              className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 text-xs font-medium text-slate-300 hover:text-white transition"
            >
              <PenTool size={14} className="text-blue-400" />
              <span>Author</span>
            </button>
            <button
              type="button"
              onClick={() => fillQuickDemo("admin@gmail.com", "admin123")}
              className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 text-xs font-medium text-slate-300 hover:text-white transition"
            >
              <ShieldCheck size={14} className="text-indigo-400" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Register Footer Link */}
        <p className={`${mutedText} text-center mt-6`}>
          Don't have an account?{" "}
          <NavLink to="/register" className={linkClass}>
            Create one now
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;