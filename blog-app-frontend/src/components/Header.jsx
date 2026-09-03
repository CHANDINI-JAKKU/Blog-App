import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../store/authStore";
import { Menu, X, User, Sparkles, PenTool, LayoutDashboard, LogOut, LogIn } from "lucide-react";
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from "../styles/common";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const getProfilePath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "AUTHOR":
        return "/author-profile";
      case "ADMIN":
        return "/admin-profile";
      default:
        return "/user-profile";
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-xl bg-slate-900/80 border border-slate-800"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <NavLink to="/" className={navBrandClass}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent font-extrabold tracking-tight text-xl">
              MyBlog
            </span>
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <ul className={navLinksClass}>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                Home
              </NavLink>
            </li>
            {isAuthenticated && user?.role === "AUTHOR" && (
              <li>
                <NavLink 
                  to="/author-profile/write-article" 
                  className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
                >
                  <span className="flex items-center gap-1.5">
                    <PenTool size={14} className="text-cyan-400" /> Write Article
                  </span>
                </NavLink>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <NavLink 
                  to={getProfilePath()} 
                  className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
                >
                  <span className="flex items-center gap-1.5">
                    <LayoutDashboard size={14} className="text-blue-400" /> Dashboard
                  </span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <NavLink 
                to={getProfilePath()} 
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition group"
              >
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                  {user?.firstName ? user.firstName.charAt(0).toUpperCase() : <User size={14} />}
                </div>
                <div className="text-left pr-1">
                  <p className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition">
                    {user?.firstName || "Account"}
                  </p>
                  <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                    {user?.role}
                  </p>
                </div>
              </NavLink>

              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-full transition cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-full transition"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-full hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition active:scale-95"
              >
                <LogIn size={15} /> Get Started
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile menu dropdown */}
        {open && (
          <div className="absolute left-0 right-0 top-16 z-50 bg-[#090d16]/95 backdrop-blur-2xl border-b border-slate-800 p-6 md:hidden shadow-2xl">
            <ul className="flex flex-col gap-4">
              <li>
                <NavLink 
                  to="/" 
                  onClick={() => setOpen(false)} 
                  className={({ isActive }) => isActive ? "text-cyan-400 font-bold text-base" : "text-slate-300 text-base font-medium"}
                >
                  Home
                </NavLink>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <NavLink 
                      to={getProfilePath()} 
                      onClick={() => setOpen(false)} 
                      className="text-slate-300 text-base font-medium flex items-center justify-between"
                    >
                      <span>Dashboard</span>
                      <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold uppercase">{user?.role}</span>
                    </NavLink>
                  </li>
                  {user?.role === "AUTHOR" && (
                    <li>
                      <NavLink 
                        to="/author-profile/write-article" 
                        onClick={() => setOpen(false)} 
                        className="text-slate-300 text-base font-medium flex items-center gap-2 text-cyan-400"
                      >
                        <PenTool size={16} /> Write Article
                      </NavLink>
                    </li>
                  )}
                  <li className="pt-2 border-t border-slate-800">
                    <button
                      onClick={() => { setOpen(false); handleLogout(); }}
                      className="w-full text-left text-rose-400 font-semibold text-base flex items-center gap-2"
                    >
                      <LogOut size={16} /> Sign Out ({user?.firstName})
                    </button>
                  </li>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-3 border-t border-slate-800">
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl border border-slate-700 text-slate-200 font-medium"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20"
                  >
                    Get Started
                  </NavLink>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;