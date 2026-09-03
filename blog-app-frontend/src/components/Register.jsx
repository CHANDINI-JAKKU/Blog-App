import {
  divider,
  errorClass,
  formCard,
  formGroup,
  formTitle,
  inputClass,
  labelClass,
  submitBtn,
  mutedText,
} from "../styles/common";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { axiosInstance as axios } from "../axiosConfig";
import { User, Mail, Lock, Sparkles, UserCheck, PenTool } from "lucide-react";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "USER",
    },
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const selectedRole = watch("role");

  const onUserRegister = async (userObj) => {
    const formData = new FormData();
    formData.append("role", userObj.role);
    formData.append("firstName", userObj.firstName);
    formData.append("lastName", userObj.lastName || "");
    formData.append("email", userObj.email);
    formData.append("password", userObj.password);

    if (userObj.profileImageUrl?.[0]) {
      formData.append("profileImageUrl", userObj.profileImageUrl[0]);
    }

    try {
      setLoading(true);
      setApiError(null);
      let res = await axios.post("/auth/users", formData);

      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setApiError(err.response?.data?.error || "Registration failed. Please check details.");
    } finally {
      setLoading(false);
    }
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
          <h2 className={formTitle}>Create Account</h2>
          <p className="text-sm text-slate-400 -mt-6">Join our community of creators, readers, and innovators.</p>
        </div>

        {apiError && <div className={errorClass}>{apiError}</div>}

        <form onSubmit={handleSubmit(onUserRegister)}>
          {/* ROLE SELECTOR */}
          <div className="mb-6">
            <label className={labelClass}>Select Account Type</label>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <label
                className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedRole === "USER"
                    ? "bg-cyan-500/10 border-cyan-500 text-cyan-300 font-bold shadow-md shadow-cyan-500/10"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <input type="radio" value="USER" {...register("role")} className="sr-only" />
                <UserCheck size={16} />
                <span className="text-sm">Reader (User)</span>
              </label>

              <label
                className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedRole === "AUTHOR"
                    ? "bg-cyan-500/10 border-cyan-500 text-cyan-300 font-bold shadow-md shadow-cyan-500/10"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <input type="radio" value="AUTHOR" {...register("role")} className="sr-only" />
                <PenTool size={16} />
                <span className="text-sm font-medium">Writer (Author)</span>
              </label>
            </div>
          </div>

          {/* NAME */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Alex"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
              />
              {errors.firstName && <p className="text-xs text-rose-400 mt-1">{errors.firstName.message}</p>}
            </div>

            <div>
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Morgan"
                {...register("lastName")}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className={formGroup}>
            <label className={labelClass}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4 pointer-events-none" />
              <input
                type="email"
                className={`${inputClass} pl-11`}
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
          </div>

          {/* PASSWORD */}
          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4 pointer-events-none" />
              <input
                type="password"
                className={`${inputClass} pl-11`}
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>}
          </div>

          {/* PROFILE IMAGE */}
          <div className={formGroup}>
            <label className={labelClass}>Profile Photo (Optional)</label>

            <input
              type="file"
              className={`${inputClass} text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer`}
              accept="image/png, image/jpeg"
              {...register("profileImageUrl")}
              onChange={(event) => {
                let file = event.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />

            {preview && (
              <div className="mt-3 flex justify-center">
                <img src={preview} alt="Avatar preview" className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/40" />
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <button type="submit" disabled={loading} className={submitBtn}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className={`${mutedText} text-center mt-6`}>
          Already have an account?{" "}
          <NavLink to="/login" className="text-cyan-400 font-semibold hover:text-cyan-300">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;