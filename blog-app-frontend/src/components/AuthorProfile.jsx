import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { pageWrapper, divider } from "../styles/common";
import { User, LogOut, FileText, PenTool, Sparkles } from "lucide-react";

function AuthorProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={pageWrapper}>
      {/* PROFILE HEADER */}
      <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-32 w-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-5">
          {currentUser?.profileImageUrl ? (
            <img
              src={currentUser.profileImageUrl}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-lg"
              alt="profile"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-cyan-500/20">
              {currentUser?.firstName?.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Author
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              {currentUser?.firstName} {currentUser?.lastName}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{currentUser?.email}</p>
          </div>
        </div>

        <button
          className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-bold px-5 py-2.5 rounded-full transition cursor-pointer"
          onClick={onLogout}
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>

      {/* NAVIGATION (TABS) */}
      <div className="flex gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-full w-fit">
        <NavLink
          to="articles"
          className={({ isActive }) =>
            isActive
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-2"
              : "text-slate-400 hover:text-slate-200 px-6 py-2 rounded-full text-xs font-semibold transition flex items-center gap-2"
          }
        >
          <FileText size={14} /> My Articles
        </NavLink>

        <NavLink
          to="write-article"
          className={({ isActive }) =>
            isActive
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-2"
              : "text-slate-400 hover:text-slate-200 px-6 py-2 rounded-full text-xs font-semibold transition flex items-center gap-2"
          }
        >
          <PenTool size={14} /> Write New Article
        </NavLink>
      </div>

      <div className={divider} />

      {/* CONTENT OUTLET */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthorProfile;