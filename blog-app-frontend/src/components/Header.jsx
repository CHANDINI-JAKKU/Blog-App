import { NavLink } from "react-router";
import { useState } from "react";
import { useAuth } from "../store/authStore";
import { Menu, X, User, Search } from "lucide-react";
import ThemeToggle from "./ui/ThemeToggle";
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

  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-white" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <NavLink to="/" className={navBrandClass}>
            MyBlog
          </NavLink>
        </div>

        <div className="hidden md:flex md:items-center md:gap-6">
          <ul className={navLinksClass}>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={navLinkClass}>
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={navLinkClass}>
                Topics
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <NavLink to={isAuthenticated ? getProfilePath() : "/login"} className="flex items-center gap-2">
              <User size={18} className="text-white/90" />
            </NavLink>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="absolute left-1/2 top-16 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-lg bg-slate-900/95 p-4 md:hidden">
            <ul className="flex flex-col gap-3">
              <li>
                <NavLink to="/" onClick={()=>setOpen(false)} className={({isActive})=>isActive?navLinkActiveClass:navLinkClass}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/register" onClick={()=>setOpen(false)} className={navLinkClass}>Register</NavLink>
              </li>
              <li>
                <NavLink to="/login" onClick={()=>setOpen(false)} className={navLinkClass}>Login</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;